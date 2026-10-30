# IRAA store guide

## Update products and prices

1. Open products.json in the repository.
2. Edit a product's name, price, caption, and description. Prices are Egyptian pounds as whole numbers, without commas.
3. Edit sizes and colors as needed. Colors can be CSS names or hex values such as #541426.
4. To remove a product, remove its full object. To add one, copy an object and give it a unique id.
5. Save the file. GitHub Pages will publish the change.

Use daily, occasion, or sets for category. The count beside “الكل” updates from the catalog.

## Add product photos

Send IRAA's photos in this chat when ready. For the live repository, add clear portrait images to images/ using short filenames such as safa-front.jpg, then set that product's image value in products.json to images/safa-front.jpg. One main photo per product is supported now; we can add alternate views later.

## Cart, orders, and payments

- Every shopper has a separate cart saved in their own browser.
- Demo checkout saves an order draft only on the shopper's device. IRAA cannot view or receive it.
- Newsletter signup is also local to that browser and is not delivered to IRAA.
- The site does not process payments, reserve shared inventory, calculate delivery fees, or send order notifications.

Before taking real orders, connect checkout to an IRAA-owned WhatsApp Business number or a store backend. We also need confirmed prices, available stock/sizes, delivery areas and fees, exchange policy, and a customer-service contact. Once those are provided, checkout can be configured to send the order details to you. The demo currently does not confirm a purchase.

## Sample content

All six current products, prices, colors, descriptions, and availability are placeholders. Replace them with IRAA's confirmed catalog before accepting orders. Current Unsplash product images are visual placeholders and should be replaced with IRAA's own product photos.
