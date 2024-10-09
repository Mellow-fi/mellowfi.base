// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

contract MellowFiPriceOracle {     

    AggregatorV3Interface internal celoPriceFeed;
    AggregatorV3Interface internal usdtPriceFeed;

    constructor(address _celoPriceFeed, address _usdtPriceFeed) {
        celoPriceFeed = AggregatorV3Interface(_celoPriceFeed);
        usdtPriceFeed = AggregatorV3Interface(_usdtPriceFeed);
    }

    // Fetches the latest price of CELO from Chainlink Price Feed
    function getCeloPrice() public view returns (int) {
        (, int price,,,) = celoPriceFeed.latestRoundData();
        return price; // CELO price in USD, with 8 decimals
    }

    // Fetches the latest price of USDT from Chainlink Price Feed
    function getUsdtPrice() public view returns (int) {
        (, int price,,,) = usdtPriceFeed.latestRoundData();
        return price; // USDT price in USD, with 8 decimals
    }
}