import React, { useEffect, useRef, useState } from "react";
import "./chat.style.scss";
import { BotAvatar, CloseIcon, CopyIcon } from "assets";
import { SendIcon } from "lucide-react";

interface IProps {
  messages: any[];
  handleSendMessage: (message: string, clearChat?: boolean) => void;
  handleClose?: VoidFunction;
  isLoading?: boolean;
}

const option2Questions = [
  "Каковы основные ценности компании?",
  "Какие инструменты используются для внутреннего общения?",
  "Каковы основные направления деятельности компании?",
  "Как я могу получить доступ к корпоративным ресурсам?",
  "Кто мои непосредственные руководители?",
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
    return text?.split("\n").map((line, index) => (
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
    ));
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className={'full_chat'}>
      <div ref={chatBodyRef} className={`full_chat__body ${isSecondOption ? 'second-option' : ''}`}>
        {messages?.map((msg: any, index: number) => (
          <div
            key={index}
            className={`${'full_chat__message'} ${msg.role}`}
          >
            <div className={'full_chat__message__top'}>
              {msg.role === "assistant" && (
                <BotAvatar />
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
            <BotAvatar />
            <div className={'full_chat__loading-container'}>
              <div className={'full_chat__loading-icon'}></div>
            </div>
          </div>
        )}
      </div>
      <div className={'full_chat__footer'}>
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
