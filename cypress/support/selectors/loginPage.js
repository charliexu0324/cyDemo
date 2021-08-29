import mainConf from "../../testConfigs/cypress.env.json";
import { baseRoutes } from "../selectors/navigation";
let env = mainConf.env;

const j_username = mainConf.endpoints[env].username;
const j_password = mainConf.endpoints[env].password;

export let csrfToken; //store csrfToken globally

export const selector = {
  email: "#j_username",
  password: "#j_password",
  loginButton: "#loginButton",
  logoutButton:
    "div[class='hidden-xs main-header--account-navigation'] >ul > li > a:nth-child(2)",
  userInfo: "p[class='user-email-overview truncate']"
};

export function login() {
  cy.get(selector.email).type(j_username);
  cy.get(selector.password).type(j_password);
  cy.get(selector.loginButton).click();
  cy.url().should("include", baseRoutes.updateProfile);
  cy.get(selector.userInfo)
    .contains(j_username)
    .should("be.visible");
}

export function loginWithoutUI() {
  // speedup the login process
  
  cy.request("/login")
    .its("body")
    .then(body => {
      const $html = Cypress.$(body);
      csrfToken = $html.find("input[name=CSRFToken]").val();
      cy.loginByCSRF(csrfToken);
    });

  Cypress.Commands.add("loginByCSRF", csrfToken => {
    cy.request({
      method: "POST",
      url: "/j_spring_security_check",
      failOnStatusCode: false,
      form: true,
      body: {
        j_username,
        j_password,
        CSRFToken: csrfToken
      }
    });
  });
}
