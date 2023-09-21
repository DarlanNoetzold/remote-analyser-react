import { useState, useEffect } from "react";
import AlertContext from "./AlertContext";
import { addAlertAPI, getAllAlertsAPI, getAlertByIdAPI, removeAlertByIdAPI} 
    from '../../../servicos/services';
import Tabela from "./Tabela";
import Form from "./Form";
import Carregando from "../../comuns/Carregando";

function Alert(){

    const [alerta, setAlerta] = useState({status : "", message : ""});
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({id : "", nome : ""});
    const [carregando, setCarregando] = useState(false);

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({status : "", message : ""});
        setObjeto({ codigo : 0, nome : ""});
    }

    const editarObjeto = async codigo => {
        setEditar(true);
        setAlerta({status : "", message : ""});
        setObjeto( await getAlertByIdAPI(codigo));
    }    

    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        try {
            let retornoAPI = await addAlertAPI(objeto, metodo);
            setAlerta({status : retornoAPI.status, 
            message : retornoAPI.message});
            setObjeto(retornoAPI.objeto);
            if (!editar){
                setEditar(true);
            }
        } catch (err){
            console.log(err)
        }
        recuperaAlerts();
    }



    const recuperaAlerts = async () => {
        setCarregando(true);
        setListaObjetos( await getAllAlertsAPI());
        setCarregando(false);
    }

    const remover = async codigo => {
        if (window.confirm('Deseja remover este objeto')){
            let retornoAPI = await removeAlertByIdAPI(codigo);
            setAlerta({status : retornoAPI.status,
                 message : retornoAPI.message});
                 recuperaAlerts();
        }
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({...objeto , [name] : value});
    }

    useEffect(() => {
        recuperaAlerts();
    },[]);

    return (
        <AlertContext.Provider value={{
            alerta, setAlerta, listaObjetos, remover,
            objeto, editar, acaoCadastrar, 
            handleChange, novoObjeto, editarObjeto
        }}>
            <Carregando carregando={carregando}>
            <Tabela/>
            </Carregando>
            
            <Form/>
        </AlertContext.Provider>
    )
}

export default Alert;