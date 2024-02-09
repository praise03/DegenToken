// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DegenToken is ERC20, Ownable {

    //@notice: Classification of in-game redeemable items
    enum Items {
        itemOne,
        itemTwo,
        itemThree
    }

    //@dev: mapping to store user's Item balance
    mapping(address => mapping(Items => uint8)) reedemableItems;

    constructor() ERC20("Degen", "DGN") Ownable() {}

    //@notice: function to mint tokens to users
    //@dev: Only callable by the contract owner
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    //@notice: can use this function to transfer tokens to any address
    //@dev: transfers to the zero address not allowed
    function transferTokens(address to, uint256 amount) external{
        require(balanceOf(msg.sender) >= amount, "Insufficient Balance");
        require(to != address(0), "Transfer to Zero Address");
        transfer(to, amount);
    }

    //@notice: burn any amount of tokens from sender's balance
    function burnTokens(uint256 amount) public {
        require(balanceOf(msg.sender) >= amount, "Insufficient Balance");
        _burn(msg.sender, amount);
    }

    //@notice: burns tokens from caller's balance to purchase in-game items
    function redeemItem(uint256 tokenAmount) public payable{
        burnTokens(tokenAmount);
        if(tokenAmount == 1){
            reedemableItems[msg.sender][Items.itemOne] += 1;
        }
        if(tokenAmount == 2){
            reedemableItems[msg.sender][Items.itemTwo] += 1;
        }
        if(tokenAmount == 3){
            reedemableItems[msg.sender][Items.itemThree] += 1;
        }
    }

    //@notice: returns user's balance of a specified ingame item
    //@dev: input 0 : Item 1, 1: Item 2, 2: Item 3
    function itemBalance(Items _item) public view returns(uint8) {
        return reedemableItems[msg.sender][_item];
    }

    //@notice: returns users DGN token balance
    function myBalance() external view returns(uint256) {
        return balanceOf(msg.sender);
    }

    //@dev: token decimals overriden to 1
    function decimals() public view override returns (uint8) {
        return 1;
    }

}