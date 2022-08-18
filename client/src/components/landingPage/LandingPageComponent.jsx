import React from "react";
import { Link } from "react-router-dom";
import c from './LandingPage.module.css'

const LandingPage = (props) => {
    return (
        <section className={c.full}>
            <div className={c.mainDiv}>
                <div>
                    <h1 className={c.titleMain}>"Regarding dogs, no one who has not lived with them will ever know, in depth, how far the words generosity, companionship and loyalty go."</h1>
                    <br /><h3 className={c.titleMain}>Arturo Pérez-Reverte</h3>
                </div>
                <Link to='/home' className={c.buttonHome}>Start</Link>
            </div>
        </section>
    )
}

export default LandingPage;