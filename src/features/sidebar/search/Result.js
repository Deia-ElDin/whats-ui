import { useState, useEffect } from 'react';

function Result({ listName, list, addContact, startNewChat }) {
  const [renderResult, setRenderResult] = useState([]);

  useEffect(() => {
    setRenderResult(
      list.map((user) => (
        <li key={user._id}>
          <p>{user.email ?? user.phoneNumber ?? ''}</p>
          <div className="buttons">
            {addContact && (
              <button onClick={() => addContact(user)}>Add Contact</button>
            )}
            {startNewChat && (
              <button onClick={() => startNewChat(user)}>Start new chat</button>
            )}
          </div>
        </li>
      ))
    );
  }, [list, addContact, startNewChat]);

  return (
    <div className="result">
      <h2 className="listName">{listName}</h2>
      <ul>{renderResult}</ul>
    </div>
  );
}

export default Result;
