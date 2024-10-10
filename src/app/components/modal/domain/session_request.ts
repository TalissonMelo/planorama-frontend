export class SessionRequest {
  public scheduleId!: string;
  public legendId!: string;
  public title!: string;
  public description!: string;
  public startDate!: Date;
  public startTime!: Date;
  public endDate!: Date;
  public endTime!: Date;
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
