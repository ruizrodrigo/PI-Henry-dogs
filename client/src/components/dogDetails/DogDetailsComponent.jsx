import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDog } from "../../redux/actions";

const DogDetails = (props) => {
    const dog = useSelector((state) => state.dog)

    const [changeDog, setChangeDog] = useState({
        prev: (Number(props.match.params.idRace) - 1),
        current: Number(props.match.params.idRace),
        next: (Number(props.match.params.idRace) + 1)
    })

    const dispatch = useDispatch()

    useEffect(() => {
        const dogId = changeDog.current;
        dispatch(getDog(dogId))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [changeDog])

    const nextPrevDog = (e) => {
        e.preventDefault();
        let {prev, current, next} = changeDog
        if(e.target.name === 'next') {
            setChangeDog({
                prev: current,
                current: next,
                next: next+1
            })
        } else if(e.target.name === 'prev') {
            if(prev > 0) {
                setChangeDog({
                    prev: prev - 1,
                    current: prev,
                    next: current
                })
            }
        }
    }

    return (
        <div >
            <Link to='/dogs'>Back</Link>
            <h2>{dog.name}</h2>
            <div >
                <img src={dog.imageUrl} alt="Imagen no disponible" />
            </div>
            <p>Temperaments: {dog.temperament}</p>
            <p>{`Height: ${dog.height?.imperial} /  ${dog.height?.metric}`}</p>
            <p>{`Weight: ${dog.weight?.imperial} /  ${dog.weight?.metric}`}</p>
            <p>{`Life Span: ${dog.life_span}`}</p>
            <Link to={`/dogs/${changeDog.current}`} name='prev' onClick={nextPrevDog}>Prev</Link>
            <Link to={`/dogs/${changeDog.current}`} name='next' onClick={nextPrevDog}>Next</Link>
            
        </div>
    )
}

export default DogDetails;

