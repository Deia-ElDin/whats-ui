const OptionsBtns = ({ className, btns, handleFunctions }) => {
  let dispayBtns;
  switch (btns) {
    case 'massgesBtns':
      dispayBtns = [
        'Message info',
        'Reply',
        'React to message',
        'Forward message',
        'Star message',
        'Delete message',
      ];
      break;
    case 'attachBtns':
      dispayBtns = ['Contact', 'Document', 'Photos & videos'];
      break;

    default:
      dispayBtns = null;
      break;
  }

  return (
    <div className={className}>
      {dispayBtns?.map((btn, index) => (
        <button key={btn} onClick={handleFunctions[index]}>
          {btn}
        </button>
      ))}
    </div>
  );
};

export default OptionsBtns;
