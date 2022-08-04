import React from "react";
import { Link } from "react-router-dom";
import c from './Dog.module.css'

const Dog = ({id, name, img, temperament, weight}) => {
    return (
        <div className={c.dogCard}>
            <Link className={c.name} to={`/dogs/${id}`}>{name}</Link>
            <div className={c.divImg}>
                <img className={c.imgCard} src={img} alt="Imagen no disponible" />
            </div>
            <p>Temperaments: {temperament}</p>
            <p>Weight: {weight.imperial} / {weight.metric}</p>
        </div>
    )
}

export default Dog;