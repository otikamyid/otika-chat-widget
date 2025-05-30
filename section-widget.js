(function() {
    // 1. Ambil config dari window.ChatWidgetConfig (jika ada)
    var config = window.ChatWidgetConfig || {};
    config.width = config.width || "100%";
    config.height = config.height || "700px";
    config.borderRadius = config.borderRadius || "32px";
    config.branding = config.branding || {};
    config.branding.logo = config.branding.logo || "https://otika.biz.id/wp-content/uploads/2024/09/cropped-OTIKA-1.png";
    config.branding.name = config.branding.name || "Otika";
    config.branding.welcomeText = config.branding.welcomeText || "Hai 👋, Ada yang bisa kubantu?";
    config.branding.responseTimeText = config.branding.responseTimeText || "Silakan ketik tombol untuk mulai chat langsung!";
    config.webhook = config.webhook || {};
    config.webhook.url = config.webhook.url || "";
    config.webhook.route = config.webhook.route || "";
    config.style = config.style || {};
    config.style.primaryColor = config.style.primaryColor || "#4d7bfa";
    config.style.secondaryColor = config.style.secondaryColor || "#1241c4";
    config.style.backgroundColor = config.style.backgroundColor || "#ffffff";
    config.style.fontColor = config.style.fontColor || "#333333";

    // Font
    if (!document.getElementById('otika-font')) {
        const font = document.createElement('link');
        font.rel = 'stylesheet';
        font.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap';
        font.id = 'otika-font';
        document.head.appendChild(font);
    }

    // CSS
    const style = document.createElement('style');
    style.textContent = `
    .otika-chat-auto-widget {
        --chat-color-primary: ${config.style.primaryColor};
        --chat-color-secondary: ${config.style.secondaryColor};
        --chat-color-light: #d1fae5;
        --chat-color-surface: ${config.style.backgroundColor};
        --chat-color-text: ${config.style.fontColor};
        --chat-color-text-light: #6b7280;
        --chat-color-border: #e5e7eb;
        --chat-shadow-md: 0 4px 6px rgba(16,185,129,0.15);
        --chat-radius-lg: ${config.borderRadius};
        font-family: 'Poppins', sans-serif;
    }
    .otika-chat-auto-widget {
        width: ${config.width};
        max-width: 600px;
        height: ${config.height};
        border-radius: var(--chat-radius-lg);
        background: var(--chat-color-surface);
        box-shadow: var(--chat-shadow-md);
        display: flex;
        flex-direction: column;
        overflow: hidden;
        border: 1px solid var(--chat-color-light);
        margin: 40px auto;
        position: static;
    }
    .otika-chat-auto-widget .chat-header {
        padding: 20px;
        display: flex;
        align-items: center;
        gap: 14px;
        background: linear-gradient(135deg, var(--chat-color-primary) 0%, var(--chat-color-secondary) 100%);
        color: white;
    }
    .otika-chat-auto-widget .chat-header-logo {
        width: 40px; height: 40px; border-radius: 12px; background: #fff; object-fit: contain; padding: 5px;
    }
    .otika-chat-auto-widget .chat-header-title {
        font-size: 18px; font-weight: 700; color: white;
    }
    .otika-chat-auto-widget .chat-body {
        flex: 1; display: flex; flex-direction: column; min-height: 0;
    }
    .otika-chat-auto-widget .chat-messages {
        flex: 1; overflow-y: auto; padding: 24px; background: #f9fafb;
        display: flex; flex-direction: column; gap: 18px;
    }
    .otika-chat-auto-widget .chat-bubble {
        padding: 16px 22px; border-radius: 16px;
        max-width: 80%; font-size: 15px; line-height: 1.7;
        position: relative; white-space: pre-line; word-break: break-word;
    }
    .otika-chat-auto-widget .chat-bubble.user-bubble {
        background: linear-gradient(135deg, var(--chat-color-primary) 0%, var(--chat-color-secondary) 100%);
        color: white; align-self: flex-end; border-bottom-right-radius: 8px;
    }
    .otika-chat-auto-widget .chat-bubble.bot-bubble {
        background: white; color: var(--chat-color-text); align-self: flex-start;
        border-bottom-left-radius: 8px; border: 1px solid var(--chat-color-light);
    }
    .otika-chat-auto-widget .chat-controls {
        display: flex; gap: 10px; padding: 18px; background: var(--chat-color-surface); border-top: 1px solid var(--chat-color-light);
    }
    .otika-chat-auto-widget .chat-textarea {
        flex: 1; padding: 14px 16px; border: 1px solid var(--chat-color-light);
        border-radius: 10px; background: var(--chat-color-surface);
        color: var(--chat-color-text); font-size: 15px; resize: none;
        font-family: inherit; min-height: 48px; max-height: 120px;
    }
    .otika-chat-auto-widget .chat-textarea:focus {
        outline: none; border-color: var(--chat-color-primary);
        box-shadow: 0 0 0 3px rgba(16,185,129,0.13);
    }
    .otika-chat-auto-widget .chat-submit {
        background: linear-gradient(135deg, var(--chat-color-primary) 0%, var(--chat-color-secondary) 100%);
        color: white; border: none; border-radius: 10px; width: 48px; height: 48px;
        cursor: pointer; display: flex; align-items: center; justify-content: center;
    }
    .otika-chat-auto-widget .chat-submit svg { width: 22px; height: 22px; }
    .otika-chat-auto-widget .chat-footer {
        padding: 10px; text-align: center; background: var(--chat-color-surface);
        border-top: 1px solid var(--chat-color-light);
    }
    .otika-chat-auto-widget .chat-footer-link {
        color: var(--chat-color-primary); text-decoration: none; font-size: 13px;
        opacity: 0.9; transition: 0.2s;
    }
    .otika-chat-auto-widget .chat-footer-link:hover { opacity: 1; }
    .otika-chat-auto-widget .registration-form {
        display: flex; flex-direction: column; gap: 14px;
        max-width: 360px; margin: 32px auto 0 auto;
    }
    .otika-chat-auto-widget .form-field {
        display: flex; flex-direction: column; gap: 5px;
    }
    .otika-chat-auto-widget .form-label {
        font-size: 14px; font-weight: 500; color: var(--chat-color-text);
    }
    .otika-chat-auto-widget .form-input {
        padding: 12px 14px; border: 1px solid var(--chat-color-border);
        border-radius: 10px; font-family: inherit; font-size: 15px;
    }
    .otika-chat-auto-widget .form-input:focus {
        outline: none; border-color: var(--chat-color-primary);
        box-shadow: 0 0 0 3px rgba(16,185,129,0.13);
    }
    .otika-chat-auto-widget .form-input.error { border-color: #ef4444; }
    .otika-chat-auto-widget .error-text { font-size: 13px; color: #ef4444; }
    .otika-chat-auto-widget .submit-registration {
        padding: 14px 20px; background: linear-gradient(135deg, var(--chat-color-primary) 0%, var(--chat-color-secondary) 100%);
        color: white; border: none; border-radius: 10px; cursor: pointer;
        font-size: 16px; font-weight: 600; font-family: inherit;
    }
    .otika-chat-auto-widget .chat-welcome-title {
        margin-top: 30px; font-size: 23px; font-weight: 700; color: var(--chat-color-text);
        text-align: center; margin-bottom: 20px;
    }
    .otika-chat-auto-widget .chat-response-time {
        font-size: 15px; color: var(--chat-color-text-light); margin: 0; text-align: center;
    }
    .otika-chat-auto-widget .suggested-questions {
        display: flex; flex-wrap: wrap; gap: 7px; margin: 18px 0; justify-content: flex-start;
    }
    .otika-chat-auto-widget .suggested-question-btn {
        background: #f3f4f6; border: 1px solid var(--chat-color-light);
        border-radius: 10px; padding: 8px 16px; font-size: 14px;
        color: var(--chat-color-text); cursor: pointer; transition: 0.2s;
    }
    .otika-chat-auto-widget .suggested-question-btn:hover {
        background: var(--chat-color-light); border-color: var(--chat-color-primary);
    }
    @media (max-width: 600px) {
        .otika-chat-auto-widget { width: 100% !important; height: 100vh !important; border-radius: 0 !important; }
    }
    `;
    document.head.appendChild(style);

    // Widget Container
    var container = document.createElement('div');
    container.className = 'otika-chat-auto-widget';

    container.innerHTML = `
      <div class="chat-header">
        <img class="chat-header-logo" src="${config.branding.logo}" alt="${config.branding.name}">
        <span class="chat-header-title">${config.branding.name}</span>
      </div>
      <div class="chat-body">
        <div class="chat-messages"></div>
        <form class="registration-form" autocomplete="off">
            <div class="chat-welcome-title">${config.branding.welcomeText}</div>
            <div class="form-field">
                <label class="form-label" for="chat-user-name">Name</label>
                <input type="text" id="chat-user-name" class="form-input" placeholder="Your name" required>
                <div class="error-text" id="name-error"></div>
            </div>
            <div class="form-field">
                <label class="form-label" for="chat-user-email">Email</label>
                <input type="email" id="chat-user-email" class="form-input" placeholder="Your email" required>
                <div class="error-text" id="email-error"></div>
            </div>
            <div class="form-field">
                <label class="form-label" for="chat-user-whatsapp">WhatsApp Number</label>
                <input type="text" id="chat-user-whatsapp" class="form-input" placeholder="Nomor WhatsApp Anda" required>
                <div class="error-text" id="whatsapp-error"></div>
            </div>
            <button type="submit" class="submit-registration">Mulai Chat</button>
            <p class="chat-response-time">${config.branding.responseTimeText}</p>
        </form>
      </div>
      <div class="chat-footer">
        <a class="chat-footer-link" href="https://otika.biz.id" target="_blank">Powered by Otika</a>
      </div>
    `;

    var scriptTag = document.currentScript;
if (scriptTag && scriptTag.parentNode) {
    scriptTag.parentNode.insertBefore(container, scriptTag.nextSibling);
} else {
    document.body.appendChild(container);
}

    // --- Logic ---
    const messagesContainer = container.querySelector('.chat-messages');
    const registrationForm = container.querySelector('.registration-form');
    const nameInput = container.querySelector('#chat-user-name');
    const emailInput = container.querySelector('#chat-user-email');
    const whatsappInput = container.querySelector('#chat-user-whatsapp');
    const nameError = container.querySelector('#name-error');
    const emailError = container.querySelector('#email-error');
    const whatsappError = container.querySelector('#whatsapp-error');

    let conversationId = '';
    let isWaitingForResponse = false;

    function createSessionId() {
        return crypto.randomUUID ? crypto.randomUUID() : (Date.now() + Math.random()).toString(36);
    }
    function createTypingIndicator() {
        const div = document.createElement('div');
        div.className = 'chat-bubble bot-bubble';
        div.innerHTML = `<span style="opacity:0.7;">Bot sedang mengetik...</span>`;
        return div;
    }
    function parseMessage(text) {
    // Bold: *text*
    text = text.replace(/\*([^\*]+)\*/g, '<strong>$1</strong>');
    // Italic: _text_
    text = text.replace(/\_([^\_]+)\_/g, '<em>$1</em>');
    return text;
    }
    function linkifyText(text) {
        const urlPattern = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
        return text.replace(urlPattern, url =>
            `<a href="${url}" target="_blank" rel="noopener noreferrer" class="chat-link">${url}</a>`
        );
    }
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    function isValidWhatsappNumber(number) {
        return /^(\+?\d{10,15})$/.test(number);
    }

    registrationForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        nameError.textContent = '';
        emailError.textContent = '';
        whatsappError.textContent = '';
        nameInput.classList.remove('error');
        emailInput.classList.remove('error');
        whatsappInput.classList.remove('error');

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const whatsapp = whatsappInput.value.trim();

        let isValid = true;
        if (!name) {
            nameError.textContent = 'Nama wajib diisi';
            nameInput.classList.add('error');
            isValid = false;
        }
        if (!email) {
            emailError.textContent = 'Email wajib diisi';
            emailInput.classList.add('error');
            isValid = false;
        } else if (!isValidEmail(email)) {
            emailError.textContent = 'Format email tidak valid';
            emailInput.classList.add('error');
            isValid = false;
        }
        if (!whatsapp) {
            whatsappError.textContent = 'Nomor WhatsApp wajib diisi';
            whatsappInput.classList.add('error');
            isValid = false;
        } else if (!isValidWhatsappNumber(whatsapp)) {
            whatsappError.textContent = 'Nomor WhatsApp tidak valid';
            whatsappInput.classList.add('error');
            isValid = false;
        }
        if (!isValid) return;

        registrationForm.style.display = 'none';
        const typingIndicator = createTypingIndicator();
        messagesContainer.appendChild(typingIndicator);

        conversationId = createSessionId();

        const webhookUrl = config.webhook.url;
        const webhookRoute = config.webhook.route;

        if (webhookUrl) {
            try {
                const userInfoMessage = `Name: ${name}\nEmail: ${email}\nWhatsApp: ${whatsapp}`;
                const userInfoData = {
                    action: "sendMessage",
                    sessionId: conversationId,
                    route: webhookRoute,
                    chatInput: userInfoMessage,
                    metadata: {
                        userId: email,
                        userName: name,
                        userWhatsapp: whatsapp,
                        isUserInfo: true
                    }
                };
                const userInfoResponse = await fetch(webhookUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(userInfoData)
                });
                const userInfoResponseData = await userInfoResponse.json();
                messagesContainer.removeChild(typingIndicator);

                const botMessage = document.createElement('div');
                botMessage.className = 'chat-bubble bot-bubble';
                const messageText = Array.isArray(userInfoResponseData) ? userInfoResponseData[0].output : userInfoResponseData.output;
                botMsg.innerHTML = parseMessage(linkifyText(responseText || '...'));
                messagesContainer.appendChild(botMessage);
            } catch (err) {
                messagesContainer.removeChild(typingIndicator);
                const errMsg = document.createElement('div');
                errMsg.className = 'chat-bubble bot-bubble';
                errMsg.textContent = "Server sedang sibuk. Silakan coba lagi nanti.";
                messagesContainer.appendChild(errMsg);
            }
        } else {
            messagesContainer.removeChild(typingIndicator);
            const botMessage = document.createElement('div');
            botMessage.className = 'chat-bubble bot-bubble';
            botMessage.innerHTML = 'Halo, ada yang bisa kami bantu?';
            messagesContainer.appendChild(botMessage);
        }

        showChatControls(name, email, whatsapp);
    });

    function showChatControls(name, email, whatsapp) {
        const controls = document.createElement('div');
        controls.className = 'chat-controls';
        controls.innerHTML = `
            <textarea class="chat-textarea" rows="1" placeholder="Tulis pesan..."></textarea>
            <button class="chat-submit">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 2L11 13"></path>
                    <path d="M22 2l-7 20-4-9-9-4 20-7z"></path>
                </svg>
            </button>
        `;
        container.querySelector('.chat-body').appendChild(controls);

        const textarea = controls.querySelector('.chat-textarea');
        const sendBtn = controls.querySelector('.chat-submit');

        function autoResize() {
            textarea.style.height = 'auto';
            textarea.style.height = (textarea.scrollHeight > 120 ? 120 : textarea.scrollHeight) + 'px';
        }
        textarea.addEventListener('input', autoResize);

        function submitMsg() {
            const msg = textarea.value.trim();
            if (!msg || isWaitingForResponse) return;
            sendMessage(msg, name, email, whatsapp);
            textarea.value = '';
            textarea.style.height = 'auto';
        }
        sendBtn.addEventListener('click', submitMsg);
        textarea.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault(); submitMsg();
            }
        });
    }

    async function sendMessage(messageText, name, email, whatsapp) {
        if (isWaitingForResponse) return;
        isWaitingForResponse = true;

        const userMsg = document.createElement('div');
        userMsg.className = 'chat-bubble user-bubble';
        userMsg.textContent = messageText;
        messagesContainer.appendChild(userMsg);

        const typingIndicator = createTypingIndicator();
        messagesContainer.appendChild(typingIndicator);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        const webhookUrl = config.webhook.url;
        const webhookRoute = config.webhook.route;

        if (webhookUrl) {
            try {
                const requestData = {
                    action: "sendMessage",
                    sessionId: conversationId,
                    route: webhookRoute,
                    chatInput: messageText,
                    metadata: {
                        userId: emailInput.value.trim(),
                        userName: nameInput.value.trim(),
                        userWhatsapp: whatsappInput.value.trim()
                    }
                };
                const response = await fetch(webhookUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(requestData)
                });
                const responseData = await response.json();
                messagesContainer.removeChild(typingIndicator);

                const botMsg = document.createElement('div');
                botMsg.className = 'chat-bubble bot-bubble';
                const responseText = Array.isArray(responseData) ? responseData[0].output : responseData.output;
                botMsg.innerHTML = parseMessage(linkifyText(responseText || '...'));
                messagesContainer.appendChild(botMsg);
            } catch (err) {
                messagesContainer.removeChild(typingIndicator);
                const botMsg = document.createElement('div');
                botMsg.className = 'chat-bubble bot-bubble';
                botMsg.textContent = "Server sedang sibuk. Silakan coba lagi nanti.";
                messagesContainer.appendChild(botMsg);
            }
        } else {
            messagesContainer.removeChild(typingIndicator);
            const botMsg = document.createElement('div');
            botMsg.className = 'chat-bubble bot-bubble';
            botMsg.textContent = 'Simulasi balasan bot (webhook belum diatur).';
            messagesContainer.appendChild(botMsg);
        }
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        isWaitingForResponse = false;
    }
})();
