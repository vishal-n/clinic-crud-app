import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Clinic {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    doctor: string;

    @Column()
    patient: string;

    @Column()
    appointment: string;
}
