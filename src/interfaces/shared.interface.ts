

export interface IDictionary {
  name: string;
  value?: string | number | readonly string[];
}

export interface IBasicResponse {
  success: boolean;
  error?: string;
}

export interface IPageableResponse<T> {
  content: T[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
}

export interface IVacancy {
  vacancy_id: number;
  vacancy_name: string;
  region_id: number;
  address: string;
  views: number;
  responses: number;
  expires: string;
  manager_id: number;
  status: string;
  region_name: string;
  manager: string;
  active?: boolean;

}

export type Route =
  // 'home' |
  'vacancies'
  // | 'candidates'
  // | 'adaptation'
  // | 'education'
  // | 'documents';
  | 'onboarding';

export type Source = 'linkedin' | 'headhunter' | 'enbek';
