import { useState, useEffect } from "react";
import MaliciousPortContext from "./MaliciousPortContext";
import { addMaliciousPortAPI, getAllMaliciousPortsAPI, getMaliciousPortByIdAPI, removeMaliciousPortByIdAPI} 
    from '../../../servicos/services';
import Tabela from "./Tabela";
import Form from "./Form";
import Carregando from "../../comuns/Carregando";

function MaliciousPort(){

    const [alerta, setAlerta] = useState({status : "", message : ""});
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({vulnarableBanners : ""});
    const [carregando, setCarregando] = useState(false);

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status: "", message: "" });
        setObjeto({ vulnarableBanners: "" });
    }

    const editarObjeto = async codigo => {
        setEditar(true);
        setAlerta({ status: "", message: "" });
        const objetoAPI = await getAllMaliciousPortsAPI(codigo);
        setObjeto(objetoAPI);
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        if (!objeto.vulnarableBanners) {
            setAlerta({ status: "Error", message: "A vulnarableBanners deve ser preenchida" });
            return;
        }
        const metodo = editar ? "PUT" : "POST";
        try {
            let retornoAPI = await addMaliciousPortAPI(objeto, metodo);
            setAlerta({ status: "Created", message: retornoAPI.vulnarableBanners });
            setObjeto(retornoAPI);
            if (!editar) {
                setEditar(true);
            }
        } catch (err) {
            console.log(err);
        }
        recuperaMaliciousPorts();
    }



    const recuperaMaliciousPorts = async () => {
        setCarregando(true);
        setListaObjetos( await getAllMaliciousPortsAPI());
        setCarregando(false);
    }

    const remover = async codigo => {
        if (window.confirm('Deseja remover este objeto')){
            let retornoAPI = await removeMaliciousPortByIdAPI(codigo);
            setAlerta({status : retornoAPI.status,
                 message : retornoAPI.message});
                 recuperaMaliciousPorts();
        }
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({...objeto , [name] : value});
    }

    useEffect(() => {
        recuperaMaliciousPorts();
    },[]);

    return (
        <MaliciousPortContext.Provider value={{
            alerta, setAlerta, listaObjetos, remover,
            objeto, editar, acaoCadastrar, 
            handleChange, novoObjeto, editarObjeto
        }}>
            <Carregando carregando={carregando}>
            <Tabela/>
            </Carregando>
            
            <Form/>
        </MaliciousPortContext.Provider>
    )
}

export default MaliciousPort;