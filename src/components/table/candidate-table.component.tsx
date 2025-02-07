import React, { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';

import './table.style.scss'
import Chat from 'components/chat/chat.component';
import { Text } from 'components/text.component';
import { ChevronLeft, ChevronRight, SortIcon } from 'assets';
import { sourceToIcon } from 'constants/shared.constant';
import { ICandidate } from 'requests/vacancy.request';
import Loader from 'components/loader/loader.component';

interface TableProps {
  data: ICandidate[];
  currentPage: number;
  rowsPerPage: number;
  setCurrentPage: (page: number) => void;
  setRowsPerPage: (rows: number) => void;
  totalPages: number;
  totalItems: number;
  onCandidateAnalysis: (candidate: ICandidate) => void;
  loading: boolean;
}

const CandidateTable: FC<TableProps> = ({ data, currentPage, rowsPerPage, setCurrentPage, setRowsPerPage, totalPages, totalItems, onCandidateAnalysis, loading }) => {
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleRowsPerPageChange = (val: number) => {
    setRowsPerPage(val);
    setCurrentPage(1);
    setIsOpen(false);
  }

  const findContact = (row: ICandidate) => {
    return row.contacts.find((contact) => contact.preferred === true)?.contact_value || row.contacts[0].contact_value;
  }

  return (
    <>
      {
        loading
          ? <div className="loader-container">
            <Loader />
          </div>
          : <table className="styled-table candidates-table">
            <thead>
              <tr>
                <th>{t('candidates.vacancy')} <SortIcon className="sort-icon" /></th>
                <th>{t('candidates.source')} <SortIcon className="sort-icon" /></th>
                <th>{t('candidates.fullName')} <SortIcon className="sort-icon" /></th>
                <th>{t('candidates.age')} <SortIcon className="sort-icon" /></th>
                <th>{t('candidates.responseTime')} <SortIcon className="sort-icon" /></th>
                <th>{t('candidates.rating')} <SortIcon className="sort-icon" /></th>
                <th>{t('candidates.conclusion')} <SortIcon className="sort-icon" /></th>
                <th>{t('candidates.contact')}</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {
                data.map((row) => (
                  <tr key={row.key}>
                    <td>{row.vacancy_name}</td>
                    <td>
                      {row.href
                        ? <a className="candidate-source candidate-source-link" href={row.href} target="_blank" rel="noreferrer">
                          {sourceToIcon[row.platform]}
                          {row.platform}
                        </a>
                        : <div className="candidate-source">
                          {sourceToIcon[row.platform]}
                          {row.platform}
                        </div>}

                    </td>
                    <td>
                      <div>
                        {row.full_name}
                      </div>
                    </td>
                    <td>
                      {row.age}
                    </td>
                    <td>{row.response_date.split('T')?.[0]}</td>
                    <td>
                      <div className="table__rating">
                        <div className="table__rating-value">
                          {row.rating}%
                        </div>
                        <div className="table__rating-scale">
                          <div
                            className="table__rating-fill"
                            style={{
                              width: `${Math.min(row.rating, 100)}%`,
                            }}
                          />
                        </div>
                      </div>
                    </td>
                    <td>
                      {row.conclusion}
                    </td>
                    <td>
                      {findContact(row)}
                    </td>
                    <td>
                      <button className='scan-button' onClick={() => onCandidateAnalysis(row)}>
                        <Text fontSize='1.125rem' color='#3E3E3E66'>{t('candidates.analyze')}</Text>
                      </button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
      }

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
                    Math.min(data.length * rowsPerPage, totalItems))}`}
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
  )
}

export default CandidateTable