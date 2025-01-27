import { IVacancy } from 'interfaces/shared.interface';
import api from './api';

export interface PaginatedResponse<T> {
  current: number;
  data: T[];
  pageSize: number;
  total: number;
  success: boolean;
}

export interface ICandidate {
  age: number;
  citizenship: string;
  conclusion: string;
  contacts: {
    contact_type: string;
    contact_value: string;
    preferred: boolean;
  }[],
  full_name: string;
  href: string;
  key: string;
  missing_skills: any;
  rating: number;
  recommendations: any;
  response_date: string;
  status: any;
  vacancy_id: string;
  vacancy_name: string;
  platform: "headhunter" | "linkedin"
}


export const fetchActiveVacancies = async (): Promise<any> => {
  return api.get(`/vacancies/options`);
};

export const fetchPaginatedVacancies = async (
  current = 1,
  pageSize = 20,
  status: 'active' | 'closed' = 'active',
  search?: string
): Promise<PaginatedResponse<IVacancy>> => {
  const params = { status, search, current, pageSize };
  return api.get(`/vacancies`, { params });
};

export const fetchResponses = async (
  vacancy_id: number,
  current = 1,
  pageSize = 20,
): Promise<PaginatedResponse<ICandidate>> => {
  const params = { vacancy_id, current, pageSize };
  return api.get(`/responses`, { params });
};
