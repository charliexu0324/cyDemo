Cypress.Commands.add("addItems2cart", token => {
  cy.request({
    method: "POST",
    url: "/cart/add",
    form: true,
    failOnStatusCode: false,
    body: {
      qty: 1,
      productCodePost: 337644,
      homeDeliveryMode: true,
      clickToCollectMode: "",
      storeId: "X7",
      giftCardAmount: "",
      storeName: "",
      CSRFToken: token
    }
  });
});

Cypress.Commands.add("getSubtotal", () => {
  cy.request({
    method: "GET",
    url: "/cart/miniCart/SUBTOTAL",
    form: true
  });
});
