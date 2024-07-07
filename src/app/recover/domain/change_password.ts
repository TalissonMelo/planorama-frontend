export class ChangePassword {
  public code!: string;
  public email!: string;
  public newPassword!: string;

  constructor(code: string, email: string, newPassword: string) {
    this.code = code;
    this.email = email;
    this.newPassword = newPassword;
  }
}
