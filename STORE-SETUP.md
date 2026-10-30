# IRAA store guide

## Edit product details and prices

1. Open [products.json](https://github.com/Mazen-dxd/IRAA/blob/main/products.json).
2. On GitHub, select the pencil icon, edit a product's name, price, caption, description, sizes, or colors, then commit the change to the main branch.
3. Prices are EGP numbers without commas (for example, 1850). The store recalculates the cart from the current catalog price.
4. To add a product, copy one object and give it a unique id. Keep category set to daily, occasion, or sets so the collection filters work.
5. Replace every sample product, price, and availability before selling.

## Add IRAA product photos

Send the photos in this chat when they are ready. Add each chosen image to the repository's images/ folder using a short filename such as safa-front.jpg, then set its product's image value in products.json to images/safa-front.jpg. Use clear portrait photos with the garment visible. The current Unsplash images are placeholders.

## Set up WhatsApp orders

Open [store-config.json](https://github.com/Mazen-dxd/IRAA/blob/main/store-config.json) and replace the blank whatsappNumber value with IRAA's WhatsApp Business number in international format, digits only (country code plus number; omit +, spaces, and a local leading 0). The number is public because it is used by the customer's browser to open a WhatsApp chat. Do not put passwords or API keys in this file.

With the number set, checkout opens a prefilled WhatsApp message containing the customer's name, delivery address, cart items, quantities, product subtotal, and notes. The customer must press Send in WhatsApp. IRAA should confirm availability, delivery fee, payment method, and the final amount in the chat before accepting the order. With the number blank, checkout fields stay disabled and no delivery details are collected.

## Manage incoming orders

Orders arrive in the IRAA WhatsApp Business inbox as customer messages. Confirm each order in chat, then use WhatsApp Business labels (for example: New, Confirmed, Preparing, Dispatched, Complete) to track its progress. This setup does not automatically reserve or decrement stock, calculate delivery, collect payment, or provide an order dashboard. Maintain stock and order status manually until a commerce backend is connected.

## Newsletter

Email signup is disabled until IRAA connects a mailing-list service. The old demo signup did not send addresses to IRAA.

## Current placeholders

All six catalog products, their prices, descriptions, sizes, colors, and availability are examples. Replace them with IRAA's confirmed information. The cart is local to each shopper's browser; the message becomes an order only after the customer sends it and IRAA confirms it.
