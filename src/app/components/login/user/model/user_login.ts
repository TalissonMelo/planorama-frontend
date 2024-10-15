export class UserLogin {
  public id!: string;
  public email!: string;
  public nickname!: string;
  public accessToken!: string;
  public refreshToken!: string;

  constructor(
    id: string,
    email: string,
    nickname: string,
    accessToken: string,
    refreshToken: string
  ) {
    this.id = id;
    this.email = email;
    this.nickname = nickname;
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }
}
