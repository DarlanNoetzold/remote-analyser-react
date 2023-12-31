import { useContext } from "react";
import MaliciousPortContext from "./MaliciousPortContext";
import Alerta from '../../comuns/Alerta';

function Tabela() {

    const { alerta, listaObjetos, remover, novoObjeto, editarObjeto, previousPage, nextPage, page, handleFileUpload, handleFileChange } = useContext(MaliciousPortContext);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Ports</h1>
            <Alerta alerta={alerta} />
            <input type="file" accept=".csv" onChange={handleFileChange} />
            <button className="btn btn-primary" onClick={handleFileUpload}>Upload CSV</button>
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
                            <th scope="col" style={{ textAlign: 'center' }}>Ações</th>
                            <th scope="col">Id</th>
                            <th scope="col">vulnarableBanners</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaObjetos.map(objeto => (
                            <tr key={objeto.id}>
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
                                <td>{objeto.vulnarableBanners}</td>
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
    )
}

export default Tabela;