import React, { useEffect, useState } from 'react';
import './vacancies.style.scss';
import { Text } from 'components/text.component';
import { useTranslation } from 'react-i18next';
import Tabs from 'components/tabs/tabs.component';
import Input from 'components/input/input.component';
import Select from 'components/select/select.component';
import { IVacancy } from 'interfaces/shared.interface';
import VacancyTable from 'components/table/vacancy-table.component';
import { Archive } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { fetchActiveVacancies, fetchPaginatedVacancies } from 'requests/vacancy.request';
import PageHeader from 'components/page-header/page-header.component';

const statuses = ['draft', 'published', 'closed'];

const VacanciesPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [search, setSearch] = useState({
    name: '',
    status: '',
    date: ''
  });
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [initialData, setInitialData] = useState<IVacancy[]>([]);
  const [filteredData, setFilteredData] = useState<IVacancy[]>([]);
  const [tabCounts, setTabCounts] = useState({
    mine: 0,
    draft: 0,
    published: 0,
    archive: 0
  });
  const [filteredStatuses, setFilteredStatuses] = useState<{ label: string, value: string }[]>(statuses.map(status => ({ label: t(`vacancies.${status}`), value: status })));
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const tabs = [
    'mine',
    // 'draft',
    // 'published',
    // 'archive'
  ]
    .map(tab => ({
      label: t(`vacancies.${tab}`),
      value: tab,
    }));

  const [activeTab, setActiveTab] = useState(tabs[0].value);

  const handleReset = () => {
    setSearch({
      name: '',
      status: '',
      date: ''
    });
  }

  const handleArchive = (ids: number[]) => {
    const updatedData = initialData.map(vacancy => (ids.includes(vacancy.vacancy_id) ? { ...vacancy, status: 'closed' } : vacancy));
    setInitialData(updatedData);
    setSelectedItems([]);
  }

  const fetchData = () => {
    fetchPaginatedVacancies(currentPage, rowsPerPage, 'active', search.name).then((paginatedOptions) => {
      setTotalPages(Math.ceil(paginatedOptions.total / rowsPerPage));
      setTotalItems(paginatedOptions.total);
      setFilteredData(paginatedOptions.data);
    });
  }

  // useEffect(() => {
  //   if (activeTab === 'mine') {
  //     setFilteredData(initialData);
  //     // setSearch({ name: '', status: '', date: '' });
  //     setFilteredStatuses(statuses.map(status => ({ label: t(`vacancies.${status}`), value: status })));
  //   } else if (activeTab === 'draft') {
  //     setFilteredData(initialData.filter(vacancy => vacancy.status === 'draft'));
  //     setSearch({ name: '', status: 'draft', date: '' });
  //     setFilteredStatuses([{ label: t('vacancies.draft'), value: 'draft' }]);
  //   } else if (activeTab === 'published') {
  //     setFilteredData(initialData.filter(vacancy => vacancy.status === 'published'));
  //     setSearch({ name: '', status: 'published', date: '' });
  //     setFilteredStatuses([{ label: t('vacancies.published'), value: 'published' }]);
  //   } else if (activeTab === 'archive') {
  //     setFilteredData(initialData.filter(vacancy => vacancy.status === 'closed'));
  //     setSearch({ name: '', status: 'closed', date: '' });
  //     setFilteredStatuses([{ label: t('vacancies.closed'), value: 'closed' }]);
  //   }
  // }, [activeTab, initialData]);

  // useEffect(() => {
  //   setFilteredData(initialData.filter(vacancy => {
  //     return (
  //       vacancy.name.toLowerCase().includes(search.name.toLowerCase()) &&
  //       (search.status === '' || vacancy.status === search.status) &&
  //       (search.date === '' || vacancy.expires === new Date(search.date).toLocaleDateString().trim())
  //     );
  //   }));
  // }, [initialData]);

  useEffect(() => {
    fetchData()
  }, [currentPage, rowsPerPage, search.name]);

  useEffect(() => {
    setTabCounts({
      mine: totalItems,
      draft: initialData.filter(vacancy => vacancy.status === 'draft').length,
      published: initialData.filter(vacancy => vacancy.status === 'published').length,
      archive: initialData.filter(vacancy => vacancy.status === 'closed').length,
    });
  }, [initialData]);

  return <div className='vacancies'>
    <PageHeader title={t('vacancies.title')} />

    <div className="vacancies__body">
      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabCounts={tabCounts}
      />

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
            <Input
              name='name'
              value={search.name}
              placeholder='Название'
              onChange={(e) => setSearch(prev => ({ ...prev, name: e.target.value }))}
              style={{ width: '20rem' }}
              active={!!search.name}
            />

            <Select
              name='status'
              options={filteredStatuses}
              valueKey='value'
              labelKey='label'
              style={{ width: '15rem' }}
              value={search.status}
              onChange={(e) => setSearch(prev => ({ ...prev, status: e.target.value }))}
              active={!!search.status && search.status !== ''}
              hideNullOption={activeTab !== 'mine'}
            />

            <Input
              name='date'
              value={search.date}
              placeholder='Дата'
              type='date'
              onChange={(e) => setSearch(prev => ({ ...prev, date: e.target.value }))}
              style={{ width: '10rem' }}
              active={!!search.date}
            />

            {!!selectedItems.length && <button type='button' className='vacancies__filters__archive' onClick={() => handleArchive(selectedItems)}>
              <Archive width={15} stroke='white' />
            </button>}

            <button type='button' className='vacancies__filters__reset' onClick={handleReset}>
              <Text color='#898989' fontWeight={600}>{t('vacancies.reset')}</Text>
            </button>
          </div>
        </div>

        <VacancyTable
          onArchive={handleArchive}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
          data={filteredData}
          currentPage={currentPage}
          rowsPerPage={rowsPerPage}
          setCurrentPage={setCurrentPage}
          setRowsPerPage={setRowsPerPage}
          totalPages={totalPages}
          totalItems={totalItems}
        />
      </div>
    </div>

  </div>;
};

export default VacanciesPage;
