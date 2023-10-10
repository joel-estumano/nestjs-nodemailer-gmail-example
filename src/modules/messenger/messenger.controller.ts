import { Body, Controller, Post } from '@nestjs/common';
import { MessengerService } from './messenger.service';
import { EmailDto } from './dtos/email.dto';

@Controller('messenger')
export class MessengerController {
    constructor(private mailingService: MessengerService) { }

    @Post('send-email')
    async sendEmail(@Body() dto: EmailDto) {
        return await this.mailingService.sendEmail(dto);
    }
}
