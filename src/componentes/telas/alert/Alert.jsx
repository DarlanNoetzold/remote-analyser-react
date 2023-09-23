import React, { useState, useEffect } from "react";
import AlertContext from "./AlertContext";
import Tabela from "./Tabela";
import Form from "./Form";
import Carregando from "../../comuns/Carregando";

import {
  addAlertAPI,
  getAllAlertsAPI,
  getAlertByIdAPI,
  removeAlertByIdAPI,
} from "../../../servicos/services";

function Alert() {
  const [alerta, setAlerta] = useState({ status: "", message: "" });
  const [listaObjetos, setListaObjetos] = useState([]);
  const [editar, setEditar] = useState(false);
  const [objeto, setObjeto] = useState({
    id: 0,
    pcId: "",
    image: {
      id: 0,
      productImg: "",
      base64Img: "",
    },
    processos: null,
    dataCadastro: "",
  });
  const [carregando, setCarregando] = useState(false);

  const novoObjeto = () => {
    setEditar(false);
    setAlerta({ status: "", message: "" });
    setObjeto({
      id: 0,
      pcId: "",
      image: {
        id: 0,
        productImg: "",
        base64Img: "",
      },
      processos: null,
      dataCadastro: "",
    });
  };

  const editarObjeto = async (codigo) => {
    setEditar(true);
    setAlerta({ status: "", message: "" });
    const objetoAPI = await getAlertByIdAPI(codigo);
    setObjeto(objetoAPI);
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
      console.log(err);
    }
    recuperaAlerts();
  };

  const recuperaAlerts = async () => {
    setCarregando(true);
    const alerts = await getAllAlertsAPI();
    setListaObjetos(alerts);
    setCarregando(false);
  };

  const remover = async (codigo) => {
    if (window.confirm("Deseja remover este objeto")) {
      let retornoAPI = await removeAlertByIdAPI(codigo);
      setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
      recuperaAlerts();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setObjeto({
      ...objeto,
      [name]: value,
    });
  };

  useEffect(() => {
    recuperaAlerts();
  }, []);

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
      }}
    >
      <Carregando carregando={carregando}>
        <Tabela />
      </Carregando>
      <Form />
    </AlertContext.Provider>
  );
}

export default Alert;
