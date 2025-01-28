import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import Chat from "components/chat/chat.component";
import { Search2 } from "assets";
import './search.style.scss';

type QuestionGroups = Record<string, string[]>;

const questionGroups: QuestionGroups = {
  "Ориентация в компании": [
    "Каковы основные ценности компании?",
    "Какие инструменты используются для внутреннего общения?",
    "Каковы основные направления деятельности компании?",
    "Как я могу получить доступ к корпоративным ресурсам?",
    "Кто мои непосредственные руководители?"
  ],
  "Рабочее место": [
    "Где находится мое рабочее место?",
    "Какие правила касаются личного пространства на работе?",
    "Есть ли специальные требования к одежде?",
    "Какие есть ограничения по использованию личных устройств?",
    "Что делать, если мне нужны канцелярские принадлежности?"
  ],
  "Режим работы": [
    "Какие часы работы установлены в компании?",
    "Есть ли гибкий график работы?",
    "Как контролируются часы прихода и ухода?",
    "Что делать если я опоздаю на работу?",
    "Как регулируются перерывы?"
  ],
  "Безопасность и здоровье": [
    "Какие меры безопасности существуют на рабочем месте?",
    "Что делать в случае аварии или пожара?",
    "Какие требования к ношению медицинских масок?",
    "Где находится аптечка первой помощи?",
    "К кому обращаться в случае травмы на работе?"
  ],
  "Оплата труда": [
    "Как рассчитывается моя заработная плата?",
    "Какие надбавки и бонусы предусмотрены?",
    "Когда происходит выплата зарплаты?",
    "Как происходит учет рабочего времени?",
    "Как обсудить повышение зарплаты?"
  ],
  "Отпуск и больничный": [
    "Какие правила по получению отпуска?",
    "Сколько дней отпуска мне положено?",
    "Как оформить больничный?",
    "Есть ли компенсация за неиспользованный отпуск?",
    "Как происходит расчет компенсации за больничные дни?"
  ],
  "Карьерное развитие": [
    "Какие возможности для профессионального развития предлагает компания?",
    "Какие требования для продвижения по службе?",
    "Есть ли в компании система наставничества?",
    "Как часто проходят оценки результатов работы?",
    "Какие курсы и тренинги доступны для повышения квалификации?"
  ]
};

interface IProps {
  isChatOpen: boolean;
  setIsChatOpenAction: Dispatch<SetStateAction<boolean>>;
  searchValue: string;
  setSearchValueAction: Dispatch<SetStateAction<string>>;
  msgs: any[];
  handleSearchAction: (msg: string, dropChatId?: boolean) => void;
  isLoading: boolean;
}

export default function Search({
  isChatOpen,
  setIsChatOpenAction,
  setSearchValueAction,
  searchValue,
  msgs,
  handleSearchAction,
  isLoading,
}: IProps) {
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const buttonGroupRef = useRef<HTMLDivElement>(null);

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValueAction(target.value);
  };

  const handleSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  const closeChat = () => setIsChatOpenAction(false);

  const onSearch = () => {
    if (searchValue.trim()) {
      handleSearchAction(searchValue);
    }
  }

  const handleGroupClick = (group: string) => {
    setActiveGroup(group);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (buttonGroupRef.current && !buttonGroupRef.current.contains(event.target as Node)) {
      setActiveGroup(null); // Return to group buttons
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setActiveGroup(null);
  }, [isChatOpen]);

  return (
    <div
      className={`search__wrapper ${isChatOpen ? 'open' : ""}`}
    >
      {isChatOpen ? (
        <Chat
          messages={msgs}
          handleSendMessage={handleSearchAction}
          handleClose={closeChat}
          isLoading={isLoading}
        />
      ) : (
        <>
          <input
            type="text"
            className={'search__input'}
            value={searchValue}
            onChange={handleChange}
            onKeyUp={handleSubmit}
            placeholder="Введите запрос"
            onFocus={() => {
              if (msgs.length > 0) {
                setIsChatOpenAction(true);
              }
            }}
          />
          <button
            type="button"
            className={'search__button'}
            onClick={onSearch}
          >
            <Search2 />
          </button>

          <div className={`button-group ${activeGroup !== null ? 'active' : ""}`} ref={buttonGroupRef}>
            {activeGroup === null ? (
              Object.keys(questionGroups).map((group) => (
                <button
                  key={group}
                  type="button"
                  className="group-button"
                  onClick={() => handleGroupClick(group)}
                >
                  {group}
                </button>
              ))
            ) : (
              questionGroups[activeGroup].map((question: string) => (
                <button
                  key={question}
                  type="button"
                  className="subgroup-button"
                  onClick={() => handleSearchAction(question, true)}
                >
                  {question}
                </button>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
}