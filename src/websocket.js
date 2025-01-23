export const createWebSocketConnection = (roomId, user, onMessageReceived, onOpen, onClose) => {
    const socket = new WebSocket(`ws://localhost:8000/ws/chat/${roomId}/`);
  
    socket.onopen = () => {
      console.log('WebSocket connected');
      onOpen();
    };
  
    socket.onclose = () => {
      console.log('WebSocket disconnected');
      onClose();
    };
  
    socket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.type === 'chat_message') {
        onMessageReceived(data);
      } else if (data.type === 'user_join' || data.type === 'user_leave') {
        console.log(`${data.username} ${data.type}`);
      }
    };
  
    return socket;
  };
  
  export const sendMessage = (socket, message) => {
    const msgData = {
      message: message,
    };
  
    socket.send(JSON.stringify(msgData));
  };
  