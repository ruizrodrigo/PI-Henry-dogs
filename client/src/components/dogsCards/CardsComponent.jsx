import React from "react";
import {connect} from 'react-redux'
import {getAllDogs, getTemps, filterTemp, filterDog, filterAlp, filterLoc, filterWeight, setPage} from '../../redux/actions/index'
import Dog from '../dogCard/DogComponent'
import d from './Cards.module.css'
import img from '../../img/loading-thinking.gif'
import sad from '../../img/sadDog.jpg'


export class Cards extends React.Component {
    state = {
        measureSys: 'metric',
        filterTemps: [],
        filterLoc: 'ALL',
        orderAlp: 'A-Z',
        orderWeight: 'ASC',
        searchDog: '',
        fstIndex: 0,
        sndIndex: 8,
        dogsPages: [],
        error: '',
        loading: true
    }

    //LifeCycles
    componentDidMount = async () => {
        this.props.getTemps()
        const {search} = this.props.location
        if(!this.props.dogs.length) {
            if(search) await this.props.getAllDogs(search)
            else await this.props.getAllDogs()
        }
        this.props.filterAlp(this.state.orderAlp)
        this.setPagesDogs(this.props.dogs)
    }
    
    shouldComponentUpdate(nextProps, nextState) {
        if(nextProps.dogs !== this.props.dogs) return true
        if(this.state.orderWeight !== nextState.orderWeight) { 
            this.props.filterWeight(nextState.orderWeight)
            return true
        }
        if(this.state.orderAlp !== nextState.orderAlp) {
            this.props.filterAlp(nextState.orderAlp)
            return true
        }
        if(this.state.filterLoc !== nextState.filterLoc) {
            try {
                this.props.filterLoc(nextState.filterLoc)
            } catch (error) {
                this.setState({
                    ...this.state,
                    error: error.message
                })
            }
            return true
        }
        if(this.state.dogsPages !== nextState.dogsPages) return true
        if(nextProps.currentPage !== this.props.currentPage)return true
        if(nextProps.dogs.length >= this.props.dogs.length) return true
        else return false
    }

    componentDidUpdate = async (prevProps, prevState) => {
        if (this.props.dogs !== prevProps.dogs) {
            this.setPagesDogs(this.props.dogs)
        }
        if(this.state.searchDog !== prevState.searchDog) {
            if (!this.state.filterTemps.length && this.state.filterLoc === 'ALL') {
                if(this.state.searchDog.length < prevState.searchDog.length){
                    if(this.state.searchDog.length === 0) this.props.getAllDogs()
                    else {
                        try{
                            await this.props.getAllDogs(this.state.searchDog)
                            this.setState({
                                ...this.state,
                                error: ''
                            })
                            } catch (err) {
                                this.setState({
                                    ...this.state,
                                    error: err.message
                                })
                            }
                    }
                } else {
                    try {
                        await this.props.getAllDogs(this.state.searchDog)
                    } catch (err) {
                        this.setState({
                            ...this.state,
                            error: err.message
                        })
                    }
                }
            } else if(this.state.filterTemps.length && this.state.filterLoc === 'ALL'){
                if(this.state.searchDog.length < prevState.searchDog.length){
                    if(this.state.searchDog.length === 0) this.props.getAllDogs()
                    else {
                        try{
                        await this.props.getAllDogs()
                        this.setState({
                            ...this.state,
                            error: ''
                        })
                        let filter = this.state.searchDog.slice(6, Infinity)
                        await this.props.filterDog(filter, this.props.dogs)
                        await this.props.filterTemp(this.state.filterTemps)
                        } catch (err) {
                            this.setState({
                                ...this.state,
                                error: err.message
                            })
                        }
                    }
                } else {
                    try {
                        let filter = this.state.searchDog.slice(6, Infinity)
                        await this.props.filterDog(filter)
                    }
                    catch(err) {
                        this.setState({
                            ...this.state,
                            error: err.message
                           })
                    }
                }
            } else if(!this.state.filterTemps.length && this.state.filterLoc !== 'ALL'){
                if(this.state.searchDog.length < prevState.searchDog.length){
                    if(this.state.searchDog.length === 0) {
                        await this.props.getAllDogs()
                        await this.props.filterLoc(this.state.filterLoc)}
                    else {
                        try{
                        await this.props.getAllDogs()
                        await this.props.filterLoc(this.state.filterLoc)
                        this.setState({
                            ...this.state,
                            error: ''
                        })
                        let filter = this.state.searchDog.slice(6, Infinity)
                        await this.props.filterDog(filter, this.props.dogs)
                        await this.props.filterLoc(this.state.filterLoc)
                        } catch (err) {
                            this.setState({
                                ...this.state,
                                error: err.message
                            })
                        }
                    }
                } else {
                    try {
                        let filter = this.state.searchDog.slice(6, Infinity)
                        await this.props.filterDog(filter)
                        await this.props.filterLoc(this.state.filterLoc)
                    }
                    catch(err) {
                        this.setState({
                            ...this.state,
                            error: err.message
                           })
                    }
                } 
            } else if(this.state.filterTemps.length && this.state.filterLoc !== 'ALL'){
                if(this.state.searchDog.length < prevState.searchDog.length){
                    if(this.state.searchDog.length === 0) {
                        await this.props.getAllDogs()
                        await this.props.filterTemp(this.state.filterTemps)
                        await this.props.filterLoc(this.state.filterLoc)
                    }
                    else {
                        try{
                        await this.props.getAllDogs()
                        this.setState({
                            ...this.state,
                            error: ''
                        })
                        let filter = this.state.searchDog.slice(6, Infinity)
                        await this.props.filterDog(filter, this.props.dogs)
                        await this.props.filterTemp(this.state.filterTemps)
                        await this.props.filterLoc(this.state.filterLoc)
                        } catch (err) {
                            this.setState({
                                ...this.state,
                                error: err.message
                            })
                        }
                    }
                } else {
                    try {
                        let filter = this.state.searchDog.slice(6, Infinity)
                        await this.props.filterDog(filter)
                    }
                    catch(err) {
                        this.setState({
                            ...this.state,
                            error: err.message
                           })
                    }
                }
            }
        }



        if(this.state.filterTemps !== prevState.filterTemps) {
            try {
                this.props.filterTemp(this.state.filterTemps)     
            } catch(error) {
                this.props.setPage(0)
            this.setState({
                ...this.state,
                error: error.message
            })
            }
        }
    }

    //Methods
    setPagesDogs = (dogsArray) => {
        let fstIndex = 0;
        let sndIndex = 8;
        let newDogs = []
        while(newDogs.length < dogsArray.length/8) {
            newDogs = [...newDogs, dogsArray.slice(fstIndex, sndIndex)]
            fstIndex = fstIndex + 8;
            sndIndex = sndIndex + 8;
        }
        this.setState({
            ...this.state,
            dogsPages: newDogs
        })
    }
    changePage = (e, i) => {
        e.preventDefault();
        if(e.target.name === 'prev') {
            this.setState({
                ...this.state,
                fstIndex: this.state.fstIndex-8,
                sndIndex: this.state.sndIndex-8,
            })
            this.props.setPage(this.props.currentPage - 1)
        } else if(e.target.name === 'next'){
            this.setState({
                ...this.state,
                fstIndex: this.state.fstIndex+8,
                sndIndex: this.state.sndIndex+8,
            })
            this.props.setPage(this.props.currentPage + 1)
        } else (
            this.props.setPage(i)
        )
    }

    setPagination = (e, indexDogs) => {
        e.preventDefault();
        this.changePage(e, indexDogs)
        this.setState({
            ...this.state,
            fstIndex: 8 * indexDogs,
            sndIndex: 8 + 8 * indexDogs
        })
    }

    searchDog = (e) => {
        e.preventDefault();
        this.props.setPage(0)
        this.setState({
            ...this.state,
            searchDog: `?name=${e.target.value}`,
            fstIndex: 0,
            sndIndex: 8,
        })
    }

    orderAlp = () => {
            this.setState(prevState => {
                return {
                    ...prevState,
                    orderAlp: prevState.orderAlp === 'A-Z' ? 'Z-A' : 'A-Z' 
                }
            }) 
    }

    filterTemps = (e) => {
        const selector = document.getElementById('temps')
        if(e.target.value === 'clear') {
            this.props.getAllDogs()
            this.props.setPage(0)
            this.setState({
                ...this.state,
                filterTemps: [],
                fstIndex: 0,
                sndIndex: 8,
                error: ''
            })
            selector.value = 'default'
        } else {
            this.props.setPage(0)
            !this.state.filterTemps.includes(selector.value) &&
            this.setState({
                ...this.state,
                filterTemps: [...this.state.filterTemps, selector.value],
                fstIndex: 0,
                sndIndex: 8,
            })
            selector.value = 'default'
        }
    }

    filterLoc = async (e) => {
        if(e.target.value === 'ALL') {
            await this.props.getAllDogs()
            this.props.filterAlp(this.state.orderAlp)
            this.props.setPage(0)
            document.getElementById('search').value = ''
            this.setState({
                ...this.state,
                filterLoc: 'ALL',
                error: ''
            })
        } else if(e.target.value === 'API') {
            await this.props.getAllDogs()
            this.props.filterAlp(this.state.orderAlp)
            this.props.setPage(0)
            this.setState({
                ...this.state,
                filterLoc: e.target.value,
                error: '',
                fstIndex: 0,
                sndIndex: 8,
            })
        } else {
            this.props.setPage(0)
            this.setState({
                ...this.state,
                filterLoc: e.target.value,
                error: '',
                fstIndex: 0,
                sndIndex: 8,
            })
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
                error: '',
                orderAlp: 'A-Z',
                orderWeight: 'ASC'
            })
        } else {
            this.props.getAllDogs()
            this.setState({
                ...this.state,
                orderAlp: 'A-Z',
                filterTemps: [],
                currentPage: 1,
                fstIndex: 0,
                sndIndex: 8,
                searchDog: '',
                error: ''
            })
        }
    }

    changeSys = (e) => {
        e.preventDefault();
        e.target.innerText === 'Metric' ?
        this.setState({
            ...this.state,
            measureSys: 'imperial'
        }) :
        this.setState({
            ...this.state,
            measureSys: 'metric'
        })
        e.target.innerText === 'Metric' ? e.target.innerText = 'Imperial' : e.target.innerText = 'Metric'
    }
    
    changeWeight = (e) => {
        e.preventDefault();
        this.setState({
            ...this.state,
            orderWeight: this.state.orderWeight === 'ASC' ? 'DES' : 'ASC'
        })
    }

   
    
    
    render() {
        return (
            <div className={d.mainDiv}>
                {!this.props.dogs.length && <div><img className={d.loading} src={img} alt=''></img></div>}
                {this.props.dogs.length && <div className={d.filterBar}>
                    <div className={d.borderFilters}>
                        <h3>Filter By:</h3>
                        <h5>Name:</h5>
                        <input className={d.inputSearch} autoComplete='off' id='search' name='search' type="text" placeholder="Ex: Fox" onChange={this.searchDog}/><br></br>
                        <h5>Temperaments:</h5>
                        <select className={d.inputSearch} id='temps' onChange={this.filterTemps} defaultValue={'default'}>
                            <option value='default' disabled>Select</option>
                            {this.props.temps?.map(e => {
                                return (
                                    <option key={e.id} value={e.name}>{e.name}</option>
                                )
                            })}
                        </select>
                        {this.state.filterTemps.length > 0 && 
                            <>
                            <h5><b>Applicated:</b></h5>
                            {this.state.filterTemps.map((e, i) => {
                                return (<button className={d.dogsButtonSelect} onClick={this.clearOne}key={i}>{e}</button>)
                            })}
                            <br /><button value='clear' className={d.dogsButtonSelect} onClick={(e) => this.filterTemps(e)}>Clear</button><br />
                        </>}
                        <h5>Location</h5>
                        <select name="location" id="location" onChange={this.filterLoc} defaultValue='ALL'>
                            <option value="ALL">ALL</option>
                            <option value="DB">DB</option>
                            <option value="API">API</option>
                        </select>
                    </div>
                    <div className={d.borderFilters}>
                            <h3>Order By:</h3>
                            <h5>Alphabethical</h5>
                            <button className={d.dogsButtonSelect} onClick={this.orderAlp}>{this.state.orderAlp}</button>
                            <h5>Weight</h5>
                            <button className={d.dogsButtonSelect} name="weight" onClick={this.changeWeight}>{this.state.orderWeight}</button>
                            <h5>Change measuring system</h5>
                            <button className={d.dogsButtonSelect} onClick={this.changeSys}>Metric</button>
                    </div>
                </div>}
                <div>
                    {this.props.dogs.length && <div className={d.pageDiv}>
                        {this.props.currentPage > 0 && <div className={d.dogsButtonPrev}><button name='prev' className={d.dogsButton} onClick={this.changePage}>Prev</button></div>}
                        {this.state.dogsPages?.map((dog, i) => <button onClick={(e) => this.setPagination(e, i)} className={i === this.props.currentPage ? d.pageButtonActive : d.pageButton} key={i}>{i+1}</button>)}
                        {this.props.currentPage + 1 < this.state.dogsPages.length && <div className={d.dogsButtonNext}><button name='next' className={d.dogsButton} onClick={this.changePage}>Next</button></div>}
                    </div>}
                    <div className={d.dogCards}>
                        {this.state.error ? 
                        <div className={d.errorTemps}>
                            <img className={d.errorTempsImg} src={sad} alt=""></img>
                            <div className={d.errorTempsText}>
                                <p>Woof! {this.state.error}</p>
                            </div>
                        </div> 
                        :
                        this.props.dogs.length && this.props.dogs?.slice(this.state.fstIndex,this.state.sndIndex).map(d => {
                            return (
                                <Dog
                                id = {d.id}
                                key = {d.id}
                                name = {d.name}
                                image = {d.image}
                                temperament = {d.temperament}
                                weight = {this.state.measureSys === 'metric' ? `${d.weight} Kgs` : `${d.weight_imperial} Lbs`}
                                />
                        )})}
                    </div> 
                </div>
            </div>
        )
    }
}

function mapState(state) {
    return {
        dogs: state.dogs,
        temps: state.temps,
        currentPage: state.currentPage,
        error: state.error
    }
}

export default connect(mapState, {getAllDogs, getTemps, filterTemp, filterDog, filterAlp, filterWeight, setPage, filterLoc})(Cards);