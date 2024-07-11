export class SessionResponse {
  public id!: string;
  public scheduleId!: string;
  public color!: Color;
  public title!: string;
  public startTime!: Date;
  public endTime!: Date;
  public description!: string;
}

export class Color {
  public primary!: string;
  public secondary!: string;
}
