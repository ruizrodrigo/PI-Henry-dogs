import React from "react";
import { Link } from "react-router-dom";
import c from './Dog.module.css'

const Dog = ({id, name, image, temperament, weight}) => {
    return (
        <div className={c.dogCard}>
            <Link className={c.name} to={`/home/${id}`}>{name}</Link>
            <div className={c.divImg}>
                <img className={c.imgCard} src={image} alt="Imagen no disponible" />
            </div>
            <p><b>Temperaments:</b> {temperament}</p>
            <p><b>Weight:</b> {weight} </p>
        </div>
    )
}

export default Dog;