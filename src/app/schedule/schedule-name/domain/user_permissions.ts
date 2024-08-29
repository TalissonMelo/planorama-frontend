export class UserPermissions {
  public id!: string;
  public profiles: string[] = [];

  isValid(): boolean {
    return this.profiles.includes('ADMIN');
  }
}
