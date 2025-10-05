import { useAaveMarkets, chainId } from "@aave/react";

export default function AaveMarkets() {
  const { data, loading, error } = useAaveMarkets({
    chainIds: [chainId(1)],
  });

  if (loading) {
    return <p>Loading…</p>;
  }

  if (error) {
    return <p>ERROR: {JSON.stringify(error)}</p>;
  }

  return <div><pre>{JSON.stringify(data)}</pre></div>;
}
