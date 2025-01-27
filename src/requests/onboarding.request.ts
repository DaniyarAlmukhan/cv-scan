import api from './api';

export const getChatResponse = (question: string) => {
  return api.get(`/onboarding/query?question=${question}`).then(res => res.data);
} 