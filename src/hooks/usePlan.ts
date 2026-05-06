import { useState, useEffect } from 'react';

export type PlanType = "free" | "pro" | "firm";

export function usePlan() {
  // This will later be connected to Firebase user profile
  const [plan, setPlan] = useState<PlanType>("free");
  const [usedToday, setUsedToday] = useState(0);

  const limits = {
    free: 15,
    pro: 150,
    firm: 500
  };

  return {
    plan,
    isPro: plan === "pro" || plan === "firm",
    isFree: plan === "free",
    usedToday,
    limit: limits[plan],
    remaining: Math.max(0, limits[plan] - usedToday),
    setUsedToday
  };
}
