import './App.css';
import { Route } from "react-router-dom";
import LandingPage from './components/landingPage/LandingPageComponent';
import DogDetails from './components/dogDetails/DogDetailsComponent'
import Cards from './components/dogsCards/CardsComponent'
import NavBar from './components/navBar/NavBarComponent';
import CreateDog from './components/createDog/CreateComponent';
import About from './components/about/AboutComponent';

function App() {

  return (
    <div>
      <div>
      <Route path='/'
      render={({location}) => <NavBar location = {location}/>}></Route>
      <Route exact path='/'><LandingPage/></Route>
      <Route exact path='/about'><About/></Route>
      <Route exact path='/home'
      render={({location}) => <Cards location = {location}/>}></Route>
      <Route exact path='/home/dogs/create'><CreateDog/></Route>
      <Route
      exact path='/home/:idRace'
      render={({match, location}) => <DogDetails match = {match} location = {location}/>}></Route>
      </div>
    </div>
  );
}

export default App;
