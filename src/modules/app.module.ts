import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ShareModule } from './share/share.module';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env`],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          uri: `mongodb+srv://quangtung:123456789xx@cluster0.4g4vh.mongodb.net/social_app?retryWrites=true&w=majority`,
        }
      }
    }),

    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '../../', 'client/build'),
    // }),
    AuthModule,
    UserModule,
    ShareModule,
  ],
})
export class AppModule { }
