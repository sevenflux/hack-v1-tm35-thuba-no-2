"use client";

import { 
  PiggyBank,
  HandCoins,
  TrendingUp,
  ArrowUpRight
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Markdown from "react-markdown"

import GlassCard from "@/components/GlassCard";
import Layout from "@/components/Layout";
import { cn, formatBigNum } from "@/lib/utils";
import "../globals.css";
import { DEEPSEEK_API_KEY, CONTRACT_DATA_USER } from "@/assets/.env.ts";
import FormattedData from "@/types/formattedData";
import { prompt } from "@/constants/prompt";

import { ethers } from "ethers";
import {
  UiPoolDataProvider,
  UiIncentiveDataProvider,
  ChainId,
  ReserveDataHumanized,
} from "@aave/contract-helpers";
import * as markets from "@bgd-labs/aave-address-book";
import {
  formatReserves,
  formatReservesAndIncentives,
  formatUserSummaryAndIncentives,
  FormatReserveUSDResponse
} from "@aave/math-utils";
import dayjs from "dayjs";

import { TEST_ANSWER_1, TEST_MESSAGES_1 } from "@/assets/testContent";
import ChartComponent from "@/components/Chart";
import { IconButton } from "@radix-ui/themes";
import DeepseekAPI from "@/types/deepseekAPI";
import DeepseekReturnJSON from "@/types/deepseekReturnJSON";

function Dashboard() {
  const [coinSymbol,             setCoinSymbol] = useState<string>("");
  const [coinData,                 setCoinData] = useState<FormattedData>(null);
  const [supplyingValue,     setSupplyingValue] = useState<string>("◌");
  const [borrowingValue,     setBorrowingValue] = useState<string>("◌");
  const [utilizationValue, setUtilizationValue] = useState<string>("◌");
  const [aiSuggestion,         setAISuggestion] = useState<string>(TEST_ANSWER_1)
  const [messages,                 setMessages] = useState<string[]>([]);
  const [userInput,               setUserInput] = useState<string>("");

  const glassGardItems = [
    { color: "#9b87f5", title: "Supply", icon: PiggyBank, value: supplyingValue, unit: "USDT" },
    { color: "#81c8be", title: "Borrow", icon: HandCoins, value: borrowingValue, unit: "USDT" },
    { color: "#ef9f76", title: "Utilization", icon: TrendingUp, value: utilizationValue, unit: "%" }
  ];

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

  /**
   * This function is to get the aave market data
   */
  async function fetchContractData(currentAccount: string) {
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

    for (let i: number = 0; i < formattedReserves.length; ++i) {
      let current = formattedReserves[i];
      current.borrowUsageRatio
      if (current.symbol === coinSymbol) {
        setCoinData({
          name: current.name,
          symbol: current.symbol,
          priceInUSD: current.priceInUSD,
          totalLiquidityUSD: current.totalLiquidityUSD,
          availableLiquidityUSD: current.availableLiquidityUSD,
          totalDebtUSD: current.totalDebtUSD,
          borrowUsageRatio: current.borrowUsageRatio,
          formattedBaseLTVasCollateral: current.formattedBaseLTVasCollateral,
          formattedReserveLiquidationThreshold: current.formattedReserveLiquidationThreshold,
          formattedReserveLiquidationBonus: current.formattedReserveLiquidationBonus,
          supplyAPY: current.supplyAPY,
          variableBorrowAPY: current.variableBorrowAPY,
          borrowCapUSD: current.borrowCapUSD,
          supplyCapUSD: current.supplyCapUSD,
          supplyUsageRatio: current.supplyUsageRatio,
          supplyAPR: current.supplyAPR,
          variableBorrowAPR: current.variableBorrowAPR,
          isFrozen: current.isFrozen,
          isActive: current.isActive,
          unbackedUSD: current.unbackedUSD,
          accruedToTreasury: current.accruedToTreasury
        });
        setSupplyingValue(formatBigNum(current.totalLiquidityUSD));
        setBorrowingValue(formatBigNum(current.totalDebtUSD));
        let ratio: number = parseFloat(current.totalDebt) / parseFloat(current.totalLiquidity) * 100;
        setUtilizationValue(ratio.toFixed(2).toString());
      }
    }
  }

  function handleAskingAI(message: string) {
    fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        "model": "deepseek-chat",
        "messages": [
          {"role": "system", "content": prompt},
          {"role": "user", "content": JSON.stringify(coinData)},
          {"role": "user", "content": message}
        ],
        "temperature": 0.3,
        "max_tokens": 1000
      })
    })
    .then((response: Response) => response.json())
    .then((data: DeepseekAPI) => {
      const deepseekReturn: string = data.choices[0].message.content;
      const deepseekParse: DeepseekReturnJSON 
        = JSON.parse(deepseekReturn.substring(8, deepseekReturn.length - 3));
      setMessages(prev => [...prev, deepseekParse.message]);
    })
  }

  useEffect(() => {
    fetchContractData(CONTRACT_DATA_USER);
    const intervalContract = setInterval(() => {
      if (coinSymbol === "") return;
      fetchContractData(CONTRACT_DATA_USER);
    }, 10000);
    return () => clearInterval(intervalContract);
  }, [])

  // I find a safe way to dynamically generate the template string in tailwindCSS
  // property: using safelist prop in tailwind.config.js

  return (
    <Layout className="overflow-x-hidden">
      <div className={`flex flex-row mt-10`}>
        <div className={cn(
          "data-dashboard", // user-defined className
          "flex-1 flex flex-col px-10 h-250 max-h-250"
        )}>
          <div className={`flex-1 flex flex-row justify-between gap-7`}>
            {glassGardItems.map((item) => (
              <GlassCard 
                className={cn("text-center flex-1", "hover:shadow-[" + item.color + "]")} 
                hoverEffect={true}
                key={item.title}
              >
                <item.icon className={"h-12 w-12 mx-auto mb-2"} color={item.color} />
                <h3 className={`text-[#99a1af] font-semibold text-xl`}>{item.title}</h3>
                <div className={`flex flex-row items-center justify-center pt-5`}>
                  <p>
                    <span className={`text-white text-2xl font-extrabold`}>{item.value}</span>
                    <span>{" "}</span>
                    <span className={`text-[#99a1af] text-xs`}>{item.unit}</span>
                  </p>
                </div>
              </GlassCard>
            ))}
          </div>
          <div className={`flex-4 py-10 text-white grid justify-stretch`}>
            <GlassCard>
              <Markdown>
                {aiSuggestion}
              </Markdown>
            </GlassCard>
          </div>
        </div>
        <div className={cn(
          "chat-dashboard", // user-defined className
          "flex-1 shrink-0 flex flex-col pr-10 h-250 max-h-250 justify-between gap-7 pb-10"
        )}>
          <div className={`flex-1 grid justify-stretch`}>
            <GlassCard>
              <ChartComponent 
                data={[]} 
                // newSupplyData={{
                //   time: dayjs().unix(),
                //   value: coinData
                //     ? parseFloat(coinData.totalLiquidityUSD)
                //     : 0
                // }}
                // newBorrowData={{
                //   time: dayjs().unix(),
                //   value: coinData
                //     ? parseFloat(coinData.totalDebtUSD)
                //     : 0
                // }}
                newLTVData={{
                  time: dayjs().unix(),
                  value: coinData
                    ? parseFloat(coinData.formattedBaseLTVasCollateral)
                    : 0
                }}
                coinSymbol={coinSymbol}
              />
            </GlassCard>
          </div>
          <div className={`flex-2 flex flex-col border-white/10 border rounded-xl h-1/3`}>
            <div className={`overflow-auto flex-1 box-border`}>
              {messages.map((message, index) => {
                return index % 2 === 0 ? (
                  <div className={`flex flex-row-reverse w-full pr-10 pt-10`} key={index}>
                    <GlassCard className={` text-white max-w-100`}>
                      {message}
                    </GlassCard>
                  </div>
                ) : (
                  <div className={`flex flex-row w-full pl-10 pt-10`} key={index}>
                    <GlassCard className={`text-white w-full max-w-100`}>
                      <Markdown>
                        {message}
                      </Markdown>
                    </GlassCard>
                  </div>
                )
              })}
            </div>
            <div className={`sticky bottom-0 flex flex-col justify-between py-5 px-5 bg-[#110e18] rounded-xl`}>
              <div className={`flex-1 border border-white/10 rounded-xl`}>
                <textarea
                  className={
                    `w-full outline-0 text-white p-3 resize-none`
                  }
                  placeholder="Message Deepseek"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                />
              </div>
              <div className={`flex-1 flex flex-row-reverse pt-3`}>
                <IconButton 
                  className={
                    `h-12 w-12 cursor-pointer flex bg-[#7360ca] transition-all rounded-full items-center
                     justify-center duration-150 hover:bg-[#7350ca]`
                  }
                  onClick={() => {
                    handleAskingAI(userInput);
                    setMessages([...messages, userInput]);
                    setUserInput("");
                  }}
                >
                  <ArrowUpRight className={`h-5 w-5`} color="white"/>
                </IconButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;