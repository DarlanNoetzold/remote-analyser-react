import React, { useContext, useState, useEffect } from 'react';
import Alerta from '../../comuns/Alerta';
import AlertContext from './AlertContext';
import CampoEntrada from '../../comuns/CampoEntrada';
import Dialogo from '../../comuns/Dialogo';

function Form() {
  const { objeto, handleChange, acaoCadastrar, alerta } = useContext(AlertContext);

  return (
    <Dialogo id="modalEdicao" titulo="Alert" idformulario="formEdicao" acaoCadastrar={acaoCadastrar}>
      <Alerta alerta={alerta} />
      <CampoEntrada id="txtCodigo" label="Código" tipo="number" name="codigo" value={objeto.id} handlechange={handleChange} requerido={false} readonly={true} maximocaracteres={5} />
      <CampoEntrada id="txtPcId" label="pcId" tipo="text" name="pcId" value={objeto.pcid} handlechange={handleChange} requerido={true} readonly={false} textovalido="pcId OK" textoinvalido="Informe o pcId" maximocaracteres={40} />
      <CampoEntrada id="txtLog" label="log" tipo="text" name="log" value={objeto.log} handlechange={handleChange} requerido={true} readonly={false} textovalido="log OK" textoinvalido="Informe o log" maximocaracteres={40} />
      <CampoEntrada id="txtProcessos" label="Processos" tipo="text" name="processos" value={objeto.processos} handlechange={handleChange} requerido={true} readonly={false} textovalido="Processos OK" textoinvalido="Informe o Processos" maximocaracteres={40} />
    </Dialogo>
  );
}

export default Form;
