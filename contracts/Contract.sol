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
}
