// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

interface IScorpioNFT {
    event PreMint(
        uint256 indexed projectId_,
        address indexed to_,
        uint256 amount_
    );
    event WithdrawProceeds(uint256 indexed projectId_, uint256 amount_);
    event WithdrawRoyalties(uint256 indexed projectId_, uint256 amount_);
    event Mint(
        uint256 indexed projectId_,
        uint256 tokenId_,
        uint256 projectTokenId_,
        uint256 price_,
        address indexed to_
    );

    function totalSupply() external view returns (uint256);

    function internalTokenToProjectId(uint256 tokenId_)
        external
        view
        returns (uint256);

    function internalTokenToProjectTokenId(uint256 tokenId_)
        external
        view
        returns (uint256);

    function projectToCurrentTokenId(uint256 projectId_)
        external
        view
        returns (uint256);

    function projectToMaxTokenId(uint256 projectId_)
        external
        view
        returns (uint256);

    function projectToMintPrice(uint256 projectId_)
        external
        view
        returns (uint256);

    function projectToRoyaltyAddress(uint256 projectId_)
        external
        view
        returns (address);

    function projectToRoyaltyFee(uint256 projectId_)
        external
        view
        returns (uint256);

    function projectToRoyalties(uint256 projectId_)
        external
        view
        returns (uint256);

    function projectToProceeds(uint256 projectId_)
        external
        view
        returns (uint256);

    function projectToPreMint(uint256 projectId_) external view returns (bool);

    function owner() external view returns (address);

    function proxyRegistryAddress() external view returns (address);

    function setupProject(
        uint256 projectId_,
        uint256 maxTokenId_,
        uint256 mintPrice_,
        uint256 royaltyFee_,
        address royaltyAddress_,
        string memory baseURI_
    ) external;

    function disablePreMint(uint256 projectId_) external;

    function preMint(
        uint256 projectId_,
        uint256 count_,
        address to_
    ) external;

    function withdrawProceeds(uint256 projectId_) external;

    function withdrawRoyalties(uint256 projectId_) external;

    function mint(uint256 projectId_, address to_)
        external
        payable
        returns (uint256);
}
