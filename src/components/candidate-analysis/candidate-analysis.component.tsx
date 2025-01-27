import React, { FC } from 'react';
import { Text } from 'components/text.component';
import { useTranslation } from 'react-i18next';

import './candidate-analysis.style.scss';
import { ICandidate } from 'requests/vacancy.request';

const data = [
  {
    title: 'fullName',
    value: [{ heading: 'Иванов Иван', text: null }]
  },
  {
    title: 'rating',
    value: [{ heading: '95', text: null }]
  },
  {
    title: 'skills',
    value: [
      { heading: 'Образование', text: 'Lorem ipsum dolor sit amet consectetur. Auctor fermentum semper faucibus est nisl porttitor nisi lectus. Euismod tincidunt nullam at justo et rutrum venenatis. Platea nunc laoreet mi nam euismod morbi donec. Tortor nunc malesuada eu aliquet libero eu quam.' },
      { heading: 'Опыт работы', text: 'Lorem ipsum dolor sit amet consectetur. Auctor fermentum semper faucibus est nisl porttitor nisi lectus. Euismod tincidunt nullam at justo et rutrum venenatis. Platea nunc laoreet mi nam euismod morbi donec. Tortor nunc malesuada eu aliquet libero eu quam.' },
      { heading: 'Навыки', text: 'Lorem ipsum dolor sit amet consectetur. Auctor fermentum semper fauc' },
    ]
  }
]

interface IProps {
  data: ICandidate;
}

const CandidateAnalysis: FC<IProps> = ({ data }) => {
  const { t } = useTranslation();

  const getBubbleColor = (score: number) => {
    if (score < 50) {
      return 'red';
    } else if (score < 70) {
      return 'yellow';
    } else {
      return 'green';
    }
  }

  const formatText = (input: string) => {
    return input?.split("\n").map((line, index) => (
      <React.Fragment key={index}>
        {line
          ?.split(/(\*\*.*?\*\*|\*)/)
          .map((part, i) => {
            if (part.startsWith("**") && part.endsWith("**")) {
              // Handle bold text
              return <strong style={{ fontWeight: 600 }} key={i}>{part.slice(2, -2)}</strong>;
            } else if (part === "*") {
              // Handle single * for newline
              return <br key={i} />;
            } else {
              // Handle plain text
              return <span key={i}>{part}</span>;
            }
          })}
        {index < input?.split("\n").length - 1 && <br />}
      </React.Fragment>
    ));
  }

  return (
    <div className="candidate-analysis">
      <div className="candidate-analysis__header">
        <div className="candidate-analysis__heading">
          <Text fontSize='1.5rem' color='#000' fontWeight={700}>{t('analysis.title')}</Text>
          {/* <div className={`bubble ${getBubbleColor(95)}`}>{data.rating}</div> */}
        </div>

        <div className="candidate-analysis__subheading">
          <div>
            <Text fontSize='1rem' color='var(--color-dark-gray)' fontWeight={400}>{t('analysis.vacancy')}</Text>
            <Text fontSize='1.125rem' color='#000' fontWeight={600}>{data.vacancy_name} </Text>
          </div>
          <div>
            <Text fontSize='1rem' color='var(--color-dark-gray)' fontWeight={400}>{t('analysis.response_time')}</Text>
            <Text fontSize='1.125rem' color='#000' fontWeight={600}>{data.response_date?.split('T')[0]}</Text>
          </div>

        </div>
      </div>

      <div className="candidate-analysis__body">
        <table className="candidate-analysis__content">
          <tbody>
            <tr>
              <td>
                <Text className='title' color='var(--color-dark-gray)' fontWeight={400}> {t('analysis.' + 'fullName')}</Text>
              </td>
              <td>
                <div className="candidate-analysis__content-values">
                  <div className="candidate-analysis__content-value">
                    <Text color='#000' fontSize='1.125rem' fontWeight={600}>{data.full_name}</Text>
                  </div>
                </div>
              </td>
            </tr>

            <tr>
              <td>
                <Text className='title' color='var(--color-dark-gray)' fontWeight={400}> {t('analysis.' + 'rating')}</Text>
              </td>
              <td>
                <div className="candidate-analysis__content-values">
                  <div className="candidate-analysis__content-value">
                    <Text color='#000' fontSize='1.125rem' fontWeight={600}>{data.rating}</Text>
                  </div>
                </div>
              </td>
            </tr>

            <tr>
              <td>
                <Text className='title' color='var(--color-dark-gray)' fontWeight={400}> {t('analysis.' + 'missing_skills')}</Text>
              </td>
              <td>
                <div className="candidate-analysis__content-values">
                  <div className="candidate-analysis__content-value">
                    <Text color='#000' fontSize='1.125rem' >{formatText(data.missing_skills)}</Text>
                  </div>
                </div>
              </td>
            </tr>

            <tr>
              <td>
                <Text className='title' color='var(--color-dark-gray)' fontWeight={400}> {t('analysis.' + 'recommendations')}</Text>
              </td>
              <td>
                <div className="candidate-analysis__content-values">
                  <div className="candidate-analysis__content-value">
                    <Text color='#000' fontSize='1.125rem' >{formatText(data.recommendations)}</Text>
                  </div>
                </div>
              </td>
            </tr>
            
            <tr>
              <td>
                <Text className='title' color='var(--color-dark-gray)' fontWeight={400}> {t('analysis.' + 'conclusion')}</Text>
              </td>
              <td>
                <div className="candidate-analysis__content-values">
                  <div className="candidate-analysis__content-value">
                    <Text color='#000' fontSize='1.125rem' >{formatText(data.conclusion)}</Text>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CandidateAnalysis;
