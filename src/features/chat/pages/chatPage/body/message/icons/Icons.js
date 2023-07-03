import ReplyRoundedIcon from '@mui/icons-material/ReplyRounded';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import Icon from '../../../../../../helpers/components/Icon';

function Icons({ content }) {
  return (
    <div className="icons">
      {content?.includes('www.') && (
        <Icon icon={<ReplyRoundedIcon className="forwardIcon" />} />
      )}
      <Icon icon={<InsertEmoticonIcon className="insertEmotions" />} />
    </div>
  );
}

export default Icons;
