const AxeBuilder = require('axe-webdriverjs');
const selenium = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const { getComponentsNames, getViolations } = require('./_helpers');
const pkgEnvs = require('../build/envs');
const pkgPaths = require('../build/paths');

let driver;
const components = getComponentsNames(pkgPaths.srcComponentsPath(), '.njk');

components.forEach((component) => {
  describe(`${component} component`, () => {
    beforeEach((done) => {
      driver = new selenium.Builder()
        .forBrowser('chrome')
        .setChromeOptions(
          new chrome.Options()
            .headless()
            .windowSize({ width: 640, height: 480 }),
        )
        .build();
      const test = `${pkgEnvs.getCurrentEnvInfo().url}/components/preview/${component}`;
      driver.get(test).then(() => done());
    });

    afterEach((done) => {
      driver.quit().then(() => {
        done();
      });
    });

    it('should have no accessibility violations', (done) => {
      driver
        .findElement(selenium.By.css('body'))
        .then(() => {
          AxeBuilder(driver)
            .analyze((err, results) => {
              expect(results.violations.length).toBe(0);
              if (results.violations.length > 0) {
                const violations = getViolations(results.violations);
                // eslint-disable-next-line no-console
                console.log('\x1b[34m', `\n${pkgEnvs.getCurrentEnvInfo().url}/components/preview/${component}`);
                violations.forEach((violation) => {
                  // eslint-disable-next-line no-console
                  console.log('\x1b[31m', violation);
                });
              }
              done();
            });
        });
    });
  });
});
