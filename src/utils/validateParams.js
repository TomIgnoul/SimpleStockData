export const validIntervals = ["1min", "5min", "15min", "30min", "60min"];
export function validateParams(ticker, itnerval) {
  if (!/^[A-Z0-9]+$/.test(ticker)) {
    throw new Error(`ongeldige ticker: ${ticker}`);
  }
  if (!validIntervals.includes(interval)) {
    throw new Error(
      `Ongeldige interval: ${itnerval}. Kies uit ${validIntervals.join(", ")}`
    );
  }
}
