import { useFormik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/usersService";
import { jwtDecode } from "jwt-decode";
import { errorMsg, successMsg } from "../services/feedbackService";
import { useContext } from "react";
import { appThemes } from "../App";

function LogIn({ setIsLoggedIn, setShowRegister }) {
    let nav = useNavigate();
    const theme = useContext(appThemes);

    let formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: yup.object({
            email: yup.string().min(5).required().email(),
            password: yup
                .string()
                .required()
                .min(7)
                .max(20)
                .matches(/[!@%$#^&*-_*]/),
        }),
        onSubmit: (values) => {
            loginUser(values)
                .then((res) => {
                    if (res) {
                        let userToken = res;
                        localStorage.setItem("token", userToken);
                        setIsLoggedIn(true);
                        successMsg("User logged in succefully");

                        nav("/");
                    }
                })
                .catch((error) => {
                    if (error.response && error.response.status === 401) {
                        errorMsg("Incorrect password or email, please try again.");
                    } else {
                        errorMsg("User does not exist, please register first.");
                    }
                });
        },
    });
    return (
        <>
            <div
                className="login-form"
                style={{
                    paddingTop: "90px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "100vh",
                    gap: "60px",
                    backgroundColor: theme.background,
                    color: theme.color,
                }}
            >
                <h1 style={{ fontSize: "3em", fontWeight: "900" }}>Log-in</h1>
                <form
                    onSubmit={formik.handleSubmit}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <div className="form-floating mb-3" style={{ margin: "30px", width: "350px" }}>
                        <input
                            type="email"
                            className="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                            name="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            style={{ width: "350px" }}
                        />
                        <label htmlFor="floatingInput">Email address</label>
                        {formik.touched.email && formik.errors.email && <p className="text-danger">{formik.errors.email}</p>}
                    </div>
                    <div className="form-floating" style={{ margin: "30px", width: "350px" }}>
                        <input
                            type="password"
                            className="form-control"
                            id="floatingPassword"
                            placeholder="Password"
                            name="password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            style={{ width: "350px" }}
                        />
                        <label htmlFor="floatingPassword">Password</label>
                        {formik.touched.password && formik.errors.password && <p className="text-danger">{formik.errors.password}</p>}
                    </div>
                    <button style={{ backgroundColor: theme.color, color: theme.background }} className="btn btn-dark" type="submit" disabled={!formik.dirty || !formik.isValid}>
                        login
                    </button>
                    <p>
                        Don't have an account? <Link onClick={() => setShowRegister(true)}>Sign-Up</Link>
                    </p>
                </form>
            </div>
        </>
    );
}

export default LogIn;
