import {React} from "react";

const NavBar = (props) => {
    return (
        <div>
            <button>Filtrar por raza</button>
            <button>Filtrar por temperamento</button>
            <button>Orden alfabetico</button>
            <button>Orden por Peso</button>
        </div>
    )
}

export default NavBar;