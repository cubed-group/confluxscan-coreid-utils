import { useEffect } from "react";
import "./App.css";
import CoreidUtils from "./packages";

const ADDRESS1 = "cfxtest:aargwwstcp4axhxgkxfuy9pent1vtmaskjwr12xfsj"; // 88888888.web3, xiaokonglong.web3
const ADDRESS2 = "cfxtest:aap7yfv4bhh5db8xrnu3w27v8dcjzwavty234a1hjz"; // 666666.web3
const NAME1 = "666666.web3";
const NAME2 = "88888888.web3";

function App() {
  useEffect(() => {
    async function main() {
      const coreid = new CoreidUtils();
      // const owner = await coreid.ownerOf(NAME1);
      // console.log("owner is: ", owner);

      // const data = await coreid.getData(NAME1);
      // console.log("data is: ", data);

      // const userDomains = await coreid.userDomains(ADDRESS1);
      // console.log("userDomains is: ", userDomains);

      // const address = await coreid.address(NAME2);
      // console.log("address is: ", address);

      // const nameExpires = await coreid.nameExpires(NAME2);
      // console.log("nameExpires is: ", nameExpires);

      // const name = await coreid.name(ADDRESS1);
      // console.log("name is: ", name);

      // const names = await coreid.names([ADDRESS1, ADDRESS2]);
      // console.log("names is: ", names);

      // const status = await coreid.status(NAME1);
      // console.log("status is: ", status);

      // console.log("-----------");
      const multicall = await coreid.multicall([
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
      ]);
      console.log("multicall is: ", multicall);
    }

    main().catch(console.log);
  }, []);

  return <div className="App">coreid util</div>;
}

export default App;
