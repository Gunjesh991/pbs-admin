import { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { auth, initializeCaptcha } from "../../../utils/firebase";
import { useLocation, useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [phoneSent, setPhoneSent] = useState(false);
  const { signInPhone, confirmPhoneSignIn, isSignedIn } = useAuth();
  const [phoneDetails, setPhoneDetails] = useState({ phone: "", code: "" });

  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    if (!isSignedIn) return;
    if (state && state.from) {
      navigate(state.from.pathname, { replace: true });
    } else navigate("/admin/photographers", { replace: true });
  }, [isSignedIn]);

  const updatePhoneDetails = (field) => (e) => {
    setPhoneDetails((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  useEffect(() => {
    if (auth && !auth.currentUser) initializeCaptcha();
    return () => {
      window.recaptchaVerifier = null;
    };
  }, [auth]);

  const onPhoneSubmit = (e) => {
    e.preventDefault();
    signInPhone("+977" + phoneDetails.phone).then(() => {
      setPhoneSent(true);
    });
  };
  const onCodeSubmit = (e) => {
    e.preventDefault();
    confirmPhoneSignIn(phoneDetails.code).then(() => {});
  };

  return (
    <div className="safe" style={{ marginTop: 150 }}>
      <div className="admin__login">
        {!phoneSent ? (
          <div className="login">
            <form onSubmit={onPhoneSubmit}>
              <div className="input__field">
                <label htmlFor="phone">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  value={phoneDetails.phone}
                  onChange={updatePhoneDetails("phone")}
                />
              </div>
              <div id="admin-signin-cap"></div>
              <button id="admin-signin">Sign In</button>
            </form>
          </div>
        ) : (
          <div className="confirmation">
            <form onSubmit={onCodeSubmit}>
              <div className="input__field">
                <label htmlFor="confirmation">Code</label>
                <input
                  type="text"
                  name="confirmation"
                  id="confirmation"
                  value={phoneDetails.code}
                  onChange={updatePhoneDetails("code")}
                />
              </div>
              <button>Confirm</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminLogin;
