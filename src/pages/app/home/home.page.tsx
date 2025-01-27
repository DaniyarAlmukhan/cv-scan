import React, { useState } from 'react';
import { Text } from 'components/text.component';
import { useTranslation } from 'react-i18next';
import PageHeader from 'components/page-header/page-header.component';
import Input from 'components/input/input.component';

import './home.style.scss';
import DashboardCard from 'components/dashboard-card/dashboard-card.component';
import Chat from 'components/chat/chat.component';

const DUMB_DATA: any[] = [
  {
    title: 'foundCandidatesCount',
    data: [
      {
        value: 12,
        increase: 14,
        name: 'Vacancy name.'
      },
      {
        value: 8,
        increase: -4,
        name: 'Vacancy name 2 '
      },
      {
        value: 20,
        increase: 4,
        name: 'Vacancy name 3 '
      },
    ]
  },
  {
    title: 'selectedCandidatesCount',
    data: [
      {
        value: 5,
        increase: 2,
        name: 'Vacancy name'
      },
      {
        value: 3,
        increase: 1,
        name: 'Vacancy name 2 '
      },
      {
        value: 7,
        increase: 4,
        name: 'Vacancy name 3 '
      },
    ]
  },
  {
    title: 'phoneInterviewCount',
    data: [
      {
        value: 3,
        increase: 1,
        name: 'Vacancy name'
      },
      {
        value: 2,
        increase: 0,
        name: 'Vacancy name 2 '
      },
      {
        value: 5,
        increase: 2,
        name: 'Vacancy name 3 '
      },
    ]
  },
  {
    title: 'technicalInterviewCount',
    data: [
      {
        value: 2,
        increase: 1,
        name: 'Vacancy name'
      },
      {
        value: 1,
        increase: 0,
        name: 'Vacancy name 2 '
      },
      {
        value: 3,
        increase: 2,
        name: 'Vacancy name 3 '
      },
    ]
  },
  {
    title: 'invitedCount',
    data: [
      {
        value: 2,
        increase: 1,
        name: 'Vacancy name'
      },
      {
        value: 1,
        increase: 0,
        name: 'Vacancy name 2 '
      },
      {
        value: 3,
        increase: 2,
        name: 'Vacancy name 3 '
      },
    ]
  },
  {
    title: 'jobOfferCount',
    data: [
      {
        value: 1,
        increase: 1,
        name: 'Vacancy name'
      },
      {
        value: 0,
        increase: 0,
        name: 'Vacancy name 2 '
      },
      {
        value: 2,
        increase: 2,
        name: 'Vacancy name 3 '
      },
    ]
  },
  {
    title: 'rejectedCount',
    data: [
      {
        value: 1,
        increase: 1,
        name: 'Vacancy name'
      },
      {
        value: 0,
        increase: 0,
        name: 'Vacancy name 2 '
      },
      {
        value: 2,
        increase: 2,
        name: 'Vacancy name 3 '
      },
    ]
  },
  {
    title: 'hiredCount',
    data: [
      {
        value: 1,
        increase: 1,
        name: 'Vacancy name'
      },
      {
        value: 0,
        increase: 0,
        name: 'Vacancy name 2 '
      },
      {
        value: 2,
        increase: 2,
        name: 'Vacancy name 3 '
      },
    ]
  }
]

const HomePage = () => {
  const { t } = useTranslation();
  const [date, setDate] = useState('');

  const handleReset = () => {
    setDate('');
  }

  return <div className='home'>
    <PageHeader title={t('home.title')} />

    <div className="home__filters">
      <Input
        name='date'
        value={date}
        placeholder='Дата'
        type='date'
        onChange={(e) => setDate(e.target.value)}
        style={{ width: '10rem' }}
        active={!!date}
      />

      <button type='button' className='vacancies__filters__reset' onClick={handleReset}>
        <Text color='#898989' fontWeight={600}>{t('vacancies.reset')}</Text>
      </button>
    </div>

    <div className="home__grid">
      {
        DUMB_DATA.map((data, index) => (
          <DashboardCard key={index} data={data} />
        ))
      }
    </div>
  </div>;
};

export default HomePage;
