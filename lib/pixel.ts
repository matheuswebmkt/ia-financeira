// lib/pixel.ts

// Função auxiliar para enviar eventos para nossa API Route interna
export async function sendCapiEvent(
  eventName: string,
  eventData: Record<string, unknown>, // Mantém unknown para entrada
  eventSourceUrl: string
) {
try {
  console.log(`Attempting to send CAPI event: ${eventName} from frontend`);

  const response = await fetch('/api/meta/pixel', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', },
    body: JSON.stringify({ eventName, eventData, eventSourceUrl, }),
  });

  // Interface para a resposta da nossa API interna (tipagem mais segura)
  interface ApiResponse {
    success: boolean;
    message?: string;
    error?: string;
    // --- CORREÇÃO AQUI ---
    details?: unknown;     // Usa unknown em vez de any
    metaResponse?: unknown; // Usa unknown em vez de any
  }

  const responseData: ApiResponse = await response.json();

  if (!response.ok || !responseData.success) {
    console.error(`CAPI Call Error for ${eventName} (from Frontend):`, responseData);
    // Ao acessar responseData.error, ele já é string | undefined (seguro)
    // Se precisar acessar 'details' ou 'metaResponse', você precisaria fazer type checking aqui.
  } else {
    console.log(`CAPI Call Success for ${eventName} (from Frontend): Event likely sent via backend.`, responseData);
    // Mesma coisa aqui para 'details' ou 'metaResponse' se fossem usados.
  }
} catch (error: unknown) {
  console.error(
      `CAPI Call Fetch Error for ${eventName} (from Frontend):`,
      error instanceof Error ? error.message : error
  );
}
}