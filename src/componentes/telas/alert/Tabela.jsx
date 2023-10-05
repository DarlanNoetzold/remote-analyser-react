import React, { useContext, useState } from "react";
import AlertContext from "./AlertContext";
import Alerta from '../../comuns/Alerta';

function Tabela() {
    const { alerta, listaObjetos, remover, novoObjeto, editarObjeto, previousPage, nextPage, page } = useContext(AlertContext);

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
            <button type="button" className="btn btn-primary"
                data-bs-toggle="modal" data-bs-target="#modalEdicao"
                onClick={() => novoObjeto()}>
                Novo <i className="bi bi-file-earmark-plus"></i>
            </button>
            {(listaObjetos === null || listaObjetos.length === 0) && <h1>Nenhuma categoria encontrada</h1>}
            {listaObjetos != null && listaObjetos.length > 0 && (
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
                                    <button className="btn btn-info"
                                        onClick={() => editarObjeto(objeto.id)}
                                        data-bs-toggle="modal" data-bs-target="#modalEdicao">
                                        <i className="bi bi-pencil-square"></i>
                                    </button>
                                    <button className="btn btn-danger" title="Remover"
                                        onClick={() => { remover(objeto.id); }}>
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </td>
                                <td>{objeto.id}</td>
                                <td>{objeto.pcId}</td>
                                <td>
                                    {objeto.processos.length > 30 && !mostrarTextoCompleto ? (
                                        <>
                                            {objeto.processos.substring(0, 30)}...
                                            <button className="btn btn-link" onClick={alternarExibicaoTexto}>
                                                Mostrar mais
                                            </button>
                                        </>
                                    ) : (
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
            <div className="pagination">
                <button className="btn btn-primary" onClick={() =>{ previousPage(); }} disabled={page === 1}>Anterior</button>
                <span style={{ padding: '10px' }} />
                <button className="btn btn-primary" onClick={() =>{ nextPage(); }} disabled={listaObjetos == null || listaObjetos.length !== 10}>Próximo</button>
            </div>
        </div>
    );
}

export default Tabela;
