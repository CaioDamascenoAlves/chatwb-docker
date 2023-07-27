<script setup>
import {io} from 'socket.io-client'
import { onBeforeMount, ref } from 'vue';

const socket = io('http://localhost:3001');

const messages = ref([]);

onBeforeMount(() => {
  socket.emit('findAllMessages', {}, (response) => {
    messages.value = response;
  })
});
</script>

<template>
  <div class="chat">
    <div class="chat-container">
      <div class="messages-conteiner">
        <div v-for="message in messages">
          [{{ message.name }}] : {{ message.text }}

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
