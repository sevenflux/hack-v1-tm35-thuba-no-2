"use client";

import { 
  PiggyBank,
  HandCoins,
  TrendingUp
} from "lucide-react";
import { useState } from "react";

import GlassCard from "@/components/GlassCard";
import Layout from "@/components/Layout";
import { cn } from "@/lib/utils";
import "../globals.css";

function Dashboard() {
  const [supplyingValue, setSupplyingValue] = useState<string>("");
  const [borrowingValue, setBorrowingValue] = useState<string>("");
  const [apyValue,             setAPYValue] = useState<string>("");

  const glassGardItems = [
    { color: "#9b87f5", title: "Supply", icon: PiggyBank, value: supplyingValue },
    { color: "#81c8be", title: "Borrow", icon: HandCoins, value: borrowingValue },
    { color: "#ef9f76", title: "APY", icon: TrendingUp, value: apyValue }
  ];

  // I find a safe way to dynamically generate the template string in tailwindCSS
  // property: using safelist prop in tailwind.config.js

  return (
    <Layout className="overflow-x-hidden">
      <div className={`flex flex-row mt-10`}>
        <div className={cn(
          "data-dashboard", // user-defined className
          "flex-1 flex flex-col px-10"
        )}>
          <div className={`flex-1 flex flex-row justify-between`}>
            {glassGardItems.map((item) => (
              <GlassCard 
                className={cn("text-center w-40", "hover:shadow-[" + item.color + "]")} 
                hoverEffect={true}
                key={item.title}
              >
                <item.icon className={"h-12 w-12 mx-auto mb-2"} color={item.color} />
                <h3 className={`text-[#99a1af] font-semibold text-xl`}>{item.title}</h3>
                <div className={
                  `text-wrap w-full pt-5 text-white text-md flex items-center justify-center 
                   force-break`
                }>
                  {item.value}
                </div>
              </GlassCard>
            ))}
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