import { useState } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import OptionsBtns from '../../../../../../helpers/components/OptionsBtns';

function Options() {
  const [displayOptions, setDislayOptions] = useState(false);

  const messageInfo = (message) => {
    console.log('messageInfo');
  };
  const reply = (message) => {
    console.log('reply');
  };
  const reactToMessage = (message) => {
    console.log('reactToMessage');
  };
  const forwardMessage = (message) => {
    console.log('forwardMessage');
  };
  const starMessage = (message) => {
    console.log('starMessage');
  };
  const deleteMessage = (message) => {
    console.log('deleteMessage');
  };

  const handleFunctions = [
    messageInfo,
    reply,
    reactToMessage,
    forwardMessage,
    starMessage,
    deleteMessage,
  ];

  return (
    <>
      <ArrowForwardIosIcon
        className="arrowIcon"
        onClick={() => setDislayOptions(!displayOptions)}
      />
      {displayOptions && (
        <OptionsBtns
          className="OptionsBtns"
          btns="massgesBtns"
          handleFunctions={handleFunctions}
        />
      )}
    </>
  );
}

export default Options;
