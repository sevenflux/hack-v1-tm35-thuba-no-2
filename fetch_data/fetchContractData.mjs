import { ethers } from 'ethers';
import {
  UiPoolDataProvider,
  UiIncentiveDataProvider,
  ChainId,
} from '@aave/contract-helpers';
import * as markets from '@bgd-labs/aave-address-book';

import { formatReserves } from '@aave/math-utils';
import { formatReservesAndIncentives } from '@aave/math-utils';
import { formatUserSummaryAndIncentives } from '@aave/math-utils';
import dayjs from 'dayjs';
import fs from 'fs';




// ES5 Alternative imports
//  const {
//    ChainId,
//    UiIncentiveDataProvider,
//    UiPoolDataProvider,
//  } = require('@aave/contract-helpers');
//  const markets = require('@bgd-labs/aave-address-book');
//  const ethers = require('ethers');

// Sample RPC address for querying ETH mainnet
const provider = new ethers.providers.JsonRpcProvider(
  'https://eth-mainnet.public.blastapi.io',
);

// User address to fetch data for, insert address here
// const currentAccount = '0xd994B0210392a693f1d279946A2076dbE912f217';

// View contract used to fetch all reserves data (including market base currency data), and user reserves
// Using Aave V3 Eth Mainnet address for demo
const poolDataProviderContract = new UiPoolDataProvider({
  uiPoolDataProviderAddress: markets.AaveV3Ethereum.UI_POOL_DATA_PROVIDER,
  provider,
  chainId: ChainId.mainnet,
});

// View contract used to fetch all reserve incentives (APRs), and user incentives
// Using Aave V3 Eth Mainnet address for demo
const incentiveDataProviderContract = new UiIncentiveDataProvider({
  uiIncentiveDataProviderAddress:
    markets.AaveV3Ethereum.UI_INCENTIVE_DATA_PROVIDER,
  provider,
  chainId: ChainId.mainnet,
});

async function fetchContractData(currentAccount) {
  // Object containing array of pool reserves and market base currency data
  // { reservesArray, baseCurrencyData }
  const reserves = await poolDataProviderContract.getReservesHumanized({
    lendingPoolAddressProvider: markets.AaveV3Ethereum.POOL_ADDRESSES_PROVIDER,
  });

  // Object containing array or users aave positions and active eMode category
  // { userReserves, userEmodeCategoryId }
  const userReserves = await poolDataProviderContract.getUserReservesHumanized({
    lendingPoolAddressProvider: markets.AaveV3Ethereum.POOL_ADDRESSES_PROVIDER,
    user: currentAccount,
  });

  // Array of incentive tokens with price feed and emission APR
  const reserveIncentives =
    await incentiveDataProviderContract.getReservesIncentivesDataHumanized({
      lendingPoolAddressProvider:
        markets.AaveV3Ethereum.POOL_ADDRESSES_PROVIDER,
    });

  // Dictionary of claimable user incentives
  const userIncentives =
    await incentiveDataProviderContract.getUserReservesIncentivesDataHumanized({
      lendingPoolAddressProvider:
        markets.AaveV3Ethereum.POOL_ADDRESSES_PROVIDER,
      user: currentAccount,
    });

    // `reserves` variable here is input from Setup section

    const reservesArray = reserves.reservesData;
    const baseCurrencyData = reserves.baseCurrencyData;
    const userReservesArray = userReserves.userReserves;

  const currentTimestamp = dayjs().unix();

  /*
  - @param `reserves` Input from [Fetching Protocol Data](#fetching-protocol-data), `reserves.reservesArray`
  - @param `currentTimestamp` Current UNIX timestamp in seconds
  - @param `marketReferencePriceInUsd` Input from [Fetching Protocol Data](#fetching-protocol-data), `reserves.baseCurrencyData.marketReferencePriceInUsd`
  - @param `marketReferenceCurrencyDecimals` Input from [Fetching Protocol Data](#fetching-protocol-data), `reserves.baseCurrencyData.marketReferenceCurrencyDecimals`
  */
  const formattedPoolReserves = formatReserves({
    reserves: reservesArray,
    currentTimestamp,
    marketReferenceCurrencyDecimals:
      baseCurrencyData.marketReferenceCurrencyDecimals,
    marketReferencePriceInUsd: baseCurrencyData.marketReferenceCurrencyPriceInUsd,
  });

  // const formattedPoolReserves = formatReservesAndIncentives({
  //   reserves: reservesArray,
  //   currentTimestamp,
  //   marketReferenceCurrencyDecimals:
  //     baseCurrencyData.marketReferenceCurrencyDecimals,
  //   marketReferencePriceInUsd: baseCurrencyData.marketReferenceCurrencyPriceInUsd,
  //   reserveIncentives,
  // });
  // // console.log({ reserves, userReserves, reserveIncentives, userIncentives });
  // console.log(formattedPoolReserves)

  /*
- @param `currentTimestamp` Current UNIX timestamp in seconds, Math.floor(Date.now() / 1000)
- @param `marketReferencePriceInUsd` Input from [Fetching Protocol Data](#fetching-protocol-data), `reserves.baseCurrencyData.marketReferencePriceInUsd`
- @param `marketReferenceCurrencyDecimals` Input from [Fetching Protocol Data](#fetching-protocol-data), `reserves.baseCurrencyData.marketReferenceCurrencyDecimals`
- @param `userReserves` Input from [Fetching Protocol Data](#fetching-protocol-data), combination of `userReserves.userReserves` and `reserves.reservesArray`
- @param `userEmodeCategoryId` Input from [Fetching Protocol Data](#fetching-protocol-data), `userReserves.userEmodeCategoryId`
- @param `reserveIncentives` Input from [Fetching Protocol Data](#fetching-protocol-data), `reserveIncentives`
- @param `userIncentives` Input from [Fetching Protocol Data](#fetching-protocol-data), `userIncentives`
*/

  const formattedReserves = formatReserves({
    reserves: reservesArray,
    currentTimestamp,
    marketReferenceCurrencyDecimals:
      baseCurrencyData.marketReferenceCurrencyDecimals,
    marketReferencePriceInUsd: baseCurrencyData.marketReferenceCurrencyPriceInUsd,
  });
  const userSummary = formatUserSummaryAndIncentives({
    currentTimestamp,
    marketReferencePriceInUsd: baseCurrencyData.marketReferenceCurrencyPriceInUsd,
    marketReferenceCurrencyDecimals:
      baseCurrencyData.marketReferenceCurrencyDecimals,
    userReserves: userReservesArray,
    formattedReserves,
    userEmodeCategoryId: userReserves.userEmodeCategoryId,
    reserveIncentives,
    userIncentives,
  });

  fs.writeFileSync('data.json', JSON.stringify(formattedPoolReserves, null, 2));
  fs.writeFileSync('usr_reserves_data.json', JSON.stringify(userSummary, null, 2)); 
}

// fetchContractData('0xd994B0210392a693f1d279946A2076dbE912f217');
export {fetchContractData}