import { useState, useEffect } from "react";
import BadLanguageContext from "./BadLanguageContext";
import { addBadLanguageAPI, getAllBadLanguagesAPI, getBadLanguageByIdAPI, removeBadLanguageByIdAPI, updateBadLanguageAPI} 
    from '../../../servicos/services';
import Tabela from "./Tabela";
import Form from "./Form";
import Carregando from "../../comuns/Carregando";
import WithAuth from "../../../seguranca/WithAuth";
import { useNavigate } from "react-router-dom";


function BadLanguage(){

    let navigate = useNavigate();

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

    const editarObjeto = async id => {
        try{
            setEditar(true);
            setAlerta({ status: "", message: "" });
            const objetoAPI = await getBadLanguageByIdAPI(id);
            setObjeto(objetoAPI);
        }catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        if (!objeto.word) {
            setAlerta({ status: "Error", message: "A word deve ser preenchida" });
            return;
        }
        if(editar === true){
            try {
                let retornoAPI = await updateBadLanguageAPI(objeto.id,objeto);
                setAlerta({ status: "Updated", message: retornoAPI.word });
                setObjeto(retornoAPI);
            } catch (err) {
                console.log(err);
            }
        }else{
            try {
                let retornoAPI = await addBadLanguageAPI(objeto);
                setAlerta({ status: "Created", message: retornoAPI.word });
                setObjeto(retornoAPI);
            } catch (err) {
                window.location.reload();
                navigate("/login", { replace: true });
            }
        }
        recuperaBadLanguages();
    }

    const recuperaBadLanguages = async () => {
        setCarregando(true);
        let retornoAPI = await getAllBadLanguagesAPI();
        if(retornoAPI == null){
            setAlerta({ status: "No Content", message: "Não existem badLanguages cadastradas" });
        }else{
            setListaObjetos(retornoAPI);
        }
        setCarregando(false);
    }

    const remover = async id => {
        try{
            if (window.confirm('Deseja remover este objeto')){
                let retornoAPI = await removeBadLanguageByIdAPI(id);
                setAlerta({status : "Removed",
                    message : retornoAPI.word});
                    recuperaBadLanguages();
            }
        }catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
        
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        console.log(objeto);
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

export default WithAuth(BadLanguage);