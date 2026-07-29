import {
  contrastPairs,
  performanceBudgets,
  requiredCspDirectives,
  requiredPageHeaders,
  routeContracts,
  secretPatterns,
  siteOrigin,
} from "../release-contract.mjs";

export {
  contrastPairs,
  performanceBudgets,
  requiredCspDirectives,
  requiredPageHeaders,
  routeContracts,
  secretPatterns,
  siteOrigin,
};

export const baseUrl = process.env.SITE_BASE_URL ?? "http://127.0.0.1:3000";
export const reportPath = process.env.SITE_RELEASE_REPORT;
export const failures = [];
const cache = new Map();

export const fail = (message) => failures.push(message);

export async function request(path, options = {}) {
  const url = new URL(path, baseUrl).toString();
  const key = `${options.method ?? "GET"}:${url}`;
  if (!options.body && cache.has(key)) return cache.get(key);
  const response = await fetch(url, { redirect: "manual", ...options });
  const body = Buffer.from(await response.arrayBuffer());
  const result = { response, body, url };
  if (!options.body) cache.set(key, result);
  return result;
}

export function attribute(tag, name) {
  const doubleQuoted = tag.match(new RegExp(`${name}="([^"]*)"`, "i"));
  if (doubleQuoted) return doubleQuoted[1];
  const singleQuoted = tag.match(new RegExp(`${name}='([^']*)'`, "i"));
  return singleQuoted?.[1];
}

export function normalizeUrl(value) {
  const url = new URL(value, siteOrigin);
  return url.pathname === "/"
    ? url.origin
    : `${url.origin}${url.pathname.replace(/\/$/, "")}`;
}

export function contrastRatio(foreground, background) {
  const luminance = (hex) => {
    const channels = hex
      .slice(1)
      .match(/.{2}/g)
      .map((value) => Number.parseInt(value, 16) / 255)
      .map((value) =>
        value <= 0.04045
          ? value / 12.92
          : ((value + 0.055) / 1.055) ** 2.4,
      );
    return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
  };
  const first = luminance(foreground);
  const second = luminance(background);
  return (Math.max(first, second) + 0.05) / (Math.min(first, second) + 0.05);
}
