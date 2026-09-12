const products = [
  {
    id: 1,
    name: "NAKO CORE HOODIE",
    category: "tops",
    price: 29.99,
    image: "/img/maskizelenduks.png",
    badge: "NEW",
    sizes: ["XS", "S", "M", "L", "XL"],
    description:
      "Heavyweight cotton jersey with an offset chest graphic, relaxed shoulder and a clean everyday silhouette."
  },

  {
    id: 2,
    name: "BACKPRINT TEE",
    category: "outwear",
    price: 19.99,
    image: "/img/maskamajcacrna.png",
    badge: "CORE",
    sizes: ["S", "M", "L", "XL"],
    description:
      "Structured nylon-cotton short with utility pockets, adjustable waist and an easy above-knee cut."
  },

  {
    id: 3,
    name: "ESSENTIAL TEE",
    category: "tops",
    price: 24.99,
    image: "/img/maskamajcabe;a.jpeg",
    badge: "DROP 01",
    sizes: ["OS"],
    description:
      "Six-panel field cap with a curved brim, tonal embroidery and a low-profile fit."
  },

  {
    id: 4,
    name: "ARCHIVE LOGO HOODIE",
    category: "outwear",
    price: 39.99,
    image: "/img/maskidukssiv.png",
    badge: "LIMITED",
    sizes: ["S", "M", "L", "XL"],
    description:
      "Midweight brushed fleece crewneck with dropped shoulders, ribbed finish and understated front mark."
  },

  {
    id: 5,
    name: "WIDE CARGO SET",
    category: "outerwear",
    price: 79.99,
    image: "/img/zenskipantolonikrem.png",
    badge: "NEW",
    sizes: ["S", "M", "L", "XL"],
    description:
      "Lightweight technical shell built for unpredictable weather, with a cropped utility profile."
  },

  {
    id: 6,
    name: "CITY TEE",
    category: "tops",
    price: 14.99,
    image: "/img/zenskamajcabela.png",
    badge: "CORE",
    sizes: ["S", "M", "L", "XL"],
    description:
      "Relaxed cargo trouser in durable cotton ripstop with articulated knees and oversized pocketing."
  },

  {
    id: 7,
    name: "UTILITY CARGO SHORTS",
    category: "bottoms",
    price: 27.99,
    image: "/img/maski shorc cremav.png",
    badge: "RESTOCKED",
    sizes: ["OS"],
    description:
      "Compact crossbody utility bag with two zip compartments and an adjustable webbing strap."
  },

  {
    id: 8,
    name: "TACTICAL CARGO PANTS",
    category: "bottoms",
    price: 49.99,
    image: "/img/maskicrnipantalni.png",
    badge: "LIMITED",
    sizes: ["S", "M", "L", "XL"],
    description:
      "Dense cotton hoodie with a boxy body, tonal details and an oversized hood."
  }
];


let cart = JSON.parse(
  localStorage.getItem("vantaCart") || "[]"
);

let selectedProduct = null;
let selectedSize = null;


const featuredGrid =
  document.getElementById("featuredGrid");

const modal =
  document.getElementById("productModal");

const cartDrawer =
  document.getElementById("cartDrawer");

const drawerBackdrop =
  document.getElementById("drawerBackdrop");

const toast =
  document.getElementById("toast");


function money(value) {
  return `€${value.toFixed(0)}`;
}


/* PRODUCTS */

function renderProducts(list = products.slice(0, 4)) {

  featuredGrid.innerHTML = list.map(product => {

    return `
      <article
        class="product-card"
        data-id="${product.id}"
        tabindex="0"
        role="button"
      >

        <div class="product-image">

          <img
            src="${product.image}"
            alt="${product.name}"
          >

          <span class="product-badge">
            ${product.badge}
          </span>

        </div>

        <div class="product-info">

          <span>
            ${product.name}
          </span>

          <span>
            ${money(product.price)}
          </span>

        </div>

      </article>
    `;

  }).join("");
}


/* PRODUCT MODAL */

function openProduct(id) {

  selectedProduct =
    products.find(
      product => product.id === Number(id)
    );

  if (!selectedProduct) return;

  selectedSize =
    selectedProduct.sizes[0];


  document.getElementById("modalImage").src =
    selectedProduct.image;

  document.getElementById("modalImage").alt =
    selectedProduct.name;

  document.getElementById("modalCategory").textContent =
    selectedProduct.category.toUpperCase();

  document.getElementById("modalName").textContent =
    selectedProduct.name;

  document.getElementById("modalPrice").textContent =
    money(selectedProduct.price);

  document.getElementById("modalDescription").textContent =
    selectedProduct.description;


  document.getElementById("sizes").innerHTML =
    selectedProduct.sizes
      .map((size, index) => {

        return `
          <button
            class="size ${index === 0 ? "selected" : ""}"
            data-size="${size}"
          >
            ${size}
          </button>
        `;

      })
      .join("");


  modal.classList.add("open");

  modal.setAttribute(
    "aria-hidden",
    "false"
  );

  document.body.style.overflow = "hidden";
}


function closeProduct() {

  modal.classList.remove("open");

  modal.setAttribute(
    "aria-hidden",
    "true"
  );

  document.body.style.overflow = "";
}


/* CART */

function saveCart() {

  localStorage.setItem(
    "vantaCart",
    JSON.stringify(cart)
  );
}


function addToCart(product, size) {

  const key =
    `${product.id}-${size}`;

  const existing =
    cart.find(item => item.key === key);


  if (existing) {

    existing.qty++;

  } else {

    cart.push({
      key,
      id: product.id,
      size,
      qty: 1
    });

  }


  saveCart();

  renderCart();

  closeProduct();

  openCart();

  showToast(
    `${product.name} / ${size} added to bag`
  );
}


function renderCart() {

  const count =
    cart.reduce(
      (sum, item) => sum + item.qty,
      0
    );

  document.getElementById(
    "cartCount"
  ).textContent = count;


  const items =
    document.getElementById(
      "cartItems"
    );


  if (!cart.length) {

    items.innerHTML = `
      <div class="empty-cart">

        Your bag is empty.

        <br>

        <span>
          Find something worth keeping.
        </span>

      </div>
    `;

  } else {

    items.innerHTML =
      cart.map(item => {

        const product =
          products.find(
            p => p.id === item.id
          );

        return `
          <div class="cart-item">

            <img
              src="${product.image}"
              alt="${product.name}"
            >

            <div>

              <h4>
                ${product.name}
              </h4>

              <p>
                Size ${item.size}
                ·
                ${money(product.price)}
              </p>

              <div class="qty">

                <button
                  data-qty="-1"
                  data-key="${item.key}"
                >
                  −
                </button>

                <b>
                  ${item.qty}
                </b>

                <button
                  data-qty="1"
                  data-key="${item.key}"
                >
                  +
                </button>

              </div>

            </div>

            <button
              class="remove"
              data-remove="${item.key}"
            >
              ×
            </button>

          </div>
        `;

      }).join("");
  }


  const total =
    cart.reduce((sum, item) => {

      const product =
        products.find(
          p => p.id === item.id
        );

      return (
        sum +
        product.price * item.qty
      );

    }, 0);


  document.getElementById(
    "cartTotal"
  ).textContent =
    money(total);
}


function openCart() {

  cartDrawer.classList.add("open");

  drawerBackdrop.classList.add("open");

  cartDrawer.setAttribute(
    "aria-hidden",
    "false"
  );
}


function closeCart() {

  cartDrawer.classList.remove("open");

  drawerBackdrop.classList.remove("open");

  cartDrawer.setAttribute(
    "aria-hidden",
    "true"
  );
}


/* TOAST */

function showToast(message) {

  toast.textContent = message;

  toast.classList.add("show");

  clearTimeout(showToast.timer);

  showToast.timer =
    setTimeout(() => {

      toast.classList.remove("show");

    }, 2600);
}


/* INITIAL */

renderProducts();

renderCart();


/* PRODUCT CLICK */

featuredGrid.addEventListener(
  "click",
  event => {

    const card =
      event.target.closest(
        ".product-card"
      );

    if (card) {

      openProduct(
        card.dataset.id
      );

    }

  }
);


featuredGrid.addEventListener(
  "keydown",
  event => {

    const card =
      event.target.closest(
        ".product-card"
      );

    if (!card) return;

    if (
      event.key === "Enter" ||
      event.key === " "
    ) {

      event.preventDefault();

      openProduct(
        card.dataset.id
      );

    }

  }
);


/* SEE ALL */

document
  .getElementById("seeAll")
  .addEventListener(
    "click",
    () => {

      renderProducts(products);

      document
        .querySelector(".featured")
        .scrollIntoView({
          behavior: "smooth"
        });

    }
  );


/* CATEGORY FILTER */

document
  .querySelectorAll(".category-row")
  .forEach(row => {

    row.addEventListener(
      "click",
      () => {

        const category =
          row.dataset.category;

        let list;


        if (category === "new") {

          list =
            products.filter(
              product =>
                product.badge === "NEW" ||
                product.badge === "DROP 01"
            );

        } else {

          list =
            products.filter(
              product =>
                product.category === category
            );

        }


        if (!list.length) {

          list = products;

        }


        renderProducts(list);

        document
          .querySelector(".featured")
          .scrollIntoView({
            behavior: "smooth"
          });

      }
    );

  });


/* SIZE */

document
  .getElementById("sizes")
  .addEventListener(
    "click",
    event => {

      const button =
        event.target.closest(".size");

      if (!button) return;

      selectedSize =
        button.dataset.size;


      document
        .querySelectorAll(".size")
        .forEach(size =>
          size.classList.remove(
            "selected"
          )
        );


      button.classList.add(
        "selected"
      );

    }
  );


/* ADD TO CART */

document
  .getElementById("addToCart")
  .addEventListener(
    "click",
    () => {

      if (selectedProduct) {

        addToCart(
          selectedProduct,
          selectedSize
        );

      }

    }
  );


/* CLOSE MODAL */

document
  .querySelectorAll(
    "[data-close='modal']"
  )
  .forEach(element => {

    element.addEventListener(
      "click",
      closeProduct
    );

  });


/* ESC */

document.addEventListener(
  "keydown",
  event => {

    if (event.key === "Escape") {

      closeProduct();

      closeCart();

    }

  }
);


/* CART BUTTON */

document
  .getElementById("cartButton")
  .addEventListener(
    "click",
    openCart
  );


document
  .getElementById("closeCart")
  .addEventListener(
    "click",
    closeCart
  );


drawerBackdrop.addEventListener(
  "click",
  closeCart
);


/* CART QUANTITY */

document
  .getElementById("cartItems")
  .addEventListener(
    "click",
    event => {

      const key =
        event.target.dataset.key;


      if (
        event.target.dataset.qty &&
        key
      ) {

        const item =
          cart.find(
            item =>
              item.key === key
          );


        item.qty += Number(
          event.target.dataset.qty
        );


        if (item.qty <= 0) {

          cart =
            cart.filter(
              item =>
                item.key !== key
            );

        }


        saveCart();

        renderCart();

      }


      const removeKey =
        event.target.dataset.remove;


      if (removeKey) {

        cart =
          cart.filter(
            item =>
              item.key !== removeKey
          );

        saveCart();

        renderCart();

        showToast(
          "Item removed"
        );

      }

    }
  );


/* CHECKOUT */

document
  .getElementById("checkoutButton")
  .addEventListener(
    "click",
    () => {

      if (!cart.length) {

        showToast(
          "Your bag is empty"
        );

        return;
      }


      showToast(
        "Demo checkout — connect your payment provider here"
      );

    }
  );


/* MOBILE MENU */

const mobileMenu =
  document.getElementById(
    "mobileMenu"
  );


document
  .getElementById("menuButton")
  .addEventListener(
    "click",
    () => {

      mobileMenu.classList.add(
        "open"
      );

    }
  );


document
  .getElementById("closeMenu")
  .addEventListener(
    "click",
    () => {

      mobileMenu.classList.remove(
        "open"
      );

    }
  );


mobileMenu
  .querySelectorAll("a")
  .forEach(link => {

    link.addEventListener(
      "click",
      () => {

        mobileMenu.classList.remove(
          "open"
        );

      }
    );

  });


/* NEWSLETTER */

document
  .getElementById("newsletterForm")
  .addEventListener(
    "submit",
    event => {

      event.preventDefault();


      const email =
        document
          .getElementById("email")
          .value
          .trim();


      if (!email) return;


      document
        .getElementById("formMessage")
        .textContent =
        "YOU'RE IN. WATCH YOUR INBOX.";


      event.target.reset();

    }
  );


/* CAMPAIGN */

document
  .getElementById("playCampaign")
  .addEventListener(
    "click",
    () => {

      showToast(
        "Campaign reel placeholder — replace with your video URL"
      );

    }
  );