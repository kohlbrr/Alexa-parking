# Alexa-parking
Alexa skill to keep track of NYC Alternate Side Parking

### Thesis Statement

Parking in NYC is not a particularly fun experience. One of the key reasons for this is Alternate Side Parking (ASP) rules. Something that I do every day is check to see if ASP is in effect, so I know A) If I need to move my car and B) if I can park in a 'today' spot without fear of getting a ticket. This Alexa app was concieved to make this process easier.

### Feature List
- Get up-to-date information if ASP is in effect **DONE**
  - Get Alexa to pronounce 'alternate' correctly **DONE**
  - Contextual response ( >4PM ? Today ASP : Tomorrow ASP) **DONE-ish**
- Query check if ASP rules are in effect for a given day
  - Today **DONE**
  - Tomorrow **DONE**
  - Arbitrary day
- Cache ASP data to increase responsiveness of the skill and support scaling*

*This is also to alleviate a problem where the 311 API times out (either through an API timeout, or the response time exceeds the lifecycle of the Lambda)

**Stretch Goals**
- Know where one is parked
  - Be able to take in Day and Time one would need to leave a spot
  - Look ahead to see when the next time is a car would need to be moved from the entered spot
  - Report this to the user on call of the app in addition to ASP status
