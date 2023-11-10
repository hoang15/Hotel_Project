import { useNavigate } from "react-router-dom";
import authStyles from "../../css/auth.module.css";
import { useFormik } from "formik";
import * as yup from "yup";
import adminService from "../../services/admin.service";
import { AUTH_TOKEN } from "../../utils/constants";
import { useState } from "react";

const Login = () => {
  const [loginError, setLoginError] = useState(null);

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .required("Please enter your email!")
        .email("Invalid email format"),
      password: yup
        .string()
        .required("Please enter your password!")
        .min(8, "Minimum 8 characters"),
    }),
    onSubmit: async (values) => {
      try {
        const result = await adminService.signIn({
          identity: values.email,
          password: values.password,
        });
        localStorage.setItem(AUTH_TOKEN, result.data.token);
        navigate("/home");
      } catch (err) {
        setLoginError("Login unsuccessful. Please try again");
      }
    },
  });
  return (
    <div className={authStyles.authContainer}>
      <div className={authStyles.center}>
        <div className={authStyles.container}>
          <div className={authStyles.text}>Login Form</div>
          <form action="#" onSubmit={formik.handleSubmit}>
            <div className={authStyles.data}>
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              {formik.errors.email && formik.touched.email && (
                <div
                  className={`${authStyles["form-error"]}`}
                  style={{ marginTop: "5px" }}
                >
                  {formik.errors.email}
                </div>
              )}
            </div>
            <div className={authStyles.data}>
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              {formik.errors.password && formik.touched.password && (
                <div
                  className={`${authStyles["form-error"]}`}
                  style={{ marginTop: "5px" }}
                >
                  {formik.errors.password}
                </div>
              )}
            </div>
            {loginError && <div>{loginError}</div>}
            <div className={authStyles.btn}>
              <div className={authStyles.inner}></div>
              <button type="submit">Login</button>
            </div>

            {/* <div className={authStyles["signup-link"]}>
              Not a member? <Link to={"/signup"}>Signup now</Link>
            </div> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
