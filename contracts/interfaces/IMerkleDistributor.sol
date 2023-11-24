// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.7;

interface IMerkleDistributor {
    function token() external view returns (address);

    function merkleRoot() external view returns (bytes32);

    function isClaimed(uint256 index) external view returns (bool);

    function claim(
        uint256 index,
        address account,
        uint256 amount,
        bytes32[] calldata merkleProof
    ) external;

    event Claimed(uint256 index, address account, uint256 amount);
}
