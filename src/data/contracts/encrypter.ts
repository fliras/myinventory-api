export interface Encrypter<T = any> {
  encrypt(payload: T): Promise<string>;
}
