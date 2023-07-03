import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from 'firebase/auth';
import socket from '../../socket';
import { auth } from '../../firebase';
import { useSignInMutation } from '../../app/api/authApiSlice';
import { setUserData } from '../../app/slices/userSlice';
import { setCredentials } from '../../app/slices/authSlice';

function Google() {
  const [currentUser, setCurrentUser] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signInDB] = useSignInMutation();

  const handleSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    try {
      // firebase => sign in with google
      const data = await signInWithPopup(auth, provider);

      const {
        user: { displayName, photoURL, email },
      } = data;

      // mongoDB => sign in the user
      const { user, accessToken } = await signInDB({
        username: displayName,
        email,
        photoURL,
      }).unwrap();

      // socket.io => connect
      socket.connect();
      socket.emit('setup', user._id);

      // dispatch the data & navigate
      dispatch(setUserData({ ...user, photoURL }));
      dispatch(setCredentials({ accessToken }));
      navigate('/chats');
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (loggedInUser) => {
      setCurrentUser(loggedInUser);
    });

    return () => unsubscribe();
  }, []);

  // useEffect(() => {
  //   const signInFn = async () => {
  //     try {
  //       const { displayName, photoURL, email, phoneNumber } = currentUser;

  //       // mongo db => sign in the user
  //       const { user, accessToken } = await signInDB({
  //         username: displayName,
  //         email,
  //         photoURL,
  //         phoneNumber,
  //       }).unwrap();

  //       // socket.io => connect
  //       socket.connect();
  //       socket.emit('setup', user._id);

  //       // dispatch the data & navigate
  //       dispatch(setUserData({ ...user, photoURL }));
  //       dispatch(setCredentials({ accessToken }));
  //       setCurrentUser(null);
  //       navigate('/chats');
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  //   if (currentUser) {
  //     signInFn();
  //   }
  // }, [currentUser, signInDB, dispatch, navigate]);

  return (
    <div className="btnDiv">
      <img src={process.env.PUBLIC_URL + `/assets/google.svg`} alt="google" />
      <button onClick={handleSignInWithGoogle}>Sign In With Google</button>
    </div>
  );
}

export default Google;
