import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import './App.css';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: tableData, error } = await supabase
        .from('rank')
        .select('*');

      if (error) {
        console.error('Erro ao buscar dados:', error);
      } else {
        const sortedData = tableData.sort((a, b) => b.pontos - a.pontos);
        setData(sortedData);
      }
    };

    fetchData();

    // Configuração do Realtime
    const channel = supabase
      .channel('realtime:rank') // Nome personalizado do canal
      .on(
        'postgres_changes',
        {
          event: '*', // Escutando todos os eventos
          schema: 'public', // Esquema correto
          table: 'rank', // Tabela que você quer monitorar
        },
        (payload) => {
          console.log('Mudança recebida:', payload);

          // Atualiza o estado com base no evento recebido
          if (payload.eventType === 'INSERT') {
            setData((prev) => [...prev, payload.new].sort((a, b) => b.pontos - a.pontos));
          } else if (payload.eventType === 'UPDATE') {
            setData((prev) =>
              prev
                .map((item) => (item.id === payload.new.id ? payload.new : item))
                .sort((a, b) => b.pontos - a.pontos)
            );
          } else if (payload.eventType === 'DELETE') {
            setData((prev) =>
              prev.filter((item) => item.id !== payload.old.id)
            );
          }
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  return (
    <div className="content">
      <table className="ranking-table" id="rankingTable">
        <thead>
          <tr>
            <th>Posição</th>
            <th>Jogador</th>
            <th>Pontuação</th>
            <th>Turma</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.nome}</td>
              <td>{item.pontos}</td>
              <td>{item.tipo}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <video className="video-background" autoPlay loop muted>
        <source src="/background.mp4" type="video/mp4" />
        Seu navegador não suporta a tag de vídeo.
      </video>
    </div>
  );
}

export default App;
