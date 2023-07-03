import { useRef } from 'react';
import Icons from './icons/Icons';
import Content from './content/Content';
import Options from './options/Options';

function Message({ date, sent, message, firstMessage, lastMessage }) {
  const { _id, content, document, createdAt } = message;

  const firstMessageRef = useRef();
  const lastMessageRef = useRef();

  // console.log('attachedFiles', attachedFiles);

  return (
    <div
      className="message"
      id={_id}
      ref={firstMessage ? firstMessageRef : lastMessage ? lastMessageRef : null}
    >
      <div className={`${sent ? 'sentMessage' : 'receivedMessage'}`}>
        {date && <span className="date">{date}</span>}
        <div className="messageContainer">
          <Icons content={content} />
          <Content
            content={content}
            document={document}
            createdAt={createdAt}
            seen={true}
          />
          <Options />
        </div>
      </div>
    </div>
  );
}

export default Message;
