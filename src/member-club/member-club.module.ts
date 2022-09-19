import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberEntity } from '../member/member.entity';
import { MemberClubService } from './member-club.service';
import { MemberClubController } from './member-club.controller';
import { ClubEntity } from '../club/club.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MemberEntity, ClubEntity])],
  providers: [MemberClubService],
  controllers: [MemberClubController],
})
export class MemberClubModule { }
