# IRAA — Arabic fashion storefront

An Arabic-first, right-to-left storefront for IRAA's first collection of abayas. Built as a static site and hosted for free with GitHub Pages.

## Run locally

Open index.html in a browser, or serve this folder with any static file server. Product photos currently use Unsplash placeholders and Arabic fonts load from Google Fonts.

## Storefront interactions

- Collection filters, search, and price sorting
- Product details and size selection
- Favorites, cart quantities, and a persistent cart in each shopper's browser
- Checkout form with validation and a locally saved demo order
- Newsletter form with a locally saved demo signup
- Responsive mobile navigation and cart drawer

## Product and photo management

The catalog lives in products.json. Edit product names, EGP prices, labels, descriptions, color swatches, sizes, and image paths there. Add IRAA product photos to images/ and set each product's image path to the matching file. Keep each product id unique.

See STORE-SETUP.md for the editing guide.

## Orders and payments

The demo checkout only saves an order draft on the shopper's own device. It does not send orders to IRAA, reserve shared stock, calculate delivery, or process payment. Do not take live orders through this demo until an order handoff or backend and the business details are configured.

## GitHub Pages

- Live storefront: https://mazen-dxd.github.io/IRAA/
- Public code repository: https://github.com/Mazen-dxd/IRAA

This is a free GitHub Pages project address under the existing account. The shorter address iraa.github.io is owned by a different GitHub account.
