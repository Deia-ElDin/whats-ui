import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FilterListIcon from '@mui/icons-material/FilterList';
import Icon from '../../helpers/components/Icon';
import Loading from '../../helpers/components/Loading';
import { useFindUserInDBQuery } from '../../../app/api/searchApiSlice';
import { selectUser } from '../../../app/slices/userSlice';
import {
  // selectSearchInputValue,
  // setSearchInputValue,
  setDisplayChatRooms,
  setSearchResult,
} from '../../../app/slices/sidebarSlice';

function Search() {
  const user = useSelector(selectUser);
  // const searchInputvalue = useSelector(selectSearchInputValue);
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');

  const [displayIcons, setDisplayIcons] = useState({
    searchIcon: true,
    backArrowIcon: false,
    closeIcon: false,
  });
  const [skip, setSkip] = useState(true);

  const { data, isLoading } = useFindUserInDBQuery(search, { skip });

  useEffect(() => {
    if (!search) {
      setSkip(true);
      dispatch(setDisplayChatRooms(true));
      dispatch(setSearchResult(null));
    }
  }, [search, dispatch]);

  useEffect(() => {
    if (data) {
      const { user } = data;
      dispatch(setSearchResult({ server: [user] }));
      setSkip(true);
    }
  }, [data, user, dispatch]);

  const handleFocus = () => {
    setDisplayIcons({
      searchIcon: false,
      backArrowIcon: true,
      closeIcon: false,
    });
  };

  const handleBlur = () => {
    setSkip(true);
    setDisplayIcons({
      searchIcon: true,
      backArrowIcon: false,
      closeIcon: false,
    });
  };

  const handleEscape = (e) => {
    if (e.key === 'Escape') handleBlur();
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
    dispatch(setDisplayChatRooms(false));
    setSkip(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSkip(false);
  };

  return (
    <div className="search">
      <form className="searchForm">
        {displayIcons.searchIcon && (
          <Icon icon={<SearchOutlinedIcon />} title="Status" />
        )}

        {displayIcons.backArrowIcon && (
          <Icon icon={<ArrowDownwardIcon className="backIcon" />} />
        )}

        <input
          type="text"
          placeholder="Search or start new chat"
          value={search}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleEscape}
        />
        {isLoading && <Loading />}
        <button className="search-btn" onClick={handleSubmit}>
          search
        </button>
      </form>
      <Icon icon={<FilterListIcon />} title="Unread chats filter" />
    </div>
  );
}

export default Search;
