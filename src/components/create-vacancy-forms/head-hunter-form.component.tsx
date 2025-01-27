import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './forms.style.scss';
import Input from 'components/input/input.component';
import { useTranslation } from 'react-i18next';
import Select from 'components/select/select.component';
import { Text } from 'components/text.component';

const currencies = [
  { label: '₸', value: 'KZT' },
  { label: '$', value: 'USD' },
  { label: '₽', value: 'RUB' },
];

const templates = [
  { label: 'Шаблон 1', value: 'template1' },
  { label: 'Шаблон 2', value: 'template2' },
  { label: 'Шаблон 3', value: 'template3' },
]

const publicationTypes = [
  { value: 'premium', label: 'Премиум: неделя в топе', text: 'Первые 7 дней публикации выделена цветом, брендирована логотипом вашей компании и находится вверху поисковой выдачи; вакансия отправляется в рассылке подходщяим соискателям; размещается на 30 дней' },
  { value: 'standard_plus', label: 'Стандарт плюс: автообновление', text: 'Автоматически поднимается в поисковой выдаче вакансий каждые 3 дня; размещается на 30 дней' },
  { value: 'Стандарт: без обновления', label: 'Стандарт: базовая публикация', text: 'Вакансия размещается на 30 дней' }
]



const HeadHunterForm = () => {
  const { t } = useTranslation()

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);


  const formik = useFormik({
    initialValues: {
      vacancy_name: '',
      specialization: '',
      responsibilities: '',
      requirements: '',
      conditions: '',
      key_skills: '',
      estimated_salary_min: '',
      estimated_salary_max: '',
      currency: 'KZT',
      isAfterTax: 'false',
      search_city: '',
      vacancy_address: 'hide_address',
      office_address: '',
      show_office_address: 'hide_address',
      work_experience: 'no_experience',
      filter_candidates: 'disabled',
      chat: 'chat_on',
      vacancy_manager: '',
      contact_info: 'hide_in_vacancy',
      contact_person: '',
      email: '',
      phone: '',
      comment: '',
      template: '',
      only_filled: 'false',
      publicationType: 'premium',
      save_as_template: 'false',
    },
    validationSchema: Yup.object({
      vacancy_name: Yup.string()
        .required('Введите название вакансии')
        .min(2, 'Введите название вакансии'),
      specialization: Yup.string()
        .required('Введите специализацию')
        .min(2, 'Введите специализацию'),
      responsibilities: Yup.string()
        .required('Введите обязанности')
        .min(2, 'Введите обязанности'),
      requirements: Yup.string()
        .required('Введите требования')
        .min(2, 'Введите требования'),
      conditions: Yup.string()
        .required('Введите требования')
        .min(2, 'Введите требования'),
      key_skills: Yup.string()
        .required('Введите ключевые навыки')
        .min(2, 'Введите ключевые навыки'),
      estimated_salary_min: Yup.string()
        .required('Введите минимальную зароботную плату')
        .min(2, 'Введите минимальную зароботную плату'),
      estimated_salary_max: Yup.string()
        .required('Введите максимальную зароботную плату')
        .min(2, 'Введите максимальную зароботную плату'),
      currency: Yup.string()
        .required('Выберите валюту')
        .min(2, 'Выберите валюту'),
      isAfterTax: Yup.string(),
      search_city: Yup.string()
        .required('Введите город')
        .min(2, 'Введите город'),
      vacancy_address: Yup.string(),
      office_address: Yup.string()
        .required('Введите адрес офиса')
        .min(2, 'Введите адрес офиса'),
      show_office_address: Yup.string(),
      work_experience: Yup.string(),
      filter_candidates: Yup.string(),
      vacancy_manager: Yup.string(),
      contact_info: Yup.string(),
      contact_person: Yup.string(),
      email: Yup.string().email(),
      phone: Yup.number().positive(),
      comment: Yup.string(),
      template: Yup.string(),
      only_filled: Yup.string(),
      publicationType: Yup.string(),
      save_as_template: Yup.string(),
    }),
    onSubmit: values => {
      console.log('Form data', values);
    },
  });

  type formikKey = keyof typeof formik.values

  const animationFields: (keyof typeof formik.values)[] = [
    'vacancy_name',
    'specialization',
    'responsibilities',
    'requirements',
    'conditions',
  ];

  const animationValues: Partial<Record<keyof typeof formik.values, string>> = {
    vacancy_name: 'Frontend Developer',
    specialization: 'Software Development',
    responsibilities: 'Develop and maintain web applications',
    requirements: 'React, TypeScript, CSS',
    conditions: 'Remote work, flexible hours',
  };

  const mainInfoKeys: formikKey[] = ['vacancy_name', 'specialization']
  const descriptionKeys: formikKey[] = ['responsibilities', 'requirements', 'conditions', 'key_skills']

  useEffect(() => {
    if (currentIndex < animationFields.length) {
      const field = animationFields[currentIndex];
      const targetValue = animationValues[field] || '';
      const currentValue = formik.values[field] || '';

      if (currentLetterIndex < targetValue.length) {
        const timer = setTimeout(() => {
          formik.setFieldValue(
            field,
            currentValue + targetValue[currentLetterIndex]
          );
          setCurrentLetterIndex((prev) => prev + 1);
        }, 25); 
        return () => clearTimeout(timer);
      } else {
        setCurrentIndex((prev) => prev + 1);
        setCurrentLetterIndex(0); 
      }
    }
  }, [currentIndex, currentLetterIndex, animationFields, animationValues, formik.values]);


  return (
    <div className="form-container">
      <form onSubmit={formik.handleSubmit}>

        {/* Основная информация */}

        <div className="form-block">
          <div className="form-block__title">{t('form.mainInfo')}</div>
          <div className="form-block__values">
            {
              mainInfoKeys.map((key) => (
                <div className="form-group" key={key}>
                  <label htmlFor={key}>
                    {t('form.' + key)}
                  </label>
                  <Input
                    formik={formik}
                    name={key}
                    placeholder="Введите"
                    value={formik.values[key]}
                    onChange={formik.handleChange}
                  />
                </div>
              ))
            }
          </div>
        </div>

        {/* ОПИСАНИЕ */}

        <div className="form-block">
          <div className="form-block__title">{t('form.description')}</div>
          <div className="form-block__values">
            {
              descriptionKeys.map(key =>
                <div className="form-group" key={key}>
                  <label htmlFor={key}>
                    {t('form.' + key)}
                  </label>
                  <Input
                    formik={formik}
                    name={key}
                    placeholder="Введите"
                    value={formik.values[key]}
                    onChange={formik.handleChange}
                  />
                </div>)
            }
            <div className="form-group">
              <label htmlFor="estimated_salary">
                {t('form.estimated_salary')}
              </label>

              <div className="form-group__row">
                <Input
                  formik={formik}
                  name="estimated_salary_min"
                  placeholder="От"
                  value={formik.values.estimated_salary_min}
                  onChange={formik.handleChange}
                />
                <Input
                  formik={formik}
                  name="estimated_salary_max"
                  placeholder="До"
                  value={formik.values.estimated_salary_max}
                  onChange={formik.handleChange}
                />
                <Select
                  formik={formik}
                  name="currency"
                  placeholder="Введите"
                  value={formik.values.currency}
                  onChange={formik.handleChange}
                  options={currencies}
                  labelKey='label'
                  valueKey='value'
                />
                <div className='radio-labels'>
                  <label className='radio-label'>
                    <input
                      type="radio"
                      name="isAfterTax"
                      value={'false'}
                      checked={formik.values.isAfterTax === 'false'}
                      onChange={() => formik.setFieldValue('isAfterTax', 'false')}
                    />
                    <span>{t('form.before_tax')}</span>

                  </label>
                  <label className='radio-label'>
                    <input
                      type="radio"
                      name="isAfterTax"
                      value={'true'}
                      checked={formik.values.isAfterTax === 'true'}
                      onChange={() => formik.setFieldValue('isAfterTax', 'true')}
                    />
                    <span>{t('form.after_tax')}</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* МЕСТО РАБОТЫ */}

        <div className="form-block">
          <div className="form-block__title">{t('form.workPlace')}</div>
          <div className="form-block__values">
            <div className="form-group">
              <label htmlFor="search_city">
                {t('form.search_city')}
              </label>
              <Input
                formik={formik}
                name="search_city"
                placeholder="Укажите города для размещения"
                value={formik.values.search_city}
                onChange={formik.handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="vacancy_address">
                {t('form.vacancy_address')}
              </label>
              <div className='radio-labels radio-labels--row'>
                {['hide_address', 'show_address'].map(key =>
                  <label className='radio-label' key={key}>
                    <input
                      type="radio"
                      name="vacancy_address"
                      value={key}
                      checked={formik.values.vacancy_address === key}
                      onChange={() => formik.setFieldValue('vacancy_address', key)}
                    />
                    <span>{t('form.' + key)}</span>

                  </label>
                )}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="office_address">
                {t('form.office_address')}
              </label>
              <Input
                formik={formik}
                name="office_address"
                placeholder="Поиск по адресам"
                value={formik.values.office_address}
                onChange={formik.handleChange}
              />
              <div className='radio-labels radio-labels--row'>
                {['hide_address', 'show_address'].map(key =>
                  <label className='radio-label' key={key}>
                    <input
                      type="radio"
                      name="show_office_address"
                      value={key}
                      checked={formik.values.show_office_address === key}
                      onChange={() => formik.setFieldValue('show_office_address', key)}
                    />
                    <span>{t('form.' + key)}</span>
                  </label>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Дополнительно */}

        <div className="form-block">
          <div className="form-block__title">{t('form.additional')}</div>
          <div className="form-block__values">
            <div className="form-group">
              <label htmlFor="work_experience">
                {t('form.work_experience')}
              </label>

              <div className='radio-labels'>
                {['no_experience', 'below_3', 'below_6', 'above_6'].map((key: string) =>
                  <label className='radio-label' key={key}>
                    <input
                      type="radio"
                      name="work_experience"
                      value={key}
                      checked={formik.values.work_experience === key}
                      onChange={() => formik.setFieldValue('work_experience', key)}
                    />
                    <span>{t('form.' + key)}</span>
                  </label>
                )}
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="filter_candidates">
                {t('form.filter_candidates')}
              </label>
              <div className='radio-labels'>
                {['disabled', 'teenagers', 'unfinished_resume', 'with_letter'].map((key: string) =>
                  <label className='radio-label' key={key}>
                    <input
                      type="radio"
                      name="filter_candidates"
                      value={key}
                      checked={formik.values.filter_candidates === key}
                      onChange={() => formik.setFieldValue('filter_candidates', key)}
                    />
                    <span>{t('form.' + key)}</span>
                  </label>
                )}
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="chat">
                {t('form.chat')}
              </label>
              <div className='radio-labels'>
                {['chat_on', 'chat_off'].map((key: string) =>
                  <label className='radio-label' key={key}>
                    <input
                      type="radio"
                      name="chat"
                      value={key}
                      checked={formik.values.chat === key}
                      onChange={() => formik.setFieldValue('chat', key)}
                    />
                    <span>{t('form.' + key)}</span>
                  </label>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Контактные данные */}

        <div className="form-block">
          <div className="form-block__title">{t('form.contactInfo')}</div>
          <div className="form-block__values">
            <div className="form-group">
              <label htmlFor="vacancy_manager">
                {t('form.vacancy_manager')}
              </label>
              <Input
                formik={formik}
                name="vacancy_manager"
                placeholder="Введите"
                value={formik.values.vacancy_manager}
                onChange={formik.handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact_info">
                {t('form.contact_info')}
              </label>

              <div className='radio-labels'>
                {['hide_in_vacancy', 'show_in_vacancy'].map((key: string) =>
                  <label className='radio-label' key={key}>
                    <input
                      type="radio"
                      name="contact_info"
                      value={key}
                      checked={formik.values.contact_info === key}
                      onChange={() => formik.setFieldValue('contact_info', key)}
                    />
                    <span>{t('form.' + key)}</span>
                  </label>
                )}
              </div>
            </div>

            {
              ['contact_person', 'email', 'phone', 'comment'].map((key: string) =>
                <div className="form-group" key={key}>
                  <label htmlFor={key}>
                    {t('form.' + key)}
                  </label>
                  <Input
                    formik={formik}
                    name={key}
                    placeholder="Введите"
                    value={formik.values[key as keyof typeof formik.values]}
                    onChange={formik.handleChange}
                  />
                </div>
              )
            }
          </div>
        </div>

        {/*  Оформление вакансии*/}

        <div className="form-block">
          <div className="form-block__title">{t('form.vacancyDesign')}</div>
          <div className="form-block__values">
            <div className="form-group">
              <label htmlFor="template">{t('form.questions_and_tests')}</label>
              <Select
                formik={formik}
                name="template"
                placeholder="Выберите шаблон"
                value={formik.values.template}
                onChange={formik.handleChange}
                options={templates}
                labelKey='label'
                valueKey='value'
              />
              <label htmlFor="only_filled" className='checkbox-label'>
                <input
                  type="checkbox"
                  name="only_filled"
                  id="only_filled"
                  value={formik.values.only_filled}
                  checked={formik.values.only_filled === 'true'}
                  onChange={() => formik.setFieldValue('only_filled', formik.values.only_filled === 'true' ? 'false' : 'true')}
                />
                <span>{t('form.accept_only_filled')}</span>
              </label>
            </div>

          </div>
        </div>

        {/* Тип публикации */}

        <div className="form-block no-border">
          <div className="form-block__title">{t('form.publicationType')}</div>
          <div className="form-block__values">
            {publicationTypes.map((type) =>
              <div className="form-group" key={type.value} style={{ gap: '20px' }}>
                <div className="radio-labels" style={{ height: 'unset' }}>
                  <div className="radio-label" >
                    <input
                      type="radio"
                      name="publicationType"
                      value={type.value}
                      checked={formik.values.publicationType === type.value}
                      onChange={() => formik.setFieldValue('publicationType', type.value)}
                    />
                    <Text fontWeight={600} color='#000'>{type.label}</Text>
                  </div>
                </div>

                <Text fontWeight={400} color='var(--color-dark-gray)'>{type.text}</Text>
                <Text fontWeight={600} >5 публикаций на счету</Text>
              </div>
            )}
          </div>
        </div>

        <div className="form-container-footer">
          <button type="submit"> <Text color='var(--color-white)' fontSize='1.125rem'>{t('vacancies.create')}</Text></button>
          <div className="form-group">
            <label htmlFor="save_as_template" className='checkbox-label'>
              <input
                type="checkbox"
                name="save_as_template"
                id="save_as_template"
                value={formik.values.save_as_template}
                checked={formik.values.save_as_template === 'true'}
                onChange={() => formik.setFieldValue('save_as_template', formik.values.save_as_template === 'true' ? 'false' : 'true')}
              />
              <span>{t('form.save_as_template')}</span>
            </label>
          </div>
        </div>
      </form>
    </div>
  );
};

export default HeadHunterForm;