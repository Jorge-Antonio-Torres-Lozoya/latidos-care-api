import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
//import { Twilio } from 'twilio';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.use(helmet());
  app.enableCors({
    origin: [
      'http://localhost:4200',
      'https://latidoscare.com',
      'https://latidoscare.com/',
      'https://www.latidoscare.com/',
      'https://www.latidoscare.com',
    ],
    credentials: true,
  });
  await app.listen(5000, () => {
    console.log('Listening on port:5000');
  });
}
bootstrap();

/*const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_ACCOUNT_TOKEN;
export const client = new Twilio(accountSid, authToken);*/

process.on('uncaughtException', function (err) {
  console.error('Caught exception: ', err);
});
process.on('unhandledRejection', (error) => {
  console.error('unhandledRejection', error);
});
