/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */

        it('are defined', function() {
            //test that the allFeeds array is defined and that its length is
            //not empty
            expect(allFeeds).toBeTruthy();
        });

        it('URLs are defined', function () {
            allFeeds.forEach(function (t) {
                //test that each item in allFeeds has a url property defined
                //and that it is not empty
                expect(t.url).toBeTruthy();
            });
        });

        it('URLs are defined', function () {
            allFeeds.forEach(function (t) {
                //test that each item in allFeeds has a name property defined
                //and that it is not empty
                expect(t.name).toBeDefined();
                expect(t.name.length).not.toBe(0);
            });
        });
    });


    /* TODO: Write a new test suite named "The menu" */

    describe('The menu', function () {
        var $body = $("body");
        var $menuIcon = $(".menu-icon-link");

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

        it('is hidden by default', function () {
            //test that the body has the menu-hidden class by default
            expect($body.hasClass("menu-hidden")).toBe(true);
        });



         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */

        it('the menu changes visibility when clicked', function () {
            //test that a click event on the menu icon toggles the
            //menu-hidden class
            $menuIcon.click();
            expect($body.hasClass("menu-hidden")).toBe(false);
            $menuIcon.click();
            expect($body.hasClass("menu-hidden")).toBe(true);

        });


    });

    /* TODO: Write a new test suite named "Initial Entries" */

    describe('Initial Entries', function () {

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

        beforeEach(function (done) {
            //use beforeEach and done() to call async loadFeed function
            loadFeed(0, done);
        });

        it('.feed container contains an .entry element', function (done) {
            //test that the .feed element contains a .entry element
            expect($(".feed .entry").length).toBeGreaterThan(0);
            done();
        });
    });


    /* TODO: Write a new test suite named "New Feed Selection" */


    describe('New Feed Selection', function () {

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

        var $entryContentFirst,
            $entryContentSecond;



        beforeEach(function (done) {
           loadFeed(0, function () {
               $entryContentFirst = $('.feed').html();
               loadFeed(1, function () {
                   $entryContentSecond = $('.feed').html();
                   done();
               })
           })
        });


        it('when new feed is loaded content changes', function (done) {
            //test whether the .feed content assigned by the first loadFeed
            //call is different from the content assigned by the second call
            expect($entryContentFirst).not.toBe($entryContentSecond);
            done();
        });

    });

});

