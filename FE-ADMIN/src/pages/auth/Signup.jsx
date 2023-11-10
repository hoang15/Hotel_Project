import { Link } from "react-router-dom";
import authStyles from "../../css/auth.module.css";

const Login = () => {
  return (
    <div className={authStyles.authContainer}>
      <div className={authStyles.center}>
        <div className={authStyles.container}>
          <label
            htmlFor="show"
            className={`${authStyles["close-btn"]} fas fa-times`}
            title="close"
          ></label>
          <div className={authStyles.text}>Sign up Form</div>
          <form action="#">
            <div className={authStyles.data}>
              <label>Email</label>
              <input type="text" required />
            </div>
            <div className={authStyles.data}>
              <label>Password</label>
              <input type="password" required />
            </div>
            <div className={authStyles.data}>
              <label>Confirm Password</label>
              <input type="password" required />
            </div>
            <div className={authStyles.btn}>
              <div className={authStyles.inner}></div>
              <button type="submit">Sign up</button>
            </div>
            <div className={authStyles["signup-link"]}>
              You are member? <Link to={"/login"}>Sign in now</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
