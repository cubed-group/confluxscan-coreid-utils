import { useEffect } from "react";
import "./App.css";
import CoreidUtil from "./packages";

const ADDRESS1 = "cfxtest:aargwwstcp4axhxgkxfuy9pent1vtmaskjwr12xfsj"; // 88888888.web3, xiaokonglong.web3
const ADDRESS2 = "cfxtest:aap7yfv4bhh5db8xrnu3w27v8dcjzwavty234a1hjz"; // 666666.web3
const NAME1 = "666666.web3";
const NAME2 = "88888888.web3";
const NAME2_SUBDOMAIN = "subdomain.88888888.web3";
const DNS_NOTATION = "\x05hello\x04web3\x00";

function App() {
  useEffect(() => {
    async function main() {
      const coreid = new CoreidUtil();

      // const { namehash, dnsNameNotationDecode, labelhash } = CoreidUtil.utils;
      // console.log(`namehash(${NAME1}): `, namehash(NAME1));
      // console.log(
      //   `labelhash(${NAME1.split(".")[0]}): `,
      //   labelhash(NAME1.split(".")[0])
      // );
      // console.log(
      //   `dnsNameNotationDecode(${DNS_NOTATION}): `,
      //   dnsNameNotationDecode(DNS_NOTATION)
      // );

      // const owner = await coreid.ownerOf(NAME1);
      // console.log("owner is: ", owner);

      // const userDomains = await coreid.userDomains(ADDRESS1);
      // console.log("userDomains is: ", userDomains);

      // const address = await coreid.address(NAME2);
      // console.log("address is: ", address);

      // const parent = await coreid.parent(NAME2_SUBDOMAIN);
      // console.log("parent is: ", parent);

      // const nameExpires = await coreid.nameExpires(NAME2);
      // console.log("nameExpires is: ", nameExpires);

      // const name = await coreid.name(ADDRESS1);
      // console.log("name is: ", name);

      // const names = await coreid.names([ADDRESS1, ADDRESS2]);
      // console.log("names is: ", names);

      // const status = await coreid.status(NAME1);
      // console.log("status is: ", status);

      // const registrant = await coreid.registrant(NAME1);
      // console.log(`registrant of ${NAME1} is: `, registrant);

      // const registrant2 = await coreid.registrant(NAME2);
      // console.log(`registrant2 of ${NAME2} is: `, registrant2);

      // const controller = await coreid.controller(NAME1);
      // console.log("controller is: ", controller);

      // console.log("-----------");

      const MULTICALL_PARAMS = [
        {
          method: "ownerOf",
          args: [NAME1],
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
          args: [[ADDRESS1, ADDRESS1]],
        },
        {
          method: "status",
          args: [NAME1],
        },
        {
          method: "registrant",
          args: [NAME2],
        },
        {
          method: "controller",
          args: [NAME1],
        },
      ];
      const MULTICALL_RESULT = await coreid.multicall(MULTICALL_PARAMS);

      console.log(
        MULTICALL_RESULT.reduce(
          (prev: any, curr: any, i: number) => ({
            ...prev,
            [MULTICALL_PARAMS[i].method]: curr,
          }),
          {}
        )
      );
    }

    main().catch(console.log);
  }, []);

  return <div className="App">coreid util</div>;
}

export default App;
