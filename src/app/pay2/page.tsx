"use client";

import { useState } from "react";
import { CheckoutWidget, getDefaultToken, PayEmbed } from "thirdweb/react";
import { defineChain, NATIVE_TOKEN_ADDRESS } from "thirdweb";
import { avalanche, ethereum, polygon, base, bsc } from "thirdweb/chains";
import { createWallet, walletConnect } from "thirdweb/wallets";
import { client } from "@/app/client";

const ronin = defineChain(2020);
const wallets = [
  walletConnect(),
  createWallet("io.metamask"),
  createWallet("com.roninchain.wallet"),
  createWallet("io.rabby"),
  createWallet("com.binance.wallet"),
  createWallet("com.coinbase.wallet"),
];
const supportedTokens = {
  /* Ethereum */
  1: [
    { address: NATIVE_TOKEN_ADDRESS, name: "ETH", symbol: "ETH" },
    {
      address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
      name: "USDC",
      symbol: "USDC",
    },
    {
      address: "0x25f8087ead173b73d6e8b84329989a8eea16cf73",
      name: "YGG",
      symbol: "YGG",
    },
    {
      address: "0x3429d03c6F7521AeC737a0BBF2E5ddcef2C3Ae31",
      name: "PIXELS",
      symbol: "PIXELS",
    },
    {
      address: "0xb23d80f5fefcddaa212212f028021b41ded428cf",
      name: "Echelon PRIME",
      symbol: "PRIME",
    },
    {
      address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
      name: "Tether USDt",
      symbol: "USDT",
    },
  ],
  /* Base */
  8453: [
    { address: NATIVE_TOKEN_ADDRESS, name: "ETH", symbol: "ETH" },
    {
      address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
      name: "USDC",
      symbol: "USDC",
    },
    {
      address: "0xaAC78d1219c08AecC8e37e03858FE885f5EF1799",
      name: "YGG",
      symbol: "YGG",
    },
    {
      address: "0xfA980cEd6895AC314E7dE34Ef1bFAE90a5AdD21b",
      name: "Echelon PRIME",
      symbol: "PRIME",
    },
    {
      address: "0xfde4c96c8593536e31f229ea8f37b2ada2699bb2",
      name: "Tether USDt",
      symbol: "USDT",
    },
  ],
  /* Avalanche */
  43114: [
    { address: NATIVE_TOKEN_ADDRESS, name: "AVAX", symbol: "AVAX" },
    {
      address: "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
      name: "USDC",
      symbol: "USDC",
    },
    {
      address: "0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7",
      name: "Tether USDt",
      symbol: "USDT",
    },
  ],
  /* Ronin */
  2020: [
    { address: NATIVE_TOKEN_ADDRESS, name: "RON", symbol: "RON" },
    {
      address: "0x0b7007c13325c48911f73a2dad5fa5dcbf808adc",
      name: "USDC",
      symbol: "USDC",
    },
    {
      address: "0x1c306872bc82525d72bf3562e8f0aa3f8f26e857",
      name: "YGG",
      symbol: "YGG",
    },
    {
      address: "0x7eae20d11ef8c779433eb24503def900b9d28ad7",
      name: "PIXELS",
      symbol: "PIXELS",
    },
  ],
  /* Abstract */
  2741: [
    { address: NATIVE_TOKEN_ADDRESS, name: "ETH", symbol: "ETH" },
    {
      address: "0xa9053dc939d74222f7aa0b3a2be407abbfd56c6a",
      name: "YGG",
      symbol: "YGG",
    },
  ],
  /* Polygon */
  137: [
    { address: NATIVE_TOKEN_ADDRESS, name: "POL", symbol: "POL" },
    {
      address: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359",
      name: "USDC on Polygon",
      symbol: "USDC",
    },
    {
      address: "0x82617aA52dddf5Ed9Bb7B370ED777b3182A30fd1",
      name: "YGG",
      symbol: "YGG",
    },
    {
      address: "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
      name: "Tether USDt",
      symbol: "USDT",
    },
  ],
};

export default function Page() {
  const [purchaseStatus, setPurchaseStatus] = useState<any>();
  return (
    <div className="flex md:flex-row flex-col justify-center justify-items-center">
      <div className="md:basis-2/3 basis-full">
        <CheckoutWidget
          client={client}
          chain={polygon}
          seller="0xd4e8e0b74770880F42cEA9D41fB15899E9F4A45D"
          amount="1.00"
          tokenAddress="0x3c499c542cef5e3811e1192ce70d8cc03d5c3359"
          feePayer="seller"
          name="Nintendo eShop $10"
          description="Nintendo eShop digital code for $10"
          image="https://elsalvadorjuegosdigitales.com/wp-content/uploads/2023/05/WhatsApp-Image-2022-06-15-at-1.58.47-PM.jpeg"
          locale="es_ES"
          purchaseData={{
            order_id: "order-test-1",
          }}
          connectOptions={{
            wallets: wallets,
            chains: [ethereum, polygon, avalanche, ronin, base, bsc],
            accountAbstraction: {
              chain: polygon,
              sponsorGas: true,
            },
            connectModal: {
              size: "compact",
              title: "Conectar a OLAGG",
              showThirdwebBranding: false,
            },
            appMetadata: {
              name: "RCNAVAS Test",
              description: "RCNAVAS Thirdweb Test",
            },
            walletConnect: {
              projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
            },
          }}
          onSuccess={() => setPurchaseStatus({ result: "success" })}
          onError={() => setPurchaseStatus({ result: "error" })}
          onCancel={() => setPurchaseStatus({ result: "cancelled" })}
        />
      </div>
      <div className="md:basis-1/3 basis-full">
        <pre className="bg-gray-100 text-sm text-black p-4 rounded-lg overflow-auto">
          Result:
          {JSON.stringify(purchaseStatus, null, 2)}
        </pre>
      </div>
    </div>
  );
}
