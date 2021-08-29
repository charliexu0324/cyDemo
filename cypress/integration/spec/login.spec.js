import { gotoPage, baseRoutes } from "../../support/selectors/navigation";
import { login } from "../../support/selectors/loginPage";

describe("walk through the login page", function() {
  before(function() {
    gotoPage(baseRoutes.login);
  });

  it("happy path of login page", () => {
    login();
  });
});
