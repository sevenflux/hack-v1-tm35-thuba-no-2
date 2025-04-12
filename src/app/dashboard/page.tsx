"use client";

import { 
  PiggyBank,
  HandCoins,
  TrendingUp
} from "lucide-react";
import { useState } from "react";
import Markdown from "react-markdown"

import GlassCard from "@/components/GlassCard";
import Layout from "@/components/Layout";
import { cn } from "@/lib/utils";
import "../globals.css";

import { TEST_ANSWER_1 } from "@/assets/testContent";

function Dashboard() {
  const [supplyingValue, setSupplyingValue] = useState<string>("2.2B");
  const [borrowingValue, setBorrowingValue] = useState<string>("2.2B");
  const [apyValue,             setAPYValue] = useState<string>("5.75");
  const [aiSuggestion,     setAISuggestion] = useState<string>(TEST_ANSWER_1)

  const glassGardItems = [
    { color: "#9b87f5", title: "Supply", icon: PiggyBank, value: supplyingValue, unit: "USDT" },
    { color: "#81c8be", title: "Borrow", icon: HandCoins, value: borrowingValue, unit: "USDT" },
    { color: "#ef9f76", title: "APY", icon: TrendingUp, value: apyValue, unit: "%" }
  ];

  // I find a safe way to dynamically generate the template string in tailwindCSS
  // property: using safelist prop in tailwind.config.js

  return (
    <Layout className="overflow-x-hidden">
      <div className={`flex flex-row mt-10`}>
        <div className={cn(
          "data-dashboard", // user-defined className
          "flex-1 flex flex-col px-10 h-250"
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
          "flex-1"
        )}></div>
      </div>
    </Layout>
  );
}

export default Dashboard;