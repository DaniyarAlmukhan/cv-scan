import React, { useEffect, useRef, useState } from "react";
import { CopyIcon, Send } from "assets";
import Search from "components/search-chat/search-chat.component";
import './onboarding.style.scss';
import { getChatResponse } from "requests/onboarding.request";

const OnboardingPage = () => {
  const [isChatOpen, setIsChatOpen] = React.useState<boolean>(false);
  const [searchValue, setSearchValue] = React.useState<string>("");
  const [msgs, setMsgs] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSearch = (msg: string, dropChatId = false) => {
    if (dropChatId) {
      const newChatId = `${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;
      localStorage.setItem("chat_id", newChatId);
      setMsgs([]);
    }

    const chatId = localStorage.getItem("chat_id");

    if (chatId) {
      setIsChatOpen(true);
      const timestamp = new Date().toLocaleTimeString();

      const newMessage: any = {
        role: "user",
        content: msg,
        time: timestamp,
      };
      setMsgs((prevMsgs) => [...prevMsgs, newMessage]);
      setIsLoading(true);

      // const chatKey = msg === internet_msg || msgs[0]?.content === internet_msg ? ChatKey.INTERNET : ChatKey.OTHERS;

      getChatResponse(msg)
        .then((response) => {
          console.log(response)
        })
        .catch(() => {
          const botMessage: any = {
            role: "assistant",
            content: 'Произошла ошибка, попробуйте еще раз',
            time: new Date().toLocaleTimeString(),
          };
          setMsgs((prevMsgs) => [...prevMsgs, botMessage]);
        })
        .finally(() => setIsLoading(false));

      // getChatAnswerV2(chatId, msg, chatKey).then((response) => {
      //   const botMessage: IMessage = {
      //     role: "assistant",
      //     content: response.text,
      //     time: new Date().toLocaleTimeString(),
      //   };
      //   setMsgs((prevMsgs) => [...prevMsgs, botMessage]);
      // })
      //   .catch(() => {
      //     const botMessage: IMessage = {
      //       role: "assistant",
      //       content: 'Произошла ошибка, попробуйте еще раз',
      //       time: new Date().toLocaleTimeString(),
      //     };
      //     setMsgs((prevMsgs) => [...prevMsgs, botMessage]);
      //   })
      //   .finally(() => setIsLoading(false));

      setSearchValue("");
    }
  };

  useEffect(() => {
    let storedChatId = localStorage.getItem("chat_id");
    if (!storedChatId) {
      const newChatId = `${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;
      localStorage.setItem("chat_id", newChatId);
      storedChatId = newChatId;
    }
  }, []);


  return (
    <div className="main">
      <section
        className={`${'main__help'} ${isChatOpen ? 'open' : ""}`}
      >
        <div className={'main__help__wrapper'}>
          {!isChatOpen && (
            <>
              <h1 className={'main__title'}>Добро пожаловать в команду АО «Транстелеком»! Используйте наш портал для быстрого доступа к информации и помощи.</h1>
              <h2 className={'main__subtitle'}>Выберите тему ниже или задайте вопрос нашему чат-боту</h2>

            </>
          )}
          <Search
            handleSearchAction={handleSearch}
            msgs={msgs}
            isChatOpen={isChatOpen}
            setIsChatOpenAction={setIsChatOpen}
            searchValue={searchValue}
            setSearchValueAction={setSearchValue}
            isLoading={isLoading}
          />
        </div>
      </section>
    </div>

  );
};

export default OnboardingPage;
