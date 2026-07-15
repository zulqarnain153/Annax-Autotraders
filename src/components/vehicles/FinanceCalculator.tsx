"use client";

import { useMemo, useState } from "react";
import { Calculator } from "lucide-react";
import { business } from "@/lib/business";
import { formatPrice } from "@/lib/utils";

export function FinanceCalculator({ initialPrice = 20000 }: { initialPrice?: number }) {
  const [price] = useState(initialPrice);
  const [deposit, setDeposit] = useState(Math.round(initialPrice * 0.1));
  const [term, setTerm] = useState(48);
  const [apr, setApr] = useState<number>(business.finance.apr);

  const monthly = useMemo(() => {
    const principal = Math.max(price - deposit, 0);
    const monthlyRate = apr / 100 / 12;
    if (monthlyRate === 0) return principal / term;
    return (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -term));
  }, [price, deposit, term, apr]);

  const totalPayable = monthly * term + deposit;

  return (
    <div className="rounded-2xl border border-white/10 bg-navy-900 p-6">
      <div className="flex items-center gap-3">
        <Calculator className="h-5 w-5 text-ignition-400" />
        <h3 className="font-display text-lg font-bold uppercase text-white">
          Finance Calculator
        </h3>
      </div>

      <div className="mt-6 space-y-5">
        <div>
          <div className="mb-2 flex justify-between font-body text-sm text-steel-300">
            <span>Vehicle Price</span>
            <span className="font-semibold text-white">{formatPrice(price)}</span>
          </div>
        </div>
        <div>
          <div className="mb-2 flex justify-between font-body text-sm text-steel-300">
            <span>Deposit</span>
            <span className="font-semibold text-white">{formatPrice(deposit)}</span>
          </div>
          <input
            type="range"
            min={0}
            max={Math.round(price * 0.6)}
            step={250}
            value={deposit}
            onChange={(e) => setDeposit(Number(e.target.value))}
            className="w-full accent-ignition"
          />
        </div>
        <div>
          <div className="mb-2 flex justify-between font-body text-sm text-steel-300">
            <span>Term</span>
            <span className="font-semibold text-white">{term} months</span>
          </div>
          <input
            type="range"
            min={business.finance.minTermMonths}
            max={business.finance.maxTermMonths}
            step={6}
            value={term}
            onChange={(e) => setTerm(Number(e.target.value))}
            className="w-full accent-ignition"
          />
        </div>
        <div>
          <div className="mb-2 flex justify-between font-body text-sm text-steel-300">
            <span>Representative APR</span>
            <span className="font-semibold text-white">{apr.toFixed(1)}%</span>
          </div>
          <input
            type="range"
            min={5.9}
            max={15.9}
            step={0.1}
            value={apr}
            onChange={(e) => setApr(Number(e.target.value))}
            className="w-full accent-ignition"
          />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-ignition-gradient p-4 text-center">
          <p className="font-body text-[10px] uppercase tracking-wider text-white/80">
            Monthly Payment
          </p>
          <p className="mt-1 font-display text-2xl font-bold text-white">
            {formatPrice(Math.round(monthly))}
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
          <p className="font-body text-[10px] uppercase tracking-wider text-steel-400">
            Total Payable
          </p>
          <p className="mt-1 font-display text-2xl font-bold text-white">
            {formatPrice(Math.round(totalPayable))}
          </p>
        </div>
      </div>
      <p className="mt-4 font-body text-xs text-steel-500">{business.finance.disclaimer}</p>
    </div>
  );
}
