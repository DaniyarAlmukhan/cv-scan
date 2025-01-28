import React, { useEffect, useRef, useState } from "react";
import "./chat.style.scss";
import { BotAvatar, CloseIcon, CopyIcon } from "assets";
import { SendIcon } from "lucide-react";
import BotAvatarPerson from 'assets/icons/bot_avatar.jpg'

interface IProps {
  messages: any[];
  handleSendMessage: (message: string, clearChat?: boolean) => void;
  handleClose?: VoidFunction;
  isLoading?: boolean;
}

const option2Questions = [
  "Как мне получить пропуск в здание?",
  "Где мне пройти инструктажи?",
  "Какие инструменты используются для внутреннего общения?",
  "Как я могу получить доступ к корпоративным ресурсам"
]

const Chat: React.FC<IProps> = ({
  messages,
  handleSendMessage,
  handleClose,
  isLoading,
}) => {
  const chatBodyRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [isSecondOption, setIsSecondOption] = useState(false);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(target.value);
  };

  const handleSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isLoading && e.key === "Enter") {
      handleSendMessage(query);
      setQuery('');
    }
  };

  useEffect(() => {
    if (window.location.pathname.includes('onboarding-2')) {
      setIsSecondOption(true);
    }
  }, []);

  const formatMessage = (text: string) => {
    return text?.split("\n").map((line, index) => {
      const trimmedLine = line.trim(); // Trim the line
      const headerMatch = trimmedLine.match(/^(#+)\s*(.*)/); // Match against trimmed line

      if (headerMatch) {
        const headerLevel = headerMatch[1].length; // Number of # characters
        const headerText = headerMatch[2]; // Text after the # characters

        switch (headerLevel) {
          case 1:
            return <h1 key={index}>{headerText}</h1>;
          case 2:
            return <h2 key={index}>{headerText}</h2>;
          case 3:
            return <h3 key={index}>{headerText}</h3>;
          case 4:
            return <h4 key={index}>{headerText}</h4>;
          case 5:
            return <h5 key={index}>{headerText}</h5>;
          case 6:
            return <h6 key={index}>{headerText}</h6>;
          default:
            return <span key={index}>{line}</span>;
        }
      }

      return (
        <React.Fragment key={index}>
          {line
            ?.split(/(\*\*.*?\*\*|\*)/)
            .map((part, i) => {
              if (part.startsWith("**") && part.endsWith("**")) {
                return <strong style={{ fontWeight: 600 }} key={i}>{part.slice(2, -2)}</strong>;
              } else if (part === "*") {
                return <br key={i} />;
              } else {
                return <span key={i}>{part}</span>;
              }
            })}
          {index < text?.split("\n").length - 1 && <br />}
        </React.Fragment>
      );
    });
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className={'full_chat'}>
      <div ref={chatBodyRef} className={`full_chat__body `}>
        {messages?.map((msg: any, index: number) => (
          <div
            key={index}
            className={`${'full_chat__message'} ${msg.role}`}
          >
            <div className={'full_chat__message__top'}>
              {msg.role === "assistant" && (
                <img src={BotAvatarPerson} alt="" />
              )}
              <div className={'full_chat__message__text'}>
                {msg.role === "assistant"
                  ? formatMessage(msg.content)
                  : msg.content}
              </div>
            </div>
            <div className={'full_chat__message__bottom'}>
              <div
                className={'full_chat__message__copy'}
                onClick={() => handleCopy(msg.content)}
              >
                <CopyIcon />
              </div>
              <div className={'full_chat__message__time'}>{msg.time}</div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className={'full_chat__message__top'}>
            <img src={BotAvatarPerson} alt="" />
            <div className={'full_chat__loading-container'}>
              <div className={'full_chat__loading-icon'}></div>
            </div>
          </div>
        )}
      </div>

      <div className="full_chat__open-chat-questions">
        {isSecondOption && option2Questions.map((question, index) => (
          <div
            key={index}
            className={'full_chat__open-chat-question'}
            onClick={() => !isLoading && handleSendMessage(question, true)}
          >
            {question}
          </div>
        ))}
      </div>
      <div className={'full_chat__footer'}>
        <input
          className={'full_chat__input'}
          value={query}
          onChange={handleChange}
          placeholder="Введите запрос"
          onKeyUp={handleSubmit}
        />
        <div
          className={'full_chat__send'}
          onClick={() => {
            if (!isLoading) {
              handleSendMessage(query);
              setQuery('');
            }
          }}
        >
          <SendIcon />
        </div>
      </div>

      {handleClose && (
        <div className={'full_chat__close'} onClick={handleClose}>
          <CloseIcon />
        </div>
      )}
    </div>
  );
};

export default Chat;
