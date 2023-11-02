import { useState, useEffect } from "react";
import BadLanguageContext from "./BadLanguageContext";
import { addBadLanguageAPI, getAllBadLanguagesAPI, getBadLanguageByIdAPI, removeBadLanguageByIdAPI, updateBadLanguageAPI, uploadLanguageCSVAPI} 
    from '../../../servicos/services';
import Tabela from "./Tabela";
import Form from "./Form";
import Carregando from "../../comuns/Carregando";
import WithAuth from "../../../seguranca/WithAuth";
import { useNavigate } from "react-router-dom";


function BadLanguage(){

    let navigate = useNavigate();
    const SIZE = 10;

    const [alerta, setAlerta] = useState({status : "", message : ""});
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({word : ""});
    const [carregando, setCarregando] = useState(false);
    const [page, setPage] = useState(1);
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
          const response = await uploadLanguageCSVAPI(formData);
          console.log("File uploaded successfully:", response);
          setSelectedFile(null);
          recuperaBadLanguages();
        } catch (error) {
          console.error("File upload failed:", error);
        }
      };

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
        let retornoAPI = await getAllBadLanguagesAPI(page, SIZE);
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
        recuperaBadLanguages();
    },[page]);

    return (
        <BadLanguageContext.Provider value={{
            alerta, setAlerta, listaObjetos, remover,
            objeto, editar, acaoCadastrar, 
            handleChange, novoObjeto, editarObjeto, nextPage, previousPage, page, handleFileUpload, handleFileChange
        }}>
            <Carregando carregando={carregando}>
            <Tabela/>
            </Carregando>
            
            <Form/>
        </BadLanguageContext.Provider>
    )
}

export default WithAuth(BadLanguage);