import { useContext } from 'react'
import Alerta from '../../comuns/Alerta';
import CampoEntrada from '../../comuns/CampoEntrada';
import Dialogo from '../../comuns/Dialogo';
import MaliciousProcessContext from './MaliciousProcessContext';

function Form() {

    const { objeto, handleChange, acaoCadastrar, alerta } = useContext(MaliciousProcessContext);

    return (
        <Dialogo id="modalEdicao" titulo="MaliciousProcess" idformulario="formEdicao"
        acaoCadastrar={acaoCadastrar}>
            <Alerta alerta={alerta} />
            <CampoEntrada id="txtNome" label="nameExe" tipo="text"
                name="nameExe" value={objeto.nameExe}
                handlechange={handleChange}
                requerido={true} readonly={false}
                textovalido="nameExe OK" textoinvalido="Informe o nameExe"
                maximocaracteres={40} />
        </Dialogo>
    )
}

export default Form;
