/* Public website -> CRM lead intake. Only the Supabase publishable key belongs here. */
(function () {
  const config = window.SATORQ_CRM_CONNECTION || {};
  const valid = window.supabase && config.url && config.key;
  const client = valid ? window.supabase.createClient(config.url, config.key) : null;
  const show = (status, text, success = false) => {
    status.textContent = text;
    status.classList.toggle('success', success);
  };

  window.satorqSubmitPublicInquiry = async function ({ form, status, kind, name, contact, email = '', details, message, website = '' }) {
    if (!form.reportValidity()) {
      show(status, 'Please complete the required fields before continuing.');
      return;
    }

    // Open WhatsApp in the click gesture so browsers do not block the backup route.
    const whatsapp = window.open('https://wa.me/201118261116?text=' + encodeURIComponent(message), '_blank', 'noopener');
    show(status, 'Sending your request to SA.TORQ…');

    if (!client) {
      show(status, whatsapp
        ? 'The WhatsApp draft is open. CRM saving is not configured yet; please send the WhatsApp message.'
        : 'CRM saving is not configured yet. Please try again or contact SA.TORQ on WhatsApp.');
      return;
    }

    let error = null;
    try {
      ({ error } = await client.from('satorq_public_inquiries').insert({
        kind,
        customer_name: name,
        contact,
        email: email || null,
        details,
        website,
        consent: true
      }));
    } catch (requestError) {
      error = requestError;
    }

    if (error) {
      console.error('SA.TORQ inquiry could not be saved:', error.message);
      show(status, whatsapp
        ? 'The WhatsApp draft is open, but the CRM could not save your request. Please send the WhatsApp message.'
        : 'The CRM could not save your request. Please try again or contact SA.TORQ on WhatsApp.');
      return;
    }

    show(status, 'Your request was saved for the SA.TORQ team. Review and send the WhatsApp draft to continue.', true);
  };
})();
