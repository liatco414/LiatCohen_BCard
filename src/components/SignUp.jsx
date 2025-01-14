import { errorMsg, successMsg } from "../services/feedbackService";
import { useFormik } from "formik";
import * as yup from "yup";
import { addUser, loginUser } from "../services/usersService";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import LoggedInNavBar from "./LoggedInNavBar";

function SignUp({ setIsLoggedIn, onHide }) {
    const [isBusiness, setIsBusiness] = useState(false);

    const handleBusinessUser = () => {
        const userToken = localStorage.getItem("token");

        if (userToken) {
            const decoded = jwtDecode(userToken);
            const business = Boolean(decoded.isBusiness);
            setIsBusiness(business);
        }
    };
    let formik = useFormik({
        initialValues: {
            name: {
                first: "",
                middle: "",
                last: "",
            },
            email: "",
            password: "",
            phone: "",
            image: {
                url: "",
                alt: "",
            },
            address: {
                state: "",
                country: "",
                city: "",
                street: "",
                houseNumber: "",
                zip: "",
            },
            isBusiness: "",
        },
        validationSchema: yup.object({
            name: yup
                .object({
                    first: yup.string().min(2).max(256).required(),
                    middle: yup.string().min(2).max(256),
                    last: yup.string().min(2).max(256).required(),
                })
                .required(),
            email: yup.string().required().min(5).email(),
            password: yup
                .string()
                .required("Password is required")
                .min(7)
                .max(20)
                .matches(/[a-z]/, "Password must contain at least one lowercase letter")
                .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
                .matches(/(?:.*\d){1,}/, "Password must contain at least one digits")
                .matches(/[!@%$#^&*-_*(]/, "Password must contain at least one of the special character: (!@%$#^&*-_*)"),
            phone: yup.string().min(9).max(11).required(),
            image: yup.object({
                url: yup.string().min(14).url("Invalid URL format"),
                alt: yup.string().min(2, "Alt text must be at least 2 characters").max(256),
            }),
            address: yup.object({
                state: yup.string().min(2).max(256),
                country: yup.string().required().min(2).max(256),
                city: yup.string().required().min(2).max(256),
                street: yup.string().required().min(2).max(256),
                houseNumber: yup.number().required().min(2).max(256),
                zip: yup.number().required().matches(/^\d+$/, "Zip code must be a valid number").min(2).max(256),
            }),
        }),
        onSubmit: async (values) => {
            try {
                let response = await addUser(values);
                console.log("User Added Response:", response);

                if (response) {
                    setIsLoggedIn(true);
                    onHide();
                    successMsg("User registered successfully");
                    handleBusinessUser();
                }
            } catch (error) {
                console.log(error);

                errorMsg("An error occured while signing up, please try again later");
            }
        },
    });
    return (
        <>
            <div className="containerRegister" style={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                <form className="form-floating" onSubmit={formik.handleSubmit} style={{ width: "90%" }}>
                    <div className="rowOne" style={{ display: "flex", gap: "20px" }}>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="inputFirstName" placeholder="First Name" name="name.first" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                            <label htmlFor="inputFirstName">First Name</label>
                            {formik.touched.name?.first && formik.errors.name?.first && <p className="text-danger">{formik.errors.name.first}</p>}
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="inputMiddleName" placeholder="Middle Name" name="name.middle" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                            <label htmlFor="inputMiddleName">Middle Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="inputLastName" placeholder="Last Name" name="name.last" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                            <label htmlFor="inputLastName">Last Name</label>
                            {formik.touched.name?.last && formik.errors.name?.last && <p className="text-danger">{formik.errors.name.last}</p>}
                        </div>
                    </div>
                    <div className="rowTwo" style={{ display: "flex", gap: "20px" }}>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="inputState" placeholder="State" name="address.state" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                            <label htmlFor="inputState">State</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="inputCountry" placeholder="Country" name="address.country" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                            <label htmlFor="inputCountry">Country</label>
                            {formik.touched.address?.country && formik.errors.address?.country && <p className="text-danger">{formik.errors.address.country}</p>}
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="inputCity" placeholder="City" name="address.city" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                            <label htmlFor="inputCity">City</label>
                            {formik.touched.address?.city && formik.errors.address?.city && <p className="text-danger">{formik.errors.address.city}</p>}
                        </div>
                    </div>
                    <div className="rowThree" style={{ display: "flex", gap: "20px" }}>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="inputStreet" placeholder="Street" name="address.street" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                            <label htmlFor="inputCinty">Street</label>
                            {formik.touched.address?.street && formik.errors.address?.street && <p className="text-danger">{formik.errors.address.street}</p>}
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="inputHouseNumber"
                                placeholder="House Number"
                                name="address.houseNumber"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <label htmlFor="inputCinty">House Number</label>
                            {formik.touched.address?.houseNumber && formik.errors.address?.houseNumber && <p className="text-danger">{formik.errors.address.houseNumber}</p>}
                        </div>
                        <div className="form-floating mb-3">
                            <input type="number" className="form-control" id="inputZip" placeholder="Zip" name="address.zip" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                            <label htmlFor="inputZip">Zip</label>
                            {formik.touched.address?.zip && formik.errors.address?.zip && <p className="text-danger">{formik.errors.address.zip}</p>}
                        </div>
                    </div>
                    <div className="rowFour" style={{ display: "flex", gap: "20px" }}>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="inputPhone" placeholder="Phone" name="phone" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                            <label htmlFor="inputZip">Phone</label>
                            {formik.touched.phone && formik.errors.phone && <p className="text-danger">{formik.errors.phone}</p>}
                        </div>
                        <div className="form-floating mb-3">
                            <input type="email" className="form-control" id="inputEmail" placeholder="name@example.com" name="email" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                            <label htmlFor="inputEmail">Email Adress</label>
                            {formik.touched.email && formik.errors.email && <p className="text-danger">{formik.errors.email}</p>}
                        </div>
                        <div className="form-floating mb-3">
                            <input type="url" className="form-control" id="inputImage" placeholder="Image URL" name="image.url" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                            <label htmlFor="inputImage">Image URL</label>
                        </div>
                    </div>
                    <div className="rowFive" style={{ display: "flex", gap: "20px" }}>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="inputAlt" placeholder="Image Alt" name="image.alt" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                            <label htmlFor="inputAlt">Image Alt</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="password" className="form-control" id="inputPassword" placeholder="Password" name="password" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                            <label htmlFor="inputPassword">Password</label>
                            {formik.touched.password && formik.errors.password && <p className="text-danger">{formik.errors.password}</p>}
                        </div>
                    </div>
                    <div className="submitBtn" style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "15px" }}>
                        <label>
                            <input type="checkbox" name="isBusiness" checked={formik.values.isBusiness} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                            <span style={{ margin: "5px" }}> Is this a business?</span>
                        </label>
                        <button className="btn btn-dark" type="submit">
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default SignUp;
