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
  platform: "hh.kz" | "linkedin"
}

export interface IRegionItem {
  region_id: number;
  region_name: string;
}

export const fetchActiveVacancies = async (): Promise<any> => {
  return api.get(`/vacancies/options`);
};

export const fetchPaginatedVacancies = async (
  current = 1,
  pageSize = 20,
  status: 'active' | 'closed' = 'active',
  search?: string,
  region_id?: string,
): Promise<PaginatedResponse<IVacancy>> => {
  const params = { status, search, current, pageSize, region_id };
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

export const getRegions = async (): Promise<IRegionItem[]> => {
  return api.get(`/regions/options`);
}