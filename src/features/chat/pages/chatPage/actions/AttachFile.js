import { useDispatch } from 'react-redux';
import { addDocument } from '../../../../../app/slices/userSlice';
import { handleDocuments } from '../../../../helpers/fn';

function AttachFile({ btnClass, btnTitle, icon, id }) {
  const dispatch = useDispatch();

  const imgVideoExtensions = 'image/*,video/mp4,video/x-m4v,video/*';
  const documentsExtensions =
    '.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, application/pdf, application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document';

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const { src, type } = handleDocuments(reader.result);
      dispatch(
        addDocument({ name: file.name, src, type, content: '', selected: true })
      );
    };
  };

  const handleChange = (e) => {
    const files = e.target.files;
    console.log('files', files);
    for (let i = 0; i < files.length; i++) previewFile(files[i]);
  };

  return (
    <button className={btnClass} title={btnTitle} type="button">
      <label htmlFor={id} className="attachContainer">
        {icon}
        <input
          type="file"
          name={id}
          id={id}
          onChange={handleChange}
          accept={`${
            id === 'photo/video' ? imgVideoExtensions : documentsExtensions
          }`}
          multiple
        />
      </label>
    </button>
  );
}

export default AttachFile;
