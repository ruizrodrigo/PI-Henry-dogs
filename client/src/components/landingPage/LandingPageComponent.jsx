import React from "react";
import { Link } from "react-router-dom";
import c from './LandingPage.module.css'

const LandingPage = (props) => {
    return (
        <div className={c.mainDiv}>
            <div className={c.buttonDiv}>
                <Link to='/home' className={c.buttonHome}>Ingresar</Link>
            </div>
        </div>
    )
}

export default LandingPage;