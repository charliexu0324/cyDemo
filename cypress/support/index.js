// eslint-disable-next-line no-unused-vars
import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps'
import '../support/commands/index'
import { readConfigValue } from './utils/testConfigHelper'


// eslint-disable-next-line no-unused-vars
Cypress.on('uncaught:exception', (err, runnable) => false);
// eslint-disable-next-line no-unused-vars
cy.on('uncaught:exception', (err, runnable) => false);

Cypress.config('baseUrl', readConfigValue('baseUrl'));

before(() => {
  /*
    Rerun test without closing the browser will not clean up cleanUpCallBack, so clean it explicitly
  */
  Cypress.env('cleanUpCallBack', []);
});

beforeEach(() => {
  // eslint-disable-next-line no-unused-vars
  cy.on('uncaught:exception', (err, runnable) => false);
  /*
     Login in "before" and perserve cookie in beforeEach does not work across scenario outline, 
     (but works in non-BDD mode like decribe->it->it...), so have to login befor each case
  */
  cy.loginWithoutUI(readConfigValue('username'), readConfigValue('password'), readConfigValue('baseUrlPortal'));
});

/* 
   Clean once per feature file
   Do not find any better way to achieve than then env variable.Be aware varaible defined
   in "before" hook not visible to "after" if multiple scenarios within one feature file
   Comment it out upon debugging
*/
after(() => {
  for (let callback of Cypress.env('cleanUpCallBack')) {
    callback();
  }
});