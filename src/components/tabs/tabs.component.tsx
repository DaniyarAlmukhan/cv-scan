import React, { FC, ReactNode } from 'react'
import './tabs.style.scss'
import { Text } from 'components/text.component'

interface IProps {
  tabs: { value: string, label: string, count?: number, icon?: ReactNode }[],
  activeTab: string;
  setActiveTab: (tab: string) => void;
  tabCounts?: { [key: string]: number };
}

const Tabs: FC<IProps> = ({ tabs, activeTab, setActiveTab, tabCounts }) => {
  return (
    <div className='tabs'>
      {
        tabs.map((tab) => (
          <div key={tab.value} className={`tabs__tab ${tab.value === activeTab ? 'active' : ''}`} onClick={() => setActiveTab(tab.value)}>
            {tab.icon && tab.icon} <Text fontSize='1.25rem' fontWeight={tab.value === activeTab ? 600 : 400}>{tab.label}</Text>
            {
              tabCounts && tabCounts[tab.value].toString()
                ? <div className={`tabs__count ${tab.value === activeTab ? 'active' : ''}`}>
                  <Text fontWeight={700} fontSize='0.75rem' color={tab.value === activeTab ? 'var(--color-green)' : '#898989'}>{tabCounts[tab.value]}</Text>
                </div>
                : null
            }
          </div>
        ))
      }
    </div>
  )
}

export default Tabs