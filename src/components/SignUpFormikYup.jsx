import { useFormik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { addUser, loginUser } from "../services/usersService";
import { errorMsg, successMsg } from "../services/feedbackService";

function SignUpFormikYup() {
    return useFormik({
        initialValues: {
            firstName: "",
            middleName: "",
            lastName: "",
            email: "",
            password: "",
            phone: "",
            image: {
                url: "",
                alt: "",
            },
            state: "",
            country: "",
            city: "",
            street: "",
            houseNumber: "",
            zip: "",
            isBusiness: false,
        },
        validationSchema: yup.object({
            firstName: yup.string().required().min(2),
            middleName: yup.string().min(2),
            lastName: yup.string().required().min(2),
            email: yup.string().required().email(),
            password: yup
                .string()
                .required("Password is required")
                .min(8)
                .matches(/[a-z]/, "Password must contain at least one lowercase letter")
                .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
                .matches(/(?:.*\d){4,}/, "Password must contain at least four digits")
                .matches(/[!@%$#^&*-_*(]/, "Password must contain at least one of the special character: (!@%$#^&*-_*)"),
            phone: yup
                .string()
                .required()
                .min(10)
                .matches(/^\d{10}$/, "Phone number must contain 10 digits"),
            image: yup.object({
                url: yup.string().url("Invalid URL format"),
                alt: yup.string().min(3, "Alt text must be at least 3 characters"),
            }),
            state: yup.string().min(3),
            country: yup.string().required().min(3),
            city: yup.string().required().min(3),
            street: yup.string().required().min(3),
            houseNumber: yup.string().required().min(1),
            zip: yup.number().required(),
        }),
        onSubmit: (values, { resetForm }) => {
            try {
                const res = loginUser(values);
                if (res._id) {
                    errorMsg("User already exists, please try to login");
                } else {
                    const addUserResponse = addUser(values); // חכה לתגובה מה-API
                    console.log(addUserResponse); // הדפס את התגובה אם יש צורך
                    let userId = addUserResponse._id;
                    localStorage.setItem("userId", userId); // שים את ה-userId ב-localStorage
                    successMsg("User registered successfully");
                    navigate("/some-path"); // אם תרצה לנווט לאיזו מסך לאחר ההרשמה
                }
            } catch (error) {
                console.log(error);
                errorMsg("There was an error during the process.");
            }
        },
    });
    return <></>;
}

export default SignUpFormikYup;
