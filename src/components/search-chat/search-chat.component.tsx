import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import Chat from "components/chat/chat.component";
import { Search2 } from "assets";
import './search.style.scss';

type QuestionGroups = Record<string, string[]>;

const questionGroups: QuestionGroups = {
  "О компании": [
    "Какова миссия и ценности компании?",
    "Какие основные направления деятельности у компании?",
    "Сколько лет компании, и какова её история?",
    "Какие достижения или проекты компании особенно важны?",
    "Какое место занимает компания на рынке телекоммуникаций?",
  ],
  "Режим работы и оплата труда": [
    "Какой график работы установлен в компании?",
    "Предусмотрен ли гибкий график или удалённая работа?",
    "Как рассчитывается заработная плата?",
    "Какие условия для получения стимулирующих надбавок?",
    "Что делать, если у меня возникли вопросы по начислению зарплаты?",
  ],
  "Социальная поддержка": [
    "Какие льготы предоставляются сотрудникам?",
    "Предусмотрена ли материальная помощь в сложных жизненных ситуациях?",
    "Какие выплаты доступны при рождении ребёнка или вступлении в брак?",
    "Есть ли поддержка сотрудников при уходе в ежегодный отпуск?",
    "Компания предоставляет подарки детям сотрудников?",
  ],
  "Корпоративная культура": [
    "Какие правила поведения действуют в офисе?",
    "Какой дресс-код установлен для сотрудников?",
    "Какие мероприятия организуются для сотрудников?",
    "Как поддерживается атмосфера доверия и взаимного уважения?",
    "Есть ли традиции, которыми гордится компания?",
  ],
  "Инструктажи": [
    "Где пройти инструктаж по технике безопасности?",
    "Как записаться на инструктаж по пожарной безопасности?",
    "Что нужно для прохождения инструктажа по информационной безопасности?",
    "Куда обращаться за пропуском в здание?",
    "Нужно ли обновлять инструктажи, и как часто?",
  ],
  "Сервисы компании": [
    "Как получить доступ к корпоративной почте?",
    "Какие функции доступны в Telegram-боте компании?",
    "Где можно найти внутренние нормативные документы компании?",
    "Как использовать портал для расчёта отпускных дней?",
    "Как создать заявку на техническую поддержку через email?",
  ],
  "Контакты": [
    "К кому обращаться по вопросам зарплаты?",
    "Как связаться с HR-менеджером для решения кадровых вопросов?",
    "Кто может помочь с технической поддержкой компьютера?",
    "Есть ли общий контакт для административных вопросов?",
    "Как связаться с канцелярией для служебной корреспонденции?",
  ],
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
            placeholder="Поиск"
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