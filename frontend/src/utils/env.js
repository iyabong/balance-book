// src/utils/env.js
export const getNodeEnv = () => process.env.NODE_ENV;
export const getVercelEnv = () => process.env.VERCEL_ENV;

export function setFavicon() {
  const link = document.querySelector("link[rel~='icon']") || document.createElement("link");
  link.rel = "icon";
  link.href = getNodeEnv() === "production" && getVercelEnv() === 'production' ? "/favicon_wallet.ico" : "/favicon_wallet_dev.ico";
  document.head.appendChild(link);
}