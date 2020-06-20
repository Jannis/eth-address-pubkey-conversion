const { expect } = require("chai");

describe("Contract", function () {
  it("Public keys are converted to addresses correctly", async function () {
    const Contract = await ethers.getContractFactory("Contract");
    const instance = await Contract.deploy();
    await instance.deployed();

    let expectedAddresses = {
      "0x03e90b1997e2d3d2ec2992c88308f0a04b45630fcf36fe8de499af43eb143933c4":
        "0x443E182a3393914538eF5328e26aC7b6583ab6af",
      "0x025f37d20e5b18909361e0ead7ed17c69b417bee70746c9e9c2bcb1394d921d4ae":
        "0xd09d3103ccabfb769edc3e9b01500ca7241d470a",
    };

    for (let pubkey in expectedAddresses) {
      let expectedAddress = expectedAddresses[pubkey];

      let ethersAddr = ethers.utils.computeAddress(pubkey);
      let impl1Addr = await instance.impl1(pubkey);
      let impl2Addr = await instance.impl2(pubkey);

      expect({
        pubkey,
        ethers: ethersAddr,
        impl1: impl1Addr,
        impl2: impl2Addr,
      }).to.equal({
        pubkey,
        ethers: expectedAddress,
        impl1: expectedAddress,
        impl2: expectedAddress,
      });
    }
  });
});
