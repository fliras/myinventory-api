export interface UserLoginUsecase {
  handle(input: UserLoginUsecase.Input): Promise<UserLoginUsecase.Output>;
}

export namespace UserLoginUsecase {
  export type Input = {
    username: string;
    password: string;
  };

  export type Output = string | Error;
}
