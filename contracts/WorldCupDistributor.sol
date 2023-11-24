// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./libraries/MerkleProof.sol";
import "./libraries/TransferHelper.sol";

/**
 * @dev 兑奖
 */
contract WorldCupDistributor {
    using TransferHelper for address;

    address public immutable token;
    bytes32 public merkleRoot;
    mapping(uint256 => mapping(address => bool)) claimedState;

    event DistributeReward(
        bytes32 indexed merkleRoot,
        uint256 indexed index,
        uint256 amount,
        uint256 settleBlockNumber
    );

    event Claimed(
        address indexed pool,
        address indexed user,
        uint256 indexed amount
    );

    struct MerkleDistributor {
        bytes32 merkleRoot;
        uint256 index;
        uint256 amount;
        uint256 settleBlockNumber;
    }

    MerkleDistributor[] public merkleDistributors;

    mapping(uint256 => uint256) private claimedBitMap;
    address public owner;

    modifier onlyOwner() {
        require(msg.sender == owner, "not authorized!");
        _;
    }

    constructor(address token_) {
        token = token_;
        owner = msg.sender;
    }

    /**
     * @dev 兑奖 分发给用户
     */
    function distributeReward(
        uint256 _index, // 0
        uint256 _amount, // 100w
        uint256 _settleBlockNumber, // optional
        bytes32 _merkleRoot // key
    ) external onlyOwner {
        merkleRoot = _merkleRoot;
        require(_index == merkleDistributors.length, "index already exists");
        uint256 currAmount = IERC20(token).balanceOf(address(this));
        require(currAmount >= _amount, "Insufficient reward funds");
        require(block.number >= _settleBlockNumber, "!blockNumber");
        if (merkleDistributors.length > 0) {
            MerkleDistributor memory md = merkleDistributors[
                merkleDistributors.length - 1
            ];
            require(
                md.settleBlockNumber < _settleBlockNumber,
                "!settleBlockNumber"
            );
        }

        merkleDistributors.push(
            MerkleDistributor(_merkleRoot, _index, _amount, _settleBlockNumber)
        );
        emit DistributeReward(_merkleRoot, _index, _amount, _settleBlockNumber);
    }

    /**
     * @notice  user  claimed  reward with proof
     * @param index user index in reward list
     * @param amount  user reward amount
     * @param proof  user merkelProof ,generate by merkel.js
     */
    function claim(
        uint256 index,
        uint256 amount,
        bytes32[] calldata proof
    ) external {
        address user = msg.sender;
        require(merkleDistributors.length > index, "Invalid index");
        require(!isClaimed(index, user), "Drop already claimed.");

        MerkleDistributor storage merkleDistributor = merkleDistributors[index];
        require(merkleDistributor.amount >= amount, "Not sufficient");
        bytes32 leaf = keccak256(abi.encodePacked(index, user, amount));

        require(
            MerkleProof.verify(proof, merkleDistributor.merkleRoot, leaf),
            "Invalid proof."
        );

        merkleDistributor.amount = merkleDistributor.amount - amount;
        claimedState[index][user] = true;
        address(token).safeTransfer(msg.sender, amount);

        emit Claimed(address(this), user, amount);
    }

    function isClaimed(uint256 index, address user) public view returns (bool) {
        return claimedState[index][user];
    }

    function claimRestTokens(address to) public returns (bool) {
        // only owner
        require(msg.sender == owner);
        require(IERC20(token).balanceOf(address(this)) >= 0);
        require(
            IERC20(token).transfer(to, IERC20(token).balanceOf(address(this)))
        );
        return true;
    }
}
