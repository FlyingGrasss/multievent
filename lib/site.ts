const configuredUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.multievent.org").replace(/\/$/, "");

export const siteUrl = configuredUrl === "https://multievent.org" ? "https://www.multievent.org" : configuredUrl;
