import * as React from "react";

interface EmailTemplateProps {
  firstName: string;
}

export function EmailTemplate({ firstName }: EmailTemplateProps) {
  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: "500px" }}>
      <p>
        Olá, <strong>{firstName}</strong>!
      </p>
      <p>Seja bem-vindo à Fórmula de Planejamento!</p>
      <p>
        Nós oferecemos os melhores cursos relacionados ao Gerenciamento de
        Projetos e Obras. Em breve você receberá um e-mail com as instrucões de
        acesso à plataforma. Fiz alguns ajustes para adequar a família da fonte
        de texto, espero que fique bom.
      </p>
      <p>Atenciosamente, Fabrício Guimarães.</p>
    </div>
  );
}
