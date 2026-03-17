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

function inferGuestCountFromNames(value) {
    if (!value) return 0;
    const normalized = value
        .replace(/\s+und\s+/gi, ',')
        .replace(/\s*&\s*/g, ',')
        .replace(/\s*\+\s*/g, ',');
    const parts = normalized
        .split(',')
        .map((part) => part.trim())
        .filter(Boolean);
    return parts.length;
}

function getGuestCount(guestNames) {
    const typedCount = inferGuestCountFromNames(guestNames);
    if (typedCount > 0) return typedCount;

    const paramString = window.location.search || (window.location.hash ? window.location.hash.replace(/^#/, '') : '');
    if (!paramString.trim()) return 0;
    const params = new URLSearchParams(paramString.replace(/^#?\??/, ''));
    let count = 0;
    for (const key of params.keys()) {
        if (/^[MF].+$/i.test(key)) count++;
    }
    return count;
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
        const accommodationEl = document.getElementById('accommodation');
        const breakfastEl = document.getElementById('breakfast');
        const notesEl = document.getElementById('notes');

        const guestNames = guestNamesEl ? guestNamesEl.value.trim() : '';
        const attendance = attendanceRadio ? attendanceRadio.value : '';
        const guestCount = getGuestCount(guestNames);
        const isSingle = guestCount <= 1;
        const attendanceText = attendance === 'yes'
            ? (isSingle ? 'Ja, ich komme!' : 'Ja, wir kommen!')
            : 'Leider nicht';
        const accommodationLine = accommodationEl && accommodationEl.checked
            ? (isSingle ? 'Ja, ich brauche eine Übernachtung.' : 'Ja, wir brauchen eine Übernachtung.')
            : 'Nein';
        const breakfastLine = breakfastEl && breakfastEl.checked
            ? (isSingle ? 'Ja, ich komme zum Frühstück.' : 'Ja, wir kommen zum Frühstück.')
            : 'Nein';
        const notes = notesEl && notesEl.value ? notesEl.value.trim() : '–';
        const message = 'Zusage: ' + attendanceText + '\n\nÜbernachtung: ' + accommodationLine + '\n\nFrühstück: ' + breakfastLine + '\n\nBemerkungen / Allergien: ' + notes;

        const thankYouMsg = attendance === 'yes'
            ? (isSingle ? 'Vielen Dank fuer Deine Zusage!' : 'Vielen Dank fuer Eure Zusage!')
            : (isSingle ? 'Vielen Dank fuer Deine Rueckmeldung!' : 'Vielen Dank fuer Eure Rueckmeldung!');
        const telegramInviteUrl = 'https://t.me/+MpLJqd_ZhSM2MmMy';
        const thankYouHtml = attendance === 'yes'
            ? thankYouMsg + '<br><a href="' + telegramInviteUrl + '" target="_blank" rel="noopener noreferrer">Telegram-Gruppe beitreten</a>'
            : thankYouMsg;

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
                showFormStatus(formStatus, 'success', thankYouHtml);
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
        if (type === 'success') {
            el.innerHTML = message;
        } else {
            el.textContent = message;
        }
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
