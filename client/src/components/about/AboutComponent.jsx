import React from "react";
import d from './About.module.css'
import image from '../../img/Personal.jpg'

const About = () => {

    return (
        <div className={d.divMain}>
            <div className={d.divContainer}>
                <img className={d.imgDetail} src={image} alt="Imagen no disponible" />
                <h1>Rodrigo Ruiz</h1>
                <p>Welcome!
I'm 26 years old, I live in Buenos Aires, Argentina and this is my first full stack application!</p>
            </div>
        </div>
    )
}

export default About;
