import { Conflux, format, address } from "js-conflux-sdk";
import {
  CONTRACTS,
  NETWORK,
  RPC,
  DEFAULT_NETWORK,
  METHOD_TO_CONTRACT,
  SUPPORT_METHODS,
  CONTRACTS_NAME,
  METHOD_MAP,
  STATUS,
} from "./consts";
import {
  NameWrapperABI,
  MulticallABI,
  BaseRegistrarABI,
  ReverseRecordsABI,
  WEB3CONTROLLERABI,
  CNSRegistryABI,
  UtilABI,
} from "./contracts";
import {
  Config,
  Name,
  Conflux as TypeConflux,
  Contracts,
  Address,
  Args,
  ContractsAddress,
  ContractFunc,
} from "./interface";
import { namehash, dnsNameNotationDecode, labelhash } from "./utils";
import BigNumber from "bignumber.js";

export default class CoreidUtils {
  readonly config = {
    networkId: NETWORK[DEFAULT_NETWORK],
    rpc: RPC[DEFAULT_NETWORK],
    contracts: CONTRACTS[DEFAULT_NETWORK],
  };

  readonly conflux!: TypeConflux;

  readonly contracts: Contracts = CONTRACTS_NAME.reduce((prev, curr) => {
    prev[curr] = undefined;
    return prev;
  }, {} as Contracts);

  static supportMethods = SUPPORT_METHODS;

  static utils = {
    namehash,
    dnsNameNotationDecode,
    labelhash,
  };

  constructor(config?: Config) {
    if (config) {
      this.config = {
        ...this.config,
        ...config,
        contracts: {
          ...this.config.contracts,
          ...config?.contracts,
        },
      };
    }

    this.conflux = new Conflux({
      url: this.config.rpc,
      networkId: this.config.networkId,
    });

    this.contracts.MULTICALL = this.conflux.Contract({
      abi: MulticallABI,
      address: this.config.contracts.MULTICALL,
    });

    this.contracts.CNS_REGISTRY = this.conflux.Contract({
      abi: CNSRegistryABI,
      address: this.config.contracts.CNS_REGISTRY,
    });

    this.contracts.NAME_WRAPPER = this.conflux.Contract({
      abi: NameWrapperABI,
      address: this.config.contracts.NAME_WRAPPER,
    });

    this.contracts.BASE_REGISTRAR = this.conflux.Contract({
      abi: BaseRegistrarABI,
      address: this.config.contracts.BASE_REGISTRAR,
    });

    this.contracts.REVERSE_RECORDS = this.conflux.Contract({
      abi: ReverseRecordsABI,
      address: this.config.contracts.REVERSE_RECORDS,
    });

    this.contracts.WEB3_CONTROLLER = this.conflux.Contract({
      abi: WEB3CONTROLLERABI,
      address: this.config.contracts.WEB3_CONTROLLER,
    });

    this.contracts.UTIL = this.conflux.Contract({
      abi: UtilABI,
      address: this.config.contracts.UTIL,
    });
  }

  /**
   * @example:
   * coreidutils.multicall([
   *   {
   *     method: 'ownerOf',
   *     args: ['666666.web3']
   *   },
   *   {
   *     method: 'address',
   *     args: ['666666.web3']
   *   },
   * ])
   */
  async multicall(
    calls: Array<{
      method: typeof SUPPORT_METHODS[number];
      args: Array<Args>;
    }>
  ) {
    try {
      const list: Array<{
        name: keyof ContractsAddress;
        addr: string;
        contract: ContractFunc;
        params: any;
        method: string;
        callParams: any;
      }> = [];

      for (let call of calls) {
        const { method, args } = call;

        if (!CoreidUtils.supportMethods.includes(method)) {
          throw new Error(`${method} is not supported`);
        } else {
          const cName: keyof ContractsAddress = METHOD_TO_CONTRACT[method];
          const cAddr = this.config.contracts[cName];
          const cContract =
            // @ts-ignore
            this.contracts[cName]?.[METHOD_MAP[method] || method];

          // @ts-ignore
          const params = this[`${method}_params`](...args);
          const encodeData = cContract?.encodeData(params);

          list.push({
            name: cName,
            addr: cAddr,
            contract: cContract as ContractFunc,
            // @ts-ignore
            params: [cAddr, encodeData],
            method,
            callParams: params.callParams,
          });
        }
      }

      const data = await this.contracts.MULTICALL?.aggregate(
        list.map((l) => l.params)
      );

      return data.map((d: any, i: number) => {
        // @ts-ignore
        return this[`${list[i].method}_return`](
          list[i].contract.decodeOutputs(format.hex(d)),
          list[i].callParams
        );
      });
    } catch (error) {
      console.log("multicall error: ", error);
      return error;
    }
  }

  private ownerOf_params(name: Name) {
    return [namehash(name)];
  }

  private ownerOf_return(data: any) {
    return data;
  }

  async ownerOf(name: Name) {
    return (
      await this.multicall([
        {
          method: "ownerOf",
          args: [name],
        },
      ])
    )[0];
  }

  private getData_params(name: Name) {
    return [namehash(name)];
  }

  private getData_return(data: any) {
    return [
      data[0],
      data[1].toString(),
      new BigNumber(`${data[2].toString()}000`),
    ];
  }

  private async getData(name: Name) {
    return (
      await this.multicall([
        {
          method: "getData",
          args: [name],
        },
      ])
    )[0];
  }

  private userDomains_params(account: Address) {
    return [account];
  }

  private userDomains_return(data: any) {
    return data.map((d: string) => dnsNameNotationDecode(d));
  }

  async userDomains(addr: Address) {
    if (!address.isValidCfxAddress(addr)) {
      throw new Error(`${addr} is not valid cfx base32 address`);
    }
    return (
      await this.multicall([
        {
          method: "userDomains",
          args: [addr],
        },
      ])
    )[0];
  }

  private address_params(name: Name) {
    return [namehash(name)];
  }

  private address_return(data: any) {
    return data;
  }

  async address(name: Name) {
    return (
      await this.multicall([
        {
          method: "address",
          args: [name],
        },
      ])
    )[0];
  }

  private nameExpires_params(name: Name) {
    return [labelhash(name.split(".")[0])];
  }

  private nameExpires_return(data: any) {
    return new BigNumber(`${data.toString()}000`);
  }

  async nameExpires(name: Name) {
    return (
      await this.multicall([
        {
          method: "nameExpires",
          args: [name],
        },
      ])
    )[0];
  }

  private name_params(addr: Address) {
    if (!address.isValidCfxAddress(addr)) {
      throw new Error(`${addr} is not valid cfx base32 address`);
    }
    return [[format.hexAddress(addr)]];
  }

  private name_return(data: any) {
    return data[0];
  }

  async name(addr: Address) {
    return (
      await this.multicall([
        {
          method: "name",
          args: [addr],
        },
      ])
    )[0];
  }

  private names_params(addrs: Address[]) {
    if (!Array.isArray(addrs)) {
      throw new Error("params need to be array type");
    }
    return [addrs.map((a) => format.hexAddress(a))];
  }

  private names_return(data: any) {
    return data;
  }

  async names(addrs: Address[]) {
    return (
      await this.multicall([
        {
          method: "names",
          args: [addrs],
        },
      ])
    )[0];
  }

  private status_params(name: Name) {
    return [name.split(".")[0]];
  }

  private status_return(data: any) {
    return STATUS[data.toString()];
  }

  async status(name: Name) {
    return (
      await this.multicall([
        {
          method: "status",
          args: [name],
        },
      ])
    )[0];
  }

  private parent_params(name: Name) {
    const arr = name.split(".");

    if (arr.length < 3) {
      throw new Error("no sub domain");
    }

    const p = [namehash(arr.slice(1).join("."))];
    // @ts-ignore
    p.callParams = name;
    return p;
  }

  private parent_return(data: any, callParams: any) {
    return {
      name: callParams.split(".").slice(1).join("."),
      address: data,
    };
  }

  async parent(name: Name) {
    return (
      await this.multicall([
        {
          method: "parent",
          args: [name],
        },
      ])
    )[0];
  }

  private registrant_params(name: Name) {
    if (!name.includes(".")) {
      throw new Error("invalid param, name should be with top level domain");
    }
    return [labelhash(name.split(".")[0])];
  }

  private registrant_return(data: any) {
    return data;
  }

  async registrant(name: Name) {
    return (
      await this.multicall([
        {
          method: "registrant",
          args: [name],
        },
      ])
    )[0];
  }

  private controller_params(name: Name) {
    return [namehash(name)];
  }

  private controller_return(data: any) {
    return data;
  }

  async controller(name: Name) {
    return (
      await this.multicall([
        {
          method: "controller",
          args: [name],
        },
      ])
    )[0];
  }
}
