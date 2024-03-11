import { useState } from "react";
import "./App.css";
function App() {
  const [mensagemOriginal, setMensagemOriginal] = useState("");
  const [chave, setChave] = useState(0);
  const [mensagemCifrada, setMensagemCifrada] = useState("");
  const [bruteForceResult, setBruteForceResult] = useState<string[]>([]);

  const cifrarOuDecifrar = (mensagem: string, chave: number, cifrar: boolean) => {
    return mensagem
      .split("")
      .map((char) => {
        let codigo = char.charCodeAt(0);
        let base = codigo >= 65 && codigo <= 90 ? 65 : codigo >= 97 && codigo <= 122 ? 97 : codigo >= 48 && codigo <= 57 ? 48 : -1;
        if (base !== -1) {
          return String.fromCharCode(((codigo - base + (cifrar ? chave : 26 - chave)) % (base === 48 ? 10 : 26)) + base);
        } else {
          return char;
        }
      })
      .join("");
  };

  const bruteForce = (mensagemCifrada: string) => {
    const possibilidades = [];
    for (let i = 0; i < 26; i++) {
      possibilidades.push(cifrarOuDecifrar(mensagemCifrada, i, false));
    }
    setBruteForceResult(possibilidades);
  };

  const handleCifrar = () => {
    setMensagemCifrada(cifrarOuDecifrar(mensagemOriginal, chave % 26, true));
  };

  const handleDecifrar = () => {
    setMensagemCifrada(cifrarOuDecifrar(mensagemOriginal, chave % 26, false));
  };

  const handleBruteForce = () => {
    if (mensagemCifrada.trim() !== "") {
      bruteForce(mensagemCifrada);
    } else {
      return;
    }
  };

  const handleClean = () => {
    setMensagemOriginal("");
    setMensagemCifrada("");
    setChave(0);
    setBruteForceResult([])
  };

  return (
    <div>
      <main className="conteudo">
        <h1 className="title">Cifra de César</h1>

        <div className="formulario">
          <label htmlFor="mensagemOriginal">Mensagem Original:</label>
          <textarea
            className="input"
            id="mensagemOriginal"
            value={mensagemOriginal}
            onChange={(e) => setMensagemOriginal(e.target.value)}
          />

          <label htmlFor="chave">Chave:</label>
          <input
            type="number"
            id="chave"
            min="0"
            max="26"
            value={chave}
            onChange={(e) => setChave(parseInt(e.target.value))}
          />

          <div className="buttons">
            <button onClick={handleCifrar}>Cifrar</button>
            <button onClick={handleDecifrar}>Decifrar</button>
            <button onClick={handleBruteForce}>Brute Force</button>
            <button onClick={handleClean}>Limpar</button>
          </div>

          <label htmlFor="mensagemCifrada">Mensagem Cifrada:</label>
          <textarea id="mensagemCifrada" value={mensagemCifrada} readOnly />

          <div className="decifragem">
            <p>Possibilidades de decifragem:</p>
            <ol>
              {bruteForceResult.map((possibilidade, index) => (
                <li key={index}>{possibilidade}</li>
              ))}
            </ol>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
