import React, { useContext, useState } from "react";
import Alerta from '../../comuns/Alerta';
import AlertUserContext from "./AlertUserContext";
import CryptoJS from 'crypto-js';

function Tabela() {
    const { alerta, listaObjetos, remover } = useContext(AlertUserContext);
    
    const [mostrarTextoCompleto, setMostrarTextoCompleto] = useState(false);
    const [alertData, setAlertData] = useState(null);
    const [alertJSON, setAlertJSON] = useState("");
    const [validationResult, setValidationResult] = useState("");

    const alternarExibicaoTexto = () => {
        setMostrarTextoCompleto(!mostrarTextoCompleto);
    };

    const generateHash = () => {
        const jsonAlertData = JSON.stringify(alertData);
        const hash = CryptoJS.SHA256(jsonAlertData).toString();
        return hash;
    };

    const downloadAlertJSON = () => {
        if (alertData) {
            const hash = generateHash();
            const jsonAlertData = JSON.stringify(alertData);

            const blob = new Blob([jsonAlertData], { type: "application/json" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `alert_${hash}.json`;
            a.click();
            URL.revokeObjectURL(url);
        }
    };

    const handleValidation = (e) => {
        e.preventDefault();

        try {
            const parsedAlert = JSON.parse(alertJSON);
            const hash = generateHash();
            if (hash === parsedAlert.hash) {
                setValidationResult("Alerta válido.");
            } else {
                setValidationResult("Alerta inválido.");
            }
        } catch (error) {
            setValidationResult("Erro na validação. Certifique-se de inserir um JSON válido.");
        }
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
                            <th scope="col">log</th>
                            <th scope="col">language</th>
                            <th scope="col">Processos</th>
                            <th scope="col">Data de Cadastro</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaObjetos.map(objeto => (
                            <tr key={objeto.id}>
                                <td>
                                    <img
                                        src={`data:image/jpeg;base64,${objeto.image}`}
                                        alt="Imagem"
                                        style={{ maxWidth: '900px', maxHeight: '600px' }}
                                    />
                                </td>
                                <td align="center">
                                        <button className="btn btn-danger" title="Remover" onClick={() => { remover(objeto.id); }}>
                                            <i className="bi bi-trash"></i>
                                        </button>
                                        <button className="btn btn-primary" title="Registrar Alerta" onClick={() => setAlertData(objeto)}>
                                            Registrar Alerta
                                        </button>
                                    </td>
                                <td>{objeto.id}</td>
                                <td>{objeto.pcId}</td>
                                <td>{objeto.log}</td>
                                <td>{objeto.language}</td>
                                <td>
                                    {}
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
        <div>
                <h2>Validar Alerta</h2>
                <form onSubmit={handleValidation}>
                    <label>
                        Insira o JSON de Alerta:
                        <textarea
                            value={alertJSON}
                            onChange={(e) => setAlertJSON(e.target.value)}
                            rows={5}
                            cols={50}
                        />
                    </label>
                    <button type="submit">Validar</button>
                </form>
                {validationResult && (
                    <div>
                        <h3>Resultado da Validação:</h3>
                        {validationResult}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Tabela;
