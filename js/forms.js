(function(){
  // Initialize EmailJS (client-side sending)
  function initEmailJS(pubKey){
    if (window.emailjs && pubKey) {
      window.emailjs.init(pubKey);
    }
  }

  function validate(form){
    let ok = true;
    const setErr = (id, msg) => {
      const el = form.querySelector(`[data-for="${id}"]`);
      if (el) el.textContent = msg || '';
    };
    // Clear previous
    form.querySelectorAll('.error').forEach(e => e.textContent='');

    const required = form.querySelectorAll('[required]');
    required.forEach(input => {
      if (!input.value.trim()) {
        ok = false;
        const id = input.id;
        setErr(id, 'This field is required.');
      }
    });

    const email = form.querySelector('input[type="email"]');
    if (email && email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      ok = false;
      setErr(email.id, 'Enter a valid email.');
    }
    return ok;
  }

  function getRecaptchaToken(siteKey, action){
    return new Promise((resolve, reject) => {
      if (!window.grecaptcha || !siteKey) return resolve('');
      window.grecaptcha.ready(function() {
        try {
          window.grecaptcha.execute(siteKey, {action}).then(resolve).catch(() => resolve(''));
        } catch(e){ resolve(''); }
      });
    });
  }

  function bindForm(formId, statusId, actionName){
    const form = document.getElementById(formId);
    if (!form) return;
    const status = document.getElementById(statusId);
    const siteKey = form.getAttribute('data-recaptcha-site-key') || '';
    const emailPub = form.getAttribute('data-emailjs-public-key') || '';
    const serviceId = form.getAttribute('data-emailjs-service-id') || '';
    const templateId = form.getAttribute('data-emailjs-template-id') || '';

    initEmailJS(emailPub);

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!validate(form)) return;

      if (status) status.textContent = 'Submitting...';

      const token = await getRecaptchaToken(siteKey, actionName);
      const data = Object.fromEntries(new FormData(form));
      data['g-recaptcha-response'] = token;

      try {
        if (!window.emailjs || !serviceId || !templateId) {
          if (status) status.textContent = 'Form not configured (EmailJS missing).';
          return;
        }
        const res = await window.emailjs.send(serviceId, templateId, data);
        if (res.status === 200) {
          if (status) status.textContent = 'Thank you! We will get back to you shortly.';
          form.reset();
        } else {
          if (status) status.textContent = 'Submission failed. Please try again.';
        }
      } catch (err) {
        if (status) status.textContent = 'Submission failed. Please try again.';
        console.log('[v0] form submit error:', err);
      }
    });
  }

  bindForm('contactForm', 'contactStatus', 'contact');
  bindForm('quoteForm', 'quoteStatus', 'quote');
})();