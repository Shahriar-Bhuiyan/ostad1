// Product Data
const products = [
  {
    id: 1,
    name: "Laptop",
    description: "High performance laptop",
    price: 1200,
    image:
      "https://i5.walmartimages.com/seo/HP-15-6-Screen-FHD-Laptop-Computer-AMD-Ryzen-5-5500U-8GB-RAM-256GB-SSD-Spruce-Blue-Windows-11-Home-15-ef2729wm_8dee5689-db47-45ac-9a0d-5399c95a8ee0.ad15a381ad98aa369a68bfb1527d66a9.jpeg",
  },
  {
    id: 2,
    name: "Headphones",
    description: "Noise cancelling",
    price: 200,
    image:
      "https://techlandbd.com/cache/images/uploads/products/P1942508001/cover-1755776138_cache_optimize-70.webp",
  },
  {
    id: 3,
    name: "Smartphone",
    description: "Latest Android phone",
    price: 800,
    image:
      "https://mobilebuzzbd.com/wp-content/uploads/2023/07/iPhone-14-pro-Deep-Purple.jpg",
  },
  {
    id: 4,
    name: "Shoes",
    description: "Comfortable running shoes",
    price: 100,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7zo5bcdAiJDEGBbkvbEGsEgKfZIT_PWSYNQ&s",
  },
];

let cart = [];
let promoApplied = false;
let discountPercent = 0;


function displayProducts() {
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";
  products.forEach((p) => {
    productList.innerHTML += `
      <div class="bg-white p-4 rounded-lg shadow">
        <img src="${p.image}" alt="${p.name}" class="w-full h-40 object-contain rounded">
        <h3 class="text-lg font-bold mt-2">${p.name}</h3>
        <p class="text-gray-600">${p.description}</p>
        <p class="font-bold">$${p.price}</p>
        <button onclick="addToCart(${p.id})" class="bg-blue-600 text-white px-3 py-1 rounded mt-2">Add to Cart</button>
      </div>
    `;
  });
}


function addToCart(id) {
  const product = products.find((p) => p.id === id);
  const item = cart.find((c) => c.id === id);
  if (item) {
    item.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  updateCartUI();
}


function updateCartUI() {
  document.getElementById("cart-count").textContent = cart.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  const cartItems = document.getElementById("cart-items");
  cartItems.innerHTML = "";

  let total = 0;
  cart.forEach((item) => {
    total += item.price * item.quantity;
    cartItems.innerHTML += `
      <div class="flex justify-between items-center border-b pb-2">
        <div>
          <p class="font-bold">${item.name}</p>
          <p>$${item.price} x 
            <input type="number" value="${item.quantity}" min="1" class="w-12 border text-center" onchange="updateQuantity(${item.id}, this.value)">
          </p>
        </div>
        <button onclick="removeFromCart(${item.id})" class="text-red-500">✖</button>
      </div>
    `;
  });

  let discountedTotal = total;
  if (discountPercent > 0) {
    discountedTotal = total - total * discountPercent;
  }

  document.getElementById("cart-total").textContent =
    discountedTotal.toFixed(2);
}


function updateQuantity(id, qty) {
  qty = parseInt(qty);
  if (qty <= 0 || isNaN(qty)) {
    alert("Quantity must be at least 1");
    return;
  }
  const item = cart.find((c) => c.id === id);
  item.quantity = qty;
  updateCartUI();
}


function removeFromCart(id) {
  cart = cart.filter((c) => c.id !== id);
  updateCartUI();
}

document.getElementById("clear-cart").addEventListener("click", () => {
  cart = [];
  promoApplied = false;
  discountPercent = 0;
  document.getElementById("promo-message").textContent = "";
  updateCartUI();
});


document.getElementById("apply-promo").addEventListener("click", () => {
  const code = document.getElementById("promo-code").value.trim().toLowerCase();
  const promoMessage = document.getElementById("promo-message");

  if (promoApplied) {
    promoMessage.textContent = "Promo code already applied!";
    return;
  }

  if (code === "ostad10") {
    discountPercent = 0.1;
    promoApplied = true;
    promoMessage.textContent = "10% discount applied!";
    promoMessage.classList.remove("text-red-500");
    promoMessage.classList.add("text-green-500");
  } else if (code === "ostad50") {
    discountPercent = 0.5;
    promoApplied = true;
    promoMessage.textContent = "50% discount applied!";
    promoMessage.classList.remove("text-red-500");
    promoMessage.classList.add("text-green-500");
  } else {
    promoMessage.textContent = "Invalid Promo Code";
    promoMessage.classList.remove("text-green-500");
    promoMessage.classList.add("text-red-500");
    return;
  }

  updateCartUI();
});

// Cart Modal Controls
document.getElementById("cart-btn").addEventListener("click", () => {
  document.getElementById("cart-modal").classList.remove("hidden");
});
document.getElementById("close-cart").addEventListener("click", () => {
  document.getElementById("cart-modal").classList.add("hidden");
});

// Checkout
document.getElementById("checkout").addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Cart is empty!");
  } else {
    alert("Checkout Successful!");
    cart = [];
    promoApplied = false;
    discountPercent = 0;
    document.getElementById("promo-message").textContent = "";
    updateCartUI();
    document.getElementById("cart-modal").classList.add("hidden");
  }
});

// Initial Load
displayProducts();
