import { ContractsAddress } from "./interface";

export const CONTRACTS = {
  mainnet: {
    CNS_REGISTRY: "cfx:acemru7fu1u8brtyn3hrtae17kbcd4pd9uwbspvnnm",
    REVERSE_REGISTRAR: "cfx:acfarpzehntpre0thg8x7dp0ajw4ms328ps634v1zk",
    BASE_REGISTRAR: "cfx:acg08bujp0kmsup1zk11c9mad7zd6648eybmv2kbha",
    NAME_WRAPPER: "cfx:acdpx5pyc9xkry6x84bdstvt52grxpj69uadprjs7p",
    WEB3_CONTROLLER: "cfx:ace0bgf408jt5kmw34k3mxx03tpsfpt8by010ma8ww",
    PUBLIC_RESOLVER: "cfx:acasaruvgf44ss67pxzfs1exvj7k2vyt863f72n6up",
    REVERSE_RECORDS: "cfx:achsgpgs5dgpmgpj2zd87apj6js33c07pjth6k33mj",
    UTIL: "cfx:ace8hzgt9rcwejnh7dw1861r881g9rcgyy04r298hn",
    MULTICALL: "cfx:achfcd4z000fw2977dz09z8nat38wxbfrynkxpe15v",
  },
  // come from: https://web3-username.gitbook.io/.web3-username-docs/deployment#testnet
  testnet: {
    CNS_REGISTRY: "cfxtest:acemru7fu1u8brtyn3hrtae17kbcd4pd9u2m761bta",
    REVERSE_REGISTRAR: "cfxtest:acfarpzehntpre0thg8x7dp0ajw4ms328pe1mm17vd",
    BASE_REGISTRAR: "cfxtest:acg08bujp0kmsup1zk11c9mad7zd6648eynbcjtndm",
    NAME_WRAPPER: "cfxtest:acapc3y2j7atme3bawvaex18hs36tn40uu5h6j3mtu",
    WEB3_CONTROLLER: "cfxtest:aca1858y5a9fnyx9rxd1c9knr517cd0e6afzzhgj01",
    REVERSE_RECORDS: "cfxtest:acgddsj3kah2f4f4c6959bvc4732f4juyj90h0zmg2",
    UTIL: "cfxtest:aca4w63ypgup8tryphprzfcrh5kh0hpbgasb2z3s0j",
    MULTICALL: "cfxtest:acexk57dcp2gcaydnyyz615b1993c319uup08gwwzs",
  },
};

export const CONTRACTS_NAME = [
  "CNS_REGISTRY",
  "REVERSE_REGISTRAR",
  "BASE_REGISTRAR",
  "NAME_WRAPPER",
  "WEB3_CONTROLLER",
  "REVERSE_RECORDS",
  "UTIL",
  "MULTICALL",
] as const;

// if the method has a different function name than the abi accepts, the relationship needs to be defined in the METHOD_MAP map
export const CONTRACT_TO_METHOD = {
  CNS_REGISTRY: ["controller"],
  REVERSE_REGISTRAR: [""],
  BASE_REGISTRAR: ["nameExpires"],
  NAME_WRAPPER: ["ownerOf", "getData", "userDomains"],
  WEB3_CONTROLLER: ["status"],
  UTIL: ["address", "parent", "registrant"],
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
  controller: "owner",
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
