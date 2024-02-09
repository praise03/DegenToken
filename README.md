# Project Title

An ERC20 token and deployed on the Avalanche c-chain testnet network for Degen Gaming. 

## Description

The provided DegenToken smart contract is an ERC20 token with additional functionalities for in-game item redemption. It offers the following features:

- **Token management**: Mint, transfer, and burn DGN tokens.
- **In-game item redemption**: Users can burn DGN tokens in specific amounts to acquire redeemable in-game items.
- **Balance checks**: Check the balance of various redeemable items and DGN tokens owned by a user.
- **Owner-controlled minting**: Only the contract owner can mint new DGN tokens.


## Installation:

Here's a basic guide to installing and deploying the DegenToken contract:

- **Prerequisites**: Ensure you have Node.js, npm, and Git installed.
- **Clone the repository**: Fork or clone the repository containing the DegenToken contract code.
- **Install dependencies**: Run npm install in the project directory to install required dependencies.
- **Compile the contract**: Run npx hardhat compile to compile the Solidity code into bytecode.

### Executing program
- **Connect to a network**: Choose an EVM compatible network (avalanche fuji c-chain testnet in this case).
- **Deploy the contract**: Run npx hardhat deploy --network <network-name> (npx hardhat deploy --network avalanche-testnet) to deploy the contract to the selected network.
- **Interact with the contract**: Use provided scripts or a web3 interface to interact with the contract's functions (e.g., mint tokens, transfer tokens, redeem items).

##### Help
*If tests are failing on the testnet, ensure you have enough avax testnet tokens on fuji(c-chain)*

#### Authors
Disappointed_Rorie  @praise03

## License
This project is licensed under the MIT License
