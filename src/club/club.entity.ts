import { SocioEntity } from '../socio/socio.entity';
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

    @ManyToMany(() => SocioEntity, socio => socio.clubs)
    socios: SocioEntity[];

}
