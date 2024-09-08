// Loading Spinner
window.addEventListener('load', () => {
    document.getElementById('loading-spinner').style.display = 'none';
});

// Scroll Progress Bar
window.onscroll = function () {
    let scroll = document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - window.innerHeight;
    let scrolled = (scroll / height) * 100;
    document.getElementById('progress-bar').style.width = scrolled + "%";
};

// Dark Mode Toggle
const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;

// Check if dark mode was previously enabled
if (localStorage.getItem('dark-mode') === 'enabled') {
    body.classList.add('dark-mode');
}

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');

    // Save dark mode preference
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('dark-mode', 'enabled');
    } else {
        localStorage.setItem('dark-mode', 'disabled');
    }
});


// Back-to-Top Button
const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.style.display = 'block';
    } else {
        backToTopButton.style.display = 'none';
    }
});

backToTopButton.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Newsletter Form Submission Handling
const newsletterForm = document.getElementById('newsletter-form');
newsletterForm.addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Thank you for subscribing!');
    this.reset();
});

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.scroll-reveal');

const revealOnScroll = () => {
    revealElements.forEach((el) => {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;
        const revealPoint = 150;

        if (elementTop < windowHeight - revealPoint) {
            el.classList.add('visible');
        } else {
            el.classList.remove('visible');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);

// Show Notification Banner on Page Load
window.addEventListener('load', () => {
    const banner = document.querySelector('.notification-banner');
    setTimeout(() => {
        banner.classList.add('show');
    }, 1000);
});

// Close Notification Banner
document.querySelector('.close-banner').addEventListener('click', () => {
    document.querySelector('.notification-banner').classList.remove('show');
});
// Chatbot Functionality

// Open and close chatbot
document.getElementById('open-chatbot').addEventListener('click', function () {
    document.getElementById('chatbot').style.display = 'flex';
    this.style.display = 'none';
});

document.getElementById('close-chatbot').addEventListener('click', function () {
    document.getElementById('chatbot').style.display = 'none';
    document.getElementById('open-chatbot').style.display = 'block';
});

// Send message function
document.getElementById('send-message').addEventListener('click', sendMessage);
document.getElementById('chatbot-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const input = document.getElementById('chatbot-input');
    const message = input.value.trim();

    if (message) {
        appendMessage(message, 'user-message');
        input.value = '';

        // Generate bot response
        setTimeout(() => {
            appendMessage(generateBotResponse(message), 'bot-message');
        }, 500);
    }
}

function appendMessage(message, className) {
    const messageElement = document.createElement('div');
    messageElement.className = `message ${className}`;
    messageElement.textContent = message;
    document.getElementById('chatbot-messages').appendChild(messageElement);
    document.getElementById('chatbot-messages').scrollTop = document.getElementById('chatbot-messages').scrollHeight;
}

// Basic bot response logic
function generateBotResponse(userMessage) {
    // Basic responses for demo purposes
    const responses = {
        "hello": "Hi there! How can I help you?",
        "hi": "Hello! What can I do for you?",
        "help": "I'm here to assist you. What do you need help with?",
        "default": "I'm not sure how to respond to that. Please ask something else."
    };

    const userMessageLower = userMessage.toLowerCase();
    return responses[userMessageLower] || responses["default"];
}

// Chatbot Interaction
const sendBtn = document.getElementById('send-btn');
const userInput = document.getElementById('user-input');
const messages = document.getElementById('messages');

sendBtn.addEventListener('click', () => {
    const message = userInput.value;
    if (message) {
        addMessage('You', message);
        getAIResponse(message);
        userInput.value = '';
    }
});

function addMessage(sender, text) {
    const messageElement = document.createElement('div');
    messageElement.textContent = `${sender}: ${text}`;
    messages.appendChild(messageElement);
}

function getAIResponse(message) {
    fetch('/chatbot', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
    })
    .then(response => response.json())
    .then(data => {
        addMessage('AI Assistant', data.reply);
    })
    .catch(error => {
        addMessage('Error', 'Failed to get response');
    });
}
