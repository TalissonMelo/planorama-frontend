export class SessionResponse {
  public id!: string;
  public scheduleId!: string;
  public color!: Color;
  public title!: string;
  public start!: Date;
  public end!: Date;
  public description!: string;
}

export class Color {
  public primary!: string;
  public secondary!: string;
}
