import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class CryptoPair {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    baseCurrency: string;

    @Column({ nullable: false })
    quoteCurrency: string;

    @Column({ default: true })
    isActive: boolean;

    @Column()
    updateInterval: number;
}
