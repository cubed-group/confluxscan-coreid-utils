import { ContractsAddress } from "./interface";

export const CONTRACTS = {
  // TODO
  mainnet: {
    REVERSE_REGISTRAR: "",
    BASE_REGISTRAR: "",
    NAME_WRAPPER: "",
    WEB3_CONTROLLER: "",
    PUBLIC_RESOLVER: "",
    REVERSE_RECORDS: "",
    MULTICALL: "cfx:achfcd4z000fw2977dz09z8nat38wxbfrynkxpe15v",
  },
  // come from: https://web3-username.gitbook.io/.web3-username-docs/deployment#testnet
  testnet: {
    REVERSE_REGISTRAR: "cfxtest:acfmezysbf86jy3jnw835bnamxp08dxzd61w5ur8hy",
    BASE_REGISTRAR: "cfxtest:acbp262fvjzva1raef4n3e5yyszy9spsc20cmztnya",
    NAME_WRAPPER: "cfxtest:acbttry22rsx7k54ms6hbkc0c8tf680u5pc0r31ef5",
    WEB3_CONTROLLER: "cfxtest:acde0h4f9nz70h146d4p0wbbx38zamwhue3uce1ndt",
    PUBLIC_RESOLVER: "cfxtest:acfcb2fv6t8xrxyyx3x1atwmdrhh5xvfd21zsje216",
    REVERSE_RECORDS: "cfxtest:acccv089mvek41rsmjyf1yyg922phjd0ppt16hfuv1",
    MULTICALL: "cfxtest:acexk57dcp2gcaydnyyz615b1993c319uup08gwwzs",
  },
};

export const CONTRACTS_NAME = [
  "REVERSE_REGISTRAR",
  "BASE_REGISTRAR",
  "NAME_WRAPPER",
  "WEB3_CONTROLLER",
  "PUBLIC_RESOLVER",
  "REVERSE_RECORDS",
  "MULTICALL",
] as const;

// if the method has a different function name than the abi accepts, the relationship needs to be defined in the METHOD_MAP map
export const CONTRACT_TO_METHOD = {
  REVERSE_REGISTRAR: [""],
  BASE_REGISTRAR: ["nameExpires", "registrant"],
  NAME_WRAPPER: ["ownerOf", "getData", "userDomains"],
  WEB3_CONTROLLER: ["status"],
  PUBLIC_RESOLVER: ["address", "parent"], // TODO, this is used to get resolver contract address, not forward resolved address
  REVERSE_RECORDS: ["name", "names"],
  MULTICALL: ["aggregate"],
};

// used to explicitly define the function name map that the abi accepts
export const METHOD_MAP = {
  address: "addr(bytes32)",
  name: "getNames(address[])",
  names: "getNames(address[])",
  status: "labelStatus",
  registrant: "ownerOf",
  parent: "addr(bytes32)",
} as const;

export const NETWORK = {
  mainnet: 1029,
  testnet: 1,
};

export const RPC = {
  mainnet: "https://main.confluxrpc.com",
  testnet: "https://test.confluxrpc.com",
};

export const DEFAULT_NETWORK = "testnet";

export const ROOT = ".web3";

export const METHOD_TO_CONTRACT: {
  [key: string]: keyof ContractsAddress;
} = Object.keys(CONTRACT_TO_METHOD).reduce((prev, curr) => {
  // @ts-ignore
  CONTRACT_TO_METHOD[curr].forEach((k) => k && (prev[k] = curr));
  return prev;
}, {});

export const SUPPORT_METHODS: string[] = Object.keys(CONTRACT_TO_METHOD)
  .reduce((prev, curr) => {
    // @ts-ignore
    return prev.concat(CONTRACT_TO_METHOD[curr]);
  }, [])
  .filter((m) => !!m);

export enum STATUS {
  Valid,
  TooShort,
  Reserved,
  IllegalChar,
  Locked,
  Registered,
  SoldOut,
}
