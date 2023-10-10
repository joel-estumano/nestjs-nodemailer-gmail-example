import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EmailDto } from './dtos/email.dto';

@Injectable()
export class MessengerService {
    constructor(
        private readonly mailerService: MailerService,
        private configService: ConfigService,
    ) { }

    async sendEmail(dto: EmailDto): Promise<any> {
        return new Promise(async (resolve, reject) => {
            await this.mailerService
                .sendMail({
                    to: dto.email,
                    from: `NestJs <${this.configService.get<string>(
                        'mailerConfig.user',
                    )}>`,
                    subject: 'Este é um exemplo nestjs de envio de email com nodemailer',
                    html: `<h1>Olá!</h1>
                    <p>Muito obrigado pela sua participação!</p>
                    `,
                })
                .then((resp) => {
                    resolve(resp);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
}
