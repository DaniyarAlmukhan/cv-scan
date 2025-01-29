import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import Chat from "components/chat/chat.component";
import { Search2, Send } from "assets";
import './search.style.scss';
import { SendIcon } from "lucide-react";
import { getChartStart } from "requests/onboarding.request";

type QuestionGroups = Record<string, string[]>;

interface IProps {
  isChatOpen: boolean;
  setIsChatOpenAction: Dispatch<SetStateAction<boolean>>;
  searchValue: string;
  setSearchValueAction: Dispatch<SetStateAction<string>>;
  msgs: any[];
  handleSearchAction: (msg: string, dropChatId?: boolean) => void;
  isLoading: boolean;
  handleDeleteChatHistory: () => void;
}

export default function Search({
  isChatOpen,
  setIsChatOpenAction,
  setSearchValueAction,
  searchValue,
  msgs,
  handleSearchAction,
  isLoading,
  handleDeleteChatHistory
}: IProps) {
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const [popularQuestions, setPopularQuestions] = useState<QuestionGroups>({});
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
    getChartStart().then((response) => {
      setPopularQuestions(response.popular_questions);
    });
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
          handleDeleteChatHistory={handleDeleteChatHistory}
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
            <SendIcon />
          </button>

          <div className={`button-group ${activeGroup !== null ? 'active' : ""}`} ref={buttonGroupRef}>
            {activeGroup === null ? (
              Object.keys(popularQuestions).map((group) => (
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
              popularQuestions[activeGroup].map((question: string) => (
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