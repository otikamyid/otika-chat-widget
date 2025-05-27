
(function () {
  const widgetConfig = window.ChatWidgetConfig || {};
  const branding = widgetConfig.branding || {};
  const style = widgetConfig.style || {};

  function createWidget() {
    const widget = document.createElement('div');
    widget.id = 'chat-widget';
    widget.style.position = 'fixed';
    widget.style[style.position || 'right'] = '20px';
    widget.style.bottom = '20px';
    widget.style.background = style.backgroundColor || '#fff';
    widget.style.color = style.fontColor || '#000';
    widget.style.padding = '1em';
    widget.style.border = '1px solid #ccc';
    widget.style.borderRadius = '8px';
    widget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
    widget.style.zIndex = 10000;

    widget.innerHTML = `
      <div style="font-weight: bold; color: ${style.primaryColor || '#10b981'}">
        ${branding.name || 'Otika'}
      </div>
      <div style="margin: 0.5em 0;">${branding.welcomeText || 'Get instant answers to your questions!'}</div>
      <input type="tel" id="user-whatsapp" placeholder="Masukkan No WhatsApp" style="width: 100%; padding: 0.5em; margin-bottom: 0.5em;" pattern="\d{10,15}" required/>
      <button id="start-chat" style="background: ${style.primaryColor || '#10b981'}; color: #fff; border: none; padding: 0.5em 1em; cursor: pointer;">
        ${branding.startButtonText || 'Mulai Percakapan'}
      </button>
      <div style="margin-top: 0.5em; font-size: 0.8em;">
        Powered by <a href="https://otika.biz.id" target="_blank" style="color: ${style.secondaryColor || '#059669'};">Otika</a>
      </div>
    `;

    document.body.appendChild(widget);

    document.getElementById('start-chat').addEventListener('click', function () {
      const wa = document.getElementById('user-whatsapp').value;
      if (!/^\d{10,15}$/.test(wa)) {
        alert('Mohon masukkan nomor WhatsApp yang valid (10-15 digit)');
        return;
      }
      alert('Lanjutkan chat dengan: ' + wa); // Simulasi
    });
  }

  if (document.readyState === 'complete') {
    createWidget();
  } else {
    window.addEventListener('load', createWidget);
  }
})();
