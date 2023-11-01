import React, { useState, useEffect } from "react";
import Tabela from "./Tabela";
import Carregando from "../../comuns/Carregando";
import WithAuth from "../../../seguranca/WithAuth";
import { useNavigate } from "react-router-dom";


import {
  addAlertAPI,
  getAlertByPcIdAPI,
  removeAlertByIdAPI,
} from "../../../servicos/services";
import AlertUserContext from "./AlertUserContext";

function Alert() {

  let navigate = useNavigate();

  const [alerta, setAlerta] = useState({ status: "", message: "" });
  const [listaObjetos, setListaObjetos] = useState([]);
  const [editar, setEditar] = useState(false);
  const [objeto, setObjeto] = useState({
    id: 0,
    pcId: "",
    image: "",
    language: "en",
    log: "",
    models: [],
    processos: null,
    dataCadastro: "",
  });
  const [carregando, setCarregando] = useState(false);

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
    const localStorageAutenticacao = localStorage.getItem('remote/autenticacao');
    const autenticacao = localStorageAutenticacao ?
        JSON.parse(localStorageAutenticacao) : null;
    const alerts = await getAlertByPcIdAPI(autenticacao.username);
    setListaObjetos(alerts);
    console.log(listaObjetos);
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

  useEffect(() => {
    recuperaAlerts();
  }, []);

  return (
    <AlertUserContext.Provider
      value={{
        alerta,
        listaObjetos,
        remover,
        objeto,
        editar,
        acaoCadastrar,
        handleChange,
      }}
    >
      <Carregando carregando={carregando}>
        <Tabela />
      </Carregando>
    </AlertUserContext.Provider>
  );
}

export default WithAuth(Alert);
