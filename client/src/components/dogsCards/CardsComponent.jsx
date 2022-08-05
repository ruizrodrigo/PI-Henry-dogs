import React from "react";
import {connect} from 'react-redux'
import {getAllDogs} from '../../redux/actions/index'
import Dog from '../dogCard/DogComponent'
import d from './Cards.module.css'
import NavBar from '../navBar/NavBarComponent';


export class Cards extends React.Component {
    state = {
        searchDog: '',
        fstIndex: 0,
        sndIndex: 8,
        currentPage: 1
    }
    componentDidMount() {
        const {search} = this.props.location
        console.log(search)
        if(search) this.props.getAllDogs(search)
        else this.props.getAllDogs()
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.state.searchDog !== prevState.searchDog)
        this.props.getAllDogs(this.state.searchDog)
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
        console.log(e.target.value)
        console.log(this.state.searchDog)
        this.setState({
            ...this.state,
            searchDog: `?name=${e.target.value}`
        })
    }

    render() {
        return (
            <div className={d.mainDiv}>
                <NavBar/>
                <input name='search' type="text" placeholder="Ingrese nombre de la raza..." onChange={this.searchDog}/><br></br>
                <button name='prev' onClick={(e) => this.changePage(e)}>Prev</button>
                <span>{this.state.currentPage} / {Math.round(this.props.dogs.length/8)}</span>
                <button name='next' onClick={(e) => this.changePage(e)}>Next</button>
                <div className={d.dogCards}>
                    {this.props.dogs?.slice(this.state.fstIndex,this.state.sndIndex).map(d => {
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
        dogs: state.dogs
    }
}

export default connect(mapState, {getAllDogs})(Cards);