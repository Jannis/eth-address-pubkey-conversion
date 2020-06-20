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
      let uncompressedPubkey = ethers.utils.computePublicKey(pubkey);
      let expectedAddress = expectedAddresses[pubkey];

      let ethersAddr = ethers.utils.computeAddress(uncompressedPubkey);
      let impl1Addr = await instance.impl1(uncompressedPubkey);
      let impl2Addr = await instance.impl2(uncompressedPubkey);
      let impl3Addr = await instance.impl3(uncompressedPubkey);
      let impl4Addr = await instance.impl4(uncompressedPubkey);

      expect({
        pubkey,
        uncompressedPubkey,
        ethers: ethersAddr,
        impl1: impl1Addr,
        impl2: impl2Addr,
        impl3: impl3Addr,
        impl4: impl4Addr,
      }).to.equal({
        pubkey,
        uncompressedPubkey,
        ethers: expectedAddress,
        impl1: expectedAddress,
        impl2: expectedAddress,
        impl3: expectedAddress,
        impl4: expectedAddress,
      });
    }
  });
});
