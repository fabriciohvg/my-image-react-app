import { HotmartApiResponse } from "@/lib/types";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      `https://developers.hotmart.com/club/api/v1/users?subdomain=${process.env.HOTMART_SUBDOMAIN}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.HOTMART_ACCESS_TOKEN}`,
        },
        cache: "no-store",
      } // alterar 'sandbox' para 'developers' em produção
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data: HotmartApiResponse = await response.json();

    // Return the full response with items and page_info
    return NextResponse.json(data);
  } catch (error) {
    console.error("Não foi possível carregar os dados:", error);
    return NextResponse.json(
      { error: "Erro ao carregar os dados" },
      { status: 500 }
    );
  }
}
