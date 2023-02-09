# How to use
```javascript
const ADDRESS1 = "cfxtest:aargwwstcp4axhxgkxfuy9pent1vtmaskjwr12xfsj"; 
// registered 88888888.web3, xiaokonglong.web3
const ADDRESS2 = "cfxtest:aap7yfv4bhh5db8xrnu3w27v8dcjzwavty234a1hjz"; 
// registered 666666.web3
const NAME1 = "666666.web3";
const NAME2 = "88888888.web3";

// Get CoreidUtil instance
const coreidutil = new CoreidUtil();
// Get CoreidUtil instance with optional config:
// const coreidutilWithConfig = new CoreidUtil({
//   networkId: 1029,
//   rpc: "https://main.confluxrpc.com",
//   contracts: { // note: contract name should be uppercase
//     REVERSE_REGISTRAR: "",
//     BASE_REGISTRAR: "",
//     NAME_WRAPPER: "",
//     WEB3_CONTROLLER: "",
//     PUBLIC_RESOLVER: "",
//     REVERSE_RECORDS: "",
//     MULTICALL: "",
//   }
// });

// Get owner of name
const owner = await coreidutil.ownerOf(NAME1);

// Get name info, includes: owner of name, fuses and expiration datetime of fuses
const data = await coreid.getData(NAME1);

// Get owned names of address
const userDomains = await coreidutil.userDomains(ADDRESS1);

// Get forward resolved address of name
const forwardResolvedAddress = await coreidutil.address(NAME2);

// Get parent name and forward resolved address of subdomain name
const parent = await coreid.parent(NAME2_SUBDOMAIN);

// Get expiration time
const nameExpires = await coreidutil.nameExpires(NAME2);

// Get reverse resolved record of address
const name = await coreidutil.name(ADDRESS1);

// Get reverse resolved records of multiple addresses
const names = await coreidutil.names([ADDRESS1, ADDRESS1]);

// Get status of name, results in: Valid, TooShort, Reserved, IllegalChar, Locked, Registered, SoldOut
const status = await coreidutil.status(NAME1);

// Call multiple different functions with different parameters in one RPC call
const MULTICALL_PARAMS = [
  {
    method: "ownerOf",
    args: [NAME1],
  },
  {
    method: "getData",
    args: [NAME2],
  },
  {
    method: "userDomains",
    args: [ADDRESS1],
  },
  {
    method: "address",
    args: [NAME2],
  },
  {
    method: "parent",
    args: [NAME2_SUBDOMAIN],
  },
  {
    method: "nameExpires",
    args: [NAME2],
  },
  {
    method: "name",
    args: [ADDRESS1],
  },
  {
    method: "names",
    args: [[ADDRESS1, ADDRESS2]],
  },
  {
    method: "status",
    args: [NAME1],
  },
];
const MULTICALL_RESULT = await coreid.multicall(MULTICALL_PARAMS);
```

# CoreID related resources

- SDK: [web3ns.js](https://github.com/web3-identity/web3ns.js)
- Docs: 
  - [Github](https://github.com/web3-identity/cns-contracts)
  - [Developer Docs](https://web3-username.gitbook.io)
  - [Contracts Docs](https://github.com/web3-identity/cns-contracts/tree/master/docs)
  - [Demo](https://github.com/zctocm/cns-demo)
  - [Contracts API](https://github.com/web3-identity/cns-contracts/blob/master/docs/index.md#solidity-api)
  
# CoreID util project default config:
```javascript
const NETWORK = {
  mainnet: 1029,
  testnet: 1,
};

const DEFAULT_NETWORK = "testnet";

const RPC = {
  mainnet: "https://main.confluxrpc.com",
  testnet: "https://test.confluxrpc.com",
};

const ROOT = ".web3";

const RPC = {
  mainnet: "https://main.confluxrpc.com",
  testnet: "https://test.confluxrpc.com",
}

const CONTRACTS = {
  // TBD
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
}
```

## Install Dependence
Note: This project is depending on [js-conflux-sdk](https://www.npmjs.com/package/js-conflux-sdk), if your project does not use it, run `npm i -D js-conflux-sdk` to install first.

# Getting Started

This project was bootstrapped with [Vite](https://cn.vitejs.dev/guide/#scaffolding-your-first-vite-project).

## Available Scripts

In the project directory, you can run:

### `npm i`

Install project dependence

### `npm run dev`

Runs the project in the development mode.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the project for production to the `dist` folder.\
It correctly bundles project in production mode and optimizes the build for the best performance.

The build is minified.