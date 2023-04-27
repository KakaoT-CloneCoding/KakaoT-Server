import { UseInterceptors } from '@nestjs/common';
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { User } from '@prisma/client';
import { Server, Socket } from 'socket.io';
import { SocketInterceptor } from 'src/auth/socket.interceptor';

type SocketArgs = {
  id: number;
  driver: User;
}
@WebSocketGateway(81, { namespace: 'chat', transports: ['websocket'] })
@UseInterceptors(SocketInterceptor)
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer()
  public readonly server: Server

  // constructor() {
  //   this.server.use((socket, next) => {

  //   });
  // }

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
  handleMessage(@ConnectedSocket() client: Socket, @MessageBody() message): string {
    return message;
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


/*

import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayInit,
  OnGatewayDisconnect,
  WebSocketServer,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(81, { namespace: 'dm' })
export class DmGateway
  implements OnGatewayConnection, OnGatewayInit, OnGatewayDisconnect
{
  handleConnection(@ConnectedSocket() socket: Socket, ...args: any[]) {
    console.log(`socket nsp is ${socket.nsp.name} socket.id : ${socket.id}`);
  }

  @WebSocketServer() public server: Server;

  @SubscribeMessage('sendToServer')
  handleMessage(@ConnectedSocket() socket: Socket, @MessageBody() data) {
    const { roomId, message, user } = data;
    // socket.emit('message', `${input}`);
    this.server.to(roomId).emit('message', { message, user });
  }

  @SubscribeMessage('join')
  joinRoom(@ConnectedSocket() socket: Socket, @MessageBody() data) {
    socket.join(data.roomId);
  }

  @SubscribeMessage('login')
  login(@ConnectedSocket() socket: Socket) {
    socket.join('test');
    console.log(socket.id);
  }

  afterInit(server: any) {
    console.log('after init');
  }
  handleDisconnect(@ConnectedSocket() socket: Socket) {
    console.log(`disconnected socket ${socket.nsp.name} ${socket.id}`);
  }
}



*/