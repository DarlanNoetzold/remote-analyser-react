import { useState, useEffect } from 'react';
import { Navigate, json } from 'react-router-dom';
import { getRoles, gravaAutenticacao, getToken } from '../../../seguranca/Autenticacao';
import jwt_decode from "jwt-decode";
import Carregando from '../../comuns/Carregando';
import Alerta from '../../comuns/Alerta';
import './signin.css';

function Login() {

    const [username, setUsername] = useState("");
    const [senha, setSenha] = useState("");
    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [autenticado, setAutenticado] = useState(false);
    const [carregando, setCarregando] = useState(false);


    const acaoLogin = async () => {
        const tokenEndpoint = "http://localhost:8180/realms/quarkus1/protocol/openid-connect/token";
      
        const authHeader = btoa("backend-service:secret");
        const formData = new URLSearchParams();
        formData.append("username", username);
        formData.append("password", senha);
        formData.append("grant_type", "password");
        
        const requestOptions = {
          method: "POST",
          headers: {
            "Authorization": `Basic ${authHeader}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formData.toString(),
        };
      
        try {
          setCarregando(true);
          const response = await fetch(tokenEndpoint, requestOptions);
          console.log(response);
          if (!response.ok) {
            throw new Error('Falha ao obter o token de autenticação.');
          }
      
          const responseBody = await response.text();
          const responseJson = JSON.parse(responseBody);
          const accessToken = responseJson.access_token;
          
          let decodedAccessToken = jwt_decode(accessToken);

          let json = {
            username: username,
            auth: true,
            token: accessToken,
            roles: [decodedAccessToken.realm_access.roles]
          }
          setAutenticado(true);
          gravaAutenticacao(json);

          return accessToken;
        } catch (error) {
          console.error(error);
          throw error;
        }finally {
            setCarregando(false);
        }
    };

    useEffect(() => {
        try {
            const token = getToken();
            if (token != null) {
                setAutenticado(true);
            }
        } catch (err) {
            setAlerta({ status: "error", message: err })
        }
    }, []);
    
    if(getRoles() != null){
        if (getRoles().includes("admin")){
            return <Navigate to="/privado" />
        }else if (getRoles().includes("user")){
            return <Navigate to="/user" />
        }
    }

    return (
        <div>
            <Carregando carregando={carregando}>
                <div>
                    <body className="text-center">
                        <Alerta alerta={alerta} />
                        <main className="form-signin">
                            <form onSubmit={acaoLogin}>
                                <h1 className="h3 mb-3 fw-normal">Login de usuário</h1>

                                <div className="form-floating">
                                    <input type="text" className="form-control" id="floatingInput" placeholder="Nome de usuário"
                                        value={username}
                                        name="username"
                                        onChange={e => setUsername(e.target.value)} />
                                    <label htmlFor="floatingInput">Username</label>
                                </div>
                                <div className="form-floating">
                                    <input type="password" className="form-control" id="floatingPassword" placeholder="Senha"
                                        value={senha}
                                        name="senha"
                                        onChange={e => setSenha(e.target.value)} />
                                    <label htmlFor="floatingPassword">Senha</label>
                                </div>
                                <button className="w-100 btn btn-lg btn-primary" type="submit">Efetuar login</button>
                            </form>
                        </main>
                    </body>
                </div>
            </Carregando>
        </div>
    )

}

export default Login;