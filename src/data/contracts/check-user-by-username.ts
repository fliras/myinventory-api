export interface CheckUserByUsername<Input = string, Output = boolean> {
  checkByUsername(username: Input): Promise<Output>;
}
