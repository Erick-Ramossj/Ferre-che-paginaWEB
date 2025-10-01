document.addEventListener('DOMContentLoaded', function() {

    // =================================================================
    // =========== DECLARACIONES DE ELEMENTOS GLOBALES ===========
    // =================================================================
    // Declaramos todas las constantes aquí arriba para que estén disponibles en todo el script.
    
    // Elementos del Menú
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    // Elementos del Chatbot
    const chatbotOverlay = document.getElementById('chatbot-overlay');
    const chatMessages = document.getElementById('chat-messages');
    const closeChatBtn = document.getElementById('close-chat-btn');
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const quickActionButtons = document.querySelectorAll('.quick-action-btn');
    const mainChatButton = document.getElementById('chat-button');
    const floatingChatButton = document.getElementById('floating-chat-button');


    // =================================================================
    // ================= LÓGICA DE LOS EVENTOS =================
    // =================================================================

    // --- Lógica para el Menú Móvil ---
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

        // CÓDIGO CORREGIDO
    function openChat() {
        if (chatbotOverlay) {
            chatbotOverlay.classList.remove('hidden');
            // Usamos .trim() para eliminar espacios invisibles antes de comprobar
            if (chatMessages.innerHTML.trim() === '') { 
                addBotInitialMessage();
            }
        }
    }
    // --- Lógica para el botón de la página de Contacto ---
    if (mainChatButton) {
        mainChatButton.addEventListener('click', openChat);
    }

    // --- Lógica para el botón Flotante (todas las páginas) ---
    if (floatingChatButton) {
        floatingChatButton.addEventListener('click', openChat);
    }

    // --- Lógica para CERRAR el chat ---
    if (closeChatBtn) {
        closeChatBtn.addEventListener('click', function() {
            if (chatbotOverlay) {
                chatbotOverlay.classList.add('hidden');
                setTimeout(() => { if(chatMessages) chatMessages.innerHTML = ''; }, 300);
            }
        });
    }
    
    if (chatbotOverlay) {
        chatbotOverlay.addEventListener('click', function(event) {
            if (event.target === chatbotOverlay) {
                chatbotOverlay.classList.add('hidden');
                setTimeout(() => { if(chatMessages) chatMessages.innerHTML = ''; }, 300);
            }
        });
    }


    // --- Lógica para ENVIAR mensajes en el chat ---
    if (chatForm) {
        chatForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const userInput = chatInput.value.trim();
            if (userInput) {
                addUserMessage(userInput);
                chatInput.value = '';
                setTimeout(() => {
                    const botResponse = getBotResponse(userInput);
                    addBotMessage(botResponse);
                }, 700);
            }
        });
    }
    
    // --- Lógica para los botones de acción rápida ---
    quickActionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const actionText = this.textContent;
            addUserMessage(actionText);
            setTimeout(() => {
                const botResponse = getBotResponse(actionText);
                addBotMessage(botResponse);
            }, 700);
        });
    });


    // =================================================================
    // =========== FUNCIONES DEL CHATBOT (Crear Mensajes, etc.) ===========
    // =================================================================
    // CÓDIGO CORREGIDO
    function addBotInitialMessage() {
        // Ya no hay 'if' aquí. La función siempre creará el mensaje cuando se la llame.
        if (!chatMessages) return; // Mantenemos esta seguridad por si el chat no existe

        const messageContainer = document.createElement('div');
      

        const botIconDiv = document.createElement('div');
        botIconDiv.className = 'bot-message-icon';

        const botIconImg = document.createElement('img');
        botIconImg.src = "/static/image/robot-icon.png";
        botIconImg.alt = "Ícono de Ferre-Bot";
        
        botIconDiv.appendChild(botIconImg);
        messageContainer.appendChild(botIconDiv);

        const messageContentDiv = document.createElement('div');
        messageContentDiv.className = 'flex flex-col gap-2';
        
        const bubble1 = document.createElement('div');
        bubble1.className = 'chat-bubble bot-message';
        bubble1.textContent = "¡Hola! Soy Ferre-Bot y seré tu asistente el día de hoy";
        messageContentDiv.appendChild(bubble1);
        
        const bubble2 = document.createElement('div');
        bubble2.className = 'chat-bubble bot-message';
        bubble2.innerHTML = `Puedo responder algunas de tus dudas sobre:
        <br>- Horarios
        <br>- Números de Contacto
        <br>- Categorías
        <br>¡Y hacer muchas cosas Mas!`;
        messageContentDiv.appendChild(bubble2);

        const bubble3 = document.createElement('div');
        bubble3.className = 'chat-bubble bot-message';
        bubble3.textContent = "¿Cómo puedo ayudarte el día de hoy?";
        messageContentDiv.appendChild(bubble3);
        
        messageContainer.appendChild(messageContentDiv);
        chatMessages.appendChild(messageContainer);
        scrollToBottom();
    }

    function addUserMessage(message) {
        if (!chatMessages) return;
        const messageContainer = document.createElement('div');
        messageContainer.className = 'message-container';
        const messageBubble = document.createElement('div');
        messageBubble.className = 'chat-bubble user-message';
        messageBubble.textContent = message;
        messageContainer.appendChild(messageBubble);
        chatMessages.appendChild(messageContainer);
        scrollToBottom();
    }

    function addBotMessage(message) {
        if (!chatMessages) return;
        const messageContainer = document.createElement('div');
        messageContainer.className = 'message-container';
        const messageBubble = document.createElement('div');
        messageBubble.className = 'chat-bubble bot-message';
        messageBubble.textContent = message;
        messageContainer.appendChild(messageBubble);
        chatMessages.appendChild(messageContainer);
        scrollToBottom();
    }

    function scrollToBottom() {
        if (chatMessages) {
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }

    function getBotResponse(userInput) {
        const input = userInput.toLowerCase();
        if (input.includes("hola") || input.includes("buenos dias")) { return "¡Hola! ¿En qué puedo ayudarte?"; }
        if (input.includes("horario")) { return "Nuestro horario es: Lunes a Viernes de 07:00 am a 7:00 pm, y Sábados de 07:00 am a 02:00 pm."; }
        if (input.includes("ubicacion")) { return "Nos encontramos en Av. Libertad 101, San Antonio - Cañete. ¡Te esperamos!"; }
        if (input.includes("telefonos")) { return "Puedes contactarnos al +51 988 184 554 o por WhatsApp al mismo número."; }
        if (input.includes("categorias")) { return "Vendemos una amplia gama de artículos de seguridad industrial. ¿Te interesa alguna categoría en particular?"; }
        if (input.includes("gracias")) { return "¡De nada! Ha sido un placer ayudarte. Si tienes otra pregunta, no dudes en consultarme."; }
        return "Disculpa, no he entendido tu pregunta. ¿Puedes reformularla o elegir una de las opciones rápidas?";
    }
});