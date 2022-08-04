import React from "react";
import {connect} from 'react-redux'
import {getAllDogs} from '../../redux/actions/index'
import Dog from '../dogCard/DogComponent'
import d from './Cards.module.css'


export class Cards extends React.Component {
    state = {
        fstIndex: 0,
        sndIndex: 8,
        currentPage: 1
    }
    componentDidMount() {
        this.props.getAllDogs()
    }

    changePage = (e) => {
        e.preventDefault();
        let {fstIndex, sndIndex} = this.state
        if(e.target.name === 'prev') {
            if(fstIndex >= 8) {
                this.setState({
                    fstIndex: fstIndex -8,
                    sndIndex: sndIndex -8,
                    currentPage: -1
                })
            }
        } else {
            if(sndIndex < this.props.dogs.length) {
                this.setState({
                    fstIndex: fstIndex + 8,
                    sndIndex: sndIndex + 8,
                    currentPage: 2
                })
            }
        }
    }

    render() {
        return (
            <div className={d.mainDiv}>
                <button name='prev' onClick={(e) => this.changePage(e)}>Prev</button>
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