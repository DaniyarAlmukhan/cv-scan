import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { FormikProps, FormikProvider, useFormik } from 'formik';

import { ISignInDto } from 'interfaces/auth.interface';
import { useAuth } from 'contexts/auth.context';
import { signIn } from 'requests/auth.request';
import { markInvalidFields } from 'utils/form.utils';
import { SIGN_IN_VALIDATION_SCHEMA } from 'constants/auth.constant';
import Loader from 'components/loader/loader.component';
import Input from 'components/input/input.component';
import Button from 'components/button/button.component';
import './auth.style.scss';

const Auth = () => {
  const params = useParams();
  const authType = params?.type as 'sign-in' | 'sign-up';
  const { t } = useTranslation();
  const { handleSetToken, handleRemoveToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const formik: FormikProps<ISignInDto> = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: SIGN_IN_VALIDATION_SCHEMA(),
    validateOnMount: true,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  useEffect(() => {
    handleRemoveToken();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    formik.validateForm().then(() => {
      if (Object.keys(formik.errors).length > 0) {
        markInvalidFields(formik, 'auth');
      } else {
        setLoading(true);
        signIn(formik.values)
          .then((res) => handleSetToken(res.token))
          .catch(() => toast.error('Произошла ошибка при авторизации'))
          .finally(() => setLoading(false));
      }
    });
  };

  const handleChange = ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>) => {
    void formik.setFieldValue(name, value, true);
  };

  return (
    <Loader loading={loading}>
      <div className="auth__container">
        <div className="auth__box">
          <h2>{t(`auth.title.${authType}`)}</h2>
          <FormikProvider value={formik}>
            <form onSubmit={handleSubmit} noValidate={true}>
              <Input
                formik={formik}
                name="username"
                value={formik.values.username}
                label={t('auth.username')}
                onChange={handleChange}
              />
              <Input
                formik={formik}
                type="password"
                name="password"
                value={formik.values.password}
                label={t('auth.password')}
                onChange={handleChange}
              />
              <Button type="submit" primary>
                {t('auth.signIn')}
              </Button>
            </form>
          </FormikProvider>
        </div>
      </div>
    </Loader>
  );
};

export default Auth;
