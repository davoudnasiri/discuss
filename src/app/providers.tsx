"use client";

import { NextUIProvider } from "@nextui-org/react";

interface Providersprops {
  children: React.ReactNode;
}

export default function Providers({ children }: Providersprops) {
  return <NextUIProvider>{children}</NextUIProvider>;
}
