import './App.css';
import { Route } from "react-router-dom";
import LandingPage from './components/landingPage/LandingPageComponent';
import DogDetails from './components/dogDetails/DogDetailsComponent'
import Cards from './components/dogsCards/CardsComponent'
import NavBar from './components/navBar/NavBarComponent';
import CreateDog from './components/createDog/CreateComponent';



function App() {

  return (
    <div>
      <div>
      <Route exact path='/'><LandingPage/></Route>
      <Route path='/home'><NavBar/></Route>
      <Route exact path='/home'
      render={({location}) => <Cards location = {location}/>}></Route>
      <Route exact path='/home/dogs/create'><CreateDog/></Route>
      <Route
      exact path='/home/:idRace'
      render={({match}) => <DogDetails match = {match}/>}></Route>
      </div>
    </div>
  );
}

export default App;
