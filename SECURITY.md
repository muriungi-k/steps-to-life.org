# Security and privacy

This is a static website without an authentication system, database, payment processor, or server-side form handler. These changes reduce browser-side risks; they do not guarantee immunity to attacks or protect a compromised hosting account.

## Implemented

- Content Security Policy in every HTML page: only same-origin scripts, no inline script handlers or eval, no plugins, no base URL changes, no browser form submissions, and only the specific YouTube embedding origin for frames. Google Fonts is allowed for styles and fonts. Inline styles remain allowed because existing page styles and the carousel use them; inline scripts remain blocked.
- Safe DOM rendering for shop products; untrusted strings are inserted as text rather than HTML.
- Cart entries are restricted to known catalog products. Titles, images, and prices come from the catalog; only a bounded quantity is accepted from storage. Unknown items, oversized storage data, malformed JSON, and nonfinite quantities are handled safely.
- External new-tab links use `noopener noreferrer`.
- Input lengths and email draft lengths are bounded. Message content and customer details are not saved to local storage.
- Consent gates YouTube embeds. The preference cookie stores only `v1-essential` or `v1-media`, expires after 180 days, and uses `SameSite=Lax` and `Path=/`. On HTTPS it uses `Secure` and a `__Host-` name. This nonsecret cookie must be readable by the preference script; it is not an authentication cookie.
- Cookie settings are available in every footer. Revoking external-media permission unloads the embedded player. It cannot delete cookies or data already held by YouTube on YouTube's domain.
- No analytics or advertising scripts are installed. Cart browser storage supports the shopping function. Google Fonts remains an external font request; it is not controlled by the YouTube consent setting.

## Hosting configuration required

`_headers` supplies production response headers for static hosts that support this file (such as Netlify or Cloudflare Pages). `.htaccess` supplies an Apache alternative, disables directory listing, and denies access to hidden files, configuration, tests, and development metadata. Confirm the host supports these files; merely uploading a file does not make unsupported directives active.

Production headers include CSP with `frame-ancestors 'none'`, `X-Frame-Options: DENY`, `nosniff`, a restrictive permissions policy, a referrer policy, and HTTPS transport security. The HTML meta policy cannot enforce clickjacking protection or transport security; response headers are necessary.

For another host, translate these settings into its configuration. Enable HTTPS and HTTP-to-HTTPS redirects at the host. The provided HSTS setting does not include subdomains or request preload registration. Development Live Server may have its injected inline reload script blocked by CSP; manual refresh still works.

Publish only the public website: HTML, CSS, JavaScript, images, and downloadable resources. Keep credentials, database exports, environment files, repository metadata, test files, and configuration outside the publicly served directory. Restrict hosting and repository access, require MFA for administrators, protect the primary branch, review changes, limit deploy permissions, maintain backups, and keep hosting software updated. Account and insider controls must be applied in your hosting and repository providers.

## Before adding a backend

Never trust browser totals, cookie values, or local-storage contents as authorization or payment confirmation. A server must independently validate products, prices, stock, and shipping, verify payment-provider signatures, enforce authorization, rate-limit requests, protect sessions and state-changing endpoints, and avoid exposing secrets. Any future authentication cookie should be set by the server with `HttpOnly`, `Secure`, and appropriate `SameSite` settings.

Payments, automatic form delivery, official social profile links, magazine PDFs, and podcast audio remain external connections/content to be supplied. Email inquiries are not completed transactions.

## References

- [OWASP DOM-based XSS prevention](https://cheatsheetseries.owasp.org/cheatsheets/DOM_based_XSS_Prevention_Cheat_Sheet.html)
- [OWASP HTML5 storage security](https://cheatsheetseries.owasp.org/cheatsheets/HTML5_Security_Cheat_Sheet.html)
- [MDN CSP frame restrictions](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/frame-src)
