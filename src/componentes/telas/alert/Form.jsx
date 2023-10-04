import React, { useContext, useState, useEffect } from 'react';
import Alerta from '../../comuns/Alerta';
import AlertContext from './AlertContext';
import CampoEntrada from '../../comuns/CampoEntrada';
import Dialogo from '../../comuns/Dialogo';
import { getAllImagesAPI } from '../../../servicos/services';

function Form() {
  const { objeto, handleChangeImg, handleChange, acaoCadastrar, alerta } = useContext(AlertContext);

  const [imagensDisponiveis, setImagensDisponiveis] = useState([]);
  
  useEffect(() => {
    const fetchImagensDisponiveis = async () => {
      try {
        setImagensDisponiveis(await getAllImagesAPI());
      } catch (error) {
        console.error('Erro ao obter imagens:', error);
      }
    };

    fetchImagensDisponiveis();
  }, []);

  return (
    <Dialogo id="modalEdicao" titulo="Categoria" idformulario="formEdicao" acaoCadastrar={acaoCadastrar}>
      <Alerta alerta={alerta} />
      <CampoEntrada id="txtCodigo" label="Código" tipo="number" name="codigo" value={objeto.id} handleChange={handleChange} requerido={false} readonly={true} maximocaracteres={5} />
      <CampoEntrada id="txtPcId" label="pcId" tipo="text" name="pcId" value={objeto.pcid} handleChange={handleChange} requerido={true} readonly={false} textovalido="pcId OK" textoinvalido="Informe o pcId" maximocaracteres={40} />
      <div className="form-group">
        <label htmlFor="selectImageId">ImageId</label>
        <select
          id="selectImageId"
          name="ImageId"
          className="form-control"
          value={objeto.image.id}
          onChange={handleChangeImg}
          required
        >
          {imagensDisponiveis.map(imagem => (
            <option key={imagem.id} value={imagem.id}>
              {imagem.productImg}
            </option>
          ))}
        </select>
      </div>

      <CampoEntrada id="txtProcessos" label="Processos" tipo="text" name="processos" value={objeto.processos} handleChange={handleChange} requerido={true} readonly={false} textovalido="Processos OK" textoinvalido="Informe o Processos" maximocaracteres={40} />
    </Dialogo>
  );
}

export default Form;
