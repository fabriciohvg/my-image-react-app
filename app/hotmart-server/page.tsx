import { HotmartApiResponse, Student } from "@/lib/types";

const ObterAlunos = async () => {
  const response = await fetch(
    `https://developers.hotmart.com/club/api/v1/users?subdomain=${process.env.HOTMART_SUBDOMAIN}&email=mandi182@gmail.com&max_results=20`,
    {
      headers: {
        Authorization: `Bearer ${process.env.HOTMART_ACCESS_TOKEN}`,
      },
      cache: "no-store",
    } // alterar 'sandbox' para 'developers' em produção
  );

  const data: HotmartApiResponse = await response.json();
  console.log("Total de alunos:", data.page_info.total_results);

  return (
    <div className="">
      <h1 className="text-2xl font-semibold tracking-tight">
        Lista de alunos matriculados
      </h1>
      <p className="text-sm text-muted-foreground mb-4">
        Mostrando {data.items.length} de {data.page_info.total_results} alunos
      </p>
      <ul>
        {data.items.length > 0 &&
          data.items.map((student: Student) => (
            <li key={student.user_id}>
              Último acesso:{" "}
              {new Date(student.last_access_date).toLocaleDateString("pt-BR")} /{" "}
              {student.last_access_date}
            </li>
          ))}
      </ul>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default ObterAlunos;
