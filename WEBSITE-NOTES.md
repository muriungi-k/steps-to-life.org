# Running the website

Open this folder with VS Code Live Server, or run:

```sh
python3 -m http.server 5500
```

Visit `http://localhost:5500`. A web server is needed for the LandMarks search to read the current newsletter.

# Completed local features

- Responsive page navigation, page search, and shared footers.
- All four supplied book covers and six supplied Bible category photographs.
- Product search and combined category filtering, quantities, persistent cart, and order inquiries.
- Bible category previews and a featured carousel that advances every two seconds and pauses during interaction.
- Featured YouTube embed with a direct YouTube link.
- Combined LandMarks author/article search with links to matching newsletter passages.
- Contact, prayer, subscription, donation, and order email drafts. Visitors review and send these in their email app.

# Connections and content still required

The site is static. It does not process payments or submit messages automatically.

To enable live services, supply:

- Shop and donation payment provider details and a backend that verifies payments and creates orders.
- Contact and prayer form delivery service, plus a newsletter subscription provider.
- Official Facebook, Instagram, X, and Telegram profile URLs.
- Magazine PDFs and podcast/audio recordings.
- Confirmation of catalog prices, available editions, shipping charges, and stock.

Until those are supplied, the site offers clearly labeled email inquiries and availability messages. It does not claim an order or payment succeeded. No messages or payments were sent during testing.

# Checks

```sh
npm install
npm test
python3 tests/check-links.py
```

Interaction tests run in a DOM environment. The final Chrome audit also checked all 13 pages at 1440px and 390px widths for local broken images, JavaScript errors, and horizontal overflow. Real Chrome interaction checks passed for mobile navigation, product search, cart persistence and quantities, LandMarks search and result navigation, Bible study dialogs, and all six category images. External resources, including Google Fonts and the YouTube player, were excluded from the automated browser audit.

# Browser hardening and cookies

See [SECURITY.md](SECURITY.md) for the applied protections and the deployment requirements. Cookie preferences are available on every page. YouTube loads only after external-media consent. Automatic form submissions and live payments remain unconfigured.

Chrome checks verified inline-script blocking, cart data tampering protection, consent persistence and revocation, and no YouTube requests before consent. HTTPS-only cookie attributes and production response headers must also be checked on the deployed HTTPS host.
