import { useState, useEffect } from "react";
import ProdutoContext from "./ProdutoContext";
import { getCategoriaServico }
    from '../../../servicos/CategoriaServico';
import {
    getProdutoServico, getProdutoServicoPorCodigoAPI,
    deleteProdutoServico, cadastraProdutoServico
}
    from '../../../servicos/ProdutoServico'
import Tabela from "./Tabela";
import Form from "./Form";
import Carregando from "../../comuns/Carregando";

function Produto() {

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({ codigo: "", nome: "" });
    const [carregando, setCarregando] = useState(false);
    const [listaCategorias, setListaCategorias] = useState([]);

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status: "", message: "" });
        setObjeto({
            codigo: 0,
            nome: "",
            descricao: "",
            quantidade_estoque: "",
            valor: "",
            ativo: "",
            data_cadastro: new Date().toISOString().slice(0, 10),
            categoria: ""
        });        
    }

    const editarObjeto = async codigo => {
        setEditar(true);
        setAlerta({ status: "", message: "" });
        setObjeto(await getProdutoServicoPorCodigoAPI(codigo));
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        try {
            let retornoAPI = await cadastraProdutoServico(objeto, metodo);
            setAlerta({
                status: retornoAPI.status,
                message: retornoAPI.message
            });
            setObjeto(retornoAPI.objeto);
            if (!editar) {
                setEditar(true);
            }
        } catch (err) {
            console.log(err)
        }
        recuperaProdutos();
    }

    const recuperaProdutos = async () => {
        setCarregando(true);
        setListaObjetos(await getProdutoServico());
        setCarregando(false);
    }

    const recuperaCategorias = async () => {
        setListaCategorias(await getCategoriaServico());
    }

    const remover = async codigo => {
        if (window.confirm('Deseja remover este objeto')) {
            let retornoAPI = await deleteProdutoServico(codigo);
            setAlerta({
                status: retornoAPI.status,
                message: retornoAPI.message
            });
            recuperaProdutos();
        }
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value });
    }

    useEffect(() => {
        recuperaProdutos();
        recuperaCategorias();
    }, []);

    return (
        <ProdutoContext.Provider value={{
            alerta, setAlerta, listaObjetos, remover,
            objeto, editar, acaoCadastrar,
            handleChange, novoObjeto, editarObjeto, listaCategorias
        }}>
            <Carregando carregando={carregando}>
                <Tabela />
            </Carregando>

            <Form />
        </ProdutoContext.Provider>
    )
}

export default Produto;