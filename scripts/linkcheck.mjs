// Crawls the live site and checks every link and asset it references.
// Exit 0: all fine. Exit 1: broken links. Exit 2: the site itself does not answer.
const base = new URL(process.env.SITE_URL || "https://miri39.github.io/birt/");
const MAX = 150;
const skip = /^(mailto:|tel:|javascript:|data:|#)/i;

async function get(url) {
  try {
    return await fetch(url, { redirect: "follow", signal: AbortSignal.timeout(15000), headers: { "User-Agent": "birt-linkcheck" } });
  } catch (e) {
    return { status: 0, error: e.cause?.code || e.message };
  }
}

const start = await get(base.href);
if (start.status !== 200) {
  console.log(`site not reachable: ${base.href} -> ${start.status || start.error}`);
  process.exit(2);
}

const queue = [{ url: base.href, from: "(start)" }];
const seen = new Set();
const broken = [];
while (queue.length && seen.size < MAX) {
  const { url, from } = queue.shift();
  if (seen.has(url)) continue;
  seen.add(url);
  const internal = new URL(url).origin === base.origin;
  let r = await get(url);
  // Other sites that block bots or rate-limit are not dead links.
  if (!internal && [403, 405, 429, 999].includes(r.status)) r = { status: 200 };
  const bad = internal ? !(r.status >= 200 && r.status < 400) : [0, 404, 410].includes(r.status);
  if (bad) { broken.push(`${r.status || r.error}  ${url}  (linked from ${from})`); continue; }
  if (internal && (r.headers?.get("content-type") || "").includes("text/html")) {
    const html = await r.text();
    for (const m of html.matchAll(/(?:href|src)=["']([^"']+)["']/gi)) {
      if (skip.test(m[1])) continue;
      let u;
      try { u = new URL(m[1], url); } catch { continue; }
      u.hash = "";
      if (u.protocol.startsWith("http")) queue.push({ url: u.href, from: url });
    }
  }
}
if (broken.length) {
  console.log(`${broken.length} broken link(s) out of ${seen.size} checked:`);
  for (const b of broken) console.log(b);
  process.exit(1);
}
console.log(`ok: ${seen.size} urls checked`);
