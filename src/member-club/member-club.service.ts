import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MemberEntity } from '../member/member.entity';
import { ClubEntity } from '../club/club.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class MemberClubService {

    constructor(
        @InjectRepository(MemberEntity)
        private readonly memberRepository: Repository<MemberEntity>,

        @InjectRepository(ClubEntity)
        private readonly clubRepository: Repository<ClubEntity>
    ) { }

    async addMemberToClub(
        clubId: string,
        memberId: string
    ): Promise<ClubEntity> {
        const member: MemberEntity = await this.memberRepository.findOne({ where: { id: memberId }, relations: ["clubs"] });
        if (!member)
            throw new BusinessLogicException("The member with the given id was not found", BusinessError.NOT_FOUND);

        const club: ClubEntity = await this.clubRepository.findOne({ where: { id: clubId }, relations: ["members"] })
        if (!club)
            throw new BusinessLogicException("The club with the given id was not found", BusinessError.NOT_FOUND);

        club.members = [...club.members, member];
        return await this.clubRepository.save(club);
    }

    async findMembersFromClub(clubId: string): Promise<MemberEntity[]> {
        const club: ClubEntity = await this.clubRepository.findOne({ where: { id: clubId }, relations: ["members"] });
        if (!club)
            throw new BusinessLogicException("The club with the given id was not found", BusinessError.NOT_FOUND)

        return club.members;
    }

    async findMemberFromClub(
        clubId: string,
        memberId: string
    ): Promise<MemberEntity> {
        const club: ClubEntity = await this.clubRepository.findOne({ where: { id: clubId }, relations: ["members"] });
        if (!club)
            throw new BusinessLogicException("The club with the given id was not found", BusinessError.NOT_FOUND)

        const member: MemberEntity = await this.memberRepository.findOne({ where: { id: memberId }, relations: ["clubs"] })
        if (!member)
            throw new BusinessLogicException("The member with the given id was not found", BusinessError.NOT_FOUND);

        const memberFromClub: MemberEntity = club.members.find(item => item.id === member.id);

        if (!memberFromClub)
            throw new BusinessLogicException("Member with the given id is not associated to the club", BusinessError.PRECONDITION_FAILED)

        return memberFromClub;
    }

    async updateMembersFromClub(
        clubId: string,
        members: MemberEntity[]
    ): Promise<ClubEntity> {
        const club: ClubEntity = await this.clubRepository.findOne({ where: { id: clubId }, relations: ["members"] });
        if (!club)
            throw new BusinessLogicException("The club with the given id was not found", BusinessError.NOT_FOUND)

        for (let i = 0; i < members.length; i++) {
            const member: MemberEntity = await this.memberRepository.findOne({ where: { id: members[i].id } });
            if (!member)
                throw new BusinessLogicException("The member with the given id was not found", BusinessError.NOT_FOUND)
        }

        club.members = members;
        return await this.clubRepository.save(club);
    }

    async deleteMemberFromClub(
        clubId: string,
        memberId: string
    ) {
        const club: ClubEntity = await this.clubRepository.findOne({ where: { id: clubId }, relations: ["members"] });
        if (!club)
            throw new BusinessLogicException("The club with the given id was not found", BusinessError.NOT_FOUND)

        const member: MemberEntity = await this.memberRepository.findOne({ where: { id: memberId }, relations: ["clubs"] })
        if (!member)
            throw new BusinessLogicException("The member with the given id was not found", BusinessError.NOT_FOUND);

        const memberFromClub: MemberEntity = club.members.find(item => item.id === member.id);
        if (!memberFromClub)
            throw new BusinessLogicException("The member with the given id is not associated to the club", BusinessError.PRECONDITION_FAILED)

        club.members = club.members.filter(item => item.id !== memberId);
        await this.clubRepository.save(club);
    }

}
