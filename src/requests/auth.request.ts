import api from './api';
import { ISignInDto, ITokenResponse } from 'interfaces/auth.interface';

export const signIn = (data: ISignInDto): Promise<ITokenResponse> => {
  return api.post('auth/sign-in', data);
};
