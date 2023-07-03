import { useState } from 'react';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import Icon from '../../../../helpers/components/Icon';

function Doc({ doc }) {
  const [docInput, setDocInput] = useState('');

  return (
    doc.selected && (
      <div className="doc">
        <img
          className={`${doc.type === 'photo/video' ? 'photosVideos' : 'file'}`}
          src={doc.src}
          alt={doc.name}
        />
        <div className="messageDiv">
          <input
            type="text"
            className="messageInput"
            placeholder="Type a message"
            value={docInput}
            onChange={(e) => setDocInput(e.target.value)}
          />
          <Icon icon=<InsertEmoticonIcon className="emojiIcon" /> />
        </div>
      </div>
    )
  );
}

export default Doc;
