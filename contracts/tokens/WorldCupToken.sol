// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract WorldCupToken is ERC20 {
    constructor(
        string memory name_,
        string memory symbol_,
        uint totalSupply_
    ) ERC20(name_, symbol_) {
        _mint(msg.sender, totalSupply_);
    }
}
