# IRAA store guide

## Update the catalog and prices

1. Open products.json in the repository.
2. Edit a product's name, price, caption, and description. Prices are Egyptian pounds as whole numbers, without commas.
3. To change the available sizes, edit sizes. To change the color dots, edit colors using CSS color names or hex values such as #541426.
4. To remove a product, remove its full object from the list. To add one, copy an object and give it a new, unique id.
5. Save the file. GitHub Pages updates the site from the repository.

Keep category set to daily, occasion, or sets so the collection filters continue to work. The number beside “الكل” in the page is currently a visual label; it can be updated with the catalog.

## Replace product photos

For a product image, use a clear portrait photo with the garment filling the frame. Once IRAA's own photos are ready, place them in images/ using short names such as safa-front.jpg. Change that product's image value in products.json to images/safa-front.jpg. Use one image per product for now; more views can be added later.

## Understand the cart and orders

- Each shopper has a separate cart saved in that shopper's browser. The shopper can change quantities or remove items from the bag.
- Checkout currently stores the order draft in the shopper's browser. IRAA cannot see that record. Clearing browser data or using another device will not carry it over.
- Newsletter signups are also stored only in the browser and are not delivered to IRAA.
- The site does not process cards, charge customers, track shared inventory, calculate shipping, or send order notifications.

Before accepting real orders, connect a store backend or set up checkout to send the order to an IRAA-owned WhatsApp number. Add the business number, confirmed product inventory and prices, delivery coverage and fees, exchange policy, and customer-service contact. Payment on delivery can then be offered as a real option; currently it is only displayed as sample storefront copy.

## Current sample content

The six product names, descriptions, prices, colorways, and stock levels shown are demonstration content. Replace them with IRAA's confirmed catalog before taking orders. The current product images come from Unsplash as design placeholders and should be replaced with IRAA product photography.

