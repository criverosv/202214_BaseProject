import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberEntity } from './member.entity';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';

@Module({
  imports: [TypeOrmModule.forFeature([MemberEntity])],
  providers: [MemberService],
  controllers: [MemberController],
})
export class MemberModule { }
