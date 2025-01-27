import { Text } from 'components/text.component'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import './page-header.style.scss'
import { ChevronLeft } from 'assets'


interface IProps {
  title: string;
  isBack?: boolean;
}

const PageHeader: FC<IProps> = ({ title, isBack = false }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <div className="page-header">
      <Text fontWeight={700} fontSize='2.5rem' color='#000'>
        {title}
      </Text>

      {/* {
        isBack
          ? <button className='vacancies__filters__reload' onClick={() => navigate(-1)}>
            <ChevronLeft />
          </button>
          : <button className='page-header__create' onClick={() => navigate('/app/vacancies/create')}>
            <Text color='var(--color-white)' fontSize='1.125rem'>{t('vacancies.create')}</Text>
          </button>
      } */}
    </div>
  )
}

export default PageHeader