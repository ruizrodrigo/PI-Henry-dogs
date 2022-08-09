import React from "react";
import {connect} from 'react-redux'
import {getAllDogs, getTemps, filterTemp, filterDog} from '../../redux/actions/index'
import Dog from '../dogCard/DogComponent'
import d from './Cards.module.css'


export class Cards extends React.Component {
    state = {
        filterTemps: [],
        orderAlp: 'A-Z',
        searchDog: '',
        fstIndex: 0,
        sndIndex: 8,
        currentPage: 1
    }
    componentDidMount() {
        this.props.getTemps()
        const {search} = this.props.location
        if(search) this.props.getAllDogs(search)
        else 
            this.props.getAllDogs()         

    }

    componentDidUpdate = async (prevProps, prevState) => {
        if(this.state.searchDog !== prevState.searchDog) {
            if (!this.state.filterTemps.length) this.props.getAllDogs(this.state.searchDog)
            else{
                if(this.state.searchDog.length < prevState.searchDog.length){
                    await this.props.getAllDogs()
                    let filter = this.state.searchDog.slice(6, Infinity)
                    await this.props.filterDog(filter, this.props.dogs)
                    await this.props.filterTemp(this.state.filterTemps)
                } else {
                    let filter = this.state.searchDog.slice(6, Infinity)
                    this.props.filterDog(filter)
                }
            }
        }
        if(this.state.filterTemps !== prevState.filterTemps) 
        this.props.filterTemp(this.state.filterTemps)       
    }

    changePage = (e) => {
        e.preventDefault();
        let {fstIndex, sndIndex, currentPage} = this.state
        if(e.target.name === 'prev') {
            if(fstIndex >= 8) {
                this.setState({
                    ...this.state,
                    fstIndex: fstIndex -8,
                    sndIndex: sndIndex -8,
                    currentPage: currentPage-1
                })
            }
        } else {
            if(sndIndex < this.props.dogs.length) {
                this.setState({
                    ...this.state,
                    fstIndex: fstIndex + 8,
                    sndIndex: sndIndex + 8,
                    currentPage: currentPage+1
                })
            }
        }
    }

    searchDog = (e) => {
        e.preventDefault();
        this.setState({
            ...this.state,
            searchDog: `?name=${e.target.value}`,
            currentPage: 1,
            fstIndex: 0,
            sndIndex: 8,
        })
    }

    orderAlp = () => {
   
        const {orderAlp} = this.state
        orderAlp === 'A-Z' ?
        this.setState({
            ...this.state,
             orderAlp: 'Z-A'  
        }) :
        this.setState({
            ...this.state,
             orderAlp: 'A-Z'  
        })
        this.props.dogs.reverse()
        
    }

    filterTemps = (e) => {
        const selector = document.getElementById('temps')
        console.log(e.target.value)
        if(e.target.value === 'clear') {
            this.props.getAllDogs()
            this.setState({
                ...this.state,
                filterTemps: [],
                currentPage: 1,
                fstIndex: 0,
                sndIndex: 8,
            })
            selector.value = 'default'
        } else {
            this.setState({
                ...this.state,
                filterTemps: [...this.state.filterTemps, selector.value],
                currentPage: 1,
                fstIndex: 0,
                sndIndex: 8,
            })
            selector.value = 'default'
        }
    }

    clearOne = async (e) => {
        await this.props.getAllDogs()
        if(this.state.filterTemps.length > 1) {
            let newFilter = this.state.filterTemps.filter(el => e.target.innerText !== el)
            this.setState({
                ...this.state,
                filterTemps: newFilter,
                currentPage: 1,
                fstIndex: 0,
                sndIndex: 8,
            })
        } else {
            this.props.getAllDogs()
            this.setState({
                ...this.state,
                filterTemps: [],
                currentPage: 1,
                fstIndex: 0,
                sndIndex: 8,
                searchDog: ''
            })
        }
    }

    render() {
        return (
            
            <div className={d.mainDiv}>
                <select id='temps' onChange={this.filterTemps} defaultValue={'default'}>
                    <option value='default' disabled>Temperaments</option>
                    {this.props.temps?.map(e => {
                        return (
                            <option key={e.id} value={e.name}>{e.name}</option>
                        )
                    })}
                </select>
                <div>{this.state.filterTemps.length > 0 && 
                <div>
                    <span>Filters:</span>
                    {this.state.filterTemps.map((e, i) => {
                        return (<button onClick={this.clearOne}key={i}>{e}</button>)
                    })}
                    <button value='clear' onClick={(e) => this.filterTemps(e)}>Clear</button>
                </div>
                }</div>
                <input name='search' type="text" placeholder="Ingrese nombre de la raza..." onChange={this.searchDog}/><br></br>
                <button onClick={this.orderAlp}>{this.state.orderAlp}</button>
                <button name='prev' onClick={(e) => this.changePage(e)}>Prev</button>
                <span>{this.state.currentPage} / {Math.ceil(this.props.dogs.length/8)}</span>
                <button name='next' onClick={(e) => this.changePage(e)}>Next</button>
                <div className={d.dogCards}>
                    {this.props.dogs.err ? <p>{this.props.dogs.err}</p> :
                    this.props.dogs?.slice(this.state.fstIndex,this.state.sndIndex).map(d => {
                        return (
                        <Dog
                        id = {d.id}
                        key = {d.id}
                        name = {d.name}
                        img = {d.image}
                        temperament = {d.temperament}
                        weight = {d.weight}
                        />
                    )})}
                </div>
            </div>
        )
    }
}

function mapState(state) {
    return {
        dogs: state.dogs,
        temps: state.temps
    }
}

export default connect(mapState, {getAllDogs, getTemps, filterTemp, filterDog})(Cards);