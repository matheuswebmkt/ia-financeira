// components/frontpage/HeroButtonClient.tsx
"use client"; // <= NECESSÁRIO para o botão

import React from "react";
import ShinyButton02 from "@/components/magicui/shiny-button-02";

export default function HeroButtonClient() {
  return (
    // Mantém o div wrapper original para layout
    <div className="flex flex-col items-center gap-3 pt-2">
      <ShinyButton02 text="Quero a IA Anti-dívidas" />
    </div>
  );
}