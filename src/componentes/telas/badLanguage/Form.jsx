import { useContext } from 'react'
import Alerta from '../../comuns/Alerta';
import CampoEntrada from '../../comuns/CampoEntrada';
import Dialogo from '../../comuns/Dialogo';
import BadLanguageContext from './BadLanguageContext';

function Form() {

    const { objeto, handleChange, acaoCadastrar, alerta } = useContext(BadLanguageContext);

    return (
        <Dialogo id="modalEdicao" titulo="BadLanguage" idformulario="formEdicao"
        acaoCadastrar={acaoCadastrar}>
            <Alerta alerta={alerta} />
            <CampoEntrada id="txtNome" label="word" tipo="text"
                name="word" value={objeto.word}
                handlechange={handleChange}
                requerido={true} readonly={false}
                textovalido="word OK" textoinvalido="Informe o word"
                maximocaracteres={40} />
        </Dialogo>
    )
}

export default Form;
