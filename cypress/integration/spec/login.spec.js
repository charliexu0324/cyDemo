import { gotoPage, baseRoutes } from "../../support/selectors/navigation";
import { login } from "../../support/selectors/loginPage";

describe("walk through the cart page", function() {
  before(function() {
    gotoPage(baseRoutes.login);
  });

  it("click mini cart then go the cart page", () => {
    login();
  });
});
