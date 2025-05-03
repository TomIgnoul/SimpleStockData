export const validIntervals = ["1m", "5m", "15m", "30m", "60m"];
export function validateParams(ticker, interval) {
  if (!/^[A-Z0-9]+$/.test(ticker)) {
    throw new Error(`ongeldige ticker: ${ticker}`);
  }
  if (!validIntervals.includes(interval)) {
    throw new Error(
      `Ongeldige interval: ${interval}. Kies uit ${validIntervals.join(", ")}`
    );
  }
}
