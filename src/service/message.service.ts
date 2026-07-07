import { Injectable } from '@angular/core';
import { IMessage } from '../interfaces/IMessage';
import { Message } from '../enums/Message';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private messageSubject: BehaviorSubject<IMessage[]> = new BehaviorSubject<IMessage[]>([]);
  messages$: Observable<IMessage[]> = this.messageSubject.asObservable();

  private addMessage(type: Message, text: string): void {
    const newMessage: IMessage = { type, text };
    const currentMessages: IMessage[] = this.messageSubject.getValue();
    const messages: IMessage[] = [newMessage, ...currentMessages];
    this.messageSubject.next(messages);
    setTimeout(() => this.closeMessage(newMessage), 5000);
  }

  showWarn(text: string): void {
    this.addMessage(Message.WARN, text);
  }

  showError(text: string): void {
    this.addMessage(Message.ERROR, text);
  }

  showSuccess(text: string): void {
    this.addMessage(Message.SUCCESS, text);
  }

  showInfo(text: string): void {
    this.addMessage(Message.INFO, text);
  }

  closeMessage(message: IMessage): void {
    const currentMessages: IMessage[] = this.messageSubject.getValue();
    const updatedMessages: IMessage[] = currentMessages.filter((m: IMessage) => m !== message);
    this.messageSubject.next(updatedMessages);
  }

}
