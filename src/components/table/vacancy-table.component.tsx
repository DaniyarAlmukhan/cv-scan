import React, { FC, useEffect, useState } from 'react';
import { IVacancy } from 'interfaces/shared.interface';
import { useTranslation } from 'react-i18next';
import { Archive, ChevronLeft, ChevronRight, Pencil, SortIcon } from 'assets';
import { Text } from 'components/text.component';
import Chat from 'components/chat/chat.component';
import './table.style.scss';
import { useNavigate } from 'react-router-dom';

interface TableProps {
  data: IVacancy[];
  selectedItems: number[];
  setSelectedItems: (items: number[] | ((prev: number[]) => number[])) => void;
  onArchive: (id: number[]) => void;
  currentPage: number;
  rowsPerPage: number;
  setCurrentPage: (page: number) => void;
  setRowsPerPage: (rows: number) => void;
  totalPages: number;
  totalItems: number;
}

const VacancyTable: FC<TableProps> = ({ data, selectedItems, setSelectedItems, onArchive, currentPage, rowsPerPage, setCurrentPage, setRowsPerPage, totalPages, totalItems }) => {
  const { t } = useTranslation();
  const navigate = useNavigate()

  const [isOpen, setIsOpen] = useState(false);

  const isAllSelected = selectedItems.length === data.length && data.length > 0;
  const handleSelectAll = () => {
    setSelectedItems(isAllSelected ? [] : data.map((item) => item.vacancy_id));
  };

  const handleSelectItem = (id: number) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    setSelectedItems([]);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
    setSelectedItems([]);
  };

  const handleEdit = (id: number) => {
    console.log(id);
  };

  const handleArchive = (id: number) => {
    onArchive([id]);
  }

  const handleRowsPerPageChange = (val: number) => {
    setRowsPerPage(val);
    setCurrentPage(1);
    setSelectedItems([]);
    setIsOpen(false);
  }

  const getBubbleColor = (value: number) => {
    if (value === 0) return 'red';
    else if (value < 10) return 'yellow';
    else return 'green';
  }

  const handleStartScan = (id: number) => {
    navigate('/app/candidates?id=' + id)
  }

  return (
    <>
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ padding: '0 0 0 16px' }}>
              <input
                type="checkbox"
                checked={isAllSelected}
                onChange={handleSelectAll}
              />
            </th>
            <th>{t('vacancies.name')} <SortIcon className="sort-icon" /></th>
            <th>{t('vacancies.region')} <SortIcon className="sort-icon" /></th>
            <th>{t('vacancies.views')} <SortIcon className="sort-icon" /></th>
            <th>{t('vacancies.responses')} <SortIcon className="sort-icon" /></th>
            <th>{t('vacancies.expires')} <SortIcon className="sort-icon" /></th>
            <th>{t('vacancies.manager')} <SortIcon className="sort-icon" /></th>
            <th>{t('vacancies.status')} <SortIcon className="sort-icon" /></th>
            <th>{t('vacancies.scanning')}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.vacancy_id}>
              <td style={{ padding: '0 0 0 16px' }}>
                <input
                  type="checkbox"
                  checked={selectedItems.includes(row.vacancy_id)}
                  onChange={() => handleSelectItem(row.vacancy_id)}
                />
              </td>
              <td>{row.name}</td>
              <td>{row.region_name}</td>
              <td>
                <div className="bubble">
                  {row.views}
                </div>
              </td>
              <td>
                <div className={`bubble ${getBubbleColor(row.responses)}`}>
                  {row.responses}
                </div>
              </td>
              <td>{row.expires}</td>
              <td>{row.manager}</td>
              <td>
                <div className="vacancy-status">
                  <div className={`status-circle ${row.status}`} />
                  {t('vacancies.' + row.status)}
                </div>
              </td>
              <td>
                <button className='scan-button' onClick={() => handleStartScan(row.vacancy_id)}>
                  <Text fontSize='1.125rem' color='#3E3E3E66'>{t('vacancies.start-scan')}</Text>
                </button>
              </td>
              <td>
                <div className="table__icons">
                  <div className="table__icon" onClick={() => handleEdit(row.vacancy_id)}><Pencil /></div>
                  <div className="table__icon" onClick={() => handleArchive(row.vacancy_id)}><Archive stroke='#000' /> </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}

      <div className="styled-table__footer">
        {/* <Chat /> */}

        <div className="styled-table__pagination">

          <div className="styled-table__page-buttons">
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>
              <ChevronLeft />
            </button>
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>
              <ChevronRight />
            </button>
          </div>

          <div className="styled-table__page-number">
            <Text fontWeight={400}>{t('pagination.showing')}</Text>
            <div className="styled-table__rows-per-page">

              <div className="styled-table__current-items">
                <Text color='#121C2680' onClick={() => setIsOpen(!isOpen)}>
                  {`${(currentPage - 1) * rowsPerPage + 1}-${Math.min(
                    currentPage * rowsPerPage,
                    Math.min(data.length * rowsPerPage, totalItems)
                  )}`}
                </Text>

                {isOpen && <div className="styled-table__dropdown">
                  {[10, 20, 30].map((item) => (
                    <div
                      key={item}
                      onClick={() => handleRowsPerPageChange(item)}
                    >
                      <Text>{item}</Text>
                    </div>
                  ))}
                </div>}
              </div>
            </div>
            <Text fontWeight={400}>{t('pagination.of')} {totalItems}</Text>
          </div>
        </div>
      </div>
    </>
  );
};

export default VacancyTable;
