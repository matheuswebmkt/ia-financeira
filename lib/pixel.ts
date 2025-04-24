// lib/pixel.ts

// Função auxiliar para enviar eventos para nossa API Route interna
// que então encaminhará para a API de Conversões do Meta (CAPI)
export async function sendCapiEvent(
  eventName: string,
  // --- CORREÇÃO AQUI ---
  eventData: Record<string, unknown>, // Usa 'unknown' em vez de 'any' para segurança de tipo
  eventSourceUrl: string
) {
try {
  console.log(`Attempting to send CAPI event: ${eventName} from frontend`);

  const response = await fetch('/api/meta/pixel', { // Endpoint da nossa API interna
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ // Envia os dados recebidos para o backend
      eventName,
      eventData, // eventData (Record<string, unknown>) é serializável
      eventSourceUrl,
    }),
  });

  // Interface básica para a resposta da nossa API interna
  interface ApiResponse {
    success: boolean;
    message?: string;
    error?: string;
    details?: any; // Mantém 'any' aqui se os detalhes do erro do Meta podem variar muito
    metaResponse?: any; // Mantém 'any' aqui se a resposta de sucesso do Meta pode variar
  }

  // Tipamos a resposta esperada da nossa API
  const responseData: ApiResponse = await response.json();

  if (!response.ok || !responseData.success) {
    console.error(`CAPI Call Error for ${eventName} (from Frontend):`, responseData);
  } else {
    console.log(`CAPI Call Success for ${eventName} (from Frontend): Event likely sent via backend.`, responseData);
  }
} catch (error: unknown) { // Usa 'unknown' para o erro do catch
  console.error(
      `CAPI Call Fetch Error for ${eventName} (from Frontend):`,
      error instanceof Error ? error.message : error // Log mais informativo do erro
  );
}
}