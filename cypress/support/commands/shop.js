export function addItems2cart(token) {
  cy.request({
    method: "POST",
    url: "/cart/add",
    form: true,
    failOnStatusCode: false,
    body: {
      qty: 1,
      productCodePost: 303037,
      homeDeliveryMode: "",
      clickToCollectMode: true,
      storeId: "X7",
      giftCardAmount: "",
      storeName: "",
      CSRFToken: token
    }
  });
}

export function getSubtotal() {
  cy.request({
    method: "GET",
    url: "/cart/miniCart/SUBTOTAL",
    form: true
  });
}
