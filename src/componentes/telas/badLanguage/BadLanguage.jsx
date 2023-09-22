import { useState, useEffect } from "react";
import BadLanguageContext from "./BadLanguageContext";
import { addBadLanguageAPI, getAllBadLanguagesAPI, getBadLanguageByIdAPI, removeBadLanguageByIdAPI} 
    from '../../../servicos/services';
import Tabela from "./Tabela";
import Form from "./Form";
import Carregando from "../../comuns/Carregando";

function BadLanguage(){

    const [alerta, setAlerta] = useState({status : "", message : ""});
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({word : ""});
    const [carregando, setCarregando] = useState(false);

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status: "", message: "" });
        setObjeto({ word: "" });
    }

    const editarObjeto = async codigo => {
        setEditar(true);
        setAlerta({ status: "", message: "" });
        const objetoAPI = await getAllBadLanguagesAPI(codigo);
        setObjeto(objetoAPI);
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        if (!objeto.word) {
            setAlerta({ status: "Error", message: "A word deve ser preenchida" });
            return;
        }
        const metodo = editar ? "PUT" : "POST";
        try {
            let retornoAPI = await addBadLanguageAPI(objeto, metodo);
            setAlerta({ status: "Created", message: retornoAPI.word });
            setObjeto(retornoAPI);
            if (!editar) {
                setEditar(true);
            }
        } catch (err) {
            console.log(err);
        }
        recuperaBadLanguages();
    }

    const recuperaBadLanguages = async () => {
        setCarregando(true);
        setListaObjetos( await getAllBadLanguagesAPI());
        setCarregando(false);
    }

    const remover = async codigo => {
        if (window.confirm('Deseja remover este objeto')){
            let retornoAPI = await removeBadLanguageByIdAPI(codigo);
            setAlerta({status : retornoAPI.status,
                 message : retornoAPI.message});
                 recuperaBadLanguages();
        }
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({...objeto , [name] : value});
    }

    useEffect(() => {
        recuperaBadLanguages();
    },[]);

    return (
        <BadLanguageContext.Provider value={{
            alerta, setAlerta, listaObjetos, remover,
            objeto, editar, acaoCadastrar, 
            handleChange, novoObjeto, editarObjeto
        }}>
            <Carregando carregando={carregando}>
            <Tabela/>
            </Carregando>
            
            <Form/>
        </BadLanguageContext.Provider>
    )
}

export default BadLanguage;