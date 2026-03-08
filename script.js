// URL-Parameter: ?Mpeter&FHanna oder #Mpeter&FHanna
// GitHub Pages leitet z. B. /weddsite auf /weddsite/ weiter – dabei geht ?... verloren. Links mit # funktionieren.
function parseGuestsFromParamString(paramString) {
    if (!paramString || !paramString.trim()) return [];
    const guests = [];
    const params = new URLSearchParams(paramString.replace(/^#?\??/, ''));
    for (const key of params.keys()) {
        const match = key.match(/^[MF](.+)$/i);
        if (match) {
            const gender = key[0].toUpperCase();
            const name = match[1].trim().replace(/^\w/, (c) => c.toUpperCase());
            if (name) guests.push({ gender, name });
        }
    }
    return guests;
}

function applyUrlParams() {
    let guests = parseGuestsFromParamString(window.location.search);
    if (guests.length === 0) guests = parseGuestsFromParamString(window.location.hash);
    if (guests.length === 0) return;

    // Bei mindestens einem F: F zuerst, dann F; bei nur F: Reihenfolge der URL
    guests.sort((a, b) => (a.gender === 'F' && b.gender === 'M' ? -1 : a.gender === 'M' && b.gender === 'F' ? 1 : 0));

    const greetingEl = document.getElementById('greeting');
    const introEl = document.getElementById('invitation-intro');
    const namesInput = document.getElementById('guest_names');
    if (greetingEl) {
        const parts = guests.map((g) => (g.gender === 'M' ? 'Lieber' : 'Liebe') + ' ' + g.name);
        greetingEl.textContent = parts.join(', ') + ',';
    }
    if (introEl) {
        introEl.textContent = guests.length === 1
            ? 'wir laden dich herzlich ein, unseren besonderen Tag mit uns zu feiern.'
            : 'wir laden euch herzlich ein, unseren besonderen Tag mit uns zu feiern.';
    }
    if (namesInput) {
        namesInput.value = guests.map((g) => g.name).join(' und ');
    }
}

// Prüft, ob der Passwort-Screen per URL-Parameter übersprungen werden soll (z. B. ?hannalukas oder #hannalukas oder ?lukashanna oder #lukashanna)
function hasBypassParam() {
    const fromSearch = new URLSearchParams(window.location.search).has('hannalukas') ;
    const fromHash = window.location.hash && new URLSearchParams(window.location.hash.replace(/^#/, '')).has('hannalukas');
    return fromSearch || fromHash;
}

// Password Lock (structure from weddsite)
document.addEventListener('DOMContentLoaded', function () {
    applyUrlParams();

    const passwordOverlay = document.getElementById('password-overlay');
    const passwordForm = document.getElementById('password-form');
    const passwordInput = document.getElementById('password-input');
    const correctPassword = 'johanna';

    if (sessionStorage.getItem('websiteUnlocked') === 'true' || hasBypassParam()) {
        if (hasBypassParam()) sessionStorage.setItem('websiteUnlocked', 'true');
        passwordOverlay.classList.add('unlocked');
        initEnvelope();
        if (typeof initMusicPlayer === 'function' && !musicPlayer) {
            initMusicPlayer();
            setTimeout(() => {
                if (musicPlayer && musicPlayer.startMusic) musicPlayer.startMusic();
            }, 1000);
        } else if (typeof musicPlayer !== 'undefined' && musicPlayer && musicPlayer.startMusic) {
            setTimeout(() => musicPlayer.startMusic(), 500);
        }
        return;
    }

    passwordForm.addEventListener('submit', function (e) {
        e.preventDefault();
        let enteredPassword = passwordInput.value.toLowerCase().trim();
        if (enteredPassword === 'hanna') {
            enteredPassword = 'johanna';
        }
        if (enteredPassword === correctPassword) {
            sessionStorage.setItem('websiteUnlocked', 'true');
            passwordForm.classList.add('password-success');
            const button = passwordForm.querySelector('.password-button');
            const originalText = button.textContent;
            button.textContent = 'Zugang gewährt!';
            button.style.background = 'linear-gradient(45deg, #4ecdc4, #45b7d1)';

            setTimeout(() => {
                passwordOverlay.classList.add('unlocked');
                initEnvelope();
                if (typeof initMusicPlayer === 'function' && !musicPlayer) {
                    initMusicPlayer();
                    setTimeout(() => {
                        if (musicPlayer && musicPlayer.startMusic) musicPlayer.startMusic();
                    }, 1000);
                } else if (musicPlayer && musicPlayer.startMusic) {
                    setTimeout(() => musicPlayer.startMusic(), 500);
                }
                setTimeout(() => {
                    button.textContent = originalText;
                    button.style.background = '';
                    passwordForm.classList.remove('password-success');
                }, 1000);
            }, 1500);
        } else {
            passwordInput.classList.add('password-error');
            passwordInput.value = '';
            passwordInput.placeholder = 'Falsches Passwort – versuche es erneut';
            setTimeout(() => {
                passwordInput.classList.remove('password-error');
                passwordInput.placeholder = 'Passwort eingeben';
            }, 500);
        }
    });

    passwordInput.focus();
    passwordInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') passwordForm.dispatchEvent(new Event('submit'));
    });
});

// Envelope / scroll animation (from new/index.html)
function openInvitation() {
    const seal = document.getElementById('sealBtn');
    const closedEnv = document.getElementById('envelopeClosed');
    const openEnv = document.getElementById('envelopeOpen');
    const wrapper = document.getElementById('envelopeWrapper');
    const scroll = document.getElementById('scrollWrapper');

    if (!seal || !wrapper || !scroll) return;

    seal.style.opacity = '0';
    seal.style.pointerEvents = 'none';
    closedEnv.style.opacity = '0';
    openEnv.style.opacity = '1';

    setTimeout(() => {
        wrapper.classList.add('hidden');
        scroll.classList.add('visible');
    }, 600);
    /* Layout erst nach Ende der Umschlag-Animation umschalten, sonst clippt der Umschlag */
    setTimeout(() => {
        document.body.classList.add('letter-open');
        /* Auf Smartphone landet die Seite sonst in der Mitte – explizit von oben starten */
        requestAnimationFrame(() => {
            window.scrollTo(0, 0);
            requestAnimationFrame(() => window.scrollTo(0, 0));
        });
    }, 600 + 1100);
}

function initEnvelope() {
    const sealBtn = document.getElementById('sealBtn');
    if (sealBtn) sealBtn.addEventListener('click', openInvitation);
}

window.openInvitation = openInvitation;
