import DoneAllIcon from '@mui/icons-material/DoneAll';
import { setTime } from '../../helpers/fn';

function TimeStamp({ createdAt, seen }) {
  return (
    <span className="timestamp">
      {setTime(createdAt)}
      {seen && (
        <i className="seen">
          <DoneAllIcon />
        </i>
      )}
    </span>
  );
}

export default TimeStamp;
