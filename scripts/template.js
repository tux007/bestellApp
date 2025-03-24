function cardTemplate(element) {
  return `
  <li class="card">
      <button class="add-btn" id="${element.id}" onclick="addToBasket('${
    element.id
  }', '${element.name}','${element.price}')">
        <img src="./assets/icons/plus-solid.svg" alt="Hinzufügen Icon" />
      </button>
      <h3>${element.name}</h3>
      <p class="description">
        ${element.description}
      </p>
      <span class="price">${element.price.toFixed(2)} CHF</span>
    </li>
    `;
}

function deliveryOptionsTemplate() {
  return `
  <label for="deliver" class="option ${
    deliveryOption === "deliver" ? "active-option" : ""
  }" onclick="toggleDeliveryOption()">
      <img src="./assets/icons/bicycle-solid.svg" alt="Fahrrad Icon" class="icon" />
      <div>
        <span class="delivery-title">Lieferung</span>
        <span class="delivery-time">45-60 min</span>
      </div>
  </label>
  <input type="radio" name="deliver" id="deliver"/>

  <label for="collect" class="option ${
    deliveryOption === "collect" ? "active-option" : ""
  }" onclick="toggleDeliveryOption()">
      <img src="./assets/icons/bag-shopping-solid.svg" alt="Fahrrad Icon" class="icon" />
      <div>
        <span class="delivery-title">Abholung</span>
        <span class="delivery-time">20-30 min</span>
      </div>
  </label>
  <input type="radio" name="collect" id="collect"/>`;
}

function emptyBasketTemplate() {
  return `
  <div class="empty-basket-container">
      <img src="./assets/icons/basket-shopping-solid.svg" alt="Warenkorb Icon" class="basket-icon" />
      <p>Warenkorb ist leer</p>
  </div>
  `;
}

function filledBasketTemplate(element) {
  return `
  <div class="filled-basket-container">
      <div class="basket-item">
          <span class="basket-item-info-name">${element.name}</span>
          <div class="basket-item-info-wrapper">
            <!-- Quantity -->
            <div class="basket-item-quanity">
              <button class="basket-item-btn" onclick="decreaseQty(${
                element.id
              })">
                <img src="./assets/icons/minus-solid.svg" alt="Minus Icon" class="icon" />
              </button>
              <input type="text" class="quantity-input" name="quantity-input" value="${
                element.amount
              }" min=readonly />
              <button class="basket-item-btn" onclick="increaseQty(${
                element.id
              })">
                <img src="./assets/icons/plus-solid.svg" alt="Minus Icon" class="icon" />
              </button>
            </div>
            <!-- Price -->
            <div>
              <span class="basket-item-info-price">${(
                element.price * element.amount
              ).toFixed(2)} CHF</span>
            </div>
            <!-- Delete-Button -->
            <div>
              <button class="basket-item-btn" onclick="removeFromBasket(${
                element.id
              })">
                <img src="./assets/icons/trash-can-solid.svg" alt="Löschen Icon" class="icon" />
              </button>
            </div>
          </div>
      </div>
  </div>
  `;
}

function orderSummaryTemplate(sum, total, delivery) {
  return `
  <div class="flex-space-between">
    <span>Zwischensumme</span>
    <span>${sum} CHF</span>
  </div>
  <div class="flex-space-between">
    <span>Lieferkosten</span>
    <span>${delivery} CHF</span>
  </div>
  <div class="flex-space-between basket-total">
    <span>Gesamt</span>
    <span>${total} CHF</span>
  </div>
  <button class="btn" onclick="sendOrder()">Bestellen</button>
  `;
}

function orderConfirmationTemplate() {
  return `
  <div class="confirmation-container">
    Vielen Dank für Ihre Bestellung!
  </div>
  `;
}

function mobileBasketBtnTemplate(totalAmount) {
  return `
  <span>Warenkorb anzeigen ${
    totalAmount > 0 ? `(${totalAmount} Artikel)` : " "
  }</span>
  `;
}
