// EmailJS Configuration – RSVP form
const EMAILJS_CONFIG = {
    PUBLIC_KEY: '4Y8NWjM8l-08Q0UJa',
    SERVICE_ID: 'service_b0oth0w',
    TEMPLATE_ID: 'template_ti0bz6f'
};

// Initialize EmailJS when the library is loaded
function initEmailJS() {
    if (typeof emailjs === 'undefined') {
        console.warn('EmailJS not loaded yet');
        return;
    }
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
    console.log('EmailJS initialized');
}

if (typeof emailjs !== 'undefined') {
    initEmailJS();
} else {
    window.addEventListener('load', initEmailJS);
}

// RSVP form handling
document.addEventListener('DOMContentLoaded', function () {
    const rsvpForm = document.getElementById('rsvp-form');
    const formStatus = document.getElementById('form-status');

    if (!rsvpForm) return;

    rsvpForm.addEventListener('submit', function (e) {
        e.preventDefault();

        if (typeof emailjs === 'undefined') {
            showFormStatus(formStatus, 'error', 'E-Mail-Dienst nicht geladen. Seite neu laden.');
            return;
        }

        // Reset status visibility for new submit
        if (formStatus) formStatus.style.opacity = '1';
        showFormStatus(formStatus, 'loading', 'Antwort wird gesendet...');
        rsvpForm.classList.add('form-disabled');

        const guestNamesEl = document.getElementById('guest_names');
        const attendanceRadio = rsvpForm.querySelector('input[name="attendance"]:checked');
        const notesEl = document.getElementById('notes');

        const guestNames = guestNamesEl ? guestNamesEl.value.trim() : '';
        const attendance = attendanceRadio ? attendanceRadio.value : '';
        const attendanceText = attendance === 'yes' ? 'Ja, wir kommen!' : 'Leider nicht';
        const notes = notesEl && notesEl.value ? notesEl.value.trim() : '–';
        const message = 'Zusage: ' + attendanceText + '\n\nBemerkungen / Allergien: ' + notes;

        const templateParams = {
            from_name: guestNames || 'Unbekannt',
            from_email: 'rsvp@einladung.local',
            message: message,
            to_name: 'Brautpaar',
            reply_to: ''
        };

        emailjs.send(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.TEMPLATE_ID, templateParams)
            .then(function (response) {
                console.log('EmailJS success', response.status, response.text);
                showFormStatus(formStatus, 'success', 'Vielen Dank für Deine Zusage!');
                rsvpForm.reset();
            }, function (err) {
                console.error('EmailJS error', err);
                const msg = err.text || err.message || 'Unbekannter Fehler';
                showFormStatus(formStatus, 'error', 'Fehler beim Senden. Bitte später erneut versuchen. (' + msg + ')');
            })
            .finally(function () {
                rsvpForm.classList.remove('form-disabled');
            });
    });

    function showFormStatus(el, type, message) {
        if (!el) return;
        el.textContent = message;
        el.className = 'form-status ' + type;
        if (type === 'success') {
            setTimeout(function () {
                el.style.opacity = '0';
                setTimeout(function () { el.className = 'form-status'; }, 300);
            }, 5000);
        }
    }
});

// Test from console: testEmailJS()
window.testEmailJS = function () {
    if (typeof emailjs === 'undefined') {
        console.error('EmailJS not loaded');
        return;
    }
    var params = {
        from_name: 'Test Gast',
        from_email: 'rsvp@einladung.local',
        message: 'Zusage: Ja, wir kommen!\n\nBemerkungen / Allergien: Test',
        to_name: 'Brautpaar',
        reply_to: ''
    };
    console.log('Sending test email with params:', params);
    emailjs.send(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.TEMPLATE_ID, params)
        .then(function (r) { console.log('Test OK', r.status, r.text); alert('Test-E-Mail gesendet!'); })
        .catch(function (e) { console.error('Test failed', e); alert('Test fehlgeschlagen: ' + (e.text || e.message)); });
};
