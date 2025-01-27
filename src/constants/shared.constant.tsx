import React from 'react';
import { Adaptation, AdaptationActive, Candidates, CandidatesActive, Documents, DocumentsActive, Education, EducationActive, EnbekKz, HhKz, Home, HomeActive, LinkedIn, Statistics, StatisticsActive, Vacancies, VacanciesActive } from "assets";
import { Route, Source } from 'interfaces/shared.interface';

export const routes: Route[] = [
  // 'home',
  'vacancies',
  // 'candidates',
  // 'adaptation',
  // 'education',
  // 'documents'
  'onboarding'
];

export const routeToIcon: Record<Route, any> = {
  // home: {
  //   active: <HomeActive />,
  //   inactive: <Home />,
  // },
  vacancies: {
    active: <VacanciesActive />,
    inactive: <Vacancies />,
  },
  onboarding: {
    active: <StatisticsActive />,
    inactive: <Statistics />,
  }
  // candidates: {
  //   active: <CandidatesActive />,
  //   inactive: <Candidates />,
  // },
  // adaptation: {
  //   active: <AdaptationActive />,
  //   inactive: <Adaptation />,
  // },
  // education: {
  //   active: <EducationActive />,
  //   inactive: <Education />,
  // },
  // documents: {
  //   active: <DocumentsActive />,
  //   inactive: <Documents />,
  // },
}

export const sources: Source[] = ['linkedin', 'headhunter', 'enbek'];

export const sourceToIcon: Record<Source, any> = {
  "linkedin": <LinkedIn />,
  "headhunter": <HhKz />,
  "enbek": <EnbekKz />,
}
