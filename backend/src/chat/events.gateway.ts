import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private activeUsers: Map<string, Socket> = new Map();

  handleConnection(client: Socket) {
    console.log(`Cliente conectado: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Cliente desconectado: ${client.id}`);
    this.activeUsers.delete(this.getUserIdBySocketId(client.id));
  }

  private getUserIdBySocketId(socketId: string): string {
    return Array.from(this.activeUsers.entries()).find(([, socket]) => socket.id === socketId)?.[0];
  }

  @SubscribeMessage('login')
  handleLogin(client: Socket, userId: string) {
    // Armazena o ID do usuário e o socket associado
    this.activeUsers.set(userId, client);
    console.log(`Usuário logado: ${userId}`);
  }

  @SubscribeMessage('privateMessage')
  handlePrivateMessage(client: Socket, data: { recipientId: string; message: string }) {
    const senderId = this.getUserIdBySocketId(client.id);
    const recipientSocket = this.activeUsers.get(data.recipientId);

    if (recipientSocket) {
      recipientSocket.emit('privateMessage', { senderId, message: data.message });
    } else {
      client.emit('errorMessage', 'Usuário não encontrado ou offline.');
    }
  }
}
