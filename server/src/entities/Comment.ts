import { Exclude, Expose } from "class-transformer";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from "typeorm";
import BaseEntity from "./Entitiy";
import Post from "./Post";
import { User } from "./User";
import Vote from "./Vote";

@Entity("comments")
export default class Comment extends BaseEntity {
  @Index()
  @Column()
  identifier?: string;

  @Column()
  body?: string;

  @Column()
  username?: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "username", referencedColumnName: "username" })
  user?: User;

  @Column({ nullable: true })
  postId?: number;

  @ManyToOne(() => Post, (post) => post.comments, { nullable: false })
  post?: Post;

  @Exclude()
  @OneToMany(() => Vote, (vote) => vote.comment)
  votes?: Vote[];

  protected userVote?: number;

  setUserVote(user: User) {
    const index = this.votes?.findIndex(
      (v) => v.username === user.username
    ) as number;
    this.userVote = index > -1 ? this.votes[index].value : 0;
  }

  @Expose() get voteScore(): number | undefined {
    const initialValue = 0;
    return this.votes?.reduce(
      (prev, currentObj) => prev + (currentObj.value || 0),
      initialValue
    );
  }
}
