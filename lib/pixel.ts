// lib/pixel.ts (CONFIRME QUE EXISTE)

export async function sendCapiEvent(eventName: string, eventData: Record<string, any>, eventSourceUrl: string) {
  try {
    console.log(`Attempting to send CAPI event: ${eventName} from frontend`);
    const response = await fetch('/api/meta/pixel', { // Chama nossa API Route
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        eventName,
        eventData,
        eventSourceUrl,
      }),
    });

    const responseData = await response.json();

    if (!response.ok || !responseData.success) {
      console.error(`CAPI Call Error for ${eventName} (from Frontend):`, responseData);
    } else {
      console.log(`CAPI Call Success for ${eventName} (from Frontend): Event likely sent via backend.`, responseData);
    }
  } catch (error) {
    console.error(`CAPI Call Fetch Error for ${eventName} (from Frontend):`, error);
  }
}