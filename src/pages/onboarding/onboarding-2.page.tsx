import React, { useEffect } from "react";
import Search from "components/search-chat/search-chat.component";
import './onboarding.style.scss';
import { getChatResponse } from "requests/onboarding.request";

const OnboardingPage2 = () => {
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

      getChatResponse(msg)
        .then((response) => {
          console.log(response)
          const botMessage: any = {
            role: "assistant",
            content: response.response,
            time: new Date().toLocaleTimeString(),
          };
          setMsgs((prevMsgs) => [...prevMsgs, botMessage]);
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

    // getChartStart().then((response) => {
    //   console.log(response)
    // });
  }, []);


  return (
    <div className="main">
      <section
        className={`main__help open `}
        style={{ paddingTop: 0 }}
      >
        <div className={'main__help__wrapper'}>
          <Search
            handleSearchAction={handleSearch}
            msgs={msgs}
            isChatOpen={true}
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

export default OnboardingPage2;
