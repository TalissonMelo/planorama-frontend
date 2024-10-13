export class HomeFreeTimes {
  public id!: string;
  public title!: string;
  public scheduleId!: string;
  public times: Times[] = [];
}

export class Times {
  public endTime!: string;
  public startTime!: string;
}
