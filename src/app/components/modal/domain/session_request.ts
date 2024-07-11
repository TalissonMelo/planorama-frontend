export class SessionRequest {
  public scheduleId!: string;
  public legendId!: string;
  public title!: string;
  public startTime!: Date;
  public endTime!: Date;
  public description!: string;
  public daysOfWeeks: DayOfWeek[] = [];
}

enum DayOfWeek {
  MONDAY,
  TUESDAY,
  WEDNESDAY,
  THURSDAY,
  FRIDAY,
  SATURDAY,
  SUNDAY,
}
