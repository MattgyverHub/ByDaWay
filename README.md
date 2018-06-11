# ByDaWay
Questionably inspirational quotes, whether you care to know them or not. These are quotable sayings from that "one guy at work" that leave us laughing, confused, angry, or just plain dumb-founded. More of a joke than anything else, this site could be repurposed for anything that delivers random quotes (json async data) with more details loaded into a modal.

# What This Is
This is a simple randomized quote website to serve up the bonkers stuff my co-worker says. The website uses jQuery and a simple json file to load the quotes. JS handles randomizing the quotes, loading specific quotes via query string, applying color styling to elements, and more.

# Plugins & Tech
- Scripting: jQuery
- Modals: Remodal
- Number animation: Countup
- CSS: Mostly custom, uses Bourbon Neat for the responsive structure, also Normalize for general misc.
- Quotes: 100% crazy talk from the guy at work. Seriously can't make this stuff up.
- Build process: I'm using PrePros for the build process. Small site, so no need to Gulp this.

# Future Improvements
- Would love to redo the css a bit and use variables rather than all the unique style blocks. The background is a gradient and needs a cross-fade, so I was scratching my head for a while. Just decided to hard code vars and not throw more things into the js.
- The Google event triggers might need to be redone a little. I updated the tracking code overall, but these may not work.
- When the link is shared, include the actual text of the current sprout number. Can this be a screenshot? Right now it's just a Deadpool 2 major spoiler because the storyteller is a an idiot potato-brain and doesn't realize he spoils things until the words leave his big dumb mouth.
- Register a service worker to make the Google machine happy.
- Redo icons to have a solid background.
- Update the splash screen and other progressive web app misc: https://developers.google.com/web/tools/chrome-devtools/progressive-web-apps
