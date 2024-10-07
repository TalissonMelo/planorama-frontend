export class Member {
  public id!: string;
  public phone!: string;
  public email!: string;
  public type!: MemberType;
  public nickname!: string;
}

export enum MemberType {
  CREATOR,
  EDITOR,
  VIEWER,
}
