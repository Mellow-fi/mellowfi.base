// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract mellowfiCollatal is ERC20 {
    constructor() ERC20("Mellow.fi Collateral Token", "MFCT") {
        _mint(msg.sender, 1000000 * (10 ** uint256(decimals())));
    }
}