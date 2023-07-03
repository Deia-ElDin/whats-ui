import { useId } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import NavigationIcon from '@mui/icons-material/Navigation';
import AddIcon from '@mui/icons-material/Add';
import Header from '../../comp/Header';
import Doc from './doc/Doc';
import Icon from '../../../helpers/components/Icon';
import AttachFile from '../chatPage/actions/AttachFile';
import { useMsgContext } from '../../../../context/MessageContext';

function DocPage() {
  const {
    message,
    setMessage,
    sendMessage,
    sendMultipleMessages,
    dispatch,
    docs,
    addDocument,
    editDocument,
    viewDocument,
  } = useMsgContext();

  const handleChange = (e) => {
    dispatch(editDocument(e.target.value));
    // setMessage((prev) => ({ ...prev, content: e.target.value }));
  };

  const handleSendMessage = (e) => {
    sendMessage(e);
    dispatch(addDocument(null));
  };

  const handleSendMultipleMessages = (e) => {
    sendMultipleMessages(e);
    dispatch(addDocument(null));
  };

  return (
    <>
      <Header />
      <div className="docPage">
        <CloseIcon
          className="closeIcon"
          onClick={() => dispatch(addDocument(null))}
        />

        {docs.map((doc) => (
          <Doc key={doc.src} doc={doc} />
        ))}

        <form className="docForm">
          <fieldset className="attachField">
            <figure className="photosBlocks">
              {docs.map((doc, index) => (
                <img
                  key={doc.src}
                  src={doc.src}
                  alt={index}
                  className={`${doc.selected ? 'selected' : 'unselected'}`}
                  onClick={() => dispatch(viewDocument(index))}
                />
              ))}
            </figure>
            {docs.find((doc) => doc.selected).type === 'photo/video' ? (
              <AttachFile
                btnClass="photoVideoBtn"
                btnTitle="Add"
                icon=<AddIcon />
                id="photo/video"
              />
            ) : (
              <AttachFile
                btnClass="documentBtn"
                btnTitle="Add"
                icon=<AddIcon />
                id="document"
              />
            )}

            <button
              className="sendMessageBtn"
              onClick={handleSendMultipleMessages}
            >
              <NavigationIcon className="sendMessageIcon" />
            </button>
          </fieldset>
        </form>
      </div>
    </>
  );
}

export default DocPage;
