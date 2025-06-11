const { NavigationTracker } = require('appium-navigation-tracker');
const wd = require("wd");

/**
 * Username to be used for running the test.
 */
const username = process.env.LT_USERNAME_STAGE;

/**
 * The access key to be used for running test test.
 */
const accessKey = process.env.LT_ACCESS_KEY_STAGE;

/**
 * App ID to be used for running the test.
 */
const appId = process.env.LT_APP_ID_STAGE;

/**
 * Hub URL to be used for running the test.
 */
const hubUrl = process.env.LT_HUB_URL_STAGE || 'stage-mobile-hub.lambdatestinternal.com';

/**
 * Capabilities to be passed while running the test.
 */
const desiredCapabilities = {
    app: appId,
    build: "Navigation Tracker Test Build",
    name: "Sample Test NodeJS",
    isRealMobile: true,
    appiumVersion: "2.2.1",
    platformName: "android",
    video: true,
    visual: true,
    autoGrantPermissions: true,
    autoAcceptAlerts: true
};

const driver = wd.promiseRemote(
    `https://${username}:${accessKey}@${hubUrl}/wd/hub`
);

const DEFAULT_TIMEOUT = 10000;

/**
 * Run an android test.
 */
async function runAndroidTest() {
    try {
        console.log("Starting Android test...");
        console.log("Initializing driver with capabilities:", JSON.stringify(desiredCapabilities, null, 2));

        // Initialize navigation tracker
        const navigationTracker = new NavigationTracker(driver, {
            enableApiUpload: false
        });


        driver
            .init(desiredCapabilities)
            .then(async function() {
                console.log("Driver initialized successfully");
                // Wait for app to load
                console.log("Waiting for app to load...");
                await new Promise(resolve => setTimeout(resolve, 15000)); // 10 second wait for app load
                console.log("App load wait completed");
                // Start tracking navigation
                await navigationTracker.trackNavigation();

                // First check if ACCEPT button is present
                try {
                    console.log("Looking for ACCEPT button...");
                    const acceptButton = await driver.elementByXPath("//*[@text='ACCEPT']", 5000);
                    console.log("Found ACCEPT button, proceeding with it...");
                    await navigationTracker.beforeClick("ACCEPT");
                    await acceptButton.click();
                    await navigationTracker.afterClick();
                    console.log("ACCEPT button clicked successfully");
                } catch (error) {
                    console.log("ACCEPT button not found, trying back navigation flow...");
                    // If ACCEPT not found, try back navigation
                    await driver.back();

                    // Now check for back key
                    try {
                        console.log("Looking for back key button...");
                        const backKey = await driver.waitForElementById("com.makemytrip:id/back_key", 5000);
                        console.log("Found back key button, clicking...");
                        await navigationTracker.beforeClick("back_key");
                        await backKey.click();
                        await navigationTracker.afterClick();
                    } catch (error) {
                        console.log("Back key button not found, proceeding to main navigation...");
                    }
                }
                console.log("ACCEPT button found, trying back navigation flow...");
                // If ACCEPT not found, try back navigation
                await driver.back();

                // Now check for back key
                try {
                    console.log("Looking for back key button...");
                    const backKey = await driver.waitForElementById("com.makemytrip:id/back_key", 1000);
                    console.log("Found back key button, clicking...");
                    await navigationTracker.beforeClick("back_key");
                    await backKey.click();
                    await navigationTracker.afterClick();
                } catch (error) {
                    console.log("Back key button not found, proceeding to main navigation...");
                }

                // Wait for main page to load
                console.log("Waiting for main page to load...");
                await new Promise(resolve => setTimeout(resolve, 10000));

                // Navigate to Flights
                try {
                    const flightsButton = await driver.elementByXPath("//*[@text='Flights']", 5000);
                    console.log("Found flights button by text, clicking...");
                    await navigationTracker.beforeClick("flights");
                    await flightsButton.click();
                    await navigationTracker.afterClick();
                } catch (error) {
                    console.log("Flights button not found, proceeding to next section...");
                }

                // Navigate back
                await driver.back();
                console.log("Navigated back from flights");

                // Wait for main page to reload
                await new Promise(resolve => setTimeout(resolve, 5000));

                // Navigate to Hotels
                try {
                    console.log("Looking for hotels button...");
                    const hotelsButton = await driver.elementByXPath("//*[@text='Hotels']", 5000);
                    console.log("Found hotels button by text, clicking...");
                    await navigationTracker.beforeClick("hotels");
                    await hotelsButton.click();
                    await navigationTracker.afterClick();
                } catch (error) {
                    console.log("Hotels button not found, proceeding to next section...");
                }

                // Navigate back
                await driver.back();
                console.log("Navigated back from hotels");

                // Wait for main page to reload
                await new Promise(resolve => setTimeout(resolve, 5000));

                // Navigate to Trains/Bus
                try {
                    console.log("Looking for trains/bus button...");
                    const trainsBusButton = await driver.elementByXPath("//*[@text='Trains/ Bus']", 5000);
                    console.log("Found trains/bus button by text, clicking...");
                    await navigationTracker.beforeClick("trains_bus");
                    await trainsBusButton.click();
                    await navigationTracker.afterClick();
                } catch (error) {
                    console.log("Trains/Bus button not found, proceeding to next section...");
                }

                // Navigate back
                await driver.back();
                console.log("Navigated back from trains/bus");

                // Wait for main page to reload
                await new Promise(resolve => setTimeout(resolve, 5000));

                // Navigate to Holiday Packages
                try {
                    console.log("Looking for holiday packages button...");
                    const holidayButton = await driver.elementByXPath("//*[@text='Holiday Packages']", 5000);
                    console.log("Found holiday packages button by text, clicking...");
                    await navigationTracker.beforeClick("holiday_packages");
                    await holidayButton.click();
                    await navigationTracker.afterClick();
                } catch (error) {
                    console.log("Holiday packages button not found, proceeding to next section...");
                }

                // Navigate back
                await driver.back();
                console.log("Navigated back from holiday packages");

                // Navigate to Airport Cabs
                try {
                    console.log("Looking for Airport Cabs button...");
                    const holidayButton = await driver.elementByXPath("//*[@text='Airport Cabs']", 5000);
                    console.log("Found Airport Cabs button by text, clicking...");
                    await navigationTracker.beforeClick("Airport_Cabs");
                    await holidayButton.click();
                    await navigationTracker.afterClick();
                } catch (error) {
                    console.log("Airport Cabs button not found, proceeding to next section...");
                }

                // Navigate back
                await driver.back();
                console.log("Navigated back from Airport Cabs");

                // Navigate to Outstation Cabs
                try {
                    console.log("Looking for Outstation Cabs button...");
                    const holidayButton = await driver.elementByXPath("//*[@text='Outstation Cabs']", 5000);
                    console.log("Found Outstation Cabs button by text, clicking...");
                    await navigationTracker.beforeClick("Outstation_Cabs");
                    await holidayButton.click();
                    await navigationTracker.afterClick();
                } catch (error) {
                    console.log("Outstation Cabs button not found, proceeding to next section...");
                }

                // Navigate back
                await driver.back();
                console.log("Navigated back from Outstation Cabs");

                console.log("Test completed successfully");
                // Save navigation results locally
                await navigationTracker.saveResults();
                driver.quit();
            })
            .catch(async function(error) {
                console.error("Error during test execution:", error);
                console.error("Error stack:", error.stack);
                // Save navigation results even if there's an error
                await navigationTracker.saveResults();
                driver.quit();
            });
    } catch (e) {
        console.error("Android Test Failed with error:", e);
        console.error("Error stack:", e.stack);
        driver.quit();
    }
}

runAndroidTest();