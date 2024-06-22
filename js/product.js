const header = document.querySelector("header");
const menuBtn = document.querySelector(".menu");

menuBtn.addEventListener("click", () => {
  header.classList.toggle("open");
});

const container = document.querySelector(".product-container");

async function fetchProduct(id) {
  container.insertAdjacentHTML("afterbegin", "<div class= 'spinner'></div>");
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    const product = await response.json();

    return product;
  } catch (error) {
    console.log(error);
  } finally {
    const spinner = document.querySelector(".spinner");
    spinner.remove();
  }
}

function getProductIdAndTitle() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");
  const productTitle = urlParams.get("title");

  return { productId, productTitle };
}

function renderProduct(product) {
  const div = document.createElement("li");
  div.style.maxWidth = "800px";

  div.style.height = "auto";
  const img = document.createElement("img");
  img.src = product.image;
  img.style.maxWidth = "1400px";
  img.style.width = "100%";

  const div1 = document.createElement("div");
  const div2 = document.createElement("div");

  div1.append(img);

  const title = document.createElement("div");
  title.textContent = product.title;
  title.className = "product-title";
  div2.append(title);

  const ratingContainer = document.createElement("div");
  ratingContainer.style.display = "flex";
  ratingContainer.style.gap = "6px";
  ratingContainer.style.alignItems = "center";

  const starsContainer = document.createElement("div");
  starsContainer.insertAdjacentHTML(
    "beforeend",
    "<span>⭐️</span>".repeat(Math.round(product.rating.rate))
  );
  starsContainer.style.width = "auto";
  starsContainer.style.marginTop = "auto";

  ratingContainer.append(starsContainer);

  const ratingCount = document.createElement("div");
  ratingCount.textContent = `(${product.rating.count})`;
  ratingContainer.append(ratingCount);
  div2.append(ratingContainer);

  const price = document.createElement("strong");
  price.textContent = `$${product.price}`;
  div2.append(price);
  const description = document.createElement("p");
  description.textContent = product.description;

  description.style.fontSize = "14px";
  description.style.fontWeight = "400";
  description.style.paddingTop = "20px";
  div2.append(description);

  const line = document.createElement("div");
  line.style.width = "100%";
  line.style.maxWidth = "400px";
  line.style.border = "1px solid #808080";
  line.style.marginTop = "20px";

  div2.append(line);

  const btn = document.createElement("button");
  btn.textContent = "buy now";
  btn.style.maxWidth = "165px";
  btn.style.width = "100%";
  div2.append(btn);

  div.append(div1);
  div.append(div2);
  container.append(div);
}

(async function () {
  const object = getProductIdAndTitle();
  const { productId: id, productTitle: title } = object;
  document.title = title;

  container.insertAdjacentHTML(
    "beforeend",
    `<div class = "title">${title}</div>`
  );
  const product = await fetchProduct(id);

  renderProduct(product);
})();
