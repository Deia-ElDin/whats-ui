import { useSelector } from 'react-redux';
import { selectDocuments } from '../../../../../app/slices/userSlice';
import AttachFile from './AttachFile';
import PersonIcon from '@mui/icons-material/Person';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';

const AttachBtns = ({ handleFunctions }) => {
  const documents = useSelector(selectDocuments);

  return (
    <div className="attachBtns">
      {/* {documents.length >= 1 && <img src={documents[0]} alt="1" />} */}
      <button title="Contact" onClick={handleFunctions[0]}>
        <PersonIcon />
      </button>
      <AttachFile
        btnClass="documentBtn"
        btnTitle="Document"
        icon=<InsertDriveFileIcon />
        id="document"
      />
      <AttachFile
        btnClass="photoVideoBtn"
        btnTitle="Photos & Videos"
        icon=<PhotoSizeSelectActualIcon />
        id="photo/video"
      />
    </div>
  );
};

export default AttachBtns;
