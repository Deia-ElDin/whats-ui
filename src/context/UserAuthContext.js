import { createContext, useContext, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  GoogleAuthProvider,
  signInWithPopup,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import socket from '../socket';
import { auth } from '../firebase';
import { useSignInMutation } from '../app/api/authApiSlice';
import { setUserData, cleareUserData } from '../app/slices/userSlice';
import { setCredentials, clearAccessToken } from '../app/slices/authSlice';

const userAuthContext = createContext();

export const UserAuthContextProvider = ({ children }) => {
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

      // socket.io => connect
      socket.connect();

      // mongo db => sign in the user
      const { user, accessToken } = await signInDB({
        username: displayName,
        email,
        photoURL,
      }).unwrap();

      console.log('user', user);
      // dispatch the data & navigate
      dispatch(setUserData({ ...user, photoURL }));
      dispatch(setCredentials({ accessToken }));
      navigate('/chats');
    } catch (err) {
      console.log(err);
    }
  };

  const setUpRecaptcha = (number) => {
    const recaptchaVerifier = new RecaptchaVerifier(
      'recaptcha-container',
      {},
      auth
    );
    recaptchaVerifier.render();
    return signInWithPhoneNumber(auth, number, recaptchaVerifier);
  };

  const handleSignOut = async () => {
    console.log('singging out');
    await signOut(auth);
    // setCurrentUser(null);
    dispatch(cleareUserData());
    dispatch(clearAccessToken());
    navigate('/');
  };

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (loggedInUser) => {
  //     setCurrentUser(loggedInUser);
  //   });

  //   return () => unsubscribe();
  // }, []);

  // useEffect(() => {
  //   const signInFn = async () => {
  //     // socket.io => connect
  //     const socketData = socket.connect();
  //     console.log('socketData', socketData);
  //     console.log('socketData.id', socketData.id);

  //     try {
  //       const { displayName, photoURL, email, phoneNumber } = currentUser;

  //       // mongo db => sign in the user
  //       const { user, accessToken } = await signInDB({
  //         username: displayName,
  //         email,
  //         photoURL,
  //         phoneNumber,
  //         socketId: socketData.id,
  //       }).unwrap();

  //       // dispatch the data & navigate
  //       dispatch(setUserData({ ...user, photoURL, socketId: socketData.id }));
  //       dispatch(setCredentials({ accessToken }));
  //       setCurrentUser(null);
  //       navigate('/chats');
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  //   if (currentUser) {
  //     console.log('currentUser', currentUser);

  //     signInFn();
  //   }
  // }, [currentUser, signInDB, dispatch, navigate]);

  // useEffect(() => {
  //   console.log('use effect clear data');

  //   // socket.on('disconnect', handleSignOut);

  //   socket.on('disconnect', () => {
  //     console.log('disconnect on'); // undefined
  //   });

  //   return () => socket.off('disconnect', handleSignOut);
  // });

  return (
    <userAuthContext.Provider
      value={{
        handleSignInWithGoogle,
        setUpRecaptcha,
        handleSignOut,
      }}
    >
      {children}
    </userAuthContext.Provider>
  );
};

export const useUserAuth = () => useContext(userAuthContext);
