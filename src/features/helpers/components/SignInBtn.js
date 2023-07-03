function SignInBtn({ btnName, handleClick }) {
  return (
    <div className="btn">
      <img
        src={
          process.env.PUBLIC_URL +
          `/assets/${btnName.includes('Google') ? 'google.svg' : 'phone.svg'}`
        }
        alt={`${btnName.includes('Google') ? 'google' : 'phone'}`}
      />
      <button onClick={handleClick}>{btnName}</button>
    </div>
  );
}

export default SignInBtn;
