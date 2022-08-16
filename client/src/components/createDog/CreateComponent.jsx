import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { createDog } from "../../redux/actions";
const initial = 'https://static.vecteezy.com/system/resources/previews/002/759/823/non_2x/cartoon-character-cute-corgi-dog-vector.jpg'

const CreateDog = () => {
    const createdDog = useSelector(state => state.dog)
    const temperaments = useSelector(state => state.temps)
    const [input, setInput] = useState({
        name: '',
        image: '',
        height1: 0,
        height2: 0,
        weight1: 0,
        weight2: 0,
        life_span1: 0,
        life_span2: 0,
    })
    const [temps, setTemps] = useState({
        name: [],
        id: [],
    })
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault();

        let newDog = {
            name: input.name,
            height: `${input.height1} - ${input.height2}`,
            height_imperial: `${Math.floor(input.height1 / 0.4535)} - ${Math.floor(input.height2 / 0.4535)}`,
            weight: `${input.weight1} - ${input.weight2}`,
            weight_imperial: `${Math.floor(input.weight1 / 0.4535)} - ${Math.floor(input.weight2 / 0.4535)}`,
            life_span: `${input.life_span1} - ${input.life_span2}`,
            image: !input.image ? initial : input.image,
            temperaments: temps.id
        }
        dispatch(createDog(newDog))

        setInput({
            name: '',
            image: initial,
            height1: 0,
            height2: 0,
            weight1: 0,
            weight2: 0,
            life_span1: 0,
            life_span2: 0,
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
        setTemps({...temps, 
            name: [...temps.name, e.target.value],
            id: [...temps.id, e.target[index].id]
        })
    }

    return (
        <div>
            <h1>Create your own race</h1>
            <form onSubmit={handleSubmit}>
                <label>Name:</label><br/>
                    <input
                    key='name'
                    type="text"
                    name='name'
                    value={input.name}
                    onChange={handleInputChange}
                    autoComplete="off"
                    /><br></br>
                <label>Image (Optional):</label><br/>
                    <input
                    key='image'
                    type='text'
                    name='image'
                    placeholder="image's url"
                    onChange={handleInputChange}
                    autoComplete="off"
                    /><br/>
                <label>Preview:</label><br/>
                <img src={input.image ? input.image : initial} alt="Here will be shown your preview" /><br/>
                <select id="temps" defaultValue={'default'} onChange={handleSelectorChange}>
                    <option value="default" disabled>Temperaments</option>
                    {temperaments.map(e =>                        
                            <option key={e.id} id={e.id}>{e.name}</option>
                    )}
                </select><br />
                {temps.name.length > 0 && <div>
                        <span>Filters:</span>
                        {temps.name.map((e, i) => {
                            return (<button key={i}>{e}</button>)
                        })}</div>
                }
                <label>Height:</label><br/>
                    <div>
                        <input
                        key='height1'
                        type="number"
                        name='height1'
                        value={input.height1}
                        title='Minimun height'
                        onChange={handleInputChange}
                        autoComplete="off"
                        />
                        <p>-</p>
                        <input
                        key='height2'
                        type="number"
                        name='height2'
                        value={input.height2}
                        title='Maximun height'
                        onChange={handleInputChange}
                        autoComplete="off"
                        />
                    </div>
                <label>Weight:</label>
                    <div>
                        <input
                        key='weight1'
                        type="number"
                        name='weight1'
                        value={input.weight1}
                        title='Minimun weight'
                        onChange={handleInputChange}
                        autoComplete="off"
                        />
                        <p>-</p>
                        <input
                        key='weight2'
                        type="number"
                        name='weight2'
                        value={input.weight2}
                        title='Maximun height'
                        onChange={handleInputChange}
                        autoComplete="off"
                        />
                    </div>
                <label>Life Span (Optional):</label>
                    <div>
                        <input
                        key='life_span1'
                        type="number"
                        name='life_span1'
                        value={input.life_span1}
                        title='Minimun life span'
                        onChange={handleInputChange}
                        autoComplete="off"
                        />
                        <p>-</p>
                        <input
                        key='life_span2'
                        type="number"
                        name='life_span2'
                        value={input.life_span2}
                        title='Maximun life span'
                        onChange={handleInputChange}
                        autoComplete="off"  
                        />
                    </div>
                <input type="submit" disabled={!input.name || !input.height1 || !input.height2 || !input.weight1 || !input.weight2}placeholder="Enviar" />
                {createdDog.err && <p>{createdDog.err}</p>}
                {createdDog.createdInDB && <p>{`La raza ${createdDog.name} fue creada correctamente!`}</p>}
            </form>
        </div>
    )
}

export default CreateDog;