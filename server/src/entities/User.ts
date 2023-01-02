import { IsEmail, Length, ValidationTypes } from "class-validator";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  OneToMany,
  BeforeInsert,
} from "typeorm";
import BaseEntity from "./Entitiy";
import bcrypt from "bcryptjs";
import Post from "./Post";
import Vote from "./Vote";

@Entity("user")
export class User extends BaseEntity {
  @Index()
  @IsEmail(undefined, { message: "이메일 주소 wrong" })
  @Length(1, 255, { message: "이메일 비울 수 없다" })
  @Column({ unique: true })
  email?: string;

  @Index()
  @Length(3, 32, { message: "사용자 이름 3자이상" })
  @Column({ unique: true })
  username?: string;

  @Column()
  @Length(6, 255, { message: "비밀번호는 6자리 이상" })
  password?: string;

  @OneToMany(() => Post, (post) => post.user)
  posts?: Post[];

  @OneToMany(() => Vote, (vote) => vote.user)
  votes?: Vote[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 6);
  }
}
