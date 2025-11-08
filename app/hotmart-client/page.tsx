"use client";

import { useEffect, useState } from "react";
import { HotmartApiResponse, Student } from "@/lib/types";

const ObterAlunos = () => {
  const [data, setData] = useState<HotmartApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/hotmart/students`, {
      cache: "no-store",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Erro na requisição: ${res.status}`);
        }
        return res.json();
      })
      .then((responseData: HotmartApiResponse) => {
        setData(responseData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;
  if (!data) return <div>Nenhum dado disponível</div>;

  return (
    <div className="">
      <h1 className="text-2xl font-semibold tracking-tight">
        Lista de alunos matriculados
      </h1>
      <p className="text-sm text-muted-foreground mb-4">
        Mostrando {data.items.length} de {data.page_info.total_results} alunos
      </p>
      <ul>
        {data.items.map((student: Student) => (
          <li key={student.user_id}>{student.name}</li>
        ))}
      </ul>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default ObterAlunos;
