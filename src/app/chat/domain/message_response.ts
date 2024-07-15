export class MessageResponse {
  content!: string;
  user!: boolean;

  constructor(content: string, user: boolean) {
    this.user = user;
    this.content = content;
  }
}
