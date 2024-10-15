export class CodeResponse {
  public code!: string;
  public email!: string;

  constructor(code: string, email: string) {
    this.code = code;
    this.email = email;
  }
}
