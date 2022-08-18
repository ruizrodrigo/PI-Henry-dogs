import {React} from "react";
import { Link } from "react-router-dom";
import c from './NavBar.module.css'
import img from '../../img/dogIcon.png'

const NavBar = ({location}) => {
    let match = location.pathname.slice(6, Infinity)

    return (
        <div className={c.divBar}>
            <img src={img} alt="" className={c.titleImg}/>
            <h1 className={c.text}>Search Dog App</h1>
            {location.pathname === '/' && <div className={c.divLink}><Link to='/about' className={c.buttonLink}>About Me</Link></div>} 
            {location.pathname === '/home' && 
            <div className={c.divLink}>
                <Link to='/' className={c.buttonLink}>Start</Link>
                <Link to='/about' className={c.buttonLink}>About Me</Link>
                <Link to='/home/dogs/create' className={c.buttonLink}>Create</Link>
            </div>}   
            {location.pathname === '/home/dogs/create' && 
            <div className={c.divLink}>
                <Link to='/' className={c.buttonLink}>Start</Link>
                <Link to='/about' className={c.buttonLink}>About Me</Link>
                <Link to='/home' className={c.buttonLink}>Home</Link>
            </div>}    
            {location.pathname === '/about' && 
            <div className={c.divLink}>
                <Link to='/' className={c.buttonLink}>Start</Link>
                <Link to='/home' className={c.buttonLink}>Home</Link>
                <Link to='/home/dogs/create' className={c.buttonLink}>Create</Link>
            </div>}    
            {!match.includes('dogs') && location.pathname.slice(0,6) === '/home/' &&
            <div className={c.divLink}>
                <Link to='/' className={c.buttonLink}>Start</Link>
                <Link to='/home' className={c.buttonLink}>Back</Link>
                <Link to='/home/dogs/create' className={c.buttonLink}>Create</Link>
            </div>}             
        </div>
    )
}

export default NavBar;