import React, { useContext, useState } from "react";
import Alerta from '../../comuns/Alerta';
import AlertUserContext from "./AlertUserContext";

function Tabela() {
    const { alerta, listaObjetos, remover } = useContext(AlertUserContext);

    // Estado local para controlar a exibição do texto completo
    const [mostrarTextoCompleto, setMostrarTextoCompleto] = useState(false);

    // Função para alternar entre exibir texto completo e resumido
    const alternarExibicaoTexto = () => {
        setMostrarTextoCompleto(!mostrarTextoCompleto);
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Alert</h1>
            <Alerta alerta={alerta} />
            {listaObjetos.length === 0 && <h1>Nenhuma categoria encontrada</h1>}
            {listaObjetos.length > 0 && (
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Imagem</th>
                            <th scope="col" style={{ textAlign: 'center' }}>Ações</th>
                            <th scope="col">ID</th>
                            <th scope="col">pcId</th>
                            <th scope="col">Processos</th>
                            <th scope="col">Data de Cadastro</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaObjetos.map(objeto => (
                            <tr key={objeto.id}>
                                <td>
                                    <img
                                        src={`data:image/jpeg;base64,${objeto.image.base64Img}`}
                                        alt="Imagem"
                                        style={{ maxWidth: '100px', maxHeight: '100px' }}
                                    />
                                </td>
                                <td align="center">
                                    <button className="btn btn-danger" title="Remover"
                                        onClick={() => { remover(objeto.id); }}>
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </td>
                                <td>{objeto.id}</td>
                                <td>{objeto.pcId}</td>
                                <td>
                                    {/* Verifica se o texto é maior que 30 caracteres e mostra um botão para expandir */}
                                    {objeto.processos.length > 30 && !mostrarTextoCompleto ? (
                                        <>
                                            {objeto.processos.substring(0, 30)}...
                                            <button className="btn btn-link" onClick={alternarExibicaoTexto}>
                                                Mostrar mais
                                            </button>
                                        </>
                                    ) : (
                                        // Exibe o texto completo ou resumido conforme a escolha do usuário
                                        <>
                                            {mostrarTextoCompleto ? objeto.processos : objeto.processos.substring(0, 30)}
                                            {objeto.processos.length > 30 && (
                                                <button className="btn btn-link" onClick={alternarExibicaoTexto}>
                                                    {mostrarTextoCompleto ? "Mostrar menos" : "Mostrar mais"}
                                                </button>
                                            )}
                                        </>
                                    )}
                                </td>
                                <td>{objeto.dataCadastro}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default Tabela;