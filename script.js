const categoryButtons = document.querySelectorAll(".category");
const mainDishesBtn = document.getElementById("main-dishes-btn");
const snacksBtn = document.getElementById("snacks-btn");
const dessertsBtn = document.getElementById("desserts-btn");

const mainDishesRef = document.getElementById("main-dishes-container");
const snacksRef = document.getElementById("snacks-container");
const dessertsRef = document.getElementById("desserts-container");

const deliveryOptionsRef = document.getElementById("delivery-options");
const basketRef = document.getElementById("basket-content");
let orderSummaryRef = document.getElementById("order-summary");

const deliveryOptionsMobileRef = document.getElementById(
  "delivery-options-mobile"
);
const basketMobileRef = document.getElementById("basket-content-mobile");
const basketMobileBtnRef = document.getElementById("mobile-basket-btn");
let orderSummaryMobileRef = document.getElementById("order-summary-mobile");

let basket = [];
let deliveryOption = "deliver";

function init() {
  renderTemplate(dishes, mainDishesRef, cardTemplate);
  renderTemplate(snacks, snacksRef, cardTemplate);
  renderTemplate(desserts, dessertsRef, cardTemplate);
  getBasketFromLocalStorage();

  if (basket.length > 0) {
    renderBasket();
  } else {
    resetBasket();
  }
}

function renderTemplate(array, ref, template) {
  array.map((element) => {
    ref.innerHTML += template(element);
  });
}

function toggleCategory(button) {
  categoryButtons.forEach((element) => {
    element.classList.remove("active-category");
  });
  button.classList.add("active-category");
}

function toggleDeliveryOption() {
  deliveryOption = deliveryOption === "deliver" ? "collect" : "deliver";
  saveBasketToLocalStorage();
  refreshBasket();
}

function renderBasket() {
  if (window.matchMedia("(max-width: 968px)").matches) {
    renderTemplate(basket, basketMobileRef, filledBasketTemplate);
    deliveryOptionsMobileRef.innerHTML = deliveryOptionsTemplate();
    orderSummaryMobileRef.innerHTML = orderSummaryTemplate();
    refreshMobileBasketBtn();
  } else {
    renderTemplate(basket, basketRef, filledBasketTemplate);
    deliveryOptionsRef.innerHTML = deliveryOptionsTemplate();
    orderSummaryRef.innerHTML = orderSummaryTemplate();
  }
  calculateOrderSummary();
}

function resetBasket() {
  deliveryOptionsRef.innerHTML = deliveryOptionsTemplate();
  deliveryOptionsMobileRef.innerHTML = deliveryOptionsTemplate();
  basketRef.innerHTML = emptyBasketTemplate();
  basketMobileRef.innerHTML = emptyBasketTemplate();
  refreshMobileBasketBtn();
}

function refreshBasket() {
  getBasketFromLocalStorage();
  basketRef.innerHTML = "";
  basketMobileRef.innerHTML = "";

  if (basket.length > 0) {
    renderBasket();
  } else {
    if (window.matchMedia("(max-width: 968px)").matches) {
      basketMobileRef.innerHTML = emptyBasketTemplate();
      orderSummaryMobileRef.innerHTML = "";
    } else {
      basketRef.innerHTML = emptyBasketTemplate();
      orderSummaryRef.innerHTML = "";
    }
  }
}

function addToBasket(id, name, price) {
  const item = { id: id, name: name, price: price, amount: 1 };
  const existingItem = basket.find((item) => item.id === id);

  if (existingItem) {
    existingItem.amount += 1;
  } else {
    basket.push(item);
  }
  saveBasketToLocalStorage();
  refreshBasket();
}

function removeFromBasket(element) {
  const newBasket = basket.filter((item) => item.id !== element.id);
  basket = newBasket;
  saveBasketToLocalStorage();
  refreshBasket();
  refreshMobileBasketBtn();
}

function calculateOrderSummary() {
  const sum = calculateSum();
  const delivery = deliveryOption === "deliver" ? 5.0 : 0;
  const total = sum + delivery;

  orderSummaryRef.innerHTML = orderSummaryTemplate(sum.toFixed(2), total.toFixed(2), delivery.toFixed(2));
  orderSummaryMobileRef.innerHTML = orderSummaryTemplate(sum.toFixed(2), total.toFixed(2), delivery.toFixed(2)
  );
  return total;
}

function calculateSum() {
  return basket.reduce((sum, element) => sum + element.amount * element.price, 0);
}

function decreaseQty(element) {
  const currentItem = basket.find((item) => item.id === element.id);

  if (currentItem.amount <= 1) {
    removeFromBasket(element);
  } else {
    currentItem.amount -= 1;
  }
  saveBasketToLocalStorage();
  refreshBasket();
  refreshMobileBasketBtn();
}

function increaseQty(element) {
  const currentItem = basket.find((item) => item.id === element.id);

  currentItem.amount += 1;
  saveBasketToLocalStorage();
  refreshBasket();
  refreshMobileBasketBtn();
}

function saveBasketToLocalStorage() {
  localStorage.setItem("currentBasket", JSON.stringify(basket));
  localStorage.setItem("currentDeliveryOption", JSON.stringify(deliveryOption));
}

function getBasketFromLocalStorage() {
  let currentBasket = JSON.parse(localStorage.getItem("currentBasket"));
  let currentDeliveryOption = JSON.parse(
    localStorage.getItem("currentDeliveryOption")
  );

  if (currentBasket !== null) {
    basket = currentBasket;
  }

  if (currentDeliveryOption !== null) {
    deliveryOption = currentDeliveryOption;
  }
}

function refreshMobileBasketBtn() {
  let totalAmount = 0;
  basket.forEach((element) => {
    totalAmount += element.amount;
  });
  basketMobileBtnRef.innerHTML = mobileBasketBtnTemplate(totalAmount);
}

function openMobileBasket() {
  const mobileBasketContainer = document.getElementById(
    "mobile-basket-container"
  );
  mobileBasketContainer.classList.remove("d-none");
  document.body.style.overflow = "hidden";
}

function closeMobileBasket() {
  const mobileBasketContainer = document.getElementById(
    "mobile-basket-container"
  );
  mobileBasketContainer.classList.add("d-none");
  document.body.style.overflow = "unset";
}

function sendOrder() {
  basketMobileRef.innerHTML = orderConfirmationTemplate();
  orderSummaryMobileRef.innerHTML = "";
  basketRef.innerHTML = orderConfirmationTemplate();
  orderSummaryRef.innerHTML = "";
  basket = [];
  refreshMobileBasketBtn();
  saveBasketToLocalStorage();
  setTimeout(() => {
    basketMobileRef.innerHTML = emptyBasketTemplate();
    basketRef.innerHTML = emptyBasketTemplate();
  }, "1500");
}

window.addEventListener("resize", refreshBasket);
