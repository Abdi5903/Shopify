// JavaScript
// 1. Accordion logic
document.addEventListener('DOMContentLoaded', () => {

  /* ----------------------------------------------------
     1. ACCORDION
  ---------------------------------------------------- */
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      header.parentElement.classList.toggle('active');
    });
  });


  /* ----------------------------------------------------
     2. CART SYSTEM (with dropdown)
  ---------------------------------------------------- */

  const addToBagBtn = document.querySelector('.add-to-bag');
  const cartCount = document.getElementById('cart-count');
  const dropdown = document.getElementById('cart-dropdown');

  let cart = [];

  function updateCartDisplay() {
    // Update count bubble
    if (cart.length > 0) {
      cartCount.style.display = 'inline-block';
      cartCount.textContent = cart.length;
    } else {
      cartCount.style.display = 'none';
    }

    // Update dropdown
    dropdown.innerHTML = '';

    if (cart.length === 0) {
      dropdown.innerHTML = '<p class="empty">Your cart is empty</p>';
      return;
    }

    cart.forEach((item, index) => {
      dropdown.innerHTML += `
        <div class="cart-item">
          <img src="${item.image}">
          <div class="cart-item-info">
            <h4>${item.name}</h4>
            <p>${item.price}</p>
            <button class="remove-btn" data-index="${index}">Remove</button>
          </div>
        </div>
      `;
    });

    dropdown.innerHTML += `<a href="#" class="checkout-btn">Checkout</a>`;
  }

  // Remove item handler
  dropdown.addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-btn')) {
      const index = event.target.dataset.index;
      cart.splice(index, 1);
      updateCartDisplay();
    }
  });

  // Add to cart
  if (addToBagBtn) {
    addToBagBtn.addEventListener('click', () => {
      const product = {
        name: "All-Mountain Ski 2025",
        image: document.querySelector('.main-img').src,
        price: "$799"
      };

      cart.push(product);
      updateCartDisplay();
    });
  }


  /* ----------------------------------------------------
     3. LIGHTBOX GALLERY
  ---------------------------------------------------- */

  const lightbox = document.createElement('div');
  lightbox.id = 'lightbox';
  document.body.appendChild(lightbox);

  const galleryImages = document.querySelectorAll('.main-img, .thumbnail-grid img');
  let currentIndex = 0;

  function openLightbox(index) {
    currentIndex = index;

    lightbox.innerHTML = `
      <img src="${galleryImages[currentIndex].src}" class="lightbox-img">
      <button class="lightbox-prev">&#10094;</button>
      <button class="lightbox-next">&#10095;</button>
    `;

    lightbox.classList.add('active');

    document.querySelector('.lightbox-prev').onclick = () => changeSlide(-1);
    document.querySelector('.lightbox-next').onclick = () => changeSlide(1);
  }

  function changeSlide(step) {
    currentIndex = (currentIndex + step + galleryImages.length) % galleryImages.length;
    document.querySelector('.lightbox-img').src = galleryImages[currentIndex].src;
  }

  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) {
      lightbox.classList.remove('active');
    }
  });

  galleryImages.forEach((img, index) => {
    img.addEventListener('click', () => openLightbox(index));
  });

});