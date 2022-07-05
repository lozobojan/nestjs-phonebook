import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

/* eslint-disable */
@Entity()
export class Contact {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column()
    email: string;

    @Column()
    phone_number: string;
}
