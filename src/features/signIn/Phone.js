import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSignInMutation } from '../../app/api/authApiSlice';
import { setUserData } from '../../app/slices/userSlice';
import { setCredentials } from '../../app/slices/authSlice';
import { useUserAuth } from '../../context/UserAuthContext';
import socket from '../../socket';
import PhoneInput from 'react-phone-number-input';
import ErrorMsg from '../helpers/components/ErrorMsg';
import 'react-phone-number-input/style.css';

function Phone() {
  const [displayBtn, setDisplayBtn] = useState(true);
  const [value, setValue] = useState();
  const [confirmObj, setConfirmObj] = useState(false);
  const [otp, setOTP] = useState('');
  const [phoneErr, setPhoneErr] = useState(null);
  const { setUpRecaptcha } = useUserAuth();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signInDB] = useSignInMutation();

  const sendOTP = async (e) => {
    e.preventDefault();
    if (value) {
      try {
        const response = await setUpRecaptcha(value);
        setConfirmObj(response);
      } catch (err) {
        if (err.message?.includes('requests1')) {
          setPhoneErr('Too many requests');
        } else {
          setPhoneErr('Something went wrong, please try again later');
        }
      }
    }
  };

  const verifyOTP = async (e) => {
    e.preventDefault();
    console.log('confirmObj', confirmObj);
    if (!otp) return;
    try {
      const data = await confirmObj.confirm(otp);
      const {
        user: { phoneNumber },
      } = data;

      // socket.io => connect
      socket.connect();

      // mongo db => sign in the user
      const { user, accessToken } = await signInDB({
        phoneNumber,
      }).unwrap();

      // dispatch the data & navigate
      dispatch(setUserData({ ...user }));
      dispatch(setCredentials({ accessToken }));
      setDisplayBtn(true);
      setValue('');
      setConfirmObj(false);
      setOTP('');
      navigate('/chats');
    } catch (err) {
      console.log('err', err);
      if (err.message?.includes('invalid')) {
        setPhoneErr('Invalid verification code');
      } else if (err.message?.includes('expired')) {
        setPhoneErr('Code expired');
      } else {
        setPhoneErr('Something went wrong, please try again later');
      }
    }
  };

  const handleVerifyInputChange = (e) => {
    setPhoneErr(null);
    setOTP(e.target.value);
  };

  const handleCancel = () => {
    setDisplayBtn(true);
    setValue('');
    setOTP('');
    setConfirmObj(false);
    setPhoneErr(null);
  };

  return (
    <div className="phone">
      <ErrorMsg msg={phoneErr} />
      {displayBtn ? (
        <div className="btnDiv">
          <img src={process.env.PUBLIC_URL + `/assets/phone.svg`} alt="phone" />
          <button onClick={() => setDisplayBtn(false)}>
            Sign In With Phone Number
          </button>
        </div>
      ) : (
        <form className="phoneForm">
          {!confirmObj ? (
            <>
              <PhoneInput
                placeholder="Enter phone number"
                value={value}
                onChange={setValue}
                defaultCountry="AE"
              />
              <div className="controls">
                <button
                  className="cancelBtn"
                  type="button"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button className="otpBtn" onClick={sendOTP}>
                  Send OTP
                </button>
              </div>
              <div id="recaptcha-container"></div>
            </>
          ) : (
            <>
              <input
                type="text"
                placeholder="Verify OTP"
                value={otp}
                onChange={handleVerifyInputChange}
              />
              <div className="controls">
                <button
                  className="cancelBtn"
                  type="button"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button className="otpBtn" onClick={verifyOTP}>
                  Verify OTP
                </button>
              </div>
            </>
          )}
        </form>
      )}
    </div>
  );
}

export default Phone;
