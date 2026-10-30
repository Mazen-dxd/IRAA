# IRAA — Arabic fashion storefront

An Arabic-first, right-to-left storefront for IRAA's first collection of abayas. The site is hosted free on GitHub Pages.

## Storefront

- Collection filters, search, and price sorting
- Product details and size selection
- Favorites and a cart saved in each shopper's browser
- Checkout prepared for a WhatsApp order handoff
- Responsive mobile navigation and cart drawer

## Manage the catalog

Products, prices in EGP, sizes, colors, descriptions, and image paths are in [products.json](https://github.com/Mazen-dxd/IRAA/blob/main/products.json). Add IRAA photos in images/ and reference them in the catalog. See [STORE-SETUP.md](https://github.com/Mazen-dxd/IRAA/blob/main/STORE-SETUP.md) for the guide.

## Order status

IRAA's WhatsApp Business checkout is configured in [store-config.json](https://github.com/Mazen-dxd/IRAA/blob/main/store-config.json). The customer's browser opens a prefilled WhatsApp message; the customer must send it, then IRAA confirms availability and delivery manually. This static site does not process payments or sync inventory. Current product content and prices are placeholders. Email signup remains disabled until a mailing-list service is connected.

## GitHub Pages

- Live: https://mazen-dxd.github.io/IRAA/
- Repository: https://github.com/Mazen-dxd/IRAA

This is a free project path under the existing GitHub account. The shorter iraa.github.io address belongs to a different account.
