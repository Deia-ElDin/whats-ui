import { IconButton } from '@mui/material';

function Icon({ icon, className, title, handleClick }) {
  return (
    <IconButton>
      <i className={className} title={title} onClick={handleClick}>
        {icon}
      </i>
    </IconButton>
  );
}

Icon.defaultProps = {
  className: 'icon',
};

export default Icon;
