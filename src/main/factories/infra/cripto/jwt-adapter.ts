import { JwtAdapter } from "@/infra/cripto/jwt-adapter"

export const makeJwtAdapter = () => {
  const secret = process.env.JWT_SECRET ?? 'secret123';
  return new JwtAdapter(secret);
}