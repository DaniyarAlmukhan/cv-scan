import api from './api';


export interface IChatMessage {
  content: string;
  type: 'ai' | 'human'
}

export interface IChatResponse {
  response: string;
  chat_history: IChatMessage[];
}

const baseUrl = "http://91.185.21.250/api";

export const getChatResponse = (question: string): Promise<IChatResponse> => {
  return api.post(`/onboarding/query?question=${question}`);
} 

export const getChartStart = () => {
  return api.get(`/onboarding/start`).then(res => res.data);
}