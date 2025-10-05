"use client"
import AaveMarkets from "@/components/aaveMarkets";
import { AaveClient, AaveProvider } from "@aave/react";

const client = AaveClient.create();

export default function Page() {
  return (
    <AaveProvider client={client}>
      <AaveMarkets/>
    </AaveProvider>
  );
}