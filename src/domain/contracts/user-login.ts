export interface UserLogin {
  handle(input: UserLogin.Input): Promise<UserLogin.Output>;
}

export namespace UserLogin {
  export type Input = {
    username: string;
    password: string;
  };

  export type Output = string | Error;
}
