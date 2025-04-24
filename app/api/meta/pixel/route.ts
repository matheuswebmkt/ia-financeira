// app/api/meta/pixel/route.ts
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// Interface usando 'unknown' para maior segurança de tipo
interface EventRequestBody {
  eventName: string;
  eventData: Record<string, unknown>; // <-- Correção 1: Usa unknown
  eventSourceUrl: string;
}

export async function POST(req: NextRequest) {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN;

  if (!pixelId || !accessToken) {
    console.error('Meta CAPI Error: Pixel ID or Access Token is missing in environment variables.');
    return NextResponse.json({ success: false, error: 'Configuration error' }, { status: 500 });
  }

  try {
    // Tipagem explícita aqui ajuda
    const body: EventRequestBody = await req.json();
    const { eventName, eventData, eventSourceUrl } = body;

    if (!eventName || !eventData || !eventSourceUrl) {
         console.error('Meta CAPI Error: Missing required fields in request body.', body);
         return NextResponse.json({ success: false, error: 'Missing required fields: eventName, eventData, eventSourceUrl' }, { status: 400 });
    }

    const userAgent = req.headers.get('user-agent');
    const ipAddress = req.headers.get('x-forwarded-for') ?? req.headers.get('remote-addr');

    const eventId = `${eventName.toLowerCase()}_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;

    const payload = {
      event_name: eventName,
      event_time: Math.floor(Date.now() / 1000),
      event_source_url: eventSourceUrl,
      event_id: eventId,
      user_data: {
        ...(ipAddress && { client_ip_address: ipAddress }),
        ...(userAgent && { client_user_agent: userAgent }),
      },
      // Aqui, como eventData é Record<string, unknown>, estamos seguros ao espalhar
      custom_data: {
         ...eventData,
      },
    };

    console.log('Sending CAPI event:', JSON.stringify({ data: [payload] }, null, 2));

    const metaApiUrl = `https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${accessToken}`;
    const fetchRes = await fetch(metaApiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: [payload] }),
    });

    // Tipagem para a resposta da API do Meta (exemplo básico)
    interface MetaApiResponse {
        events_received?: number;
        messages?: string[];
        fbtrace_id?: string;
        // Pode haver outros campos dependendo do erro/sucesso
        error?: { message: string; type: string; code: number; fbtrace_id: string; };
    }

    const responseBody: MetaApiResponse = await fetchRes.json(); // Tipa a resposta

    if (!fetchRes.ok) {
      console.error('Meta CAPI Error:', responseBody);
      // Usa a mensagem de erro da API se disponível
      const errorMessage = responseBody.error?.message || 'Failed to send event to Meta API';
      return NextResponse.json({ success: false, error: errorMessage, details: responseBody }, { status: fetchRes.status });
    }

    console.log('Meta CAPI Success:', responseBody);
    return NextResponse.json({ success: true, message: 'Event sent successfully via CAPI', metaResponse: responseBody }, { status: 200 });

  } catch (error: unknown) { // <-- Correção 2: Usa unknown no catch
    console.error('Meta CAPI Internal Server Error:', error);
    let errorMessage = 'Internal server error';
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === 'string') {
      errorMessage = error;
    }
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}