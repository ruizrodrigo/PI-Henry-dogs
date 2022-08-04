import {React} from "react";

const NavBar = (props) => {
    return (
        <div>
            <input type="text" placeholder="Ingrese nombre de la raza..."/>
            <button>Filtrar por raza</button>
            <button>Filtrar por temperamento</button>
            <button>Orden alfabetico</button>
            <button>Orden por Peso</button>
        </div>
    )
}

export default NavBar;