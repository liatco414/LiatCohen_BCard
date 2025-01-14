import { useFormik } from "formik";
import * as yup from "yup";
import { newCard } from "../services/cardsService";
import { errorMsg, successMsg } from "../services/feedbackService";

function CreateCard() {
    let formik = useFormik({
        initialValues: {
            title: "",
            subtitle: "",
            description: "",
            phone: "",
            email: "",
            web: "",
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
            title: yup.string().min(2).max(256).required(),
            subtitle: yup.string().min(2).max(256).required(),
            description: yup.string().min(2).max(1024).required(),
            phone: yup.string().min(9).max(11).required(),
            email: yup.string().min(5).required().email(),
            web: yup.string().min(14),
            image: yup.object({
                url: yup.string().min(14),
                alt: yup.string().min(2).max(256),
            }),
            address: yup.object({
                state: yup.string(),
                country: yup.string().required(),
                city: yup.string().required(),
                street: yup.string().required(),
                houseNumber: yup.number().min(1).required(),
                zip: yup.number(),
            }),
        }),
        onSubmit: async (values) => {
            try {
                const response = await newCard(values);
                console.log("Card created successfully:", response);
                if (response) {
                    successMsg("Card created successfully");
                }
            } catch (error) {
                errorMsg("Failed to create card");
            }
        },
    });

    return (
        <>
            <form className="form-floating" onSubmit={formik.handleSubmit} style={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <div className="rowOne" style={{ display: "flex", gap: "40px" }}>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className={`form-control ${formik.touched.title && formik.errors.title ? "is-invalid" : formik.touched.title && !formik.errors.title ? "is-valid" : ""}`}
                            id="inputTitle"
                            placeholder="Title"
                            name="title"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
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
                        />
                        <label htmlFor="inputSubtitle">Subtitle</label>
                        {formik.touched.subtitle && formik.errors.subtitle && <p className="text-danger">{formik.errors.subtitle}</p>}
                    </div>
                </div>
                <div className="rowTwo" style={{ display: "flex", gap: "20px" }}>
                    <div className="form-floating mb-3">
                        <textarea
                            className={`form-control ${
                                formik.touched.description && formik.errors.description ? "is-invalid" : formik.touched.description && !formik.errors.description ? "is-valid" : ""
                            }`}
                            id="inputDescription"
                            placeholder="Description"
                            name="description"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.description}
                            style={{ height: "110px", width: "240px" }}
                        ></textarea>
                        <label htmlFor="inputDescription">Description</label>
                        {formik.touched.description && formik.errors.description && <p className="text-danger">{formik.errors.description}</p>}
                    </div>
                </div>
                <div className="rowTen" style={{ display: "flex", gap: "20px" }}>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className={`form-control ${formik.touched.phone && formik.errors.phone ? "is-invalid" : formik.touched.phone && !formik.errors.phone ? "is-valid" : ""}`}
                            id="inputPhone"
                            placeholder="Phone"
                            name="phone"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
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
                        />
                        <label htmlFor="inputEmail">Email Adress</label>
                        {formik.touched.email && formik.errors.email && <p className="text-danger">{formik.errors.email}</p>}
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="inputWeb" placeholder="Web" name="web" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        <label htmlFor="inputWeb">Web</label>
                        {formik.touched.web && formik.errors.web && <p className="text-danger">{formik.errors.web}</p>}
                    </div>
                </div>
                <div className="rowThree" style={{ display: "flex", gap: "20px" }}>
                    <div className="form-floating mb-3">
                        <input type="url" className="form-control" id="inputImage" placeholder="Image URL" name="image.url" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        <label htmlFor="inputImage">Image URL</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="inputAlt" placeholder="Image Alt" name="image.alt" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        <label htmlFor="inputAlt">Image Alt</label>
                    </div>
                </div>
                <div className="rowFour" style={{ display: "flex", gap: "20px" }}>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="inputState" placeholder="State" name="address.state" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        <label htmlFor="inputState">State</label>
                    </div>
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
                        />
                        <label htmlFor="inputCity">City</label>
                        {formik.touched.address?.city && formik.errors.address?.city && <p className="text-danger">{formik.errors.address.city}</p>}
                    </div>
                </div>
                <div className="rowFive" style={{ display: "flex", gap: "20px" }}>
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
                        />
                        <label htmlFor="inputCinty">Street</label>
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
                        />
                        <label htmlFor="inputCinty">House Number</label>
                        {formik.touched.address?.houseNumber && formik.errors.address?.houseNumber && <p className="text-danger">{formik.errors.address.houseNumber}</p>}
                    </div>
                    <div className="form-floating mb-3">
                        <input type="number" className="form-control" id="inputZip" placeholder="Zip" name="address.zip" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        <label htmlFor="inputZip">Zip</label>
                    </div>
                </div>
                <div className="submitBtn" style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "15px" }}>
                    <button className="btn btn-dark" type="submit">
                        Add Card
                    </button>
                </div>
            </form>
        </>
    );
}

export default CreateCard;
