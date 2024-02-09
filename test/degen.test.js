const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DegenToken", function () {
  let degenToken, owner, addr1, addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    degenToken = await (await ethers.getContractFactory("DegenToken")).deploy();
  });

  describe("Deployment", function () {
    it("Should have the correct name and symbol", async function () {
      expect(await degenToken.name()).to.equal("Degen");
      expect(await degenToken.symbol()).to.equal("DGN");
    });
  });

  describe("Mint functionality", function () {
    it("Should only be callable by the owner", async function () {
      await expect(degenToken.connect(addr1).mint(addr1.address, 100))
        .to.be.revertedWith("Ownable: caller is not the owner");
    });

    it("Should mint tokens to the specified address", async function () {
      await degenToken.mint(addr1.address, 100);
      expect(await degenToken.balanceOf(addr1.address)).to.equal(100);
    });
  });

  describe("Transfer functionality", function () {
    it("Should transfer tokens between users", async function () {
      await degenToken.mint(owner.address, 100);
      await degenToken.transferTokens(addr1.address, 50);

      expect(await degenToken.balanceOf(owner.address)).to.equal(50);
      expect(await degenToken.balanceOf(addr1.address)).to.equal(50);
    });
  });

  describe("Burn functionality", function () {
    it("Should allow users to burn their own tokens", async function () {
      await degenToken.mint(owner.address, 100);
      await degenToken.burnTokens(50);

      expect(await degenToken.balanceOf(owner.address)).to.equal(50);
    });

    it("Should not allow users to burn more than their balance", async function () {
      await degenToken.mint(owner.address, 100);
      await expect(degenToken.burnTokens(150))
        .to.be.revertedWith("Insufficient Balance");
    });
  });

  describe("Redeem functionality", function () {
    it("Should allow users to redeem items with correct token amount", async function () {
      await degenToken.mint(owner.address, 100);

      await degenToken.redeemItem(1);
      expect(await degenToken.itemBalance(0)).to.equal(1);

      await degenToken.redeemItem(2);
      expect(await degenToken.itemBalance(1)).to.equal(1);

      await degenToken.redeemItem(3);
      expect(await degenToken.itemBalance(2)).to.equal(1);
    });

    it("Should revert if insufficient tokens are provided", async function () {
      await degenToken.mint(owner.address, 1);
      await expect(degenToken.redeemItem(2)).to.be.revertedWith("Insufficient Balance");
    });
  });

})
