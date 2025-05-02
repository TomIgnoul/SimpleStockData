"use strict";

import { Chart } from "chart.js/auto";
import { renderChart } from "../utils/renderChart.js";
import { intradayData } from "../init/intradayData.js";
import { searchSymbol } from "../api/searchSymbolAPI.js";




const stringValues = ["1min", "5min", "15min", "30min", "60min"];
const slider = document.getElementById("slider");


const textBoxValue = document.getElementById("tickerTextBox");

const btnTextBox = document.getElementById("btntickerTextBox")

intradayData("AAPL", stringValues[slider.value]);
slider.addEventListener("input", () => {
  console.log(stringValues[slider.value]);
  intradayData(textBoxValue.value, stringValues[slider.value]);
});


btnTextBox.addEventListener("click", ()=>{
  console.log(textBoxValue.value)
  searchSymbol(textBoxValue.value).then((resultaten) => {
    console.log(resultaten);
  });
})
