// components/layout/ClientOnlyComponents.tsx
"use client"; // <<< ESSENCIAL: Marca este como Client Component

import dynamic from 'next/dynamic';
import React from 'react'; // Importa React



// Carrega dinamicamente OS DOIS componentes AQUI DENTRO
const DynamicOnlineUsersBox = dynamic(
  () => import('@/components/ui/online-users-box'),
  { 
    ssr: false, 
  } 
);

const DynamicPurchaseNotification = dynamic(
  () => import('@/components/ui/purchase-notification'),
  { 
    ssr: false, 
  }
);

// Este componente simplesmente renderiza os componentes dinâmicos
export default function ClientOnlyComponents() {
  return (
    <>
      <DynamicOnlineUsersBox />
      <DynamicPurchaseNotification />
    </>
  );
}