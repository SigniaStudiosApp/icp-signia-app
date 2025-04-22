'use client';
import { useState } from 'react';

type Resultado = {
  investimentoMKT: number;
  potencialSignia: number;
  scoreMKT: number;
  scoreCI: number;
  scoreFinal: number;
  classificacao: string;
};

export default function Page() {
  const [empresa, setEmpresa] = useState<string>('');
  const [faturamento, setFaturamento] = useState<number>(0);
  const [colaboradores, setColaboradores] = useState<number>(0);
  const [timeMKT, setTimeMKT] = useState<number>(0);
  const [presencaDigital, setPresencaDigital] = useState<number>(5);
  const [perfilLead, setPerfilLead] = useState<string>('Qualidade');
  const [resultado, setResultado] = useState<Resultado | null>(null);

  const calcular = () => {
    const investimentoMKT = faturamento * 0.05;
    const potencialSignia = investimentoMKT * 0.005;

    const scoreMKT = Math.min(10, (investimentoMKT / 500000) * 10) + (timeMKT >= 3 ? 2 : 0) + (presencaDigital || 0);
    const scoreCI = Math.min(10, (potencialSignia / 300000) * 10) + scoreMKT * 0.3;
    const scoreFinal = Math.round((scoreMKT * 0.4 + scoreCI * 0.6) * 10) / 10;

    let classificacao = 'Lead em análise';
    if (faturamento >= 5_000_000_000 && colaboradores >= 3500 && potencialSignia >= 600000) {
      classificacao = 'ICP Master';
    } else if (faturamento >= 3_000_000_000 && colaboradores >= 1000 && potencialSignia >= 200000) {
      classificacao = 'ICP Mínimo';
    } else if (scoreFinal >= 7) {
      classificacao = 'Lead promissor';
    } else {
      classificacao = 'Baixo potencial';
    }

    setResultado({ investimentoMKT, potencialSignia, scoreMKT, scoreCI, scoreFinal, classificacao });
  };

  return (
    <div className="p-6 max-w-xl mx-auto space-y-6">
      <img src="/logo-signia-branca.png" alt="Logo Signia" className="w-40 mx-auto mb-2" />
      <h1 className="text-2xl font-bold text-center">Calculadora de ICP - Signia Studios</h1>

      <div className="space-y-3">
        <input placeholder="Nome da Empresa" className="w-full p-2 rounded bg-[#1F1F1F] border border-[#333] text-white"
          value={empresa} onChange={e => setEmpresa(e.target.value)} />
        <input placeholder="Faturamento Anual (R$)" type="number" className="w-full p-2 rounded bg-[#1F1F1F] border border-[#333] text-white"
          value={faturamento} onChange={e => setFaturamento(Number(e.target.value))} />
        <input placeholder="Número de Funcionários" type="number" className="w-full p-2 rounded bg-[#1F1F1F] border border-[#333] text-white"
          value={colaboradores} onChange={e => setColaboradores(Number(e.target.value))} />
        <input placeholder="Time de Marketing" type="number" className="w-full p-2 rounded bg-[#1F1F1F] border border-[#333] text-white"
          value={timeMKT} onChange={e => setTimeMKT(Number(e.target.value))} />
        <input placeholder="Presença Digital (0 a 10)" type="number" className="w-full p-2 rounded bg-[#1F1F1F] border border-[#333] text-white"
          value={presencaDigital} onChange={e => setPresencaDigital(Number(e.target.value))} />
        <select className="w-full p-2 rounded bg-[#1F1F1F] border border-[#333] text-white"
          value={perfilLead} onChange={e => setPerfilLead(e.target.value)}>
          <option>Qualidade</option>
          <option>Exigente</option>
          <option>Preço</option>
        </select>
        <button onClick={calcular} className="w-full bg-[#2a84d1] hover:bg-[#1b5fa0] text-white font-semibold py-2 rounded transition">
          Calcular Score
        </button>
      </div>

      {resultado && (
        <div className="mt-6 p-4 bg-[#222] rounded text-sm space-y-2 border border-[#444]">
          <p><strong>Empresa:</strong> {empresa}</p>
          <p><strong>Investimento em Marketing:</strong> R$ {resultado.investimentoMKT.toLocaleString()}</p>
          <p><strong>Potencial p/ Signia:</strong> R$ {resultado.potencialSignia.toLocaleString()}</p>
          <p><strong>Score Marketing:</strong> {resultado.scoreMKT.toFixed(1)}</p>
          <p><strong>Score Capacidade Investimento:</strong> {resultado.scoreCI.toFixed(1)}</p>
          <p><strong>Score Final:</strong> {resultado.scoreFinal.toFixed(1)}</p>
          <p className="text-lg mt-2"><strong>Classificação:</strong> <span className="text-[#71C9A2]">{resultado.classificacao}</span></p>
        </div>
      )}
    </div>
  );
}

