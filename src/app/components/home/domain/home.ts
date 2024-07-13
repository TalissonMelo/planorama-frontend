export class Home {
  public id!: string;
  public name!: string;
  public startTime!: string;
  public endTime!: string;
  public sessions: Session[] = [];
}

export class Session {
  public id!: string;
  public title!: string;
  public endTime!: string;
  public startTime!: string;
  public description!: string;
}
