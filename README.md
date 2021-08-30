# cypress E2E Automation Demo

The demo of UI automation testing framework

The framework is based on Cypress+Mocha+Node.js. It’s foucs on the cart page, as this page has a high priority.

The main features of this demo framework are:

1.Page-object pattern based. The benefits are easy to maintain and refactor the page object and the test.

2.Stable,Fast and easy to maintain. By the nature of Cypress, the running process is quite stable and pretty fast than Selenium. The code is more simpler than selenium webdriver.

3.Data-driven. Store test data into json files to improve the maintainability and to reduce duplicated code.

4.Taken Shortcuts. Login and prepare test data programmatically without UI to speed up the running process.

5.BDD based. So it’s quite easy to integrate to Cucumber.
What’s more, Environment configurable to support different testing environments. This framework could integrate to Jenkins/Teamcity by CLI command, could generate testing report, coud take screen shot when failing etc.

How to run:

install node and cypress first, 
1. install nodejs:    download stabel nodejs pkg and intall it.
2. intall yarn:       curl -o- -L https://yarnpkg.com/install.sh | bash
3. install cypress: yarn add cypress
4. optional: yarn add eslint, prettier, faker, ...any package you need.

then execute below command in CLI:

1. run cypress in Cypress with Test Runner
yarn cypress open
2. run cypress in headless Electron or Chrome
yarn cypress run
yarn cypress run --browser chrome

