pragma solidity ^0.6.4;

contract Contract {
    function impl1(bytes calldata _publicKey)
        external
        pure
        returns (address addr)
    {
        bytes32 hash = keccak256(_publicKey);
        assembly {
            mstore(0, hash)
            addr := mload(0)
        }
    }

    function impl2(bytes calldata _publicKey) external pure returns (address) {
        bytes32 hash = keccak256((_publicKey));
        return address(uint160(bytes20(hash)));
    }

    function impl3(bytes calldata _publicKey) external pure returns (address) {
        bytes memory pubkey = bytes(_publicKey[1:]);
        uint256 mask = 2**(8 * 21) - 1;
        uint256 value = uint256(keccak256(pubkey));
        return address(value & mask);
    }
}
