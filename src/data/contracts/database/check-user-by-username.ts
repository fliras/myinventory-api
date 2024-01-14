export interface CheckUserByUsername {
  checkByUsername(username: string): Promise<boolean>;
}
