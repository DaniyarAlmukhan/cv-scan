
import React, { FC, useEffect, useState } from 'react'
import { Bubble } from 'components/index.style';
import { Text } from 'components/text.component';
import { useTranslation } from 'react-i18next';
import './dashboard-card.style.scss';
import { ChevronLeft, ChevronRight, Increase } from 'assets';

export interface ICardData {
  title: string;
  data: [{
    value: number;
    increase: number;
    name: string;
  }]
}

interface IProps {
  data: ICardData;
}

const DashboardCard: FC<IProps> = ({ data }) => {
  const { t } = useTranslation();
  const [selectedVacancyIndex, setSelectedVacancyIndex] = useState(0);
  const [vacancyArray, setVacancyArray] = useState(data.data);

  const getBubbleColor = (increase: number) => {
    if (increase < 5) return 'red';
    else if (increase < 10) return 'none';
    else if (increase >= 10) return 'green';
    else return 'none';
  }

  const selectedValue = vacancyArray[selectedVacancyIndex];

  const handleNextVacancy = () => {
    if (selectedVacancyIndex < vacancyArray.length - 1) {
      setSelectedVacancyIndex(selectedVacancyIndex + 1);
    }
  }

  const handlePrevVacancy = () => {
    if (selectedVacancyIndex > 0) {
      setSelectedVacancyIndex(selectedVacancyIndex - 1);
    }
  }

  useEffect(() => {
    setSelectedVacancyIndex(0);
    setVacancyArray(data.data);
  }, [data]);

  return (
    <div className='dashboard-card'>
      <div className="dashboard-card__header">
        <Text fontSize='1.125rem' fontWeight={600} color='#000'>{t('home.' + data.title)}</Text>
        <Bubble small style={{ minWidth: 35, padding: '0 10px' }} type={getBubbleColor(selectedValue.increase)}>
          {selectedValue.increase >= 10 && <Increase />}
          {selectedValue.increase}
        </Bubble>
      </div>
      <div className="dashboard-card__body">
        <Text fontSize='4rem' fontWeight={700}>{selectedValue.value}</Text>
        <div className="dashboard-card__vacancy">
          <Text fontSize='0.875rem' color='#3E3E3E80' fontWeight={400}>{t('candidates.vacancy')}:</Text>
          <Text className="dashboard-card__vacancy-text" fontSize="0.875rem" color="#3E3E3E" fontWeight={400}>
            {selectedValue.name}
          </Text>
        </div>
        <div className="dashboard-card__controls">
          <button className="dashboard-card__control" onClick={handlePrevVacancy}>
            <ChevronLeft />
          </button>
          <button className="dashboard-card__control" onClick={handleNextVacancy}>
            <ChevronRight />
          </button>
        </div>
      </div>
    </div>
  )
}

export default DashboardCard