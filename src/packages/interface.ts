import type Contract from "js-conflux-sdk/dist/types/contract";
import type Conflux from "js-conflux-sdk/dist/types/Conflux";
import { CONTRACT_TO_METHOD, CONTRACTS_NAME } from "./consts";

export type Address = string;

export type Args = any;

export type NetworkId = 1 | 1029;

export type Rpc = string;

export type ContractsName = typeof CONTRACTS_NAME[number];

export type ContractsAddress = {
  [key in ContractsName]: string;
};

export interface Config {
  networkId: NetworkId;
  contracts: ContractsAddress;
  rpc: Rpc;
}

export type Name = string;

export type Id = string;

export interface ContractFunc extends Function {
  encodeData: (args: any) => unknown;
  decodeOutputs: (args: any) => unknown;
}

type ExtendContract<K extends string | number | symbol> = {
  [key in K]: ContractFunc;
};

export interface Contracts {
  CNS_REGISTRY?: ExtendContract<typeof CONTRACT_TO_METHOD.CNS_REGISTRY[number]>;
  REVERSE_REGISTRAR?: ExtendContract<
    typeof CONTRACT_TO_METHOD.REVERSE_REGISTRAR[number]
  >;
  BASE_REGISTRAR?: ExtendContract<
    typeof CONTRACT_TO_METHOD.BASE_REGISTRAR[number]
  >;
  NAME_WRAPPER?: ExtendContract<typeof CONTRACT_TO_METHOD.NAME_WRAPPER[number]>;
  WEB3_CONTROLLER?: ExtendContract<
    typeof CONTRACT_TO_METHOD.WEB3_CONTROLLER[number]
  >;
  REVERSE_RECORDS?: ExtendContract<
    typeof CONTRACT_TO_METHOD.REVERSE_RECORDS[number]
  >;
  UTIL?: ExtendContract<typeof CONTRACT_TO_METHOD.UTIL[number]>;
  MULTICALL?: ExtendContract<typeof CONTRACT_TO_METHOD.MULTICALL[number]>;
}

export { Contract, Conflux };
