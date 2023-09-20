import { useContext } from 'react'
import Alerta from '../../comuns/Alerta';
import CampoEntrada from '../../comuns/CampoEntrada';
import Dialogo from '../../comuns/Dialogo';
import MaliciousPortContext from './MaliciousPortContext';

function Form() {

    const { objeto, handleChange, acaoCadastrar, alerta } = useContext(MaliciousPortContext);

    return (
        <Dialogo id="modalEdicao" titulo="MaliciousPort" idformulario="formEdicao"
        acaoCadastrar={acaoCadastrar}>
            <Alerta alerta={alerta} />
            <CampoEntrada id="txtCodigo" label="Código" tipo="number"
                name="codigo" value={objeto.id}
                handlechange={handleChange}
                requerido={false} readonly={true}
                maximocaracteres={5} />
            <CampoEntrada id="txtNome" label="vulnarableBanners" tipo="text"
                name="vulnarableBanners" value={objeto.vulnarableBanners}
                handlechange={handleChange}
                requerido={true} readonly={false}
                textovalido="vulnarableBanners OK" textoinvalido="Informe o vulnarableBanners"
                maximocaracteres={40} />
        </Dialogo>
    )
}

export default Form;
