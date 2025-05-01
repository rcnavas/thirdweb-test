"use client";

import Image from "next/image";
import thirdwebIcon from "@public/thirdweb.svg";
import { client } from "./client";
import {
  createThirdwebClient,
  getContract,
  resolveMethod,
  prepareContractCall,
} from "thirdweb";
import {
  ConnectButton,
  TransactionButton,
  useSendTransaction,
  useActiveWallet,
  useReadContract,
} from "thirdweb/react";
import { defineChain } from "thirdweb/chains";

const CHAIN = defineChain(80002); // Polygon Amoy TEST Network
const TOKEN_ADDRESS = "0x227f8D3406C2a9cfCD318e6De8763C6A78285C33";
const AIRDROP_ADDRESS = "0x162341e382780d51f53780B1ECeCE34c510D7ebd";
const BATCH = [
  { recipient: "0xb3b6AAadB03e0E78c1Ec6e6FD492e8dBC5119EF4", amount: BigInt(1e18) }, // rcnavas3
  { recipient: "0x52162F5FC13E11e0Edd13C1D03538469e8315377", amount: BigInt(1e18) }, // rcnavas4
]; 

export default function Home() {
  const wallet = useActiveWallet();
  // connect to Airdrop contract
  const airdrop = getContract({
    client,
    chain: CHAIN,
    address: AIRDROP_ADDRESS, // OLAGG Airdrop contractmon Polygon
  });
  const token = getContract({
    client,
    chain: CHAIN,
    address: TOKEN_ADDRESS, // ERC20 Token
  });

  // Prepare transaction
  const transaction = prepareContractCall({
    contract: airdrop,
    method:
      "function airdropERC20(address _tokenAddress, (address recipient, uint256 amount)[] _contents)",
    params: [TOKEN_ADDRESS, BATCH],
  });

  // Read Token Symbol 
  const { data: token_symbol, isLoading } = useReadContract({
    contract: token,
    method: "function symbol() view returns (string)",
    params: [],
  });

  return (
    <main className="p-4 pb-10 min-h-[100vh] flex items-center justify-center container max-w-screen-lg mx-auto">
      <div className="py-20">
        <Header />
        <div className="flex justify-center mb-20">
          <ConnectButton
            client={client}
            chain={CHAIN}
            appMetadata={{
              name: "Airdrop Test App",
              url: "https://example.com",
            }}
          />
          {wallet ? (
            <TransactionButton
              transaction={() => transaction}
              onTransactionConfirmed={(receipt) =>
                alert("OK: " + JSON.stringify(receipt))
              }
              onError={(error) => alert("Error: " + JSON.stringify(error))}
            >
              Confirm Airdrop
            </TransactionButton>
          ) : (
            <div>Connect to Send Airdrop</div>
          )}
        </div>
        <div className="flex justify-center mb-20">
          <BatchDetails token_symbol={token_symbol} />
        </div>
        <ThirdwebResources />
      </div>
    </main>
  );
}

function BatchDetails(props: { token_symbol: string | undefined }) {
  return (
    <div>
      <h3>
        Will send the following transfers of {props.token_symbol} from Connected
        Wallet:
      </h3>
      <ul>
        {BATCH.map((i) => (
          <li key={i.recipient}>
            To: {i.recipient} Amount: {i.amount.toString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Header() {
  return (
    <header className="flex flex-col items-center mb-20 md:mb-20">
      <Image
        src={thirdwebIcon}
        alt=""
        className="size-[150px] md:size-[150px]"
        style={{
          filter: "drop-shadow(0px 0px 24px #a726a9a8)",
        }}
      />

      <h1 className="text-2xl md:text-6xl font-semibold md:font-bold tracking-tighter mb-6 text-zinc-100">
        thirdweb SDK
        <span className="text-zinc-300 inline-block mx-1"> + </span>
        <span className="inline-block -skew-x-6 text-blue-500"> Next.js </span>
      </h1>

      <p className="text-zinc-300 text-base">
        Read the{" "}
        <code className="bg-zinc-800 text-zinc-300 px-2 rounded py-1 text-sm mx-1">
          README.md
        </code>{" "}
        file to get started.
      </p>
    </header>
  );
}

function ThirdwebResources() {
  return (
    <div className="grid gap-4 lg:grid-cols-3 justify-center">
      <ArticleCard
        title="thirdweb SDK Docs"
        href="https://portal.thirdweb.com/typescript/v5"
        description="thirdweb TypeScript SDK documentation"
      />

      <ArticleCard
        title="Components and Hooks"
        href="https://portal.thirdweb.com/typescript/v5/react"
        description="Learn about the thirdweb React components and hooks in thirdweb SDK"
      />

      <ArticleCard
        title="thirdweb Dashboard"
        href="https://thirdweb.com/dashboard"
        description="Deploy, configure, and manage your smart contracts from the dashboard."
      />
    </div>
  );
}

function ArticleCard(props: {
  title: string;
  href: string;
  description: string;
}) {
  return (
    <a
      href={props.href + "?utm_source=next-template"}
      target="_blank"
      className="flex flex-col border border-zinc-800 p-4 rounded-lg hover:bg-zinc-900 transition-colors hover:border-zinc-700"
    >
      <article>
        <h2 className="text-lg font-semibold mb-2">{props.title}</h2>
        <p className="text-sm text-zinc-400">{props.description}</p>
      </article>
    </a>
  );
}
