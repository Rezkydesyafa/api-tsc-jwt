import { Request } from 'express';

interface UserInterface {
  username: String;
  password: String;
  name: String;
}
interface loginInterface {
  username: String;
  password: String;
}

interface TokenInterface extends Request {
  refreshToken: string;
}
export { UserInterface, loginInterface, TokenInterface };
