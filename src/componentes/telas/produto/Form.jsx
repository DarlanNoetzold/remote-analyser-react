import { useContext } from 'react'
import Alerta from '../../comuns/Alerta';
import ProdutoContext from './ProdutoContext';
import CampoEntrada from '../../comuns/CampoEntrada';
import Dialogo from '../../comuns/Dialogo';
import CampoSelect from '../../comuns/CampoSelect';

function Form() {

    const { objeto, handleChange, acaoCadastrar, alerta, listaCategorias }
        = useContext(ProdutoContext);

    return (
        <Dialogo id="modalEdicao" titulo="Produto" idformulario="formEdicao"
            acaoCadastrar={acaoCadastrar}>
            <Alerta alerta={alerta} />
            <CampoEntrada id="txtCodigo" label="Código" tipo="number"
                name="codigo" value={objeto.codigo}
                handlechange={handleChange}
                requerido={false} readonly={true}
                maximocaracteres={5} />
            <CampoEntrada id="txtNome" label="Nome" tipo="text"
                name="nome" value={objeto.nome}
                handlechange={handleChange}
                requerido={true} readonly={false}
                textovalido="Nome OK" textoinvalido="Informe o nome"
                maximocaracteres={40} />
            <CampoEntrada id="txtDescricao" label="Descrição" tipo="text"
                name="descricao" value={objeto.descricao}
                handlechange={handleChange}
                requerido={true} readonly={false}
                textovalido="Descrição OK" textoinvalido="Informe a descrição"
                maximocaracteres={40} />
            <CampoEntrada id="txtEstoque" label="Estoque" tipo="number"
                name="quantidade_estoque" value={objeto.quantidade_estoque}
                handlechange={handleChange}
                requerido={true} readonly={false}
                textovalido="Estoque OK" textoinvalido="Informe estoque" />
            <CampoSelect id="txtAtivo" label="Ativo"
                name="ativo" value={objeto.ativo}
                handlechange={handleChange}
                requerido={true}
                textovalido="Ativo OK"
                textoinvalido="Informe se o produto está ativo">
                <option value={true}>SIM</option>
                <option value={false}>NÃO</option>
            </CampoSelect>
            <CampoEntrada id="txtValor" label="Valor" tipo="number"
                name="valor" value={objeto.valor}
                handlechange={handleChange}
                requerido={true} readonly={false}
                textovalido="Valor OK" textoinvalido="Informe o valor" />
            <CampoEntrada id="txtDataCadastro" label="Data de cadastro" tipo="date"
                name="data_cadastro" value={objeto.data_cadastro}
                handlechange={handleChange}
                requerido={true} readonly={false}
                textovalido="Data OK" textoinvalido="Informe a data de cadastro" />
            <CampoSelect id="txtCategoria" label="Categoria"
                name="categoria" value={objeto.categoria}
                handlechange={handleChange}
                requerido={true}
                textovalido="Categoria OK"
                textoinvalido="Informe a categoria">
                {
                    listaCategorias.map((cat) => (
                        <option key={cat.codigo} value={cat.codigo}>
                            {cat.nome}
                        </option>
                    ))
                }
            </CampoSelect>
        </Dialogo>
    )
}

export default Form;
