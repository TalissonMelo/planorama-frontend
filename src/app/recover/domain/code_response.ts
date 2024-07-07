export class CodeResponse {
  public isValid!: boolean;
  public invalidCodeCause!: InvalidCodeCause;
  public newCode!: string;
  public email!: string;
}

enum InvalidCodeCause {
  IS_VALID,
  EXPIRATED,
  WRONG_CODE,
  ALREADY_USED,
  WRONG_TYPE,
}
