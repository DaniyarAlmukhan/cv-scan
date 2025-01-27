import { toast } from 'react-toastify';
import { FormikProps } from 'formik';
import i18n from '../i18n';

export const markInvalidFields = (formik: FormikProps<any>, translateKey: string) => {
  Object.entries(formik.errors).forEach(([key, error]) => {
    void formik.setFieldTouched(key, true);
    toast.error(
      i18n.t('validation.field', { field: i18n.t(`${translateKey}.${key}`), reason: error }),
    );
  });
};
