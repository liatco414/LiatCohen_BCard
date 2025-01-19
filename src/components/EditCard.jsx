import { useFormik } from "formik";
import * as yup from "yup";
import { errorMsg, successMsg } from "../services/feedbackService";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editCardById, getCardById } from "../services/cardsService";
import "../css/formEdit.css";
import { appThemes, navBarThemes } from "../App";

function EditCard() {
    const [cardData, setCardData] = useState(null);
    const { cardId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCardData = async () => {
            try {
                const response = await getCardById(cardId);
                if (response) {
                    setCardData(response);
                }
            } catch (error) {
                errorMsg("Something went wrong, check if card exist");
            }
        };

        fetchCardData();
    }, [cardId]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: cardData || {
            _id: "",
            title: "",
            subtitle: "",
            description: "",
            phone: "",
            email: "",
            web: "",
            image: { url: "", alt: "", _id: "" },
            address: { country: "", city: "", street: "", houseNumber: "", zip: "", _id: "" },
            bizNumber: 0,
            likes: [],
            user_id: "",
            createdAt: new Date(),
            __v: 0,
        },
        validationSchema: yup.object({
            title: yup.string().min(2).max(256).required("Title is required"),
            subtitle: yup.string().min(2).max(256).required("Subtitle is required"),
            description: yup.string().min(2).max(1024).required("Description is required"),
            phone: yup.string().min(9).max(11).required("Phone is required"),
            email: yup.string().email("Invalid email").required("Email is required"),
            web: yup.string().url().nullable(),
            image: yup.object({
                url: yup.string().url("Must be a valid URL"),
                alt: yup.string().min(2).max(256),
                _id: yup.string().nullable(),
            }),
            address: yup.object({
                country: yup.string().required("Country is required"),
                city: yup.string().required("City is required"),
                street: yup.string().required("Street is required"),
                houseNumber: yup.number().required("House number is required"),
                zip: yup.string().nullable(),
                _id: yup.string().nullable(),
            }),
            bizNumber: yup.number(),
            likes: yup.array(),
            user_id: yup.string(),
            createdAt: yup.date(),
            __v: yup.number(),
        }),
        onSubmit: async (values) => {
            try {
                const response = await editCardById(cardId, values);
                if (response) {
                    setCardData(response);
                    successMsg("Card updated successfully");
                    navigate("/mycards");
                }
            } catch (error) {
                errorMsg("Failed to update card");
            }
        },
    });

    const theme = useContext(appThemes);

    return (
        <>
            <div className="form-container" style={{ backgroundColor: theme.background, color: theme.color }}>
                <h1>Edit Card</h1>
                <form className="form-floating form" onSubmit={formik.handleSubmit}>
                    <div className="row1">
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className={`form-control ${formik.touched.title && formik.errors.title ? "is-invalid" : formik.touched.title && !formik.errors.title ? "is-valid" : ""}`}
                                id="inputTitle"
                                placeholder="Title"
                                name="title"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.title || ""}
                            />
                            <label htmlFor="inputTitle">Title</label>
                            {formik.touched.title && formik.errors.title && <p className="text-danger">{formik.errors.title}</p>}
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className={`form-control ${formik.touched.subtitle && formik.errors.subtitle ? "is-invalid" : formik.touched.subtitle && !formik.errors.subtitle ? "is-valid" : ""}`}
                                id="inputSubtitle"
                                placeholder="Subtitle"
                                name="subtitle"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.subtitle || ""}
                            />
                            <label htmlFor="inputSubtitle">Subtitle</label>
                            {formik.touched.subtitle && formik.errors.subtitle && <p className="text-danger">{formik.errors.subtitle}</p>}
                        </div>
                    </div>
                    <div className="row2">
                        <div className="form-floating mb-3">
                            <textarea
                                form
                                className={`form-control ${
                                    formik.touched.description && formik.errors.description ? "is-invalid" : formik.touched.description && !formik.errors.description ? "is-valid" : ""
                                }`}
                                id="inputDescription"
                                placeholder="Description"
                                name="description"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.description || ""}
                                style={{ height: "130px", resize: "none" }}
                            ></textarea>
                            <label htmlFor="inputDescription">Description</label>
                            {formik.touched.description && formik.errors.description && <p className="text-danger">{formik.errors.description}</p>}
                        </div>
                        <div className="email-phone" style={{ display: "flex", flexDirection: "column" }}>
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className={`form-control ${formik.touched.phone && formik.errors.phone ? "is-invalid" : formik.touched.phone && !formik.errors.phone ? "is-valid" : ""}`}
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
                            <div className="form-floating mb-3">
                                <input
                                    type="email"
                                    className={`form-control ${formik.touched.email && formik.errors.email ? "is-invalid" : formik.touched.email && !formik.errors.email ? "is-valid" : ""}`}
                                    id="inputEmail"
                                    placeholder="name@example.com"
                                    name="email"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.email || ""}
                                />
                                <label htmlFor="inputEmail">Email Address</label>
                                {formik.touched.email && formik.errors.email && <p className="text-danger">{formik.errors.email}</p>}
                            </div>
                        </div>
                    </div>
                    <div className="row3">
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="inputWeb"
                                placeholder="Web"
                                name="web"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.web || ""}
                            />
                            <label htmlFor="inputWeb">Web</label>
                            {formik.touched.web && formik.errors.web && <p className="text-danger">{formik.errors.web}</p>}
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
                    <div className="row4">
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
                            />
                            <label htmlFor="inputAlt">Image Alt</label>
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
                    <div className="row5">
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className={`form-control ${
                                    formik.touched.address?.country && formik.errors.address?.country
                                        ? "is-invalid"
                                        : formik.touched.address?.country && !formik.errors.address?.country && formik.values.address?.country !== ""
                                        ? "is-valid"
                                        : ""
                                }`}
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
                                className={`form-control ${
                                    formik.touched.address?.city && formik.errors.address?.city
                                        ? "is-invalid"
                                        : formik.touched.address?.city && !formik.errors.address?.city && formik.values.address?.city !== ""
                                        ? "is-valid"
                                        : ""
                                }`}
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
                    <div className="row6">
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className={`form-control ${
                                    formik.touched.address?.street && formik.errors.address?.street
                                        ? "is-invalid"
                                        : formik.touched.address?.street && !formik.errors.address?.street && formik.values.address?.street !== ""
                                        ? "is-valid"
                                        : ""
                                }`}
                                id="inputStreet"
                                placeholder="Street"
                                name="address.street"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.address?.street || ""}
                            />
                            <label htmlFor="inputStreet">Street</label>
                            {formik.touched.address?.street && formik.errors.address?.street && <p className="text-danger">{formik.errors.address.street}</p>}
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className={`form-control ${
                                    formik.touched.address?.houseNumber && formik.errors.address?.houseNumber
                                        ? "is-invalid"
                                        : formik.touched.address?.houseNumber && !formik.errors.address?.houseNumber && formik.values.address?.houseNumber !== ""
                                        ? "is-valid"
                                        : ""
                                }`}
                                id="inputHouseNumber"
                                placeholder="House Number"
                                name="address.houseNumber"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.address?.houseNumber || ""}
                            />
                            <label htmlFor="inputHouseNumber">House Number</label>
                            {formik.touched.address?.houseNumber && formik.errors.address?.houseNumber && <p className="text-danger">{formik.errors.address.houseNumber}</p>}
                        </div>
                    </div>
                    <div className="lastRow">
                        <div className="form-floating mb-3">
                            <input
                                type="number"
                                className="form-control last"
                                id="inputZip"
                                placeholder="Zip"
                                name="address.zip"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.address?.zip || ""}
                            />
                            <label htmlFor="inputZip">Zip</label>
                        </div>
                    </div>

                    <div className="submitBtn">
                        <button className="btn btn-outline-dark" type="submit" style={{ backgroundColor: theme.color, color: theme.background }}>
                            Update Card
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default EditCard;
