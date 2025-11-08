"use client";

import { useState } from "react";

export default function ResendPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    success?: boolean;
    message?: string;
    emailId?: string;
  } | null>(null);

  const sendTestEmail = async () => {
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/resend`,
        {
          //   method: "POST",
          //   headers: { "Content-Type": "application/json" },
          //   body: JSON.stringify({
          //     to: "custom@email.com",
          //     subject: "Custom Subject",
          //     firstName: "Custom Name",
          //   }),
          // });
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setResult({
          success: true,
          message: "Email enviado com sucesso!",
          emailId: data.id,
        });
      } else {
        setResult({
          success: false,
          message: `Erro: ${data.error?.message || "Erro desconhecido"}`,
        });
      }
    } catch (error) {
      setResult({
        success: false,
        message: `Erro ao enviar email: ${
          error instanceof Error ? error.message : "Erro desconhecido"
        }`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 font-mono">
      <h1 className="text-3xl font-bold mb-4">Teste de Email - Resend</h1>
      <p className="text-muted-foreground mb-6">
        Domínio verificado: cursos.formuladeplanejamento.com.br
      </p>

      <div className="border rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Enviar email de teste</h2>
        <div className="space-y-2 mb-4 text-sm">
          <p>
            <strong>De:</strong> fabricio@cursos.formuladeplanejamento.com.br
          </p>
          <p>
            <strong>Para:</strong> fabricio@flennar.com.br
          </p>
          <p>
            <strong>Assunto:</strong> Hello world
          </p>
          <p>
            <strong>Template:</strong> EmailTemplate (Welcome, Flennar!)
          </p>
        </div>

        <button
          onClick={sendTestEmail}
          disabled={loading}
          className="px-4 py-2 border border-gray-400 cursor-pointer rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Enviando..." : "Enviar Email de Teste"}
        </button>
      </div>

      {result && (
        <div
          className={`border rounded-lg p-4 ${
            result.success
              ? "bg-green-50 border-green-200"
              : "bg-red-50 border-red-200"
          }`}
        >
          <h3
            className={`font-semibold mb-2 ${
              result.success ? "text-green-800" : "text-red-800"
            }`}
          >
            {result.success ? "✓ Sucesso" : "✗ Erro"}
          </h3>
          <p className={result.success ? "text-green-700" : "text-red-700"}>
            {result.message}
          </p>
          {result.emailId && (
            <p className="text-sm text-green-600 mt-2">
              ID do email: {result.emailId}
            </p>
          )}
        </div>
      )}

      <div className="mt-8 p-4 bg-muted rounded-lg">
        <h3 className="font-semibold mb-2">📝 Instruções:</h3>
        <ol className="list-decimal list-inside space-y-2 text-sm">
          <li>
            Certifique-se de ter o <code>RESEND_API_KEY</code> no arquivo{" "}
            <code>.env.local</code>
          </li>
          <li>Verifique se o domínio está validado no dashboard do Resend</li>
          <li>Clique no botão acima para enviar o email de teste</li>
          <li>Verifique a caixa de entrada de fabricio@flennar.com.br</li>
        </ol>
      </div>
    </div>
  );
}
