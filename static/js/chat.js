// chat.js - Script mejorado para el chatbot de FERRE-CHE

document.addEventListener('DOMContentLoaded', function() {
  const openChatBtn = document.getElementById('openChat');
  const closeChatBtn = document.getElementById('closeChat');
  const chatWindow = document.getElementById('chatWindow');
  const chatBody = document.getElementById('chatBody');
  const chatInput = document.getElementById('chatInput');
  const sendBtn = document.getElementById('sendBtn');
  
  // Abrir chat con animación
  openChatBtn.addEventListener('click', function() {
    chatWindow.classList.remove('hidden');
    setTimeout(() => {
      chatWindow.classList.remove('scale-95', 'opacity-0');
      chatWindow.classList.add('scale-100', 'opacity-100');
    }, 10);
  });
  
  // Cerrar chat con animación
  closeChatBtn.addEventListener('click', function() {
    chatWindow.classList.remove('scale-100', 'opacity-100');
    chatWindow.classList.add('scale-95', 'opacity-0');
    setTimeout(() => {
      chatWindow.classList.add('hidden');
    }, 300);
  });
  
  // Enviar mensaje
  function sendMessage() {
    const message = chatInput.value.trim();
    if (message === '') return;
    
    // Agregar mensaje del usuario
    addMessage(message, 'user');
    chatInput.value = '';
    
    // Mostrar indicador de escritura
    addMessage('', 'typing');
    
    // Simular respuesta del asistente después de un breve retraso
    setTimeout(() => {
      // Eliminar el indicador de escritura
      const typingIndicator = document.querySelector('.chat-message:last-child');
      if (typingIndicator) {
        typingIndicator.remove();
      }
      
      const botResponse = getBotResponse(message);
      addMessage(botResponse, 'bot');
    }, 1500);
  }
  
  // Enviar mensaje al hacer clic en el botón
  sendBtn.addEventListener('click', sendMessage);
  
  // Enviar mensaje al presionar Enter
  chatInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });
  
  // Agregar mensaje al chat
  function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('chat-message');
    
    if (sender === 'user') {
      messageDiv.classList.add('flex', 'justify-end');
      messageDiv.innerHTML = `
        <div class="bg-yellow-500 text-black p-3 rounded-lg text-sm max-w-xs text-left shadow-sm">
          <div class="font-semibold text-gray-800 mb-1">Tú:</div>
          ${text}
        </div>
      `;
    } else if (sender === 'typing') {
      messageDiv.classList.add('flex', 'justify-start');
      messageDiv.innerHTML = `
        <div class="bg-gray-100 p-3 rounded-lg text-sm max-w-xs text-left shadow-sm">
          <div class="font-semibold text-yellow-600 mb-1">RoboAsistente:</div>
          <div class="flex space-x-1">
            <div class="chat-typing"></div>
            <div class="chat-typing"></div>
            <div class="chat-typing"></div>
          </div>
        </div>
      `;
    } else {
      messageDiv.classList.add('flex', 'justify-start');
      messageDiv.innerHTML = `
        <div class="bg-gray-100 p-3 rounded-lg text-sm max-w-xs text-left shadow-sm">
          <div class="font-semibold text-yellow-600 mb-1">RoboAsistente:</div>
          ${text}
        </div>
      `;
    }
    
    chatBody.appendChild(messageDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
  }
  
  // Generar respuesta del bot
  function getBotResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('hola') || lowerMessage.includes('buenos días') || lowerMessage.includes('buenas tardes')) {
      return '¡Hola! ¿En qué puedo ayudarte hoy? Puedo asistirte con información sobre herramientas, materiales eléctricos, productos de seguridad industrial y más.';
    } else if (lowerMessage.includes('herramienta')) {
      return 'Tenemos una amplia variedad de herramientas manuales y eléctricas. ¿Estás buscando algo específico como martillos, taladros o sierras?';
    } else if (lowerMessage.includes('eléctrico') || lowerMessage.includes('cable')) {
      return 'Contamos con materiales eléctricos de calidad: cables, interruptores, tomacorrientes, luminarias y más. ¿Qué necesitas específicamente?';
    } else if (lowerMessage.includes('seguridad') || lowerMessage.includes('protección')) {
      return 'Ofrecemos equipos de seguridad industrial: cascos, guantes, gafas, chalecos reflectantes y calzado de seguridad. ¿Qué tipo de protección buscas?';
    } else if (lowerMessage.includes('precio') || lowerMessage.includes('coste') || lowerMessage.includes('costo')) {
      return 'Los precios varían según el producto y la marca. Te recomiendo visitar nuestra sección de catálogo o contactarnos directamente para obtener información actualizada de precios.';
    } else if (lowerMessage.includes('horario') || lowerMessage.includes('abierto')) {
      return 'Nuestro horario de atención es de lunes a sábado de 8:00 am a 6:00 pm. Los domingos atendemos de 9:00 am a 2:00 pm.';
    } else if (lowerMessage.includes('ubicación') || lowerMessage.includes('dirección') || lowerMessage.includes('dónde están')) {
      return 'Estamos ubicados en Av. Principal #123 - Lima. ¡Te esperamos!';
    } else if (lowerMessage.includes('contacto') || lowerMessage.includes('teléfono') || lowerMessage.includes('llamar')) {
      return 'Puedes contactarnos al +51 987 654 321 o escribirnos a ferreche@empresa.com. También puedes visitarnos en nuestra tienda física.';
    } else if (lowerMessage.includes('gracias') || lowerMessage.includes('agradecido')) {
      return '¡De nada! Estoy aquí para ayudarte. No dudes en preguntarme si necesitas más información. ¡Que tengas un excelente día!';
    } else {
      return 'Gracias por tu mensaje. Como asistente virtual de FERRE-CHE, puedo ayudarte con información sobre productos, horarios, ubicación y más. ¿En qué más puedo asistirte?';
    }
  }
});