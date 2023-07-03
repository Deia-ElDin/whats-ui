import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCESxNOGwcH6ZPeN67AVuVPMfGvfZKoobA',
  authDomain: 'whats-app-567d2.firebaseapp.com',
  projectId: 'whats-app-567d2',
  storageBucket: 'whats-app-567d2.appspot.com',
  messagingSenderId: '32627991178',
  appId: '1:32627991178:web:31ce4bcde3e9d293d18373',
  measurementId: 'G-7L8RB5NP2J',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;
