import { useState, useEffect } from "react";
import CategoriaContext from "./CategoriaContext";
import { getCategoriaServico, getCategoriaServicoPorCodigoAPI ,
    deleteCategoriaServico, cadastraCategoriaServico} 
    from '../../../servicos/CategoriaServico';
import Tabela from "./Tabela";
import Form from "./Form";
import Carregando from "../../comuns/Carregando";

function Categoria(){

    const [alerta, setAlerta] = useState({status : "", message : ""});
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({codigo : "", nome : ""});
    const [carregando, setCarregando] = useState(false);

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({status : "", message : ""});
        setObjeto({ codigo : 0, nome : ""});
    }

    const editarObjeto = async codigo => {
        setEditar(true);
        setAlerta({status : "", message : ""});
        setObjeto( await getCategoriaServicoPorCodigoAPI(codigo));
    }    

    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        try {
            let retornoAPI = await cadastraCategoriaServico(objeto, metodo);
            setAlerta({status : retornoAPI.status, 
            message : retornoAPI.message});
            setObjeto(retornoAPI.objeto);
            if (!editar){
                setEditar(true);
            }
        } catch (err){
            console.log(err)
        }
        recuperaCategorias();
    }



    const recuperaCategorias = async () => {
        setCarregando(true);
        setListaObjetos( await getCategoriaServico());
        setCarregando(false);
    }

    const remover = async codigo => {
        if (window.confirm('Deseja remover este objeto')){
            let retornoAPI = await deleteCategoriaServico(codigo);
            setAlerta({status : retornoAPI.status,
                 message : retornoAPI.message});
            recuperaCategorias();
        }
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({...objeto , [name] : value});
    }

    useEffect(() => {
        recuperaCategorias();
    },[]);

    return (
        <CategoriaContext.Provider value={{
            alerta, setAlerta, listaObjetos, remover,
            objeto, editar, acaoCadastrar, 
            handleChange, novoObjeto, editarObjeto
        }}>
            <Carregando carregando={carregando}>
            <Tabela/>
            </Carregando>
            
            <Form/>
        </CategoriaContext.Provider>
    )
}

export default Categoria;