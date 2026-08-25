export const DEFAULT_RATES = {
  monthlyRatePerDay: 1,
  yearlyRatePerDay: 0.75,
};

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
