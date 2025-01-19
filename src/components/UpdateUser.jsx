import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import { getUserById, updateUser } from "../services/usersService";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { errorMsg, successMsg } from "../services/feedbackService";
import "../css/formEdit.css";
import { appThemes } from "../App";

function UpdateUser() {
    let [userUpdate, setUserUpdate] = useState(null);
    let { userId } = useParams();
    let nav = useNavigate();
    const theme = useContext(appThemes);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                let response = await getUserById(userId);
                if (response) {
                    setUserUpdate(response);
                }
            } catch (error) {
                errorMsg("Couldn't find user");
            }
        };
        fetchUser();
    }, [userId]);
    if (!userUpdate) {
        <p>Loading...</p>;
    }

    let formik = useFormik({
        enableReinitialize: true,
        initialValues: userUpdate || {
            name: {
                first: "",
                middle: "",
                last: "",
            },
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
            phone: yup.string().min(9).max(11).required(),
            image: yup.object({
                url: yup.string().min(14).url("Invalid URL format"),
                alt: yup.string().min(2, "Alt text must be at least 2 characters").max(256),
            }),
            address: yup.object({
                state: yup.string().min(0).max(256),
                country: yup.string().required("Country is required").min(2, "Country must contain at least 2 characters").max(256),
                city: yup.string().required("City is required").min(2, "City must contain at least 2 characters").max(256),
                street: yup.string().required("Street is required").min(2, "Street must contain at least 2 characters").max(256),
                houseNumber: yup.number().required("House Number is required").min(2, "House Number must contain at least 2 digits"),
                zip: yup.number().min(2, "Zip must contain at least 2 digits").required("zip is required"),
            }),
        }),
        onSubmit: async (values) => {
            try {
                const response = await updateUser(userId, values);
                if (response) {
                    successMsg("User is updated");
                    setUserUpdate(response);
                    nav(`/profile/${userId}`);
                }
            } catch (error) {
                errorMsg("Couldn't update user, please try again later");
            }
        },
    });

    return (
        <>
            <div className="form-container" style={{ backgroundColor: theme.background, color: theme.color }}>
                <h1>Edit User</h1>
                <form className="form-floating form" onSubmit={formik.handleSubmit}>
                    <div className="row1" style={{ backgroundColor: theme.background, color: theme.color }}>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="inputFirstName"
                                placeholder="First Name"
                                name="name.first"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.name?.first || ""}
                            />
                            <label htmlFor="inputFirstName">First Name</label>
                            {formik.touched.name?.first && formik.errors.name?.first && <p className="text-danger">{formik.errors.name.first}</p>}
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="inputMiddleName"
                                placeholder="Middle Name"
                                name="name.middle"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.name?.middle || ""}
                            />
                            <label htmlFor="inputMiddleName">Middle Name</label>
                        </div>
                    </div>
                    <div className="row2">
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="inputLastName"
                                placeholder="Last Name"
                                name="name.last"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.name?.last || ""}
                            />
                            <label htmlFor="inputLastName">Last Name</label>
                            {formik.touched.name?.last && formik.errors.name?.last && <p className="text-danger">{formik.errors.name.last}</p>}
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="inputState"
                                placeholder="State"
                                name="address.state"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.address?.state || ""}
                            />
                            <label htmlFor="inputState">State</label>
                        </div>
                    </div>
                    <div className="row3">
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="inputCountry"
                                placeholder="Country"
                                name="address.country"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.address?.country || ""}
                            />
                            <label htmlFor="inputCountry">Country</label>
                            {formik.touched.address?.country && formik.errors.address?.country && <p className="text-danger">{formik.errors.address.country}</p>}
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="inputCity"
                                placeholder="City"
                                name="address.city"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.address?.city || ""}
                            />
                            <label htmlFor="inputCity">City</label>
                            {formik.touched.address?.city && formik.errors.address?.city && <p className="text-danger">{formik.errors.address.city}</p>}
                        </div>
                    </div>
                    <div className="row4">
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="inputStreet"
                                placeholder="Street"
                                name="address.street"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.address?.street || ""}
                            />
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
                                value={formik.values.address?.houseNumber || ""}
                            />
                            <label htmlFor="inputCinty">House Number</label>
                            {formik.touched.address?.houseNumber && formik.errors.address?.houseNumber && <p className="text-danger">{formik.errors.address.houseNumber}</p>}
                        </div>
                    </div>
                    <div className="row5">
                        <div className="form-floating mb-3">
                            <input
                                type="number"
                                className="form-control"
                                id="inputZip"
                                placeholder="Zip"
                                name="address.zip"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.address?.zip || ""}
                            />
                            <label htmlFor="inputZip">Zip</label>
                            {formik.touched.address?.zip && formik.errors.address?.zip && <p className="text-danger">{formik.errors.address.zip}</p>}
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="inputPhone"
                                placeholder="Phone"
                                name="phone"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.phone || ""}
                            />
                            <label htmlFor="inputZip">Phone</label>
                            {formik.touched.phone && formik.errors.phone && <p className="text-danger">{formik.errors.phone}</p>}
                        </div>
                    </div>
                    <div className="row6">
                        <div className="form-floating mb-3">
                            <input
                                type="email"
                                className="form-control"
                                id="inputEmail"
                                placeholder="name@example.com"
                                name="email"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email || ""}
                            />
                            <label htmlFor="inputEmail">Email Adress</label>
                            {formik.touched.email && formik.errors.email && <p className="text-danger">{formik.errors.email}</p>}
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="url"
                                className="form-control"
                                id="inputImage"
                                placeholder="Image URL"
                                name="image.url"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.image?.url || ""}
                            />
                            <label htmlFor="inputImage">Image URL</label>
                        </div>
                    </div>
                    <div className="row7">
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control last"
                                id="inputAlt"
                                placeholder="Image Alt"
                                name="image.alt"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.image?.alt || ""}
                            />
                            <label htmlFor="inputAlt">Image Alt</label>
                        </div>
                    </div>

                    <div className="submitBtn">
                        <button className="btn btn-dark" type="submit" style={{ backgroundColor: theme.color, color: theme.background }}>
                            Update User
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default UpdateUser;
