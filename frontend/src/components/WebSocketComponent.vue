<template>
  <div>
    <h1>WebSocket Component</h1>
    <div v-if="chatMessages.length === 0">Carregando...</div>
    <div v-else>
      <div v-for="(message, index) in chatMessages" :key="index">
        <strong>{{ message.senderId }}:</strong> {{ message.message }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chatMessages: [],
    };
  },
  created() {
    const socket = new WebSocket('ws://localhost:3000');

    socket.onopen = () => {
      console.log('Conexão estabelecida com o servidor WebSocket.');
    };

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      this.chatMessages.push(message);
    };

    socket.onerror = (error) => {
      console.error('Erro na conexão com o servidor WebSocket:', error);
    };
  },
};
</script>
