import { IAuthUser } from './IAuthUser';
import { IToken } from './login/IToken';

export interface IAuthResponse extends IAuthUser, IToken {}
