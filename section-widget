// Otika Full Layout Chat Widget (Embed Section Version)
// Copyright Otika
(function(global) {
    function OtikaChatEmbed(options) {
        // Default options
        const settings = {
            width: '100%',
            height: '600px',
            borderRadius: '24px',
            parent: document.body, // Bisa diganti ke element apa saja
            branding: {
                logo: '',
                name: 'Otika Chat',
                welcomeText: 'Selamat datang! Silakan tanya apa saja.',
                responseTimeText: 'Biasanya membalas dalam beberapa menit',
                poweredBy: { text: 'Powered by Otika', link: 'https://otika.biz.id' }
            },
            webhook: { url: '', route: '' },
            style: {
                primaryColor: '#10b981',
                secondaryColor: '#059669',
                backgroundColor: '#ffffff',
                fontColor: '#1f2937'
            },
            suggestedQuestions: [],
            ...options
        };

        // --- STYLE ---
        const style = document.createElement('style');
        style.textContent = `
        .otika-chat-embed {
            --chat-color-primary: ${settings.style.primaryColor};
            --chat-color-secondary: ${settings.style.secondaryColor};
            --chat-color-light: #d1fae5;
            --chat-color-surface: ${settings.style.backgroundColor};
            --chat-color-text: ${settings.style.fontColor};
            --chat-color-text-light: #6b7280;
            --chat-color-border: #e5e7eb;
            --chat-shadow-md: 0 4px 6px rgba(16,185,129,0.15);
            --chat-radius-lg: ${settings.borderRadius};
            font-family: 'Poppins', sans-serif;
        }
        .otika-chat-embed {
            width: ${settings.width};
            height: ${settings.height};
            border-radius: var(--chat-radius-lg);
            background: var(--chat-color-surface);
            box-shadow: var(--chat-shadow-md);
            display: flex;
            flex-direction: column;
            overflow: hidden;
            border: 1px solid var(--chat-color-light);
        }
        .otika-chat-embed .chat-header {
            padding: 20px;
            display: flex;
            align-items: center;
            gap: 14px;
            background: linear-gradient(135deg, var(--chat-color-primary) 0%, var(--chat-color-secondary) 100%);
            color: white;
        }
        .otika-chat-embed .chat-header-logo {
            width: 40px; height: 40px; border-radius: 12px; background: #fff; object-fit: contain; padding: 5px;
        }
        .otika-chat-embed .chat-header-title {
            font-size: 18px; font-weight: 700; color: white;
        }
        .otika-chat-embed .chat-body {
            flex: 1; display: flex; flex-direction: column; min-height: 0;
        }
        .otika-chat-embed .chat-messages {
            flex: 1; overflow-y: auto; padding: 24px; background: #f9fafb;
            display: flex; flex-direction: column; gap: 18px;
        }
        .otika-chat-embed .chat-bubble {
            padding: 16px 22px; border-radius: 16px;
            max-width: 80%; font-size: 15px; line-height: 1.7;
            position: relative; white-space: pre-line; word-break: break-word;
        }
        .otika-chat-embed .chat-bubble.user-bubble {
            background: linear-gradient(135deg, var(--chat-color-primary) 0%, var(--chat-color-secondary) 100%);
            color: white; align-self: flex-end; border-bottom-right-radius: 8px;
        }
        .otika-chat-embed .chat-bubble.bot-bubble {
            background: white; color: var(--chat-color-text); align-self: flex-start;
            border-bottom-left-radius: 8px; border: 1px solid var(--chat-color-light);
        }
        .otika-chat-embed .chat-controls {
            display: flex; gap: 10px; padding: 18px; background: var(--chat-color-surface); border-top: 1px solid var(--chat-color-light);
        }
        .otika-chat-embed .chat-textarea {
            flex: 1; padding: 14px 16px; border: 1px solid var(--chat-color-light);
            border-radius: 10px; background: var(--chat-color-surface);
            color: var(--chat-color-text); font-size: 15px; resize: none;
            font-family: inherit; min-height: 48px; max-height: 120px;
        }
        .otika-chat-embed .chat-textarea:focus {
            outline: none; border-color: var(--chat-color-primary);
            box-shadow: 0 0 0 3px rgba(16,185,129,0.13);
        }
        .otika-chat-embed .chat-submit {
            background: linear-gradient(135deg, var(--chat-color-primary) 0%, var(--chat-color-secondary) 100%);
            color: white; border: none; border-radius: 10px; width: 48px; height: 48px;
            cursor: pointer; display: flex; align-items: center; justify-content: center;
        }
        .otika-chat-embed .chat-submit svg { width: 22px; height: 22px; }
        .otika-chat-embed .chat-footer {
            padding: 10px; text-align: center; background: var(--chat-color-surface);
            border-top: 1px solid var(--chat-color-light);
        }
        .otika-chat-embed .chat-footer-link {
            color: var(--chat-color-primary); text-decoration: none; font-size: 13px;
            opacity: 0.9; transition: 0.2s;
        }
        .otika-chat-embed .chat-footer-link:hover { opacity: 1; }
        .otika-chat-embed .registration-form {
            display: flex; flex-direction: column; gap: 14px;
            max-width: 360px; margin: 32px auto 0 auto;
        }
        .otika-chat-embed .form-field {
            display: flex; flex-direction: column; gap: 5px;
        }
        .otika-chat-embed .form-label {
            font-size: 14px; font-weight: 500; color: var(--chat-color-text);
        }
        .otika-chat-embed .form-input {
            padding: 12px 14px; border: 1px solid var(--chat-color-border);
            border-radius: 10px; font-family: inherit; font-size: 15px;
        }
        .otika-chat-embed .form-input:focus {
            outline: none; border-color: var(--chat-color-primary);
            box-shadow: 0 0 0 3px rgba(16,185,129,0.13);
        }
        .otika-chat-embed .form-input.error { border-color: #ef4444; }
        .otika-chat-embed .error-text { font-size: 13px; color: #ef4444; }
        .otika-chat-embed .submit-registration {
            padding: 14px 20px; background: linear-gradient(135deg, var(--chat-color-primary) 0%, var(--chat-color-secondary) 100%);
            color: white; border: none; border-radius: 10px; cursor: pointer;
            font-size: 16px; font-weight: 600; font-family: inherit;
        }
        .otika-chat-embed .chat-welcome-title {
            margin-top: 30px; font-size: 23px; font-weight: 700; color: var(--chat-color-text);
            text-align: center; margin-bottom: 20px;
        }
        .otika-chat-embed .chat-response-time {
            font-size: 15px; color: var(--chat-color-text-light); margin: 0; text-align: center;
        }
        .otika-chat-embed .suggested-questions {
            display: flex; flex-wrap: wrap; gap: 7px; margin: 18px 0; justify-content: flex-start;
        }
        .otika-chat-embed .suggested-question-btn {
            background: #f3f4f6; border: 1px solid var(--chat-color-light);
            border-radius: 10px; padding: 8px 16px; font-size: 14px;
            color: var(--chat-color-text); cursor: pointer; transition: 0.2s;
        }
        .otika-chat-embed .suggested-question-btn:hover {
            background: var(--chat-color-light); border-color: var(--chat-color-primary);
        }
        @media (max-width: 600px) {
            .otika-chat-embed { width: 100% !important; height: 100vh !important; border-radius: 0 !important; }
        }
        `;
        document.head.appendChild(style);

        // --- DOM ---
        const widget = document.createElement('div');
        widget.className = 'otika-chat-embed';

        widget.innerHTML = `
            <div class="chat-header">
                <img class="chat-header-logo" src="${settings.branding.logo}" alt="${settings.branding.name}">
                <span class="chat-header-title">${settings.branding.name}</span>
            </div>
            <div class="chat-body">
                <div class="chat-messages"></div>
                <form class="registration-form" autocomplete="off">
                    <div class="chat-welcome-title">${settings.branding.welcomeText}</div>
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
                    <p class="chat-response-time">${settings.branding.responseTimeText}</p>
                </form>
            </div>
            <div class="chat-footer">
                <a class="chat-footer-link" href="${settings.branding.poweredBy.link}" target="_blank">${settings.branding.poweredBy.text}</a>
            </div>
        `;

        // Insert to DOM
        if (typeof settings.parent === 'string') {
            (document.querySelector(settings.parent) || document.body).appendChild(widget);
        } else {
            (settings.parent || document.body).appendChild(widget);
        }

        // --- DOM refs ---
        const messagesContainer = widget.querySelector('.chat-messages');
        const registrationForm = widget.querySelector('.registration-form');
        const nameInput = widget.querySelector('#chat-user-name');
        const emailInput = widget.querySelector('#chat-user-email');
        const whatsappInput = widget.querySelector('#chat-user-whatsapp');
        const nameError = widget.querySelector('#name-error');
        const emailError = widget.querySelector('#email-error');
        const whatsappError = widget.querySelector('#whatsapp-error');

        // --- State ---
        let conversationId = '';
        let isWaitingForResponse = false;

        // --- Helpers ---
        function createSessionId() {
            return crypto.randomUUID ? crypto.randomUUID() : (Date.now() + Math.random()).toString(36);
        }
        function createTypingIndicator() {
            const div = document.createElement('div');
            div.className = 'chat-bubble bot-bubble';
            div.innerHTML = `<span style="opacity:0.7;">Bot sedang mengetik...</span>`;
            return div;
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

        // --- Registration form submit ---
        registrationForm.addEventListener('submit', async function(event) {
            event.preventDefault();

            // Reset errors
            nameError.textContent = '';
            emailError.textContent = '';
            whatsappError.textContent = '';
            nameInput.classList.remove('error');
            emailInput.classList.remove('error');
            whatsappInput.classList.remove('error');

            // Get values
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

            // Hide registration form, show chat interface
            registrationForm.style.display = 'none';

            // Show typing indicator
            const typingIndicator = createTypingIndicator();
            messagesContainer.appendChild(typingIndicator);

            conversationId = createSessionId();

            // Kirim data user ke webhook (jika ada)
            if (settings.webhook.url) {
                try {
                    // Bisa tambahkan sessionData jika ingin
                    const userInfoMessage = `Name: ${name}\nEmail: ${email}\nWhatsApp: ${whatsapp}`;
                    const userInfoData = {
                        action: "sendMessage",
                        sessionId: conversationId,
                        route: settings.webhook.route,
                        chatInput: userInfoMessage,
                        metadata: {
                            userId: email,
                            userName: name,
                            userWhatsapp: whatsapp,
                            isUserInfo: true
                        }
                    };
                    const userInfoResponse = await fetch(settings.webhook.url, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(userInfoData)
                    });
                    const userInfoResponseData = await userInfoResponse.json();
                    messagesContainer.removeChild(typingIndicator);

                    // Tampilkan balasan bot
                    const botMessage = document.createElement('div');
                    botMessage.className = 'chat-bubble bot-bubble';
                    const messageText = Array.isArray(userInfoResponseData) ? userInfoResponseData[0].output : userInfoResponseData.output;
                    botMessage.innerHTML = linkifyText(messageText || 'Halo, ada yang bisa kami bantu?');
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

            // Suggested questions
            if (settings.suggestedQuestions && settings.suggestedQuestions.length > 0) {
                const suggestions = document.createElement('div');
                suggestions.className = 'suggested-questions';
                settings.suggestedQuestions.forEach(text => {
                    const button = document.createElement('button');
                    button.className = 'suggested-question-btn';
                    button.textContent = text;
                    button.onclick = function() {
                        sendMessage(text);
                        suggestions.remove();
                    };
                    suggestions.appendChild(button);
                });
                messagesContainer.appendChild(suggestions);
            }

            // Tampilkan chat controls/input
            showChatControls(name, email, whatsapp);
        });

        // --- Chat controls/input ---
        function showChatControls(name, email, whatsapp) {
            // Buat controls
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
            widget.querySelector('.chat-body').appendChild(controls);

            const textarea = controls.querySelector('.chat-textarea');
            const sendBtn = controls.querySelector('.chat-submit');

            function autoResize() {
                textarea.style.height = 'auto';
                textarea.style.height = (textarea.scrollHeight > 120 ? 120 : textarea.scrollHeight) + 'px';
            }
            textarea.addEventListener('input', autoResize);

            // Kirim pesan
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

        // --- Send message ---
        async function sendMessage(messageText, name, email, whatsapp) {
            if (isWaitingForResponse) return;
            isWaitingForResponse = true;

            // User bubble
            const userMsg = document.createElement('div');
            userMsg.className = 'chat-bubble user-bubble';
            userMsg.textContent = messageText;
            messagesContainer.appendChild(userMsg);

            // Typing indicator
            const typingIndicator = createTypingIndicator();
            messagesContainer.appendChild(typingIndicator);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;

            // Kirim ke webhook jika ada
            if (settings.webhook.url) {
                try {
                    const requestData = {
                        action: "sendMessage",
                        sessionId: conversationId,
                        route: settings.webhook.route,
                        chatInput: messageText,
                        metadata: {
                            userId: emailInput.value.trim(),
                            userName: nameInput.value.trim(),
                            userWhatsapp: whatsappInput.value.trim()
                        }
                    };
                    const response = await fetch(settings.webhook.url, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(requestData)
                    });
                    const responseData = await response.json();
                    messagesContainer.removeChild(typingIndicator);

                    const botMsg = document.createElement('div');
                    botMsg.className = 'chat-bubble bot-bubble';
                    const responseText = Array.isArray(responseData) ? responseData[0].output : responseData.output;
                    botMsg.innerHTML = linkifyText(responseText || 'Terima kasih, pesan Anda sudah kami terima.');
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
    }

    // Export ke global
    global.OtikaChatEmbed = OtikaChatEmbed;
})(window);
