import { NavLink, Outlet } from 'react-router-dom';
import { logout } from '../../seguranca/Autenticacao';


const MenuPrivado = () => {

    const localStorageAutenticacao = localStorage.getItem('remote/autenticacao');
    const autenticacao = localStorageAutenticacao ?
        JSON.parse(localStorageAutenticacao) : null;

    const usuario = autenticacao.username;

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" aria-current="page" exact="true" to="/">Remote Analyser</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link active" aria-current="page" exact="true" to="/privado">Home</NavLink>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Manutenções
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><NavLink className="dropdown-item" exact="true" to="alerts">Alerts</NavLink></li>      
                                    <li><NavLink className="dropdown-item" exact="true" to="maliciousWebsites">Sites</NavLink></li>
                                    <li><NavLink className="dropdown-item" exact="true" to="maliciousProcesses">Processes</NavLink></li>
                                    <li><NavLink className="dropdown-item" exact="true" to="maliciousPorts">Ports</NavLink></li>
                                    <li><NavLink className="dropdown-item" exact="true" to="badLanguages">Languages</NavLink></li>
                                </ul>
                            </li>
                            
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {usuario ? "Usuário: " + usuario : "Usuário"}
                                </a>
                                <ul className="dropdown-menu">
                                    <li>
                                        {usuario ?
                                            <NavLink className="dropdown-item" exact to="/"
                                                onClick={() => logout()}>Logout</NavLink>
                                            :
                                            <NavLink className="dropdown-item" exact to="/login">Login</NavLink>}
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <Outlet />
        </div>
    )
};

export default MenuPrivado;