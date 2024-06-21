const header = document.querySelector("header");
const menuBtn = document.querySelector(".menu");

menuBtn.addEventListener("click", () => {
  header.classList.toggle("open");
});
const container = document.querySelector(".products-container");

async function fetchProducts() {
  try {
    console.log("Fetching products...");
    container.insertAdjacentHTML("afterbegin", "<div class='spinner'></div>");

    const response = await fetch("https://fakestoreapi.com/products");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const products = await response.json();
    console.log("Products fetched:", products);
    return products;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    const spinner = document.querySelector(".spinner");
    if (spinner) {
      spinner.remove();
    }
    container.insertAdjacentHTML(
      "afterbegin",
      `<div class='error'>Failed to load products: ${error.message}</div>`
    );
    return [];
  }
}

function renderProducts(products) {
  console.log("Rendering products...");
  const spinner = document.querySelector(".spinner");
  if (spinner) {
    spinner.remove();
  }

  products.forEach((product) => {
    console.log("Rendering product:", product);

    const li = document.createElement("li");
    li.style.width = "250px";
    li.style.height = "460px";

    const imgLink = document.createElement("a");
    imgLink.href = `../pages/product.html?id=${product.id}&title=${product.title}`;
    const img = document.createElement("img");
    img.src = product.image;
    img.alt = product.title;
    img.style.width = "200px";
    imgLink.style.width = "100%";
    imgLink.append(img);
    li.append(imgLink);

    const title = document.createElement("h3");
    title.textContent = product.title;
    li.append(title);

    const ratingContainer = document.createElement("div");
    ratingContainer.style.display = "flex";
    ratingContainer.style.alignItems = "center";

    const starsContainer = document.createElement("div");
    starsContainer.insertAdjacentHTML(
      "beforeend",
      "<span>⭐️</span>".repeat(Math.round(product.rating.rate))
    );
    starsContainer.style.width = "auto";

    ratingContainer.append(starsContainer);

    const ratingCount = document.createElement("div");
    ratingCount.textContent = `(${product.rating.count})`;
    ratingContainer.append(ratingCount);

    li.append(ratingContainer);
    const price = document.createElement("strong");
    price.textContent = `$${product.price}`;
    li.append(price);

    container.append(li);
  });
}

(async function init() {
  console.log("Initializing...");
  const products = await fetchProducts();
  if (products.length > 0) {
    renderProducts(products);
  } else {
    console.log("No products to render.");
  }
})();
