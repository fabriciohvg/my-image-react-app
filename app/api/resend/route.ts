import { EmailTemplate } from "@/app/components/email-template";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    // Parse request body for dynamic email sending (optional)
    const body = await request.json().catch(() => ({}));

    const firstName = body.firstName || "Flennar";
    const to = body.to || "fabriciolennar@outlook.com";
    const subject = body.subject || "Bem-vindo à Fórmula de Planejamento!";

    const { data, error } = await resend.emails.send({
      from: "Fabrício Guimarães <fabricio@cursos.formuladeplanejamento.com.br>",
      to: Array.isArray(to) ? to : [to],
      subject: subject,
      react: EmailTemplate({ firstName }),
    });

    if (error) {
      console.error("Resend error:", error);
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    console.error("Failed to send email:", error);
    return Response.json(
      { error: { message: "Failed to send email" } },
      { status: 500 }
    );
  }
}
