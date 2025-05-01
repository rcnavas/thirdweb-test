"use client";

import { PayEmbed } from "thirdweb/react";
import { defineChain } from "thirdweb";
import { client } from "@/app/client";
import { SetStateAction, useState } from "react";
import { avalanche, ethereum, polygon, base, bsc } from "thirdweb/chains";

const ronin = defineChain(2020);

export default function Page() {
  const [purchaseStatus, setPurchaseStatus] = useState<any>();
  return (
    <div className="flex flex-row">
      <div className="basis-2/3 justify-center">
        <PayEmbed
          client={client}
          connectOptions={{
            chain: avalanche,
            chains: [avalanche, ethereum, polygon, base, bsc, ronin],
          }}
          locale="es_ES"
          payOptions={{
            metadata: {
              name: "Test Product",
              image:
                "https://elsalvadorjuegosdigitales.com/wp-content/uploads/2023/05/WhatsApp-Image-2022-06-15-at-1.58.47-PM.jpeg",
            },
            mode: "direct_payment",
            paymentInfo: {
              chain: avalanche,
              sellerAddress: "0xd4e8e0b74770880F42cEA9D41fB15899E9F4A45D",
              amount: "0.0001",
            },
            onPurchaseSuccess: (info) => setPurchaseStatus(info),
            purchaseData: {
              order_id: "order-test-1",
            },
          }}
        />
      </div>
      <div className="basis-1/3">
        <code>{JSON.stringify(purchaseStatus, undefined, "\n")}</code>
      </div>
    </div>
  );
}
