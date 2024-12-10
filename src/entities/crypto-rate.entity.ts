import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { CryptoPair } from './crypto-pair.entity';

@Entity()
export class CryptoRate {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => CryptoPair)
    @JoinColumn({ name: 'pairId' })
    pair: CryptoPair;

    @Column('decimal', { precision: 15, scale: 8 })
    rate: number;

    @Column()
    timestamp: Date;
}
