export class UserUpdateRequest {
  public nickname!: string;
  public phone!: string;

  constructor(nickname: string, phone: string) {
    this.nickname = nickname;
    this.phone = phone;
  }
}
