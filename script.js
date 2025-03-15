document.addEventListener('DOMContentLoaded', function() {
    const chatMessages = document.getElementById('chatMessages');
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');

    // Function to add a message to the chat
    function addMessage(message, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.classList.add(isUser ? 'user' : 'bot');

        const messageContent = document.createElement('div');
        messageContent.classList.add('message-content');

        const messageParagraph = document.createElement('p');
        messageParagraph.textContent = message;

        messageContent.appendChild(messageParagraph);
        messageDiv.appendChild(messageContent);
        chatMessages.appendChild(messageDiv);
        
        // Scroll to the bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Function to send a message to the backend
    async function sendMessage(message) {
        try {
            const response = await fetch('/ask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message }),
            });

            const data = await response.json();
            return data.response;
        } catch (error) {
            console.error('Error:', error);
            return 'Sorry, I encountered an error processing your request.';
        }
    }

    // Function to handle the user sending a message
    async function handleSendMessage() {
        const message = userInput.value.trim();
        if (!message) return;

        // Add user message to chat
        addMessage(message, true);
        
        // Clear input field
        userInput.value = '';
        
        // Show typing indicator
        const typingDiv = document.createElement('div');
        typingDiv.classList.add('message', 'bot', 'typing');
        typingDiv.innerHTML = '<div class="message-content"><p>Greenie is thinking...</p></div>';
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Get response from backend
        const response = await sendMessage(message);
        
        // Remove typing indicator
        chatMessages.removeChild(typingDiv);
        
        // Add bot response to chat
        addMessage(response);
    }

    // Event listeners
    sendButton.addEventListener('click', handleSendMessage);

    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    });

    // Add a small easter egg for fun
    let leafClicks = 0;
    document.querySelector('.logo i').addEventListener('click', function() {
        leafClicks++;
        if (leafClicks >= 5) {
            addMessage("🌱 You found an easter egg! Plant a real tree today and make the world greener!");
            leafClicks = 0;
        }
    });
});