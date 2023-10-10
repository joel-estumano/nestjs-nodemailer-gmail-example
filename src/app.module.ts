import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getEnvPath } from './common/helpers/env.helper';
import { ConfigModule, ConfigService } from '@nestjs/config';
import mailerConfig from './common/configs/mailer.config';
import { MailerModule } from '@nestjs-modules/mailer';
import { MessengerModule } from './modules/messenger/messenger.module';

const envFilePath: string = getEnvPath(`${__dirname}/common/envs/`);

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: envFilePath,
      isGlobal: true,
      load: [mailerConfig],
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          service: 'gmail',
          auth: {
            user: configService.get<string>('mailerConfig.user'),
            pass: configService.get<string>('mailerConfig.pass'),
          },
        },
        defaults: {},
      }),
      inject: [ConfigService],
    }),
    MessengerModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
