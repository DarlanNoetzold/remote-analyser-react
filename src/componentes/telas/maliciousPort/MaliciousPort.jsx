import { useState, useEffect } from "react";
import MaliciousPortContext from "./MaliciousPortContext";
import { addMaliciousPortAPI, getAllMaliciousPortsAPI, getMaliciousPortByIdAPI, removeMaliciousPortByIdAPI, updateMaliciousPortAPI} 
    from '../../../servicos/services';
import Tabela from "./Tabela";
import Form from "./Form";
import Carregando from "../../comuns/Carregando";
import { useNavigate } from "react-router-dom";
import WithAuth from "../../../seguranca/WithAuth";


function MaliciousPort(){

    let navigate = useNavigate();
    const SIZE = 10;

    const [alerta, setAlerta] = useState({status : "", message : ""});
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({vulnarableBanners : ""});
    const [carregando, setCarregando] = useState(false);
    const [page, setPage] = useState(1);


    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status: "", message: "" });
        setObjeto({ vulnarableBanners: "" });
    }

    const editarObjeto = async id => {
        try{
            setEditar(true);
            setAlerta({ status: "", message: "" });
            const objetoAPI = await getMaliciousPortByIdAPI(id);
            setObjeto(objetoAPI);
        } catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        if (!objeto.vulnarableBanners) {
            setAlerta({ status: "Error", message: "A vulnarableBanners deve ser preenchida" });
            return;
        }
        if(editar === true){
            try {
                let retornoAPI = await updateMaliciousPortAPI(objeto.id,objeto);
                setAlerta({ status: "Updated", message: retornoAPI.vulnarableBanners });
                setObjeto(retornoAPI);
            } catch (err) {
                console.log(err);
            }
        }else{
            try {
                let retornoAPI = await addMaliciousPortAPI(objeto);
                setAlerta({ status: "Created", message: retornoAPI.vulnarableBanners });
                setObjeto(retornoAPI);
            } catch (err) {
                window.location.reload();
                navigate("/login", { replace: true });
            }
        }
        recuperaMaliciousPorts();
    }

    const recuperaMaliciousPorts = async () => {
        setCarregando(true);
        let retornoAPI = await getAllMaliciousPortsAPI(page, SIZE);
        if(retornoAPI === 0){
            setAlerta({ status: "Error", message: "Ops... você não tem acesso a essa página" });
            setCarregando(false);
            return;
        }
        if(retornoAPI == null){
            setAlerta({ status: "No Content", message: "Não existem sites cadastrados" });
            setListaObjetos(retornoAPI);
            setCarregando(false)
        }else{
            setListaObjetos(retornoAPI);
        }
        setCarregando(false);
    }

    const remover = async id => {
        try{
            if (window.confirm('Deseja remover este objeto')){
                let retornoAPI = await removeMaliciousPortByIdAPI(id);
                setAlerta({status : "Removed",
                    message : retornoAPI.vulnarableBanners});
                    recuperaMaliciousPorts();
            }
        } catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
    }
    
    const nextPage = () => {
        setPage(page => page + 1);
    }

    const previousPage = () => {
        if (page > 1) {
            setPage(page => page - 1);
        }
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({...objeto , [name] : value});
    }

    useEffect(() => {
        recuperaMaliciousPorts();
    },[page]);

    return (
        <MaliciousPortContext.Provider value={{
            alerta, setAlerta, listaObjetos, remover,
            objeto, editar, acaoCadastrar, 
            handleChange, novoObjeto, editarObjeto, nextPage, previousPage, page
        }}>
            <Carregando carregando={carregando}>
            <Tabela/>
            </Carregando>
            
            <Form/>
        </MaliciousPortContext.Provider>
    )
}

export default WithAuth(MaliciousPort);