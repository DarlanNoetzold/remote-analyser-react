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
    const [objeto, setObjeto] = useState({id : "", word : ""});
    const [carregando, setCarregando] = useState(false);

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({status : "", message : ""});
        setObjeto({ codigo : 0, nome : ""});
    }

    const editarObjeto = async codigo => {
        setEditar(true);
        setAlerta({status : "", message : ""});
        setObjeto( await getBadLanguageByIdAPI(codigo));
    }    

    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        try {
            let retornoAPI = await addBadLanguageAPI(objeto, metodo);
            setAlerta({status : retornoAPI.status, 
            message : retornoAPI.message});
            setObjeto(retornoAPI.objeto);
            if (!editar){
                setEditar(true);
            }
        } catch (err){
            console.log(err)
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