import { Link, useNavigate } from "react-router-dom";
import authStyles from "../../css/auth.module.css";
import { useFormik } from "formik";
import * as yup from "yup";
import authService from "../../services/Auth.service";
const Signup = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordConfirm: "",
      emailVisibility: "true",
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
      passwordConfirm: yup
        .string()
        .required("Required!")
        .oneOf([yup.ref("password")], "Password's not match"),
    }),
    onSubmit: async (values) => {
      try {
        await authService.signUp(values);
        navigate("/login");
      } catch (err) {
        console.log(err);
      }
    },
  });
  return (
    <div className={authStyles.authContainer}>
      <div className={authStyles.center}>
        <div className={authStyles.container}>
          <div className={authStyles.text}>Signup Form</div>
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
            <div className={authStyles.data}>
              <label>Confirm Password</label>
              <input
                type="password"
                name="passwordConfirm"
                value={formik.values.passwordConfirm}
                onChange={formik.handleChange}
              />
              {formik.errors.passwordConfirm &&
                formik.touched.passwordConfirm && (
                  <div
                    className={`${authStyles["form-error"]}`}
                    style={{ marginTop: "5px" }}
                  >
                    {formik.errors.passwordConfirm}
                  </div>
                )}
            </div>
            <div className={authStyles.btn}>
              <div className={authStyles.inner}></div>
              <button type="submit">Sign up</button>
            </div>

            <div className={authStyles["signup-link"]}>
              Not a member? <Link to={"/login"}>Signup now</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
