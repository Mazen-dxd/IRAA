const menuButton = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector(".mobile-nav");
const cartToggle = document.querySelector("#cart-toggle");
const cartDialog = document.querySelector("#cart-dialog");
const productGrid = document.querySelector("#product-grid");
const shop = document.querySelector("#shop");
const cartItems = document.querySelector("#cart-items");
const cartEmpty = document.querySelector("#cart-empty");
const checkoutForm = document.querySelector("#checkout-form");
const cartCount = document.querySelector("#cart-count");
const money = new Intl.NumberFormat("ar-EG", { maximumFractionDigits: 0 });
const CART_KEY = "iraa-cart-v1";

let catalog = [];
let whatsappNumber = "";
let cart = loadCart();

function loadCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    return Array.isArray(saved) ? saved.filter(item => item && typeof item.productId === "string" && typeof item.variantKey === "string" && Number.isInteger(item.quantity) && item.quantity > 0) : [];
  } catch {
    return [];
  }
}

function saveCart() {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch {
    setShopStatus("تعذر حفظ الحقيبة على هذا الجهاز. يمكنكِ إكمال الطلب الآن عبر واتساب.");
  }
}

function setShopStatus(message) {
  const status = document.querySelector("#shop-status");
  if (status) status.textContent = message;
}

function revealWhatsAppLinks(number) {
  if (!/^\d{8,15}$/.test(number)) return;
  whatsappNumber = number;
  const message = encodeURIComponent("مرحباً IRAA، أود معرفة موعد إطلاق المجموعة الأولى.");
  const href = `https://wa.me/${number}?text=${message}`;
  for (const id of ["whatsapp-link", "header-contact", "footer-contact"]) {
    const link = document.getElementById(id);
    if (!link) continue;
    link.href = href;
    if (id === "whatsapp-link") link.hidden = false;
  }
  const note = document.querySelector("#contact-note");
  if (note) note.textContent = "اسألينا عن موعد إطلاق المجموعة الأولى عبر واتساب.";
}

function unique(values) {
  return [...new Set(values.filter(value => typeof value === "string" && value.trim()))];
}

function safeImagePath(path) {
  return typeof path === "string" && /^images\/[\w./-]+\.(?:jpe?g|png|webp)$/i.test(path) && !path.includes("..") ? path : "";
}

function variantKey(variant) {
  return [variant.size || "", variant.color || "", variant.labelAr || ""].join("|");
}

function validProduct(product) {
  if (!product || typeof product.id !== "string" || !product.id.trim() || typeof product.nameAr !== "string" || !product.nameAr.trim() || !Number.isFinite(product.priceEGP) || product.priceEGP <= 0 || !safeImagePath(product.image) || !Array.isArray(product.variants) || product.variants.length === 0) return false;
  const optionsValid = product.variants.every(variant => variant && Number.isInteger(variant.stock) && variant.stock >= 0 && [variant.size, variant.color, variant.labelAr].some(value => typeof value === "string" && value.trim()));
  return optionsValid && new Set(product.variants.map(variantKey)).size === product.variants.length;
}

function formatPrice(amount) {
  return `${money.format(amount)} ج.م`;
}

function createOption(label, values, placeholder) {
  if (!values.length) return null;
  const wrapper = document.createElement("label");
  wrapper.append(document.createTextNode(label));
  const select = document.createElement("select");
  select.setAttribute("aria-label", label);
  const prompt = document.createElement("option");
  prompt.value = "";
  prompt.textContent = placeholder;
  select.append(prompt);
  for (const value of values) {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    select.append(option);
  }
  if (values.length === 1) select.value = values[0];
  wrapper.append(select);
  return { wrapper, select };
}

function renderProduct(product) {
  const card = document.createElement("article");
  card.className = "product-card";
  const photo = document.createElement("div");
  photo.className = "product-photo";
  const image = document.createElement("img");
  image.src = product.image;
  image.alt = product.imageAltAr || product.nameAr;
  image.loading = "lazy";
  image.decoding = "async";
  photo.append(image);
  card.append(photo);

  const info = document.createElement("div");
  info.className = "product-info";
  const title = document.createElement("h3");
  title.className = "product-name";
  title.textContent = product.nameAr;
  info.append(title);
  if (product.descriptionAr) {
    const description = document.createElement("p");
    description.className = "product-description";
    description.textContent = product.descriptionAr;
    info.append(description);
  }
  const price = document.createElement("strong");
  price.className = "product-price";
  price.textContent = formatPrice(product.priceEGP);
  info.append(price);

  const sizes = unique(product.variants.map(variant => variant.size));
  const colors = unique(product.variants.map(variant => variant.color));
  const options = document.createElement("div");
  options.className = "product-options";
  const sizeInput = createOption("المقاس", sizes, "اختاري المقاس");
  const colorInput = createOption("اللون", colors, "اختاري اللون");
  const labels = unique(product.variants.map(variant => variant.labelAr));
  const labelInput = !sizes.length && !colors.length && labels.length > 1 ? createOption("الخيار", labels, "اختاري الخيار") : null;
  if (sizeInput) options.append(sizeInput.wrapper);
  if (colorInput) options.append(colorInput.wrapper);
  if (labelInput) options.append(labelInput.wrapper);
  if (options.childElementCount) info.append(options);

  const add = document.createElement("button");
  add.className = "add-to-cart";
  add.type = "button";
  add.textContent = "أضيفي إلى الحقيبة";
  const resolveSelection = () => {
    if (sizes.length && !sizeInput?.select.value) return null;
    if (colors.length && !colorInput?.select.value) return null;
    if (labelInput && !labelInput.select.value) return null;
    return product.variants.find(variant =>
      (!sizes.length || variant.size === sizeInput.select.value) &&
      (!colors.length || variant.color === colorInput.select.value) &&
      (!labelInput || variant.labelAr === labelInput.select.value)
    ) || null;
  };
  const refreshButton = () => {
    const selection = resolveSelection();
    const hasChoice = !sizes.length && !colors.length && !labelInput;
    const variant = selection || (hasChoice && product.variants.length === 1 ? product.variants[0] : null);
    const available = variant && Number.isInteger(variant.stock) && variant.stock > 0;
    add.disabled = !available;
    const selectionHint = sizes.length && colors.length ? "اختاري المقاس واللون" : sizes.length ? "اختاري المقاس" : colors.length ? "اختاري اللون" : "اختاري الخيار";
    add.textContent = available ? "أضيفي إلى الحقيبة" : variant ? "نفدت الكمية" : selectionHint;
    add.dataset.variantKey = variant ? variantKey(variant) : "";
  };
  for (const control of [sizeInput?.select, colorInput?.select, labelInput?.select].filter(Boolean)) control.addEventListener("change", refreshButton);
  add.addEventListener("click", () => addToCart(product, add.dataset.variantKey));
  info.append(add);
  card.append(info);
  refreshButton();
  return card;
}

function findVariant(product, key) {
  return product?.variants?.find(variant => variantKey(variant) === key);
}

function addToCart(product, key) {
  const variant = findVariant(product, key);
  if (!variant || !Number.isInteger(variant.stock) || variant.stock < 1) return;
  const existing = cart.find(item => item.productId === product.id && item.variantKey === key);
  if (existing) {
    if (existing.quantity >= variant.stock) {
      setShopStatus("وصلتِ إلى الكمية المتاحة من هذا الخيار.");
      return;
    }
    existing.quantity += 1;
  } else {
    cart.push({ productId: product.id, variantKey: key, quantity: 1 });
  }
  saveCart();
  renderCart();
  setShopStatus(`أُضيف ${product.nameAr} إلى حقيبتكِ.`);
  if (!cartDialog.open) cartDialog.showModal();
}

function cartProductRows() {
  return cart.map(item => {
    const product = catalog.find(candidate => candidate.id === item.productId);
    const variant = findVariant(product, item.variantKey);
    if (!product || !variant || !Number.isInteger(variant.stock) || variant.stock < 1) return null;
    item.quantity = Math.min(item.quantity, variant.stock);
    return { item, product, variant };
  }).filter(Boolean);
}

function renderCart() {
  if (!cartToggle || !cartDialog) return;
  const rows = cartProductRows();
  cart = rows.map(row => row.item);
  saveCart();
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartToggle.hidden = catalog.length === 0;
  cartCount.textContent = money.format(count);
  cartToggle.setAttribute("aria-label", `حقيبة التسوق، ${count} قطع`);
  cartItems.replaceChildren();
  cartEmpty.hidden = rows.length > 0;
  checkoutForm.hidden = rows.length === 0;
  let total = 0;
  for (const { item, product, variant } of rows) {
    total += product.priceEGP * item.quantity;
    const line = document.createElement("article");
    line.className = "cart-line";
    const image = document.createElement("img");
    image.src = product.image;
    image.alt = "";
    image.loading = "lazy";
    const details = document.createElement("div");
    const title = document.createElement("h3");
    title.textContent = product.nameAr;
    const options = document.createElement("p");
    options.textContent = [variant.size, variant.color, variant.labelAr].filter(Boolean).join(" · ") || "اختيار قياسي";
    const controls = document.createElement("div");
    controls.className = "quantity-control";
    controls.innerHTML = `<button type="button" data-action="decrease" aria-label="تقليل الكمية">−</button><output>${money.format(item.quantity)}</output><button type="button" data-action="increase" aria-label="زيادة الكمية">+</button>`;
    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "remove-line";
    remove.dataset.action = "remove";
    remove.textContent = "إزالة";
    controls.append(remove);
    details.append(title, options, controls);
    const price = document.createElement("strong");
    price.className = "cart-line-price";
    price.textContent = formatPrice(product.priceEGP * item.quantity);
    line.append(image, details, price);
    line.dataset.productId = item.productId;
    line.dataset.variantKey = item.variantKey;
    cartItems.append(line);
  }
  document.querySelector("#cart-total").textContent = formatPrice(total);
}

cartItems.addEventListener("click", event => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;
  const line = button.closest(".cart-line");
  const item = cart.find(row => row.productId === line.dataset.productId && row.variantKey === line.dataset.variantKey);
  if (!item) return;
  if (button.dataset.action === "remove") cart = cart.filter(row => row !== item);
  if (button.dataset.action === "decrease") item.quantity -= 1;
  if (button.dataset.action === "increase") {
    const variant = findVariant(catalog.find(product => product.id === item.productId), item.variantKey);
    if (variant && item.quantity < variant.stock) item.quantity += 1;
  }
  cart = cart.filter(row => row.quantity > 0);
  renderCart();
});

cartToggle.addEventListener("click", () => cartDialog.showModal());
document.querySelector("#cart-close").addEventListener("click", () => cartDialog.close());
cartDialog.addEventListener("close", () => cartToggle.focus());

checkoutForm.addEventListener("submit", event => {
  event.preventDefault();
  if (!whatsappNumber) {
    setShopStatus("لا يتوفر رقم واتساب حالياً. راسلينا من قسم التواصل.");
    return;
  }
  const data = new FormData(checkoutForm);
  const rows = cartProductRows();
  if (!rows.length) return;
  const lines = rows.map(({ item, product, variant }) => {
    const choices = [variant.size, variant.color, variant.labelAr].filter(Boolean).join(" / ");
    return `• ${product.nameAr}${choices ? ` (${choices})` : ""} × ${item.quantity} — ${formatPrice(product.priceEGP * item.quantity)}`;
  });
  const total = rows.reduce((sum, row) => sum + row.product.priceEGP * row.item.quantity, 0);
  const message = [
    "مرحباً IRAA، أود تأكيد توفر الطلب التالي:",
    ...lines,
    `الإجمالي المبدئي: ${formatPrice(total)}`,
    `الاسم: ${data.get("customerName")}`,
    `المنطقة / المدينة: ${data.get("area")}`,
    `العنوان: ${data.get("address")}`,
    "يرجى تأكيد التوفر ورسوم التوصيل. أعلم أن الطلب لا يُحجز قبل تأكيدكم."
  ].join("\n");
  window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  setShopStatus("فتحنا رسالة طلبكِ في واتساب. الحقيبة محفوظة حتى تأكيد الطلب.");
});

menuButton.addEventListener("click", () => {
  const open = mobileNav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "إغلاق القائمة" : "فتح القائمة");
});
document.querySelectorAll(".mobile-nav a").forEach(link => link.addEventListener("click", () => {
  mobileNav.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "فتح القائمة");
}));

async function initializeStore() {
  const [configResponse, productsResponse] = await Promise.all([
    fetch("./store-config.json?rev=4"),
    fetch("./products.json?rev=1")
  ]);
  if (configResponse.ok) {
    const config = await configResponse.json();
    revealWhatsAppLinks(String(config.whatsappNumber || "").replace(/\D/g, ""));
  }
  if (!productsResponse.ok) return;
  const products = await productsResponse.json();
  if (!Array.isArray(products)) return;
  catalog = products.filter(validProduct).filter(product => product.active !== false);
  if (!catalog.length) return;
  const seen = new Set();
  catalog = catalog.filter(product => !seen.has(product.id) && seen.add(product.id));
  productGrid.replaceChildren(...catalog.map(renderProduct));
  shop.hidden = false;
  renderCart();
}

renderCart();
initializeStore().catch(() => {
  // Keep the pre-launch page usable if catalog/config files are temporarily unavailable.
});
