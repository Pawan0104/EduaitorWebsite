export const DEFAULT_RATES = {
  monthlyRatePerDay: 1,
  yearlyRatePerDay: 0.75,
};

// Kept for reference: the pricing shown on the website must come from the
// admin (Settings rates + Plans CMS), so this hardcoded override is disabled.
// Flip `active` back to true only if a manual pre-launch campaign is needed.
export const PRE_LAUNCH = {
  active: false,
  ratePerDay: 0.5, // monthly billing, per student per day
  yearlyRatePerDay: 0.4, // annual billing, per student per day
  label: "PRE-LAUNCH OFFER",
};

export function applyPreLaunch(rates) {
  if (!PRE_LAUNCH.active) return { ...rates, preLaunch: false };
  return {
    monthlyRatePerDay: PRE_LAUNCH.ratePerDay,
    yearlyRatePerDay:
      PRE_LAUNCH.yearlyRatePerDay ?? PRE_LAUNCH.ratePerDay,
    preLaunch: true,
  };
}

export function ratesFromSettings(settings) {
  const general = settings?.general || {};
  const monthly = Number(general.monthlyRatePerDay);
  const yearly = Number(general.yearlyRatePerDay);
  return {
    monthlyRatePerDay:
      Number.isFinite(monthly) && monthly >= 0
        ? monthly
        : DEFAULT_RATES.monthlyRatePerDay,
    yearlyRatePerDay:
      Number.isFinite(yearly) && yearly >= 0
        ? yearly
        : DEFAULT_RATES.yearlyRatePerDay,
  };
}

export function formatRate(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-IN", {
    minimumFractionDigits: n % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  });
}

export function savingsPercent(monthlyRate, yearlyRate) {
  if (!(monthlyRate > 0) || yearlyRate >= monthlyRate) return 0;
  return Math.round((1 - yearlyRate / monthlyRate) * 100);
}
