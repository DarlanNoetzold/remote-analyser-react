import { useState, useEffect } from "react";
import MaliciousProcessContext from "./MaliciousProcessContext";
import { addMaliciousProcessAPI, getAllMaliciousProcessesAPI, getMaliciousProcessByIdAPI, removeMaliciousProcessByIdAPI} 
    from '../../../servicos/services';
import Tabela from "./Tabela";
import Form from "./Form";
import Carregando from "../../comuns/Carregando";

function MaliciousProcess(){

    const [alerta, setAlerta] = useState({status : "", message : ""});
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({id : "", nameExe : ""});
    const [carregando, setCarregando] = useState(false);

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({status : "", message : ""});
        setObjeto({ codigo : 0, nome : ""});
    }

    const editarObjeto = async codigo => {
        setEditar(true);
        setAlerta({status : "", message : ""});
        setObjeto( await getAllMaliciousProcessesAPI(codigo));
    }    

    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        try {
            let retornoAPI = await addMaliciousProcessAPI(objeto, metodo);
            setAlerta({status : retornoAPI.status, 
            message : retornoAPI.message});
            setObjeto(retornoAPI.objeto);
            if (!editar){
                setEditar(true);
            }
        } catch (err){
            console.log(err)
        }
        recuperaMaliciousProcesses();
    }



    const recuperaMaliciousProcesses = async () => {
        setCarregando(true);
        setListaObjetos( await getAllMaliciousProcessesAPI());
        setCarregando(false);
    }

    const remover = async codigo => {
        if (window.confirm('Deseja remover este objeto')){
            let retornoAPI = await removeMaliciousProcessByIdAPI(codigo);
            setAlerta({status : retornoAPI.status,
                 message : retornoAPI.message});
                 recuperaMaliciousProcesses();
        }
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({...objeto , [name] : value});
    }

    useEffect(() => {
        recuperaMaliciousProcesses();
    },[]);

    return (
        <MaliciousProcessContext.Provider value={{
            alerta, setAlerta, listaObjetos, remover,
            objeto, editar, acaoCadastrar, 
            handleChange, novoObjeto, editarObjeto
        }}>
            <Carregando carregando={carregando}>
            <Tabela/>
            </Carregando>
            
            <Form/>
        </MaliciousProcessContext.Provider>
    )
}

export default MaliciousProcess;