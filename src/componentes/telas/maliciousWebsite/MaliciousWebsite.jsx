import { useState, useEffect } from "react";
import MaliciousWebsiteContext from "./MaliciousWebsiteContext";
import { addMaliciousWebsiteAPI, getAllMaliciousWebsitesAPI, getMaliciousWebsiteByIdAPI, removeMaliciousWebsiteByIdAPI} 
    from '../../../servicos/services';
import Tabela from "./Tabela";
import Form from "./Form";
import Carregando from "../../comuns/Carregando";

function MaliciousWebsite(){

    const [alerta, setAlerta] = useState({status : "", message : ""});
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({url : ""});
    const [carregando, setCarregando] = useState(false);

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status: "", message: "" });
        setObjeto({ url: "" });
    }

    const editarObjeto = async codigo => {
        setEditar(true);
        setAlerta({ status: "", message: "" });
        const objetoAPI = await getAllMaliciousWebsitesAPI(codigo);
        setObjeto(objetoAPI);
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        if (!objeto.url) {
            setAlerta({ status: "Error", message: "A URL deve ser preenchida" });
            return;
        }
        const metodo = editar ? "PUT" : "POST";
        try {
            let retornoAPI = await addMaliciousWebsiteAPI(objeto, metodo);
            setAlerta({ status: "Created", message: retornoAPI.url });
            setObjeto(retornoAPI);
            if (!editar) {
                setEditar(true);
            }
        } catch (err) {
            console.log(err);
        }
        recuperaMaliciousWebsites();
    }



    const recuperaMaliciousWebsites = async () => {
        setCarregando(true);
        setListaObjetos( await getAllMaliciousWebsitesAPI());
        setCarregando(false);
    }

    const remover = async codigo => {
        if (window.confirm('Deseja remover este objeto')){
            let retornoAPI = await removeMaliciousWebsiteByIdAPI(codigo);
            setAlerta({status : retornoAPI.status,
                 message : retornoAPI.message});
                 recuperaMaliciousWebsites();
        }
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({...objeto , [name] : value});
    }

    useEffect(() => {
        recuperaMaliciousWebsites();
    },[]);

    return (
        <MaliciousWebsiteContext.Provider value={{
            alerta, setAlerta, listaObjetos, remover,
            objeto, editar, acaoCadastrar, 
            handleChange, novoObjeto, editarObjeto
        }}>
            <Carregando carregando={carregando}>
            <Tabela/>
            </Carregando>
            
            <Form/>
        </MaliciousWebsiteContext.Provider>
    )
}

export default MaliciousWebsite;