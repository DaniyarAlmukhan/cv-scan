import React, { useEffect, useRef, useState } from "react";
import "./chat.style.scss";
import { BotAvatar, CloseIcon, CopyIcon } from "assets";
import { SendIcon } from "lucide-react";

interface IProps {
  messages: any[];
  handleSendMessage: (message: string) => void;
  handleClose?: VoidFunction;
  isLoading?: boolean;
}

const Chat: React.FC<IProps> = ({
  messages,
  handleSendMessage,
  handleClose,
  isLoading,
}) => {
  const chatBodyRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(target.value);
  };

  const handleSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage(query);
      setQuery('');
    }
  };

  const formatMessage = (text: string) => {
    return text?.split("\n").map((line, index) => (
      <React.Fragment key={index}>
        {line
          ?.split(/(\*\*.*?\*\*)/)
          .map((part, i) =>
            part.startsWith("**") && part.endsWith("**") ? (
              <strong key={i}>{part.slice(2, -2)}</strong>
            ) : (
              <span key={i}>{part}</span>
            ),
          )}
        {index < text?.split("\n").length - 1 && <br />}
      </React.Fragment>
    ));
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className={'full_chat'}>
      <div ref={chatBodyRef} className={'full_chat__body'}>
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
        <input
          className={'full_chat__input'}
          value={query}
          onChange={handleChange}
          placeholder="Поиск"
          onKeyUp={handleSubmit}
        />
        <div
          className={'full_chat__send'}
          onClick={() => {
            handleSendMessage(query);
            setQuery('');
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
