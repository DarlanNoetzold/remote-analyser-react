import { useContext } from 'react'
import Alerta from '../../comuns/Alerta';
import AlertContext from './AlertContext';
import CampoEntrada from '../../comuns/CampoEntrada';
import Dialogo from '../../comuns/Dialogo';

function Form() {

    const { objeto, handleChange, acaoCadastrar, alerta } = useContext(AlertContext);

    return (
        <Dialogo id="modalEdicao" titulo="Categoria" idformulario="formEdicao"
        acaoCadastrar={acaoCadastrar}>
            <Alerta alerta={alerta} />
            <CampoEntrada id="txtCodigo" label="Código" tipo="number"
                name="codigo" value={objeto.id}
                handlechange={handleChange}
                requerido={false} readonly={true}
                maximocaracteres={5} />
            <CampoEntrada id="txtPcId" label="pcId" tipo="text"
                name="pcId" value={objeto.pcId}
                handlechange={handleChange}
                requerido={true} readonly={false}
                textovalido="pcId OK" textoinvalido="Informe o pcId"
                maximocaracteres={40} />
            <CampoEntrada id="txtImageId" label="ImageId" tipo="number"
                name="ImageId" value={objeto.imagem.id}
                handlechange={handleChange}
                requerido={true} readonly={false}
                textovalido="ImageId OK" textoinvalido="Informe o ImageId"
                maximocaracteres={40} />
            <CampoEntrada id="txtProcessos" label="Processos" tipo="text"
                name="processos" value={objeto.processos}
                handlechange={handleChange}
                requerido={true} readonly={false}
                textovalido="Processos OK" textoinvalido="Informe o Processos"
                maximocaracteres={40} />
        </Dialogo>
    )
}

export default Form;
