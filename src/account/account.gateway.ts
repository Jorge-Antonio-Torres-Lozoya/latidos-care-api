import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { QrDataInterface } from './dtos/qrData.interface';

@WebSocketGateway({
  cors: {
    origin: [
      'http://localhost:4200',
      'https://latidoscare.com',
      'https://latidoscare.com/',
      'https://www.latidoscare.com/',
      'https://www.latidoscare.com',
      'https://latidos-care-app-production.up.railway.app',
      'https://latidos-care-app-production.up.railway.app/',
    ],
  },
})
export class MessageGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('sendChatDataFrontend')
  async handleNewMessage(
    client: Socket,
    @MessageBody() qrData: QrDataInterface,
  ): Promise<void> {
    this.server.emit('sendChatDataBackend', qrData);
  }
}
