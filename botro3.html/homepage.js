document.addEventListener('DOMContentLoaded', () => {
  let cart = [];

  // Elements
  const cartBtn = document.getElementById('cartBtn');
  const cartPopup = document.getElementById('cart-popup');
  const closeCart = document.getElementById('closeCart');
  const cartItems = document.getElementById('cart-items');
  const totalPriceEl = document.getElementById('total-price');
  const cartCountEl = document.getElementById('cart-count');
  const addCartBtns = document.querySelectorAll('.add-cart');

  // Show/hide cart popup
  cartBtn.addEventListener('click', () => {
    cartPopup.classList.toggle('show');
  });
  closeCart.addEventListener('click', () => {
    cartPopup.classList.remove('show');
  });

  // Add to cart
  addCartBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const name = btn.dataset.name;
      const price = parseFloat(btn.dataset.price);

      const existingItem = cart.find(item => item.name === name);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({ name, price, quantity: 1 });
      }

      updateCart();
    });
  });

  function updateCart() {
    cartItems.innerHTML = '';
    let total = 0;
    let totalQuantity = 0;

    cart.forEach((item, index) => {
      total += item.price * item.quantity;
      totalQuantity += item.quantity;

      const li = document.createElement('li');
      li.innerHTML = `
        ${item.name} - $${item.price.toFixed(2)} x 
        <button class="qty-btn" data-action="decrease" data-index="${index}">-</button>
        ${item.quantity}
        <button class="qty-btn" data-action="increase" data-index="${index}">+</button>
        <button class="remove-btn" data-index="${index}">X</button>
      `;
      cartItems.appendChild(li);
    });

    cartCountEl.innerText = totalQuantity; // cập nhật số lượng tổng
    totalPriceEl.innerText = total.toFixed(2);

    // Xử lý nút tăng/giảm số lượng
    const qtyBtns = document.querySelectorAll('.qty-btn');
    qtyBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const index = btn.dataset.index;
        const action = btn.dataset.action;
        if (action === 'increase') {
          cart[index].quantity += 1;
        } else if (action === 'decrease') {
          cart[index].quantity -= 1;
          if (cart[index].quantity <= 0) cart.splice(index, 1);
        }
        updateCart();
      });
    });

    // Xử lý nút xóa
    const removeBtns = document.querySelectorAll('.remove-btn');
    removeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const index = btn.dataset.index;
        cart.splice(index, 1);
        updateCart();
      });
    });
  }
});
