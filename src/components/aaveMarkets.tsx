import {
  useAaveMarkets,
  chainId,
  useAaveChains,
  ChainsFilter,
} from "@aave/react";
import Image from "next/image";
import { useState } from "react";

export default function AaveMarkets() {
  const [selectedChainId, setSelectedChainId] = useState(1);
  const { data: chains } = useAaveChains({
    filter: ChainsFilter.ALL,
  });
  const { data, loading, error } = useAaveMarkets({
    chainIds: [chainId(selectedChainId)]
  });

  if (loading) {
    return <p>Loading…</p>;
  }

  if (error) {
    return <p>ERROR: {JSON.stringify(error)}</p>;
  }

  return (
    <div>
      Select Chain:
      <select className="text-emerald-600" name="chain" value={selectedChainId} onChange={(e) => setSelectedChainId(parseInt(e.target.value))}>
        {chains && chains.map((chain) => (
          <option key={chain.chainId} value={chain.chainId}>
            {chain.name}
          </option>
        ))}
      </select>
      <ul>
        {data.map((market) => (
          <li key={market.address}>
            <Image src={market.icon} width={64} height={64} alt={market.name} />{" "}
            {market.name} ({market.chain.name}) {market.address}
          </li>
        ))}
      </ul>
      <pre className="w-full text-wrap font-mono text-sm">{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
