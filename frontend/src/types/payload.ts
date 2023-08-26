export type Payload = {
  email: string;
  sub: number;
  iat: number; // token created time
  exp: number; // token expired time
};
