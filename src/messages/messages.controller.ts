import { Body, Controller, Param, Post } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessageDto } from './messages.dto';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post('/:userId')
  async sendMessage(
    @Param('userId') userId: number,
    @Body() params: MessageDto,
  ) {
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
