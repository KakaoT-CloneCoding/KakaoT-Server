import { UseInterceptors } from '@nestjs/common';
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { User } from '@prisma/client';
import { Server, Socket } from 'socket.io';

type SocketArgs = {
  id: number;
  driver: User;
}
@WebSocketGateway(81, { namespace: 'chat', transports: ['websocket'] })
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer()
  public readonly server: Server


  afterInit(@ConnectedSocket() socket) {
    console.log("init..");
  }

  handleConnection(@ConnectedSocket() client: Socket, ...args: any[]) {
    console.log("socket connected" + client);
    console.log(args);
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    console.log("disconnected : ", client);
  }
  @SubscribeMessage('message')
  handleMessage(@ConnectedSocket() client: Socket, @MessageBody() message) {
    
  }


  @SubscribeMessage("accept")
  acceptRequest(@ConnectedSocket() socket, data: SocketArgs) {
    const { roomId } = socket;
    const message = "accpeted";
    const { driver } = data;
    const res = {
      roomId, message, driver
    }
    this.server.of(roomId).emit(res.toString());
  }
}

