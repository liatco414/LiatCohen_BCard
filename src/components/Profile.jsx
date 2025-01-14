function Profile() {
    return (
        <>
            <div className="container" style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginTop: "100px" }}>
                <h1>Profile</h1>
                <div className="card" style={{ width: "18rem" }}>
                    <div className="profileImg">
                        <img src="..." className="card-img-top" alt="..." />
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" className="btn btn-primary">
                            Go somewhere
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;
