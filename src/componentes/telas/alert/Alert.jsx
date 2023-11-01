import React, { useState, useEffect } from "react";
import AlertContext from "./AlertContext";
import Tabela from "./Tabela";
import Form from "./Form";
import Carregando from "../../comuns/Carregando";
import WithAuth from "../../../seguranca/WithAuth";
import { useNavigate } from "react-router-dom";


import {
  addAlertAPI,
  getAllAlertsAPI,
  getAlertByIdAPI,
  removeAlertByIdAPI,
} from "../../../servicos/services";

function Alert() {

  let navigate = useNavigate();
  const SIZE = 10;

  const [alerta, setAlerta] = useState({ status: "", message: "" });
  const [listaObjetos, setListaObjetos] = useState([]);
  const [editar, setEditar] = useState(false);
  const [objeto, setObjeto] = useState({
    id: 0,
    pcId: "",
    image: "",
    language: "en",
    log: "ctrlcctrltabaltcctrltabtabaltvctrltabaltcctrlvctrlsssctrldfdsafas",
    models: [],
    processos: null,
    dataCadastro: "",
  });
  const [carregando, setCarregando] = useState(false);
  const [page, setPage] = useState(0);

  const novoObjeto = () => {
    setEditar(false);
    setAlerta({ status: "", message: "" });
    setObjeto({
      id: 0,
      pcId: "",
      image: "",
      language: "en",
      log: "ctrlcctrltabaltcctrltabtabaltvctrltabaltcctrlvctrlsssctrldfdsafas",
      models: [],
      processos: null,
      dataCadastro: "",
    });
  };

  const editarObjeto = async (codigo) => {
    try {
      setEditar(true);
      setAlerta({ status: "", message: "" });
      const objetoAPI = await getAlertByIdAPI(codigo);
      setObjeto(objetoAPI);
    } catch (err) {
      window.location.reload();
      navigate("/login", { replace: true });
    }
  };

  const acaoCadastrar = async (e) => {
    e.preventDefault();
    if (!objeto.pcId) {
      setAlerta({ status: "Error", message: "pcId deve ser preenchido" });
      return;
    }
    const metodo = editar ? "PUT" : "POST";
    try {
      let retornoAPI = await addAlertAPI(objeto, metodo);
      setAlerta({ status: "Created", message: retornoAPI.pcId });
      setObjeto(retornoAPI);
      if (!editar) {
        setEditar(true);
      }
    } catch (err) {
      window.location.reload();
      navigate("/login", { replace: true });
    }

    recuperaAlerts();
  };

  const recuperaAlerts = async () => {
    setCarregando(true);
    const retornoAPI = await getAllAlertsAPI(page, SIZE);
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
  };

  const remover = async (codigo) => {
    try{
      if (window.confirm("Deseja remover este objeto")) {
        let retornoAPI = await removeAlertByIdAPI(codigo);
        setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
        recuperaAlerts();
      }
    } catch (err) {
      window.location.reload();
      navigate("/login", { replace: true });
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setObjeto({...objeto , [name] : value});
}

const nextPage = () => {
  setPage(page => page + 1);
}

const previousPage = () => {
  if (page > 1) {
      setPage(page => page - 1);
  }
}

  useEffect(() => {
    recuperaAlerts();
  }, [page]);

  return (
    <AlertContext.Provider
      value={{
        alerta,
        listaObjetos,
        remover,
        objeto,
        editar,
        acaoCadastrar,
        handleChange,
        novoObjeto,
        editarObjeto,
        nextPage, previousPage, page
      }}
    >
      <Carregando carregando={carregando}>
        <Tabela />
      </Carregando>
      <Form />
    </AlertContext.Provider>
  );
}

export default WithAuth(Alert);
