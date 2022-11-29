// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract LokeyERC20 is ERC20 {
    address private lo_stake;
    uint256 private max_supply = 1000000000 ether;
    address private admin;
    constructor() ERC20("LokeyDAO", "LOKEY") {
        admin = msg.sender;
        _mint(admin, 50000000 ether);
    }

    modifier loStakeOnly {
        require(msg.sender == lo_stake, "Unauthorized");
        _;
    }

    function mint(uint256 amount) public loStakeOnly returns (bool) {
        require(lo_stake != address(0), "LoStake not set");
        uint256 total_sup = totalSupply();
        require(total_sup + amount <= max_supply, "LOKEY: Exceeds Limit");
        _mint(lo_stake, amount);
        return true;
    }

    function setLoStake(address _lo_stake) public returns (bool, address) {
        require(msg.sender == admin, "Unauthorized");
        require(lo_stake == address(0), "LoStake already set");
        lo_stake = _lo_stake;
        return (true, lo_stake);
    }

    function maxSupply() public view returns (uint256) {
        return max_supply;
    }

    function viewLoStake() public view returns (address) {
        return lo_stake;
    }

    function viewAdmin() public view returns (address) {
        return admin;
    }
}