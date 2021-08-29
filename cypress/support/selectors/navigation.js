export const baseRoutes = {
  login: "/login",
  cart: "/cart",
  updateProfile: "/my-account/update-profile"
};
export function gotoPage(path) {
  cy.visit(path);
}
