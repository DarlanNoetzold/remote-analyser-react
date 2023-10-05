import { useState, useEffect } from "react";
import MaliciousProcessContext from "./MaliciousProcessContext";
import { addMaliciousProcessAPI, getAllMaliciousProcessesAPI, getMaliciousProcessByIdAPI, removeMaliciousProcessByIdAPI, updateMaliciousProcessAPI} 
    from '../../../servicos/services';
import Tabela from "./Tabela";
import Form from "./Form";
import Carregando from "../../comuns/Carregando";
import { useNavigate } from "react-router-dom";
import WithAuth from "../../../seguranca/WithAuth";

function MaliciousProcess(){

    let navigate = useNavigate();

    const [alerta, setAlerta] = useState({status : "", message : ""});
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({nameExe : ""});
    const [carregando, setCarregando] = useState(false);

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status: "", message: "" });
        setObjeto({ nameExe: "" });
    }

    const editarObjeto = async id => {
        try{
            setEditar(true);
            setAlerta({ status: "", message: "" });
            const objetoAPI = await getMaliciousProcessByIdAPI(id);
            setObjeto(objetoAPI);
        }catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        if (!objeto.nameExe) {
            setAlerta({ status: "Error", message: "A nameExe deve ser preenchida" });
            return;
        }
        if(editar === true){
            try {
                let retornoAPI = await updateMaliciousProcessAPI(objeto.id,objeto);
                setAlerta({ status: "Updated", message: retornoAPI.nameExe });
                setObjeto(retornoAPI);
            } catch (err) {
                console.log(err);
            }
        }else{
            try {
                let retornoAPI = await addMaliciousProcessAPI(objeto);
                setAlerta({ status: "Created", message: retornoAPI.nameExe });
                setObjeto(retornoAPI);
            } catch (err) {
                window.location.reload();
                navigate("/login", { replace: true });
            }
        }
        recuperaMaliciousProcesses();
    }

    const recuperaMaliciousProcesses = async () => {
        setCarregando(true);
        let retornoAPI = await getAllMaliciousProcessesAPI();
        if(retornoAPI === 0){
            setAlerta({ status: "Error", message: "Ops... você não tem acesso a essa página" });
            setCarregando(false);
            return;
        }
        if(retornoAPI == null){
            setAlerta({ status: "No Content", message: "Não existem processos cadastradas" });
        }else{
            setListaObjetos(retornoAPI);
        }

        setCarregando(false);
    }

    const remover = async codigo => {
        try{
            if (window.confirm('Deseja remover este objeto')){
                let retornoAPI = await removeMaliciousProcessByIdAPI(codigo);
                setAlerta({status : "Removed",
                    message : retornoAPI.nameExe});
                    recuperaMaliciousProcesses();
            }
        }catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
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

export default WithAuth(MaliciousProcess);