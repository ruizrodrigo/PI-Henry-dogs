import React, {useEffect, useState} from "react";
import {useHistory} from 'react-router-dom'
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createDog, getTemps, clearDog } from "../../redux/actions";
import s, {incorrect, correct} from './Create.module.css'
import errorImg from '../../img/undefinedDog.png'
const initial = 'https://static.vecteezy.com/system/resources/previews/002/759/823/non_2x/cartoon-character-cute-corgi-dog-vector.jpg'

const CreateDog = () => {
    const createdDog = useSelector(state => state.dog)
    const temperaments = useSelector(state => state.temps)
    const history = useHistory()

    const [input, setInput] = useState({
        name: '',
        image: '',
        height1: 0,
        height2: 0,
        weight1: 0,
        weight2: 0,
        life_span1: 0,
        life_span2: 0,
        complete: false
    })
    const [temps, setTemps] = useState({
        name: [],
        id: [],
    })

    const [classDog, setClassDog] = useState({
        image: s.inputImg,
        name: incorrect,
        height1: incorrect,
        height2: incorrect,
        weight1: incorrect,
        weight2: incorrect,
        life_span1: correct,
        life_span2: correct,
    })

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTemps())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    
    useMemo(() => {
        setClassDog(prev => {
            return {
                ...prev,
                image: input.image.length < 255 ? s.inputImg : s.inputImgError,
                name: input.name.length ? correct : incorrect,
                height1: input.height1 > 0 ? correct : incorrect,
                height2: input.height2 > 0 && Number(input.height2) > Number(input.height1) ? correct : incorrect,
                weight1: input.weight1 > 0 ? correct : incorrect,
                weight2: input.weight2 > 0 && Number(input.weight2) > Number(input.weight1) ? correct : incorrect,
                life_span2: Number(input.life_span2) >= Number(input.life_span1) ? correct : incorrect

            }
        })
        }, [input])


    const handleSubmit = (e) => {
        e.preventDefault();

        let newDog = {
            name: input.name,
            height: `${input.height1} - ${input.height2}`,
            height_imperial: `${Math.floor(input.height1 / 2.54)} - ${Math.floor(input.height2 / 2.54)}`,
            weight: `${input.weight1} - ${input.weight2}`,
            weight_imperial: `${Math.floor(input.weight1 / 0.4535)} - ${Math.floor(input.weight2 / 0.4535)}`,
            life_span: `${input.life_span1} - ${input.life_span2}`,
            image: !input.image ? initial : input.image,
            temperaments: temps.id
        }
        dispatch(createDog(newDog))
        
        setInput({
            name: '',
            image: '',
            height1: 0,
            height2: 0,
            weight1: 0,
            weight2: 0,
            life_span1: 0,
            life_span2: 0,
            complete: true
        })
        setTemps({
            name: [],
            id: [],
        })
    }

    const handleInputChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handleSelectorChange = (e) => {
        let index = e.target.selectedIndex
        !temps.name.includes(e.target.value) &&
        setTemps({...temps, 
            name: [...temps.name, e.target.value],
            id: [...temps.id, e.target[index].id]
        })
        document.getElementById('temps').value = 'default'
    }

    const createAgain = (e) => {
        e.preventDefault();
        setInput({
            ...input,
            complete: false
        })
        dispatch(clearDog({}))
    }

    const clearTemps = (e) => {
        e.preventDefault();
        setTemps({...temps,
            name: [],
            id: []
        })
    }

    return (
        <div className={s.mainDiv}>
            <div className={s.containerDiv}>
                <div className={s.title}>
                    <h1>Create your own race</h1>
                </div>
                    <form onSubmit={handleSubmit} className={s.divGrid}>
                        <div className={s.one}>
                            <label><b>Image (Optional):</b></label>
                                <input className={classDog.image}
                                disabled={input.complete}
                                key='image'
                                type='text'
                                value={input.image}
                                name='image'
                                placeholder="image's url"
                                onChange={handleInputChange}
                                autoComplete="off"
                                />
                            {classDog.image === s.inputImgError && <span style={{color: 'red'}}>Image's url length must be less than 255 char</span>}
                            <br/><br/>
                            <label><b>Preview:</b></label>
                            <img className={s.newImg} src={classDog.image === s.inputImgError ? errorImg : input.image ? input.image : initial} alt="Here will be shown your preview" />
                        </div>
                        <div className={s.two}>
                            <label className={s.labelName}><b>Name:</b></label>
                                <input className={classDog.name}
                                disabled={input.complete}
                                placeholder= 'Ex: Foxy'
                                key='name'
                                type="text"
                                name='name'
                                value={input.name}
                                onChange={handleInputChange}
                                autoComplete="off"
                                /><br></br>
                        </div>
                        <div className={s.three}>
                        <label><b>Height (Cms):</b></label>
                            <div>
                                <h6>Min: </h6>
                                <input className={classDog.height1}
                                disabled={input.complete}
                                key='height1'
                                type="number"
                                min='0'
                                name='height1'
                                value={input.height1}
                                title='Minimun height'
                                onChange={handleInputChange}
                                autoComplete="off"
                                />
                                <h6>Max: </h6>
                                <input className={classDog.height2}
                                disabled={input.complete}
                                key='height2'
                                type="number"
                                min='0'
                                name='height2'
                                value={input.height2}
                                title='Maximun height (Must be equal o higher than minimun)'
                                onChange={handleInputChange}
                                autoComplete="off"
                                />
                            </div>
                        </div>
                        <div className={s.four}>
                            <label><b>Temperaments:</b></label>
                            <select id="temps" defaultValue={'default'} disabled={input.complete} onChange={handleSelectorChange}>
                                <option value="default" disabled>Select</option>
                                {temperaments.map(e =>                        
                                        <option key={e.id} id={e.id}>{e.name}</option>
                                        )}
                            </select>
                            {temps.name.length > 0 && 
                            <div className={s.divCreate}>
                                    <h6>Applicated:</h6>
                                    <div className={s.selectedDiv}>
                                        {temps.name.map((e, i) => {
                                                return (<span className={s.selected} key={i}>{e}</span>)
                                            })}
                                    </div>
                                    <button className={s.okButton} onClick={clearTemps}>Clear</button>
                            </div>
                            }
                        </div>
                        <div className={s.five}>
                        <label><b>Weight (Kgs):</b></label>
                            <div>
                                <h6>Min: </h6>
                                <input className={classDog.weight1}
                                disabled={input.complete}
                                key='weight1'
                                type="number"
                                min='0'
                                name='weight1'
                                value={input.weight1}
                                title='Minimun weight'
                                onChange={handleInputChange}
                                autoComplete="off"
                                />
                                <h6>Max: </h6>
                                <input className={classDog.weight2}
                                disabled={input.complete}
                                key='weight2'
                                type="number"
                                min='0'
                                name='weight2'
                                value={input.weight2}
                                title='Maximun height (Must be equal o higher than minimun)'
                                onChange={handleInputChange}
                                autoComplete="off"
                                />
                            </div>
                        </div>
                        <div className={s.six}>
                        <label><b>Life Span (Optional):</b></label>
                            <div>
                                <h6>Min: </h6>
                                <input className={classDog.life_span1}
                                disabled={input.complete}
                                key='life_span1'
                                type="number"
                                min='0'
                                name='life_span1'
                                value={input.life_span1}
                                title='Minimun life span'
                                onChange={handleInputChange}
                                autoComplete="off"
                                />
                                <h6>Max: </h6>
                                <input className={classDog.life_span2}
                                disabled={input.complete}
                                key='life_span2'
                                type="number"
                                min='0'
                                name='life_span2'
                                value={input.life_span2}
                                title='Maximun life span (Must be equal o higher than minimun)'
                                onChange={handleInputChange}
                                autoComplete="off"  
                                />
                            </div>
                        </div>
                        <div className={s.seven} >
                            <input type="submit" hidden={classDog.name === incorrect || classDog.height1 === incorrect || classDog.height2 === incorrect || classDog.weight1 === incorrect || classDog.weight2 === incorrect || classDog.life_span2 === incorrect || !temps.name.length} placeholder="Create!" className={s.okButton}/>
                            <div className={s.divCreate}>
                                {createdDog.err && <p>{createdDog.err}</p>}
                                {createdDog.createdInDB && <p className={s.sucesful}>La raza <b>{createdDog.name}</b> fue creada correctamente!</p>}
                                {input.complete && <button className={s.okButton} onClick={createAgain}>Create Another</button>}
                                {input.complete && <button className={s.okButton} onClick={() => history.push('/home')}>Return Home</button>}
                            </div>
                        </div>
                    </form>
            </div>
        </div>
    )
}

export default CreateDog;