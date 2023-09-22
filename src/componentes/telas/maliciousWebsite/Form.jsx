import { useContext } from 'react'
import Alerta from '../../comuns/Alerta';
import CampoEntrada from '../../comuns/CampoEntrada';
import Dialogo from '../../comuns/Dialogo';
import MaliciousWebsiteContext from './MaliciousWebsiteContext';

function Form() {

    const { objeto, handleChange, acaoCadastrar, alerta } = useContext(MaliciousWebsiteContext);

    return (
        <Dialogo id="modalEdicao" titulo="MaliciousWebsite" idformulario="formEdicao"
        acaoCadastrar={acaoCadastrar}>
            <Alerta alerta={alerta} />
            <CampoEntrada id="txtNome" label="url" tipo="text"
                name="url" value={objeto.url}
                handlechange={handleChange}
                requerido={true} readonly={false}
                textovalido="URL OK" textoinvalido="Informe a URL"
                maximocaracteres={40} />
        </Dialogo>
    )
}

export default Form;