import { UserAuthContextProvider } from '../../context/UserAuthContext';
import Google from './Google';
import Phone from './Phone';

function SignIn() {
  return (
    <UserAuthContextProvider>
      <section className="signin">
        <img
          src={process.env.PUBLIC_URL + '/assets/logo.svg'}
          alt="whats app"
        />
        <h1>Sign in to WhatsApp</h1>
        <div className="signInBtns">
          <Google />
          <Phone />
        </div>
      </section>
    </UserAuthContextProvider>
  );
}

export default SignIn;
