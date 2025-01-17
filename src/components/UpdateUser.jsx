import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { getUserById, updateUser } from "../services/usersService";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { successMsg } from "../services/feedbackService";

function UpdateUser() {
    let [userUpdate, setUserUpdate] = useState(null);
    let { userId } = useParams();
    let nav = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                let response = await getUserById(userId);
                if (response) {
                    setUserUpdate(response);
                }
            } catch (error) {
                console.log(error.response?.data);
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
                    console.log(response);
                    successMsg("User is updated");
                    setUserUpdate(response);
                    nav(`/profile/${userId}`);
                }
            } catch (error) {
                console.log(error.response?.data);
            }
        },
    });

    return (
        <>
            <div
                className="containerRegister"
                style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", marginTop: "8%", marginBottom: "2%", gap: "10px" }}
            >
                <h1>Edit User</h1>
                <form
                    className="form-floating"
                    onSubmit={formik.handleSubmit}
                    style={{
                        width: "55%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        border: "1px solid grey",
                        padding: "20px",
                    }}
                >
                    <div className="rowOne" style={{ width: "100%", display: "flex", gap: "20px", alignItems: "center", justifyContent: "center" }}>
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
                                style={{ width: "320px" }}
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
                                style={{ width: "320px" }}
                            />
                            <label htmlFor="inputMiddleName">Middle Name</label>
                        </div>
                    </div>
                    <div className="rowTwo" style={{ width: "100%", display: "flex", gap: "20px", alignItems: "center", justifyContent: "center" }}>
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
                                style={{ width: "320px" }}
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
                                style={{ width: "320px" }}
                            />
                            <label htmlFor="inputState">State</label>
                        </div>
                    </div>
                    <div className="rowThree" style={{ width: "100%", display: "flex", gap: "20px", alignItems: "center", justifyContent: "center" }}>
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
                                style={{ width: "320px" }}
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
                                style={{ width: "320px" }}
                            />
                            <label htmlFor="inputCity">City</label>
                            {formik.touched.address?.city && formik.errors.address?.city && <p className="text-danger">{formik.errors.address.city}</p>}
                        </div>
                    </div>
                    <div className="rowFour" style={{ width: "100%", display: "flex", gap: "20px", alignItems: "center", justifyContent: "center" }}>
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
                                style={{ width: "320px" }}
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
                                style={{ width: "320px" }}
                            />
                            <label htmlFor="inputCinty">House Number</label>
                            {formik.touched.address?.houseNumber && formik.errors.address?.houseNumber && <p className="text-danger">{formik.errors.address.houseNumber}</p>}
                        </div>
                    </div>
                    <div className="rowFive" style={{ width: "100%", display: "flex", gap: "20px", alignItems: "center", justifyContent: "center" }}>
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
                                style={{ width: "320px" }}
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
                                style={{ width: "320px" }}
                            />
                            <label htmlFor="inputZip">Phone</label>
                            {formik.touched.phone && formik.errors.phone && <p className="text-danger">{formik.errors.phone}</p>}
                        </div>
                    </div>
                    <div className="rowSix" style={{ width: "100%", display: "flex", gap: "20px", alignItems: "center", justifyContent: "center" }}>
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
                                style={{ width: "320px" }}
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
                                style={{ width: "320px" }}
                            />
                            <label htmlFor="inputImage">Image URL</label>
                        </div>
                    </div>
                    <div className="rowSeven" style={{ width: "100%", display: "flex", gap: "20px", alignItems: "center", justifyContent: "center" }}>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="inputAlt"
                                placeholder="Image Alt"
                                name="image.alt"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.image?.alt || ""}
                                style={{ width: "420px" }}
                            />
                            <label htmlFor="inputAlt">Image Alt</label>
                        </div>
                    </div>

                    <div className="submitBtn" style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "15px" }}>
                        <button className="btn btn-dark" type="submit">
                            Update User
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default UpdateUser;
