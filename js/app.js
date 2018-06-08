/* ************************************************************************ */
// Libs to load
/* ************************************************************************ */
//@prepros-prepend libs/jquery/jquery.min.js
//@prepros-prepend libs/countup/countup.min.js
//@prepros-prepend libs/remodal/remodal.min.js

//console.log("JavaScript libs loaded and ready");


/* ************************************************************************ */
// Init
/* ************************************************************************ */
if (typeof mcbrusselsprouts == 'undefined') {
    var mcbrusselsprouts = {};
}


/* ************************************************************************ */
// 1. Establish Main class
/* ************************************************************************ */
mcbrusselsprouts = {
    tests: {
        isUsingRetina: window.devicePixelRatio > 1,
        //isTouchDevice: Modernizr.touch,
        //isMobileDevice: $.browser.mobile
    },
    app: (function() {
        return {
            init: function() {
                this.initScripts();
                this.registerEvents();
            },

            initScripts: function() {
                // 1. Get the quote data from json
                // 2. Determine the quote to display & update url
                // 3. Count up the active indicators and set quote navigation
                // 4.
                mcbrusselsprouts.sproutdata.init();
                mcbrusselsprouts.setsprout.init();
                //mcbrusselsprouts.google.init();
                mcbrusselsprouts.sproutpager.init();
                //mcbrusselsprouts.shareTwitter.init();
                //mcbrusselsprouts.shareInstagram.init();
                //mcbrusselsprouts.shareFacebook.init();

                // Modal text
                // Set color scheme with fades and other animations
                //
            },

            registerEvents: function() {

                // Stop the hash, man
                $(document).on("click", "a[href='#']", function(e) {
                    e.preventDefault();
                });

            }
        };
    })()
};


/* ************************************************************************ */
// 2. Load the quote data JSON or XML file or whatever
/* ************************************************************************ */
mcbrusselsprouts.sproutdata = (function(){

    var sprouts = [];
    var sproutqty = 0;

    return {
        init: function() {

  		    // Load the data from json and create a data array so we don't have to reload the page
          $.getJSON( "data/data.json", function( data ) {
            $.each( data, function( key, val ) {
              sprouts.push(val);
              sproutqty++;
            });
            // console.log( "json found" );
          })
          .done( function() {
            // console.log( "json loaded" );
            // console.log(sproutdata);
            // console.log( sproutdata.length );
            // console.log(sproutdata[0].sprout_id);
            // console.log(sproutdata[0].sprout);
            // console.log(sproutdata[0].sprout_commentary);
            // console.log(sproutdata[0].sprout_image);

            // Check the url for a query string quote parameter, convert it to a number
            var searchParams = new URLSearchParams(window.location.search);     // ?sprout=123
            currentSprout = Number( searchParams.get("sprout") );               // 123

            //console.log("Query string: " + searchParams);
            //console.log("Query string value: " + currentSprout + " (" + typeof currentSprout + ")");

            // Magic quote 8 ball of questionable inspirations
            //
            //
            //
            // Data is ready - select a starting quote, based on query string if available
            // Catch a bad value if random query strings are tried
            if ( isNaN(currentSprout) || currentSprout == 0) {
              //console.log("Query string is NaN or 0 or no query string found.");
              mcbrusselsprouts.setsprout.selectSprout();
            } else {
              //console.log("Query string to load " + currentSprout);
              mcbrusselsprouts.setsprout.selectSprout( currentSprout );
            }
            //
            //
            //
            //

          })
          .fail( function() {
            //console.log( "json error" );
          });
        },

        // ------------------------------------------------------------
        // Return the total sprout data count
        // Usage: mcbrusselsprouts.sproutdata.getSproutQty()
        getSproutQty: function() {
          // console.log("getSproutQty: " + sproutqty);
          return sproutqty;
        },

        // ------------------------------------------------------------
        // Return the active quote based on the passed ID
        // Usage: mcbrusselsprouts.sproutdata.getSprout(ID)
        getSprout: function(n) {
          var chosensprout = (n > sproutqty) ? sproutqty - 1 : n - 1;
          if (chosensprout < 0) chosensprout = 0;
          // console.log("getSprout: " + sprouts[chosensprout].sprout);
          return sprouts[chosensprout].sprout;
        },

        // ------------------------------------------------------------
        // Return the sprout commentary based on ID
        // Usage: mcbrusselsprouts.sproutdata.getSproutCommentary(ID)
        getSproutCommentary: function(n) {
          var chosensprout = (n > sproutqty) ? sproutqty - 1 : n - 1;
          if (chosensprout < 0) chosensprout = 0;
          // console.log("getSproutCommentary: " + sprouts[chosensprout].sprout_commentary);
          return sprouts[chosensprout].sprout_commentary;
        },

        // ------------------------------------------------------------
        // Return the sprout image based on ID
        // Usage: mcbrusselsprouts.sproutdata.getSproutImage(ID)
        getSproutImage: function(n) {
          var chosensprout = (n > sproutqty) ? sproutqty - 1 : n - 1;
          if (chosensprout < 0) chosensprout = 0;
          // console.log("getSproutImage: " + sprouts[chosensprout].sprout_image);
          return "/img/" + sprouts[chosensprout].sprout_image;
        },

        // ------------------------------------------------------------
        // Return the sprout commentary based on ID
        // Usage: mcbrusselsprouts.sproutdata.getSproutImage(ID)
        getSproutColors: function(n) {
          var chosensprout = (n > sproutqty) ? sproutqty - 1 : n - 1;
          if (chosensprout < 0) chosensprout = 0;
          // console.log("getSproutColors: " + sprouts[chosensprout].sprout_colors);
          return sprouts[chosensprout].sprout_colors;
        }

    };
})();


/* ************************************************************************ */
// 3. Set the active quote based on data and url
/* ************************************************************************ */
mcbrusselsprouts.setsprout = (function(){

    var currentSprout;

    return {
        init: function() {

          // Not much here in the init

        },

        // ------------------------------------------------------------
        // Chooses a quote; random, day, or query string
        // Functions are called later after data has loaded from mcbrusselsprouts.quotedata
        // Usage: mcbrusselsprouts.setsprout.selectQuote(ID)
        selectSprout: function(n) {

          // Animate everything out, then when complete animate everything in
          //$( ".quote-display--line" ).addClass( "grow-wide-out" );

          // Block interactions until transitions are completed
          $( ".quote-display--random a" ).addClass( "disabled" );
          $( ".quote-display--previous a" ).addClass( "disabled" );
          $( ".quote-display--next a" ).addClass( "disabled" );

          // Make sure the cover is fully transparent to fade in on first load
          $( "#background-stub" ).fadeOut(0);

          // Hide the loading text - simply changing the text kills the fade animation on mobile
          //$( ".quote-text--loading-by-da-way" ).addClass( "fade-out" );

          // Shortcut helper
          var sproutQty = mcbrusselsprouts.sproutdata.getSproutQty();

          // 1. Choose a sprout by number n
          // 2. Choose a sprout randomly if neither n or query string is provided
          // If a value is passed into the function, trump the other random/query string
          // console.log("Sprout " + n + " vs. qty. " + sproutQty);
          if (n && (n > 0 && n <= sproutQty)) {
            currentSprout = n;
            // console.log("Selecting sprout " + n);
          } else {
            currentSprout = Math.floor( Math.random() * sproutQty + 1);
            // console.log("Grab random sprout " + currentSprout + " of " + ( sproutQty ));
          }

          // Remove the current texts
          $( ".background--quote" ).removeClass( "fade-in" );
          $( ".background--quote" ).addClass( "fade-out" );
          //$( ".quote-text--by-da-way" ).removeClass( "fade-in" );
          //$( ".quote-text--by-da-way" ).addClass( "fade-out" );
          $( ".quote-text--by-da-way" ).fadeOut(500);
          $( ".foreground--quote" ).removeClass( "fade-in" );
          $( ".foreground--quote" ).addClass( "fade-out" );

          // $( ".quote-display--line" ).addClass( "grow-wide-out" );

          // Cover the fadey bits with the new background color, and swap and fade out when ready
          // document.getElementById("background--stub").style.opacity = "0";
          $( "#background-stub" ).addClass( mcbrusselsprouts.sproutdata.getSproutColors(currentSprout) );
          $( "#background-stub" ).fadeIn( 500, function() {

              // Anything out of range is covered in the functions from the sproutdata functions
              // console.log("Loading sprout no.: " + currentSprout);
              // console.log("Sprout: " + mcbrusselsprouts.sproutdata.getSprout(currentSprout));
              // console.log("Sprout commentary: " + mcbrusselsprouts.sproutdata.getSproutCommentary(currentSprout));
              // console.log("Sprout image: " + mcbrusselsprouts.sproutdata.getSproutImage(currentSprout));

              // Update the main foreground quote with the new content
              $( "#quote-small" ).text( mcbrusselsprouts.sproutdata.getSprout(currentSprout) );

              // Update the background quote with the new content
              $( "#quote-large" ).text( mcbrusselsprouts.sproutdata.getSprout(currentSprout) );

              // Update the counter with the current number, change previous next numbers to correct info
              mcbrusselsprouts.sproutpager.updateCount(currentSprout);

              // Enable this if you want to see the previous and next numbers somewhere
              // var sproutPreviousDisplay = ( currentSprout - 1 < 1 ) ? sproutQty : currentSprout - 1 ;
              // $( "#sprout-previous" ).text( sproutPreviousDisplay );
              // var sproutNextDisplay = ( currentSprout + 1 > sproutQty ) ? 1 : currentSprout + 1;
              // $( "#sprout-next" ).text( sproutNextDisplay );

              // Show the total available sprouts - only need this once
              $( "#sprout-total" ).text( sproutQty );

              // Update the modal with the new content
              $( "#modal-content" ).text( mcbrusselsprouts.sproutdata.getSproutCommentary(currentSprout) );

              // Update the visuals
              $( "body" ).removeClass();
              $( "body" ).addClass( mcbrusselsprouts.sproutdata.getSproutColors(currentSprout) );

              // Remove the stub since the background is now the correct one
              $( "#background-stub" ).fadeOut(0);
              $( "#background-stub" ).removeClass();

              // update and fade in the new text
              //setTimeout(function(){

                // Change the By da way
                $( ".quote-text--by-da-way" ).text( "By da way..." );

                $( ".background--quote" ).removeClass( "fade-out" );
                $( ".background--quote" ).addClass( "fade-in" );
                //$( ".quote-text--by-da-way" ).removeClass( "fade-out" );
                //$( ".quote-text--by-da-way" ).addClass( "fade-in" );
                $( ".quote-text--by-da-way" ).fadeIn(500);
                $( ".foreground--quote" ).removeClass( "fade-out" );
                $( ".foreground--quote" ).addClass( "fade-in" );

              //}, 750);

              // Hide the extra info modal if there is no added data
              if ( mcbrusselsprouts.sproutdata.getSproutCommentary(currentSprout) == "" ) {
                $( ".quote--info" ).hide();
              } else {
                $( ".quote--info" ).show();
              }

              // Load image SVG form the img folder if available. Apply any styling and other positioning
              //$( "#quote-illustration" ).load( mcbrusselsprouts.sproutdata.getSproutImage(currentSprout) );

              // Return interactions after a second or two
              setTimeout(function(){
                $( ".quote-display--random a" ).removeClass( "disabled" );
                $( ".quote-display--previous a" ).removeClass( "disabled" );
                $( ".quote-display--next a" ).removeClass( "disabled" );
              }, 1000);


              // Push the new sprout ID into the browser (without reload) to make bookmarking or sharing easy
              if (history.pushState) {
                var updatedurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?sprout=' + currentSprout;
                window.history.pushState({path:updatedurl},'',updatedurl);
              }

              // Animate everything in, re-enable interactions, add fade-in classes to all the things
              // quote-display fade-in
              // quote-display--line grow-wide-in
              // foreground--quote fade-in"
              // background--quote fade-in
              //

          });

        },

        // ------------------------------------------------------------
        // Return the active quote based on the passed ID
        // Usage: onClick="mcbrusselsprouts.setsprout.selectPreviousSprout()"
        selectPreviousSprout: function() {
          var n = currentSprout - 1;
            if ( n < 1 ) {
            n = mcbrusselsprouts.sproutdata.getSproutQty();
          }
          // console.log("Selecting previous sprout " + n);
          mcbrusselsprouts.setsprout.selectSprout( n );
        },

        // ------------------------------------------------------------
        // Return the active quote based on the passed ID
        // Usage: onClick="mcbrusselsprouts.setsprout.selectNextSprout()"
        selectNextSprout: function() {
          var n = currentSprout + 1;
          if ( n > mcbrusselsprouts.sproutdata.getSproutQty() ) {
            n = 1;
          }
          // console.log("Selecting next sprout " + n);
          mcbrusselsprouts.setsprout.selectSprout( n );
        },

        // ------------------------------------------------------------
        // clipboard js to copy and send URL to someone
        //

    };
})();


/* ************************************************************************ */
// Twitter quote (plus image?) share
/* ************************************************************************ */
mcbrusselsprouts.shareTwitter = (function(){
    return {
        init: function() {



        }
    };
})();


/* ************************************************************************ */
// Instagram image share
/* ************************************************************************ */
mcbrusselsprouts.shareInstagram = (function(){
    return {
        init: function() {



        }
    };
})();


/* ************************************************************************ */
// Facebook quote (plus image?) share
/* ************************************************************************ */
mcbrusselsprouts.shareFacebook = (function(){
    return {
        init: function() {



        }
    };
})();



/* ************************************************************************ */
// Google analytics helpers
/* ************************************************************************ */
mcbrusselsprouts.google = (function(){
    return {
        init: function() {

  		    $('[data-ga-label][data-ga-category]').on('click', function(e) {
  		        var $this = $(this),
  		            label = $this.attr('data-ga-label'),
  		            cat = $this.attr('data-ga-category');
  		        ga('send',{'hitType':'event','eventCategory':cat,'eventAction':'click','eventLabel':label});
  		    });

        }
    };
})();


/* ************************************************************************ */
// Sproutpager script to animate the numbers - https://github.com/inorganik/CountUp.js
/* ************************************************************************ */
mcbrusselsprouts.sproutpager = (function(){

    var currentQuoteCounter;

    return {
        init: function() {

          // Just something random to get this started
          var rnd = Math.floor(Math.random() * 200) + 1;

          // Assign values
          /*
          var startVal = document.getElementById('startVal').value;
	        var endVal = document.getElementById('endVal').value;
          var oldStartVal = document.getElementById('startVal').value;
        	var oldEndVal = document.getElementById('endVal').value;
        	document.getElementById('startVal').value = oldEndVal;
        	document.getElementById('endVal').value = oldStartVal;
          */

          // Additional options
          // Easing, grouping, separator, decimals
          var options = {
            useEasing: true,
            useGrouping: false,
            separator: '',
            decimal: '',
          };

          // targetID, beginning number, ending number, decimals, duration, option array above
          currentQuoteCounter = new CountUp('current-sprout', 0, 0, 0, 2, options);

          // Init the counter if it doesn't have an error
          if (!currentQuoteCounter.error) {
            // Target within this function
            this.startCount();
            // This also works if targeting from outside this function
            // mcbrusselsprouts.sproutpager.startcount();
          } else {
            console.error(currentQuoteCounter.error);
          }

        },

        // ------------------------------------------------------------
        // Start the counter - called from above
        // Usage: mcbrusselsprouts.sproutpager.startcount();
        startCount: function() {
          currentQuoteCounter.start();
        },

        // ------------------------------------------------------------
        // Update the counter with a new value
        // Usage: onClick="mcbrusselsprouts.sproutpager.updatecount(40)"
        updateCount: function(n) {
          if ( typeof n === 'undefined' ) { n = 0 };
          currentQuoteCounter.update(n);
        },

        // ------------------------------------------------------------
        // Update the counter with a new value - not really used
        // Usage: onClick="mcbrusselsprouts.sproutpager.updateCountRandom()"
        updateCountRandom: function() {
          var rnd = Math.floor( Math.random() * mcbrusselsprouts.sproutdata.getSproutQty() ) + 1;
          currentQuoteCounter.update(rnd);
        }

    };
})();


/* ************************************************************************ */
// Press RUN button on your TG16 controller
/* ************************************************************************ */
$(function() {
    console.log("McBrusselSprouts app ready");
    mcbrusselsprouts.app.init();
});

$(document).ready(function($) {
    //
});
