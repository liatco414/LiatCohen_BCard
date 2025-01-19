import { useContext } from "react";
import { appThemes } from "../App";

function About() {
    const theme = useContext(appThemes);
    return (
        <>
            <div
                className="about"
                style={{
                    backgroundColor: theme.background,
                    color: theme.color,
                    paddingTop: "7%",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    textAlign: "center",
                }}
            >
                <div className="h1p" style={{ padding: "15px" }}>
                    <h1 style={{ fontWeight: "900" }}>About Our Website</h1>
                    <p style={{ fontSize: "1.3em" }}>
                        Welcome to our platform, where businesses and customers can connect through a unique and easy-to-navigate interface designed to showcase business cards from around the world.
                        Our website is dedicated to helping businesses promote their services and reach a wider audience while offering users a simple way to explore different industries and services.
                    </p>
                </div>
                <div className="h2p" style={{ padding: "15px" }}>
                    <h2 style={{ paddingTop: "20px", fontWeight: "900" }}>For Business Users</h2>
                    <p style={{ fontSize: "1.2em" }}>
                        If you’re a business owner, our platform allows you to create a personalized business card for your company. You can upload images, add detailed descriptions, and provide
                        essential business information, such as your address, contact number, website, and more. Not only can you create and display your business card, but you can also edit or delete
                        it whenever necessary, ensuring that your information is always up-to-date. This self-management feature puts you in full control of how your business is represented to
                        potential customers.
                    </p>
                </div>
                <div className="h2p" style={{ padding: "15px" }}>
                    <h2 style={{ paddingTop: "20px", fontWeight: "900" }}>For Non-Business</h2>
                    <p style={{ fontSize: "1.2em" }}>
                        {" "}
                        Users If you’re a regular user, you can browse through a wide variety of business cards from different industries such as food, fashion, technology, health, and more. You can
                        also express your appreciation for businesses by liking their cards, helping to highlight the most popular businesses. With a simple and intuitive interface, you can easily
                        search for cards based on categories, business names, or keywords, making it easy to find the services you need. Each business card provides detailed information, including the
                        business name, description, address, and contact information, so you can easily get in touch with the business owners for more details or inquiries. Whether you’re looking for
                        a restaurant to dine at or a service to meet your needs, our platform is your go-to destination for discovering local businesses. Connecting Businesses and Customers Our
                        platform bridges the gap between businesses and their potential customers. Business owners can create and manage their own business presence, while customers can discover,
                        engage with, and express support for the businesses they love. With an emphasis on ease of use and access to essential information, we strive to provide a seamless experience
                        for both business owners and users alike. Whether you’re a business owner eager to showcase your products or services or a customer looking for trusted businesses to connect
                        with, our platform offers a comprehensive solution that makes it easy for everyone to find what they’re looking for.
                    </p>
                </div>
                <br />
                <br />
                <div className="p" style={{ padding: "15px" }}>
                    <p style={{ fontSize: "1.2em" }}>
                        Join us today and experience the power of connection! This expanded version provides a deeper understanding of the website’s features and how it benefits both business owners
                        and regular users. Let me know if you'd like to adjust or expand any part of it!
                    </p>
                </div>
            </div>
        </>
    );
}

export default About;
