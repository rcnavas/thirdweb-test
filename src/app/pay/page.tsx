"use client";

import { useState } from "react";
import { getDefaultToken, PayEmbed } from "thirdweb/react";
import { defineChain, NATIVE_TOKEN_ADDRESS } from "thirdweb";
import { avalanche, ethereum, polygon, base, bsc } from "thirdweb/chains";
import {
  smartWallet,
  DEFAULT_ACCOUNT_FACTORY_V0_7,
} from "thirdweb/wallets/smart";
import { client } from "@/app/client";

const ronin = defineChain(2020);

export default function Page() {
  const [purchaseStatus, setPurchaseStatus] = useState<any>();
  return (
    <div className="flex flex-row">
      <div className="basis-2/3 justify-center">
        <PayEmbed
          client={client}
          connectOptions={{
            chain: polygon,
            accountAbstraction: {
              chain: polygon,
              sponsorGas: true,
              factoryAddress:  DEFAULT_ACCOUNT_FACTORY_V0_7
            },
          }}
          locale="es_ES"
          supportedTokens={{
            137: [
              {
                address: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359",
                name: "USDC on Polygon",
                symbol: "USDC",
                icon: "https://static.cx.metamask.io/api/v1/tokenIcons/137/0x3c499c542cef5e3811e1192ce70d8cc03d5c3359.png",
              },
            ],
          }}
          payOptions={{
            showThirdwebBranding: false,
            metadata: {
              name: "Test Product",
              image:
                "https://elsalvadorjuegosdigitales.com/wp-content/uploads/2023/05/WhatsApp-Image-2022-06-15-at-1.58.47-PM.jpeg",
            },
            mode: "direct_payment",
            paymentInfo: {
              chain: polygon,
              sellerAddress: "0xd4e8e0b74770880F42cEA9D41fB15899E9F4A45D",
              amount: "0.01",
              feePayer: "receiver",
              token: getDefaultToken(polygon, "USDC"),
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
