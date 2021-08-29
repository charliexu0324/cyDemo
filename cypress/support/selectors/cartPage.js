import { gotoPage, baseRoutes } from "../../support/selectors/navigation";

export const selector = {
  // to-do: update them into `data-cy`
  miniCart: "#dLabel",
  checkoutToCart: ".checkout>a[href='/cart']",
  topCheckButton:
    "button[class='btn btn-block m10-btn m10-secondary checkoutButton']",
  quantity: "input[name='quantity']",
  removeAlert: "input[value='Remove']",
  errorMessageBanner: "div[class='alert alert-danger alert-dismissable']",
  infoMessageBanner: "div[class='alert alert-info alert-dismissable']",
  clickCollect: "#scFulfillmentMethodSelection>div:first-child",
  homeDelivery: "#scFulfillmentMethodSelection>div:last-child",
  store: "#pickUpStore",
  collectionDay: "#cis-collection-day",
  checkoutButton: "button[class='btn m10-btn m10-secondary checkoutButton']",
  couponCode: "#Coupon-code",
  applyCodeButton: "button[class='btn m10-primary applycode']",
  couponHint: "div[class='sc-voucher-msg promo_msg']>p",
  nonCouponHint: "li[class='parsley-custom-error-message']",
  customerDetails: "div[href='/checkout/multi/billing-address/edit']"
};

export function toMiniCart() {
  cy.get(selector.miniCart).click();
  cy.get(selector.checkoutToCart).click();
  cy.get(selector.topCheckButton).should("be.visible");
}

export async function quantity(text) {
  cy.get(selector.quantity) // may need to refactor
    .eq(1)
    .type("{ctrl}A")
    .type(text)
    .type("{del}")
    .type("{del}")
    .blur();

  if (text === "J") {
    cy.get(selector.removeAlert)
      .should("be.visible")
      .click();
    return;
  }
  if (text === "2") {
    cy.get(selector.infoMessageBanner).should("be.visible");
    return;
  }
  cy.get(selector.errorMessageBanner).should("not.exist"); //the error message should be showed in the same page, not come from the BE.
}

export function buyingOptionClickCollet() {
  cy.get(selector.clickCollect).click();

  const $lengthOfStore = Cypress.$(selector.store);
  let n = $lengthOfStore.children().length;
  n = n - 1;
  const j = Cypress._.random(1, n); //option 0 is not a store, just a hint, so should filter it.

  cy.get(selector.store)
    .find("option")
    .eq(j)
    .then($store => {
      let stroeName = $store.text();
      stroeName = Cypress._.trim(stroeName, "/\n/");

      cy.get(selector.store).select(stroeName);
      //because the store's name is dynamic and select dosen't support RegExp, so have to get their name first then use select("ABC").
    });

  gotoPage(baseRoutes.cart);
  // in headless mode, have to re-visit the page or will be failed.

  const i = Cypress._.random(6);
  cy.get(selector.collectionDay)
    .find("option")
    .eq(i)
    .then($day => {
      let date = $day.text();
      date = Cypress._.trim(date, "/\n/");
      cy.get(selector.collectionDay).select(date);
    });

  gotoPage(baseRoutes.cart);

  cy.get(selector.checkoutButton).click();
  cy.get(selector.customerDetails).contains("Customer Details");
}

export function buyingOptionDelivery() {
  cy.get(selector.homeDelivery).click();
  cy.get(selector.checkoutButton).click();
  cy.get(selector.customerDetails).contains("Customer Details");
}

export function cartSummaryCode(text, expected) {
  if (expected === "Enter the promo code.") {
    cy.get(selector.applyCodeButton).click();
    cy.get(selector.nonCouponHint).should("be.visible");
  } else {
    cy.get(selector.couponCode).type(text);
    cy.get(selector.applyCodeButton).click();
    cy.get(selector.couponHint).should("be.visible");
  }
}
