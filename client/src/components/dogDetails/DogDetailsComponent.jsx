import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDog, clearDog } from "../../redux/actions";
import d from './DogDetails.module.css'

const DogDetails = (props) => {
    const dog = useSelector((state) => state.dog)
    const dispatch = useDispatch()

    useEffect(() => {
        const dogId = props.match.params.idRace;
        dispatch(getDog(dogId))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        return ()=>dispatch(clearDog({}))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <div className={d.divMain}>
            <div className={d.divContainer}>
                <h1>{dog.name}</h1>
                <img className={d.imgDetail} src={dog.image} alt="Imagen no disponible" />
                <div className={d.divDetails}>
                    <p><b>Temperaments:</b> {dog.temperament}</p>
                    <p><b>Height:</b> {dog.height} Cms / {dog.height_imperial} Inches</p>
                    <p><b>Weight:</b> {dog.weight} Kgs / {dog.weight_imperial} Lbs</p>
                    <p><b>Life Span:</b> {dog.life_span}</p>
                </div>
            </div>
        </div>
    )
}

export default DogDetails;

