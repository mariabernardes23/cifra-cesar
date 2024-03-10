import { useState } from "react";
import "./App.css";
function App() {
  const [mensagemOriginal, setMensagemOriginal] = useState("");
  const [chave, setChave] = useState(0);
  const [mensagemCifrada, setMensagemCifrada] = useState("");
  const [bruteForceResult, setBruteForceResult] = useState<string[]>([]);

  const cifrar = (mensagem: string, chave: number) => {
    return mensagem
      .split("")
      .map((char) => {
        let codigo = char.charCodeAt(0);
        if (codigo >= 65 && codigo <= 90) {
          return String.fromCharCode(((codigo - 65 + chave) % 26) + 65);
        } else if (codigo >= 97 && codigo <= 122) {
          return String.fromCharCode(((codigo - 97 + chave) % 26) + 97);
        } else if (codigo >= 48 && codigo <= 57) {
          return String.fromCharCode(((codigo - 48 + chave) % 10) + 48);
        } else {
          switch (char) {
            case ".":
              return ".";
            case ",":
              return ",";
            case "?":
              return "?";
            case "!":
              return "!";
            default:
              return char;
          }
        }
      })
      .join("");
  };

  const decifrar = (mensagemCifrada: string, chave: number) => {
    return cifrar(mensagemCifrada, 26 - (chave % 26));
  };

  const bruteForce = (mensagemCifrada: string) => {
    const possibilidades = [];
    for (let i = 0; i < 26; i++) {
      possibilidades.push(decifrar(mensagemCifrada, i));
    }
    setBruteForceResult(possibilidades);
  };

  const handleCifrar = () => {
    setMensagemCifrada(cifrar(mensagemOriginal, chave % 26));
  };

  const handleDecifrar = () => {
    setMensagemCifrada(decifrar(mensagemCifrada, chave));
  };

  const handleBruteForce = () => {
    bruteForce(mensagemCifrada);
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
