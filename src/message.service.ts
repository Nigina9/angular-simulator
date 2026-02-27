import { Injectable } from '@angular/core';
import { IMessage } from './interfaces/IMessage';
import { Message } from './enums/Message';

@Injectable()
export class MessageService {

  private messages: IMessage[] = [];

  getMessage(): IMessage[] {
    return this.messages;
  }

  addMessage(type: Message, text: string): void {
    const newMessage: IMessage = { type, text }
    this.messages = [newMessage, ...this.messages];
    setTimeout(() => this.closeMessage(newMessage), 5000);
  }

  closeMessage(message: IMessage): void {
    this.messages = this.messages.filter((currentMessage: IMessage) => currentMessage !== message);
  }
}
