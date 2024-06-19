import { Body, Controller, Param, Post } from '@nestjs/common';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post('/:userId')
  async sendMessage(@Param('userId') userId: number, @Body() params: any) {
    try {
      const result = await this.messagesService.sendMessage(+userId, params);

      if (!result) {
        return { msg: 'An error occurred!' };
      }

      return { msg: 'Message was sent.' };
    } catch (error) {
      console.error(error);
    }
  }
}
