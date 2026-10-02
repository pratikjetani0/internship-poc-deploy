let usdToInrRate = 95;

export async function getInrRate(): Promise<number> {
  try {
    const response = await fetch("https://open.er-api.com/v6/latest/USD");

    const data = await response.json();

    usdToInrRate = data.rates.INR;

    return usdToInrRate;
  } catch (error) {
    console.error("Currency API failed:", error);
    return usdToInrRate;
  }
}

export function convertUsdToInr(price: number): number {
  return Math.round(price * usdToInrRate);
}
