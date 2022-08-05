import './App.css';
import { Route } from "react-router-dom";
import LandingPage from './components/landingPage/LandingPageComponent';
import DogDetails from './components/dogDetails/DogDetailsComponent'
import Cards from './components/dogsCards/CardsComponent'



function App() {

  return (
    <div>
      <div>
      <Route exact path='/'><LandingPage/></Route>
      <Route exact path='/dogs'
      render={({location}) => <Cards location = {location}/>}></Route>
      <Route
      exact path='/dogs/:idRace'
      render={({match}) => <DogDetails match = {match}/>}></Route>
      </div>
    </div>
  );
}

export default App;
