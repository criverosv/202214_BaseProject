import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { MemberDto } from '../member/member.dto';
import { MemberEntity } from '../member/member.entity';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { MemberClubService } from './member-club.service';

@Controller('clubs')
@UseInterceptors(BusinessErrorsInterceptor)
export class MemberClubController {

    constructor(private readonly memberClubService: MemberClubService) { }

    @Post(':clubId/members/:memberId')
    async addMemberToClub(@Param('clubId') clubId: string, @Param('memberId') memberId: string) {
        return await this.memberClubService.addMemberToClub(clubId, memberId);
    }

    @Get(':clubId/members')
    async findMembersFromClub(@Param('clubId') clubId: string) {
        return await this.memberClubService.findMembersFromClub(clubId);
    }

    @Get(':clubId/members/memberId')
    async findMemberFromClub(@Param('clubId') clubId: string, @Param('memberId') memberId: string) {
        return await this.memberClubService.findMemberFromClub(clubId, memberId);
    }

    @Put(':clubId/members')
    async updateMembersFromClub(@Body() membersDto: MemberDto[], @Param('clubId') clubId: string) {
        const members = plainToInstance(MemberEntity, membersDto);
        return await this.memberClubService.updateMembersFromClub(clubId, members);
    }

    @Delete(':clubId/members/:memberId')
    @HttpCode(204)
    async deleteMemberFromClub(@Param('clubId') clubId: string, @Param('memberId') memberId: string) {
        return await this.memberClubService.deleteMemberFromClub(clubId, memberId);
    }
}
