import { Body, Controller, Param, Post } from '@nestjs/common';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post('/:userId')
  async sendMessage(@Param('userId') userId: number, @Body() params: any) {
    try {
      return await this.messagesService.sendMessage(+userId, params);
    } catch (error) {
      console.error(error);
    }
  }
}
