import api from './api';


export interface IChatMessage {
  content: string;
  type: 'ai' | 'human'
}

export interface IChatResponse {
  response: string;
  chat_history: IChatMessage[];
}

export interface IChartStartResponse {
  welcome_message: string;
  popular_questions: {
    string: string[]
  }
}

const baseUrl = "http://91.185.21.250/api";

export const getChatResponse = (question: string): Promise<IChatResponse> => {
  return api.post(`/onboarding/query?question=${question}`);
} 

export const getChartStart = (): Promise<IChartStartResponse> => {
  return api.get(`/onboarding/start`);
}

export const deleteChatHistory = () => {
  return api.post(`/onboarding/delete_chat_history`);
}