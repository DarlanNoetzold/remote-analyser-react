import { useState, useEffect } from "react";
import MaliciousWebsiteContext from "./MaliciousWebsiteContext";
import { addMaliciousWebsiteAPI, getAllMaliciousWebsitesAPI, getMaliciousWebsiteByIdAPI, removeMaliciousWebsiteByIdAPI, updateMaliciousWebsiteAPI, uploadWebsiteCSVAPI} 
    from '../../../servicos/services';
import Tabela from "./Tabela";
import Form from "./Form";
import Carregando from "../../comuns/Carregando";
import WithAuth from "../../../seguranca/WithAuth";
import { useNavigate } from "react-router-dom";

function MaliciousWebsite(){

    let navigate = useNavigate();
    const SIZE = 10;

    const [alerta, setAlerta] = useState({status : "", message : ""});
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({url : ""});
    const [page, setPage] = useState(1);
    const [carregando, setCarregando] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
      };
    
      const handleFileUpload = async () => {
        if (!selectedFile) {
          return;
        }
    
        const formData = new FormData();
        formData.append("file", selectedFile);
    
        try {
          const response = await uploadWebsiteCSVAPI(formData);
          console.log("File uploaded successfully:", response);
          setSelectedFile(null);
          recuperaMaliciousWebsites();
        } catch (error) {
          console.error("File upload failed:", error);
        }
      };
    
    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status: "", message: "" });
        setObjeto({ url: "" });
    }

    const editarObjeto = async codigo => {
        try{
            setEditar(true);
            setAlerta({ status: "", message: "" });
            const objetoAPI = await getMaliciousWebsiteByIdAPI(codigo);
            setObjeto(objetoAPI);
        }catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        if (!objeto.url) {
            setAlerta({ status: "Error", message: "A URL deve ser preenchida" });
            return;
        }
        if(editar === true){
            try {
                let retornoAPI = await updateMaliciousWebsiteAPI(objeto.id,objeto);
                setAlerta({ status: "Updated", message: retornoAPI.url });
                setObjeto(retornoAPI);
            } catch (err) {
                console.log(err);
            }
        }else{
            try {
                let retornoAPI = await addMaliciousWebsiteAPI(objeto);
                setAlerta({ status: "Created", message: retornoAPI.url });
                setObjeto(retornoAPI);
            } catch (err) {
                window.location.reload();
                navigate("/login", { replace: true });
            }
        }
        recuperaMaliciousWebsites();
    }

    const recuperaMaliciousWebsites = async () => {
        setCarregando(true);
        let retornoAPI = await getAllMaliciousWebsitesAPI(page, SIZE);
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

    const remover = async codigo => {
        try{
            if (window.confirm('Deseja remover este objeto')){
                let retornoAPI = await removeMaliciousWebsiteByIdAPI(codigo);
                setAlerta({status : "Removed",
                    message : retornoAPI.url});
                    recuperaMaliciousWebsites();
            }
        }catch (err) {
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
        recuperaMaliciousWebsites();
    },[page]);

    return (
        <MaliciousWebsiteContext.Provider value={{
            alerta, setAlerta, listaObjetos, remover,
            objeto, editar, acaoCadastrar, 
            handleChange, novoObjeto, editarObjeto, nextPage, previousPage, page, handleFileChange, handleFileUpload
        }}>
            <Carregando carregando={carregando}>
            <Tabela/>
            </Carregando>
            
            <Form/>
        </MaliciousWebsiteContext.Provider>
    )
}

export default WithAuth(MaliciousWebsite);