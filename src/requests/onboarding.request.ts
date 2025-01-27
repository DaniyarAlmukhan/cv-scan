import api from './api';

const baseUrl = "http://91.185.21.250/api";

export const getChatResponse = (question: string) => {
  return api.post(`/api/onboarding/query?question=${question}`).then(res => res.data);
} 