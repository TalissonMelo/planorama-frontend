export class Member {
  public id!: string;
  public phone!: string;
  public type!: MemberType;
  public nickname!: string;
}

enum MemberType {
  CREATOR,
  EDITOR,
  VIEWER,
}
