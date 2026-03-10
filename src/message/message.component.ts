import { Component } from '@angular/core';
import { MessageService } from '../message.service';
import { Message } from '../enums/Message';
import { inject } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { IMessage } from '../interfaces/IMessage';

@Component({
  selector: 'app-message',
  imports: [NgTemplateOutlet],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
})
export class MessageComponent {

  messageService: MessageService = inject(MessageService);
  messageEnum: typeof Message = Message;

  closeMessage(message: IMessage): void {
    this.messageService.closeMessage(message);
  }

}
