"use strict";
import { apiKey } from "./constants";

export async function searchSymbol(keyword) {
  // const apiKey = "OUHQGMU8N0KTHTEB";
  const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${encodeURIComponent(
    keyword
  )}&apikey=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

    const data = response.json();
    console.log(data);
    return data.bestMatches;
  } catch (error) {
    console.error("fout bij API-request:", error);
    return [];
  }
}
