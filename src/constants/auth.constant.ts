import * as Yup from 'yup';
import i18n from 'i18n';
import { ISignInDto } from 'interfaces/auth.interface';

export const SIGN_IN_VALIDATION_SCHEMA = (): Yup.ObjectSchema<ISignInDto> => {
  return Yup.object().shape({
    username: Yup.string().required(i18n.t('validation.required') as string),
    password: Yup.string().required(i18n.t('validation.required') as string),
  });
};
