// EmailJS Configuration
// Replace these values with your actual EmailJS configuration
const EMAILJS_CONFIG = {
    PUBLIC_KEY: '4Y8NWjM8l-08Q0UJa', // Replace with your EmailJS public key
    SERVICE_ID: 'service_b0oth0w', // Replace with your Gmail service ID
    TEMPLATE_ID: 'template_ti0bz6f' // Replace with your email template ID
};

// Initialize EmailJS
(function() {
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
})();

// Contact form handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            showFormStatus('loading', 'Nachricht wird gesendet...');
            contactForm.classList.add('form-disabled');
            
            // Get form elements
            const nameField = document.getElementById('user_name');
            const emailField = document.getElementById('user_email');
            const messageField = document.getElementById('user_message');
            
            // Prepare template parameters
            const templateParams = {
                from_name: nameField ? nameField.value : '',
                from_email: emailField ? emailField.value : '',
                message: messageField ? messageField.value : '',
                to_name: 'Hanna & Lukas',
                reply_to: emailField ? emailField.value : ''
            };
            
            // Send email using EmailJS
            emailjs.send(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.TEMPLATE_ID, templateParams)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    showFormStatus('success', 'Nachricht erfolgreich gesendet! 🎉');
                    contactForm.reset();
                }, function(error) {
                    console.log('FAILED...', error);
                    showFormStatus('error', 'Fehler beim Senden der Nachricht. Bitte versuchen Sie es erneut.');
                })
                .finally(function() {
                    contactForm.classList.remove('form-disabled');
                });
        });
    }
    
    function showFormStatus(type, message) {
        formStatus.textContent = message;
        formStatus.className = `form-status ${type}`;
        
        // Auto-hide success messages after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                formStatus.style.opacity = '0';
                setTimeout(() => {
                    formStatus.className = 'form-status';
                }, 300);
            }, 5000);
        }
    }
});

// Helper function to update configuration (call this after setting up EmailJS)
function updateEmailJSConfig(publicKey, serviceId, templateId) {
    EMAILJS_CONFIG.PUBLIC_KEY = publicKey;
    EMAILJS_CONFIG.SERVICE_ID = serviceId;
    EMAILJS_CONFIG.TEMPLATE_ID = templateId;
    
    // Re-initialize EmailJS with new config
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
}

// Test function to verify EmailJS setup
function testEmailJS() {
    console.log('Testing EmailJS configuration...');
    console.log('Public Key:', EMAILJS_CONFIG.PUBLIC_KEY);
    console.log('Service ID:', EMAILJS_CONFIG.SERVICE_ID);
    console.log('Template ID:', EMAILJS_CONFIG.TEMPLATE_ID);
    
    const testParams = {
        from_name: 'Test User',
        from_email: 'test@example.com',
        message: 'This is a test message from the Festival-Hochzeit website.',
        to_name: 'Hanna & Lukas',
        reply_to: 'test@example.com'
    };
    
    emailjs.send(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.TEMPLATE_ID, testParams)
        .then(function(response) {
            console.log('TEST SUCCESS!', response.status, response.text);
            alert('EmailJS test successful! Check your Gmail inbox.');
        }, function(error) {
            console.log('TEST FAILED...', error);
            console.log('Error details:', error.text);
            alert('EmailJS test failed. Check console for details.');
        });
} 