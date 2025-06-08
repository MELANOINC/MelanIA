// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "erc721a/contracts/ERC721A.sol";

contract IRA721AEvolutive is ERC721A {
    mapping(uint256 => uint8) public nftLevel;
    mapping(uint256 => string) public customUri;

    constructor() ERC721A("Intelligent Revenue Asset Evolutive", "IRAE") {}

    function mint(address to, uint256 quantity) external {
        _safeMint(to, quantity);
    }

    function levelUp(uint256 tokenId) external {
        require(_exists(tokenId), "NFT inexistente");
        nftLevel[tokenId] += 1;
    }

    function setCustomUri(uint256 tokenId, string memory uri) external {
        require(_exists(tokenId), "NFT inexistente");
        customUri[tokenId] = uri;
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        if (bytes(customUri[tokenId]).length > 0) {
            return customUri[tokenId];
        }
        return super.tokenURI(tokenId);
    }
}