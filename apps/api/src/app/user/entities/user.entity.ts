import { Column, PrimaryGeneratedColumn } from "typeorm";

import { Entity } from "typeorm";

@Entity({ name: 'users'})
export class User {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;
    
    @Column({ unique: true })
    email: string;

    @Column()
    address: string;
}

