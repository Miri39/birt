# birt roadmap

Human-owned wish list. The planner agent turns these lines into tickets, at most 2 per day, only when fewer than 3 tickets are ready. Add or remove lines through a pull request. One wish per line. Take wishes from the top, and each wish may rely only on wishes above it. Do not reword a line that already has a ticket.

Rules for the daily scene: everything is computed in the browser from the date with a seeded random function, with no server, no API key and no rebuild. Scripts live in src/assets/ as plain scripts that expose their functions on window and also set module.exports when module exists, so tests can require them. Data files are JSON under src/assets/data/ and scripts load them with fetch using the base path from the data-base attribute on body. The only allowed external request is the Open-Meteo weather call. "Today" means the date in Europe/Bucharest.

- An RSS feed at /feed.xml
- sitemap.xml and robots.txt
- A print-friendly stylesheet
- Dark mode that follows prefers-color-scheme
- A skip-to-content link and visible keyboard focus styles
- A footer with a link to the repository
- A responsive layout with a viewport meta tag that works at 360 px wide, and a shared navigation bar in src/_includes/base.njk linking Home, Archive, Characters, Menu, Stats and About
- A custom 404 page
- An about page explaining that agents build and maintain the site and that a human only approves production deploys
- Home page with two sections: #table-terrace with data-outdoor="true" and #table-inside, each with a heading and a ul.seats of 4 li.seat elements, and Inside has one extra li.seat with data-rain-seat that is hidden by default in CSS
- A noscript message on the home page saying the daily scene needs JavaScript, and the page still shows both tables
- src/assets/weather.js with a pure function isRaining(apiResponse) that is true when current precipitation or rain is above 0, and false for dry or malformed input, with tests for rain, dry and malformed input
- In src/assets/weather.js, a browser function that fetches current weather for Timisoara (latitude 45.7489, longitude 21.2087) from api.open-meteo.com with a 5 second timeout, treats any error as not raining, and sets data-raining on the html element
- CSS rules: when html[data-raining="true"], #table-terrace is hidden and the data-rain-seat seat at Inside is shown
- A status line on the home page, "Raining in Timisoara: yes or no, checked at <time>", filled in by the weather script
- A simple CSS rain effect shown only when html[data-raining="true"] and disabled under prefers-reduced-motion
- src/assets/data/characters.json with 12 characters, each with id, name, job, money (number), traits (list of 3), interests (list of 3) and drunkLikelihood between 0 and 1
- A test that checks characters.json has unique ids, all required fields and valid drunkLikelihood values
- Add 12 more characters to src/assets/data/characters.json with varied jobs, money levels, ages and personalities
- Each character in characters.json gets friends and rivals as lists of ids, and a test that every referenced id exists and nobody is their own friend or rival
- src/assets/rng.js with hashString(text) and a seeded random function seededRandom(seedText) that returns a function giving numbers in [0,1), with tests that the same seed gives the same sequence and different seeds differ
- src/assets/calendar.js with todayInBucharest() using Intl, and dateRange(startDate, endDate) returning YYYY-MM-DD strings, with tests
- src/assets/data/holidays.json with Romanian public holidays for 2026 and 2027 as YYYY-MM-DD strings: 1 and 2 Jan, 6 and 7 Jan, 24 Jan, Orthodox Good Friday, Easter Sunday and Easter Monday (2026: 10, 12 and 13 April; 2027: 30 April, 2 and 3 May), 1 May, Orthodox Pentecost Sunday and Monday (2026: 31 May and 1 June; 2027: 20 and 21 June), 1 June, 15 Aug, 30 Nov, 1 Dec, 25 and 26 Dec
- In src/assets/calendar.js, isDiscountDay(dateString, holidays) that is true on Saturdays, Sundays and listed holidays, with tests for a weekday, a weekend and a holiday
- src/assets/data/config.json with startDate "2026-12-01", and a rule that the archive never shows dates before startDate or after today
- src/assets/seating.js with seatDay(dateString, characters, seatCounts) that picks different characters for terrace and inside using the seeded random function, never the same character at both tables, with tests for determinism and for variety over 30 dates
- Seating gives Inside one extra seat that is filled by a seeded pick and is only shown when it rains, so the seated list is the same whether or not it rains
- A character card component (HTML built by a function in src/assets/cards.js) showing name, job, money, traits and interests, with tests on the generated HTML
- The home page fills each table with today's seated characters using the character cards
- src/assets/data/topics.json with 30 discussion topics, each with id, title and a list of 3 opening question templates, and a function pickTopic(dateString, tableId) that gives different topics at the two tables on the same day
- A drunk roll function rollDrunk(dateString, character, discountDay) that is deterministic, uses drunkLikelihood and multiplies it by 2.5 on discount days, with tests on rates over 365 simulated days
- A drunk badge on character cards and a distinct CSS style for drunk characters
- A discount banner on the home page on discount days, saying why (weekend or the holiday)
- src/assets/data/phrases.json with sentence templates per trait (at least 15 traits used in characters.json, 3 templates each), using placeholders for the name, the topic and another character
- A function lineFor(character, topic, day, otherCharacter) that deterministically picks a template for one of the character's traits and mentions their job, money or an interest, with tests for determinism and for no unfilled placeholders
- A function drunkify(text, seedText, level) that deterministically stretches vowels, adds hiccups and swaps a few words, and src/assets/data/drunk-phrases.json with 20 odd phrases, with tests that sober text is unchanged and drunk text differs
- A function conversationFor(dateString, tableId, seated, topic) returning 8 to 12 lines in order, where drunk characters use drunkify and drunk phrases, with tests for determinism and line count
- The home page shows today's conversation at each table under the seated characters
- A function postFor(dateString, tableId) returning a title, a short summary paragraph and the conversation, written deterministically from the topic, the participants and who was drunk, with tests
- A day page at /day/ that reads ?date=YYYY-MM-DD&table=terrace or inside, shows the post and its participants, and shows a clear message for dates before startDate or in the future
- An archive page at /archive/ that lists every date from startDate to today, newest first, with links to both tables' posts
- A character profile page at /character/ that reads ?id=, shows the card, friends and rivals, and the days they appeared at a table since startDate
- src/assets/data/menu.json with 10 drinks and 6 snacks with prices in RON, and a menu page at /menu/ that shows a discounted price column on discount days
- Orders: a function ordersFor(dateString, character, drunk, menu) that picks drinks and snacks from the money of the character and whether they are drunk, and the post shows a total bill per table
- A stats page at /stats/ computed from the archive range showing how often each character was drunk, how often it rained at the archive dates it knows about as unknown, the number of discount days, and the busiest table
