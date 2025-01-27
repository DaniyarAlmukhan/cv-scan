import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Text } from 'components/text.component';
import Tabs from 'components/tabs/tabs.component';
import Input from 'components/input/input.component';
import Select from 'components/select/select.component';
import { sources } from 'constants/shared.constant';
import { Reload } from 'assets';
import CandidateTable from 'components/table/candidate-table.component';
import CandidateAnalysis from 'components/candidate-analysis/candidate-analysis.component';

import '../vacancies/vacancies.style.scss';
import { Modal } from 'components/modal/modal.component';
import PageHeader from 'components/page-header/page-header.component';
import { fetchResponses, ICandidate } from 'requests/vacancy.request';

const CandidatesPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const tabs = [
    {
      label: t('candidates.candidates'),
      value: 'candidates',
    },
    // {
    //   label: t('candidates.employees'),
    //   value: 'employees',
    // },
  ]

  const [searchParams] = useSearchParams();

  const [activeTab, setActiveTab] = useState(tabs[0].value);
  const [initialData, setInitialData] = useState<ICandidate[]>([]);
  const [filteredData, setFilteredData] = useState<ICandidate[]>([]);
  const [vacancies, setVacancies] = useState<{ label: string, value: string }[]>([]);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [tabCounts, setTabCounts] = useState({
    candidates: 0,
    employees: 0,
  });
  const [search, setSearch] = useState({
    name: '',
    source: '',
    vacancy: '',
    responseTime: '',
  });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [selectedCandidate, setSelectedCandidate] = useState<ICandidate>();
  const [loading, setLoading] = useState(true); 

  const handleReset = () => {
    setSearch({
      name: '',
      source: '',
      vacancy: '',
      responseTime: '',
    });
  }

  const handleReload = () => {
    // API CALL
    console.log('reload');
  }

  const fetchData = () => {
    const id = searchParams.get('id');
    if (id) {
      fetchResponses(Number(id), page, pageSize)
        .then((res) => {
          setInitialData(res.data.sort((a, b) => b.rating - a.rating))
          setFilteredData(res.data.sort((a, b) => b.rating - a.rating))
          setTotalPages(Math.ceil(res.total / pageSize));
          setTotalItems(res.total);
          setTabCounts({
            candidates: res.total,
            employees: 0,
          });
        })
        .finally(() => {
          setTimeout(() => {
            setLoading(false);
          }, 3000);
        });
    }
  }

  const handleCandidateAnalysis = (candidate: ICandidate) => {
    setSelectedCandidate(candidate);
    setShowAnalysis(true);
  }

  useEffect(() => {
    fetchData()
  }, [searchParams, page, pageSize]);

  useEffect(() => {
    setFilteredData(initialData.filter(candidate => {
      return (
        (candidate.full_name.toLowerCase().includes(search.name.toLowerCase())) &&
        (search.responseTime === '' || candidate.response_date === search.responseTime)
      );
    }));
  }, [search, initialData]);

  return (
    <div className='vacancies candidates'>
      <PageHeader title={t('candidates.title')} />

      <div className="vacancies__body">
        <Tabs
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tabCounts={tabCounts}
        />
      </div>

      <div className="vacancies__table-container">
        <div className="vacancies__filters">
          <div className="vacancies__filters__left">
            <Input
              name='name'
              value={search.name}
              placeholder='Название'
              onChange={(e) => setSearch(prev => ({ ...prev, name: e.target.value }))}
              style={{ width: '21.875rem' }}
              active={!!search.name}
            />
          </div>

          <div className="vacancies__filters__right">
            <Select
              name='source'
              options={sources.map((source) => ({ label: t(`candidates.${source}`), value: source }))}
              valueKey='value'
              labelKey='label'
              style={{ width: '15rem' }}
              value={search.source}
              onChange={(e) => setSearch(prev => ({ ...prev, source: e.target.value }))}
              active={!!search.source && search.source !== ''}
              placeholder='Источник'
            />

            {/* <Select
              name='vacancy'
              options={vacancies}
              style={{ width: '15rem' }}
              value={search.vacancy}
              onChange={(e) => setSearch(prev => ({ ...prev, vacancy: e.target.value }))}
              active={!!search.vacancy && search.vacancy !== ''}
              placeholder='Вакансия'
              valueKey='value'
              labelKey='label'
            /> */}

            <Input
              name='responseTime'
              value={search.responseTime}
              placeholder='Дата'
              type='date'
              onChange={(e) => setSearch(prev => ({ ...prev, responseTime: e.target.value }))}
              style={{ width: '10rem' }}
              active={!!search.responseTime}
            />

            <button type='button' className='vacancies__filters__reset' onClick={handleReset}>
              <Text color='#898989' fontWeight={600}>{t('vacancies.reset')}</Text>
            </button>

            <button type='button' className='vacancies__filters__reload' onClick={handleReload}>
              <Reload />
            </button>
          </div>
        </div>

        <CandidateTable
          data={filteredData}
          currentPage={page}
          setCurrentPage={setPage}
          setRowsPerPage={setPageSize}
          rowsPerPage={pageSize}
          totalPages={totalPages}
          totalItems={totalItems}
          onCandidateAnalysis={handleCandidateAnalysis}
          loading={loading}
        />
      </div>
      {showAnalysis && selectedCandidate && <Modal options={{ handleCancel: () => setShowAnalysis(false) }} type='analysis'>
        <CandidateAnalysis data={selectedCandidate} />
      </Modal>}
    </div>
  )
}

export default CandidatesPage