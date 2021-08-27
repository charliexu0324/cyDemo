import { gotoPage, baseRoutes } from "../../support/selectors/navigation";
import { loginWithoutUI, csrfToken } from "../../support/selectors/loginPage";
import { addItems2cart, getSubtotal } from "../../support/commands/shop";
import {
  toMiniCart,
  buyingOptionDelivery,
  quantity,
  buyingOptionClickCollet,
  cartSummaryCode
} from "../../support/selectors/cartPage";

import testdata from "../../fixtures/testdata.json";

describe("walk through the cart page", function() {
  const quantityData = testdata.quantityData;
  const couponData = testdata.couponData;

  beforeEach(function() {
    loginWithoutUI();
    gotoPage(baseRoutes.cart);
  });

  it("click mini cart then go the cart page", () => {
    getSubtotal();
    addItems2cart(csrfToken);
    gotoPage(baseRoutes.updateProfile);
    toMiniCart();
  });

  quantityData.forEach(quantityData1 => {
    it(`product's quantity(${quantityData1.text})`, function() {
      quantity(quantityData1.text);
    });
  });

  it("buying option", function() {
    buyingOptionClickCollet();
  });

  it("buying option delivery", function() {
    buyingOptionDelivery();
  });

  couponData.forEach(async couponData1 => {
    it(`coupon '${couponData1.text}' in cart summary`, function() {
      cartSummaryCode(couponData1.text, couponData1.expected);
    });
  });

});
