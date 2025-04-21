
'use client';
import React, { useState } from 'react';

export default function Page() {
  const [empresa, setEmpresa] = useState('');
  const [faturamento, setFaturamento] = useState('');
  const [colaboradores, setColaboradores] = useState('');
  const [timeMKT, setTimeMKT] = useState('');
  const [presencaDigital, setPresencaDigital] = useState(5);
  const [perfilLead, setPerfilLead] = useState('Qualidade');
  const [resultado, setResultado] = useState(null);

  const calcular = () => {
    const receita = parseFloat(faturamento);
    const funcionarios = parseInt(colaboradores);
    const time = parseInt(timeMKT);
    const presenca = presencaDigital;

    const investimentoMKT = receita * 0.05;
    const potencialSignia = investimentoMKT * 0.005;

    const scoreMKT = ((investimentoMKT / 520000000) * 0.5 +
      (time / 1212) * 0.3 +
      (presenca / 10) * 0.2) * 10;

    const scoreCI = ((potencialSignia / 2600000) * 0.5 +
      (scoreMKT / 10) * 0.3 +
      (0.8) * 0.2) * 10;

    const scoreFinal = (scoreMKT + scoreCI) / 2;

    let classificacao = '';
    if (receita < 3000000000 || funcionarios < 1000 || potencialSignia < 600000) {
      classificacao = 'Inviável';
    } else if (receita > 5000000000 && funcionarios > 3500 && potencialSignia > 1000000) {
      classificacao = 'ICP Master';
    } else if (scoreFinal >= 8) {
      classificacao = 'Lead Quente';
    } else if (scoreFinal >= 6) {
      classificacao = 'Lead Promissor';
    } else if (scoreFinal >= 4) {
      classificacao = 'Lead Frio';
    } else {
      classificacao = 'Lead Inviável';
    }

    setResultado({ investimentoMKT, potencialSignia, scoreMKT, scoreCI, scoreFinal, classificacao });
  };

  return (
    <div className="p-6 max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Calculadora de ICP - Signia Studios</h1>
      <input placeholder="Nome da Empresa" className="w-full p-2 border" value={empresa} onChange={e => setEmpresa(e.target.value)} />
      <input placeholder="Faturamento Anual (R$)" type="number" className="w-full p-2 border" value={faturamento} onChange={e => setFaturamento(e.target.value)} />
      <input placeholder="Número de Funcionários" type="number" className="w-full p-2 border" value={colaboradores} onChange={e => setColaboradores(e.target.value)} />
      <input placeholder="Time de Marketing" type="number" className="w-full p-2 border" value={timeMKT} onChange={e => setTimeMKT(e.target.value)} />
      <input placeholder="Presença Digital (0 a 10)" type="number" className="w-full p-2 border" value={presencaDigital} onChange={e => setPresencaDigital(e.target.value)} />
      <select className="w-full p-2 border" value={perfilLead} onChange={e => setPerfilLead(e.target.value)}>
        <option>Qualidade</option>
        <option>Exigente</option>
        <option>Preço</option>
      </select>
      <button onClick={calcular} className="bg-black text-white px-4 py-2 rounded">Calcular Score</button>
      {resultado && (
        <div className="mt-4 space-y-1">
          <p><strong>Investimento em Marketing:</strong> R$ {resultado.investimentoMKT.toFixed(2)}</p>
          <p><strong>Potencial Signia:</strong> R$ {resultado.potencialSignia.toFixed(2)}</p>
          <p><strong>Score MKT:</strong> {resultado.scoreMKT.toFixed(2)}</p>
          <p><strong>Score CI:</strong> {resultado.scoreCI.toFixed(2)}</p>
          <p><strong>Score Final:</strong> {resultado.scoreFinal.toFixed(2)}</p>
          <p><strong>Classificação:</strong> {resultado.classificacao}</p>
        </div>
      )}
    </div>
  );
}
