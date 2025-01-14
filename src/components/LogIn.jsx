import { useFormik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/usersService";
import { jwtDecode } from "jwt-decode";
import { errorMsg, successMsg } from "../services/feedbackService";

function LogIn({ setIsLoggedIn }) {
    let nav = useNavigate();

    let formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: yup.object({
            email: yup.string().required().email(),
            password: yup
                .string()
                .required()
                .min(8)
                .matches(/[!@%$#^&*-_*]/),
        }),
        onSubmit: (values) => {
            loginUser(values)
                .then((res) => {
                    if (res) {
                        nav("/");
                        let userToken = res;
                        localStorage.setItem("token", userToken);
                        setIsLoggedIn(true);
                        successMsg("User logged in succefully");
                    }
                })
                .catch((error) => {
                    errorMsg("User does not exist please register first!");
                });
        },
    });
    return (
        <>
            <div
                className="login-form"
                style={{
                    marginTop: "90px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "100%",
                    gap: "60px",
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
                        <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" name="email" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        <label htmlFor="floatingInput">Email address</label>
                        {formik.touched.email && formik.errors.email && <p className="text-danger">{formik.errors.email}</p>}
                    </div>
                    <div className="form-floating" style={{ margin: "30px", width: "350px" }}>
                        <input type="password" className="form-control" id="floatingPassword" placeholder="Password" name="password" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        <label htmlFor="floatingPassword">Password</label>
                        {formik.touched.password && formik.errors.password && <p className="text-danger">{formik.errors.password}</p>}
                    </div>
                    <button className="btn btn-dark" type="submit" disabled={!formik.dirty || !formik.isValid}>
                        login
                    </button>
                    <p>
                        Don't have an account? <Link to={"/signup"}>Sign-Up</Link>
                    </p>
                </form>
            </div>
        </>
    );
}

export default LogIn;
