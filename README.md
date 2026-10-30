# IRAA — Arabic fashion storefront

An Arabic-first, right-to-left storefront for IRAA's first collection of abayas. Built as a static site so it can be hosted for free with GitHub Pages.

## Run locally

Open index.html in a browser, or serve this folder with any static file server. Product photos load from Unsplash and Arabic fonts load from Google Fonts.

## Working storefront interactions

- Collection filters, search, and price sorting
- Product details and size selection
- Favorites, cart quantities, and persistent local cart
- Checkout form with validation and locally saved order draft
- Newsletter form with locally saved signup
- Responsive mobile navigation and cart drawer

## Product and photo management

The shop catalog lives in products.json. Edit its Arabic names, EGP prices, labels, descriptions, color swatches, sizes, and image paths to update the collection. Product photos can be added to an images/ folder and referenced by a relative path. Keep each product id unique.

See STORE-SETUP.md for the editing guide and order-management limitations.

## Orders and payments

The cart persists in each shopper's own browser. The checkout currently validates the address and saves an order draft on that same device; it does not send orders to IRAA, reserve stock across shoppers, or process payment. Before accepting real orders, connect the checkout to an order service or an IRAA-owned WhatsApp number, and set verified delivery, exchange, and contact details.

## GitHub Pages

The public user-site repository is https://github.com/Mazen-dxd/Mazen-dxd.github.io. Its free GitHub Pages address is https://mazen-dxd.github.io/. GitHub Pages is enabled and the storefront has been published there.

