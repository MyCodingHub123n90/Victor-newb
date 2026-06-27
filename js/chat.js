// Live Chat JavaScript

// Chat State
let messageCount = 0;
let isBotTyping = false;
const botResponses = {
    'html': 'HTML is the backbone of web pages! 🎨 Start with: <br><code>&lt;!DOCTYPE html&gt;<br>&lt;html&gt;<br>&lt;head&gt;&lt;title&gt;My Page&lt;/title&gt;&lt;/head&gt;<br>&lt;body&gt;&lt;h1&gt;Hello World!&lt;/h1&gt;&lt;/body&gt;<br>&lt;/html&gt;</code><br><br>Want me to explain this in detail?',
    'css': 'CSS makes your website beautiful! 💅 Try this: <br><code>body {<br>  background: #0a0a0a;<br>  color: #00ff88;<br>  font-family: Arial;<br>}</code><br><br>Want to learn more about styling?',
    'javascript': 'JavaScript adds interactivity! ⚡ Example: <br><code>function greet(name) {<br>  return `Hello ${name}!`;<br>}<br>console.log(greet("VictorNewb"));</code><br><br>Ready to dive deeper into JS?',
    'python': 'Python is perfect for beginners! 🐍 Example: <br><code>def hello_world():<br>    print("Hello, VictorNewb!")<br><br>hello_world()</code><br><br>Want to learn Python basics?',
    'help': 'I\'m here to help! 🤗 You can ask me about:<br>• HTML & CSS fundamentals<br>• JavaScript programming<br>• Python basics<br>• Debugging your code<br>• Best coding practices<br><br>Just type what you want to learn!',
    'default': 'Great question! 🤔 Let me help you with that. <br><br>💡 Tip: Try asking about HTML, CSS, JavaScript, or Python. <br><br>I can also help you debug code or explain concepts! What specific topic interests you?'
};

// Send Message
function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (message === '' || isBotTyping) return;
    
    // Add user message
    addMessage(message, 'sent');
    input.value = '';
    messageCount++;
    
    // Show typing indicator
    showTyping();
    
    // Get bot response
    setTimeout(() => {
        hideTyping();
        const response = getBotResponse(message);
        addMessage(response, 'received');
    }, 1000 + Math.random() * 1000);
}

// Add Message to Chat
function addMessage(content, type) {
    const messagesContainer = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    
    const bubble = document.createElement('div');
    bubble.className = 'message-bubble';
    
    const time = new Date();
    const timeString = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    if (type === 'received') {
        bubble.innerHTML = `
            <strong>VictorNewb Bot</strong>
            <p>${content}</p>
            <span class="message-time">${timeString}</span>
        `;
    } else {
        bubble.innerHTML = `
            <strong>You</strong>
            <p>${escapeHtml(content)}</p>
            <span class="message-time">${timeString}</span>
        `;
    }
    
    messageDiv.appendChild(bubble);
    messagesContainer.appendChild(messageDiv);
    scrollToBottom();
}

// Get Bot Response
function getBotResponse(message) {
    const lowerMsg = message.toLowerCase();
    
    // Check for keywords
    if (lowerMsg.includes('html')) {
        return botResponses.html;
    } else if (lowerMsg.includes('css')) {
        return botResponses.css;
    } else if (lowerMsg.includes('javascript') || lowerMsg.includes('js')) {
        return botResponses.javascript;
    } else if (lowerMsg.includes('python')) {
        return botResponses.python;
    } else if (lowerMsg.includes('help') || lowerMsg.includes('hi') || lowerMsg.includes('hello')) {
        return botResponses.help;
    } else if (lowerMsg.includes('thank')) {
        return 'You\'re welcome! 🙌 Happy coding! If you need anything else, just ask. 🚀';
    } else if (lowerMsg.includes('error') || lowerMsg.includes('bug') || lowerMsg.includes('problem')) {
        return 'Don\'t worry! 🛠️ Most errors are easy to fix. Can you tell me:<br><br>1. What error message you\'re seeing?<br>2. What code you\'re trying to run?<br><br>I\'ll help you debug it!';
    } else {
        return botResponses.default;
    }
}

// Quick Reply Handler
function sendQuickReply(text) {
    document.getElementById('chatInput').value = text;
    sendMessage();
}

// Show Typing Indicator
function showTyping() {
    isBotTyping = true;
    const messagesContainer = document.getElementById('chatMessages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'typing-indicator';
    typingDiv.id = 'typingIndicator';
    typingDiv.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;
    messagesContainer.appendChild(typingDiv);
    scrollToBottom();
}

// Hide Typing Indicator
function hideTyping() {
    isBotTyping = false;
    const typing = document.getElementById('typingIndicator');
    if (typing) {
        typing.remove();
    }
}

// Handle Enter Key
function handleKeyPress(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
}

// Scroll to Bottom
function scrollToBottom() {
    const messagesContainer = document.getElementById('chatMessages');
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Minimize Chat (Demo)
function minimizeChat() {
    const container = document.querySelector('.chat-container');
    if (container.style.height === '50px') {
        container.style.height = '600px';
        container.style.overflow = 'visible';
    } else {
        container.style.height = '50px';
        container.style.overflow = 'hidden';
    }
}

// Close Chat (Demo)
function closeChat() {
    if (confirm('Are you sure you want to leave the chat?')) {
        window.location.href = 'index.html';
    }
}

// Auto scroll on load
window.addEventListener('load', () => {
    scrollToBottom();
});

// Handle window resize
window.addEventListener('resize', () => {
    scrollToBottom();
});

console.log('💬 VictorNewb Live Chat Loaded! Ready to help you code.');