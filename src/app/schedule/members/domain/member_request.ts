export class MemberRequest {
  public scheduleId!: string;
  public phone!: string;
  public email!: string;
  public type: MemberType = MemberType.VIEWER;
  public nickname!: string;
}

enum MemberType {
  CREATOR,
  EDITOR,
  VIEWER,
}
