import { MemberEntity } from '../member/member.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ClubEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    city: string;

    @Column()
    address: string;

    @ManyToMany(() => MemberEntity, member => member.clubs)
    members: MemberEntity[];

}
