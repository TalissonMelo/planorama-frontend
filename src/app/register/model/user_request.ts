export class UserRequest {
  public email!: string;
  public nickname!: string;
  public phone!: string;
  public password!: string;

  constructor(
    email: string,
    nickname: string,
    phone: string,
    password: string
  ) {
    this.email = email;
    this.nickname = nickname;
    this.phone = phone;
    this.password = password;
  }
}
