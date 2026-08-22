declare global {
  interface Window {
    Cashfree?: (options: { mode: "sandbox" | "production" }) => {
      checkout: (options: {
        paymentSessionId: string;
        redirectTarget?: "_self" | "_blank" | "_top" | "popup";
      }) => Promise<any>;
    };
  }
}

let cashfreeLoadPromise: Promise<any> | null = null;

/**
 * Dynamically loads the Cashfree Payments Web SDK v3 script.
 */
export const loadCashfreeSdk = (): Promise<any> => {
  if (window.Cashfree) {
    return Promise.resolve(window.Cashfree);
  }

  if (cashfreeLoadPromise) {
    return cashfreeLoadPromise;
  }

  cashfreeLoadPromise = new Promise((resolve, reject) => {
    const existingScript = document.getElementById("cashfree-js-sdk");
    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(window.Cashfree));
      existingScript.addEventListener("error", (err) => reject(err));
      return;
    }

    const script = document.createElement("script");
    script.id = "cashfree-js-sdk";
    script.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
    script.async = true;

    script.onload = () => {
      if (window.Cashfree) {
        resolve(window.Cashfree);
      } else {
        reject(new Error("Cashfree SDK failed to initialize"));
      }
    };

    script.onerror = () => {
      cashfreeLoadPromise = null;
      reject(new Error("Failed to load Cashfree Payment SDK script"));
    };

    document.head.appendChild(script);
  });

  return cashfreeLoadPromise;
};

/**
 * Initializes Cashfree PG instance with environment mode.
 */
export const getCashfreeInstance = async (mode: "sandbox" | "production" = "sandbox") => {
  const CashfreeFactory = await loadCashfreeSdk();
  if (!CashfreeFactory) {
    throw new Error("Cashfree SDK is not available.");
  }
  return CashfreeFactory({ mode });
};
