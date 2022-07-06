/* eslint-disable */
import {BeforeInsert, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    name?: string;

    @Column({ unique:true })
    email: string;

    @Column()
    password: string;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    registered_at?: Date;

    @BeforeInsert()
    emailToLowercase(){
        this.email = this.email.toLowerCase();
    }
}