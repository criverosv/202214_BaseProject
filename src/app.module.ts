import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MemberEntity } from './member/member.entity';
import { ClubEntity } from './club/club.entity';
import { ClubModule } from './club/club.module';
import { MemberModule } from './member/member.module';


@Module({
  imports: [
    ClubModule,
    MemberModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'club',
      entities: [MemberEntity, ClubEntity],
      dropSchema: true,
      synchronize: true,
      keepConnectionAlive: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
