// app/api/meta/pixel/route.ts
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto'; // Módulo Node.js para gerar IDs únicos

// Interface para os dados esperados no corpo da requisição POST
interface EventRequestBody {
  eventName: string;       // Ex: 'Purchase', 'InitiateCheckout'
  eventData: Record<string, any>; // Dados específicos do evento (value, currency, content_ids, etc.)
  eventSourceUrl: string; // URL da página onde o evento ocorreu (window.location.href)
  // Adicione aqui outros campos que você queira passar do cliente para o servidor, se necessário
}

export async function POST(req: NextRequest) {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN;

  // --- Validação Inicial ---
  if (!pixelId || !accessToken) {
    console.error('Meta CAPI Error: Pixel ID or Access Token is missing in environment variables.');
    return NextResponse.json({ success: false, error: 'Configuration error' }, { status: 500 });
  }

  try {
    const body: EventRequestBody = await req.json();
    const { eventName, eventData, eventSourceUrl } = body;

    if (!eventName || !eventData || !eventSourceUrl) {
         console.error('Meta CAPI Error: Missing required fields in request body.', body);
         return NextResponse.json({ success: false, error: 'Missing required fields: eventName, eventData, eventSourceUrl' }, { status: 400 });
    }

    // --- Dados do Usuário (Essenciais para CAPI) ---
    // Idealmente, inclua o máximo possível para melhor correspondência.
    // IP e User Agent são capturados do request que chega ao *servidor*.
    const userAgent = req.headers.get('user-agent');
    // Obter IP: Prioriza x-forwarded-for (padrão em proxies/Vercel), senão pega remote-addr
    const ipAddress = req.headers.get('x-forwarded-for') ?? req.headers.get('remote-addr');
    // Você PODE (opcionalmente) passar fbp e fbc do navegador se conseguir obtê-los,
    // mas IP e User Agent do servidor já ajudam muito.

    // --- Gerar ID de Evento Único (para Deduplicação) ---
    // Combina um timestamp com uma string aleatória para alta probabilidade de unicidade
    const eventId = `${eventName.toLowerCase()}_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;


    // --- Montar Payload da CAPI ---
    const payload = {
      event_name: eventName,
      event_time: Math.floor(Date.now() / 1000), // Timestamp Unix em segundos
      event_source_url: eventSourceUrl, // URL da página do evento
      event_id: eventId, // ID único para deduplicação
      user_data: {
        // Incluir dados do usuário ajuda na correspondência.
        // NÃO envie dados PII (como email, telefone) não hasheados a menos que saiba o que está fazendo.
        // IP e User Agent são considerados seguros para enviar diretamente.
        ...(ipAddress && { client_ip_address: ipAddress }),
        ...(userAgent && { client_user_agent: userAgent }),
        // fbc: 'fb.1.1554763741205.AbCdEfGhIjKlMnOpQrStUvWxYz1234567890', // Exemplo - Passar do cliente se disponível
        // fbp: 'fb.1.1558571054389.1098115397',                   // Exemplo - Passar do cliente se disponível
      },
      custom_data: {
         ...eventData, // Inclui todos os dados específicos do evento (value, currency, etc.)
      },
      // action_source: 'website', // Fonte da ação (padrão)
    };

    console.log('Sending CAPI event:', JSON.stringify({ data: [payload] }, null, 2)); // Log detalhado do que será enviado

    // --- Enviar para a API do Meta ---
    const metaApiUrl = `https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${accessToken}`;
    const fetchRes = await fetch(metaApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: [payload], // A API espera um array de eventos
        // test_event_code: 'TESTXXXX' // Descomente e use seu código de teste do Gerenciador de Eventos se precisar depurar
      }),
    });

    // --- Processar Resposta do Meta ---
    const responseBody = await fetchRes.json();

    if (!fetchRes.ok) {
      console.error('Meta CAPI Error:', responseBody);
      return NextResponse.json({ success: false, error: 'Failed to send event to Meta API', details: responseBody }, { status: fetchRes.status });
    }

    console.log('Meta CAPI Success:', responseBody);
    return NextResponse.json({ success: true, message: 'Event sent successfully via CAPI', metaResponse: responseBody }, { status: 200 });

  } catch (error: any) {
    console.error('Meta CAPI Internal Server Error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Internal server error' }, { status: 500 });
  }
}