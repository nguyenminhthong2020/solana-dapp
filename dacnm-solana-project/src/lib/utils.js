const REACT_APP_USE_DATAHUB = true;

// Datahub Node's RPC URL
export const getNodeRpcURL = () => {
  return REACT_APP_USE_DATAHUB === "true"
    ? `https://solana--devnet--rpc.datahub.figment.io/apikey/4c747507f6c0f3b42de97b5e26bab46a/health/apikey/4c747507f6c0f3b42de97b5e26bab46a`
    : `https://api.devnet.solana.com`;
}

// Datahub Node's WS (Web Socket) URL
export const getNodeWsURL = () => {
  return REACT_APP_USE_DATAHUB === "true"
    ? `wss://solana--devnet--ws.datahub.figment.io/apikey/4c747507f6c0f3b42de97b5e26bab46a/health/apikey/4c747507f6c0f3b42de97b5e26bab46a`
    : `https://api.devnet.solana.com`;
}

// Helper for generating an account URL on Solana Explorer
export const getAccountExplorerURL = (address) => {
  return `https://explorer.solana.com/address/${address}?cluster=devnet`;
}

// Helper for generating a transaction URL on Solana Explorer
export const getTxExplorerURL = (signature) => {
  return `https://explorer.solana.com/tx/${signature}?cluster=devnet`;
}