# puppeteer
1) install node js (I assume that you have)
2) install puppeteer:
Command is npm install puppeteer
3) open chrome in a custom port:
Command is: start chrome --remote-debugging-port=9222 --user-data-dir="C:\chrome-debug-profile"
4) After it opens, find the specific chrome window
Open this link: http://localhost:9222/json/version
5) Copy the "ws://localhost:9222/devtools/browser/a438787f-94d8-4f9e-8736-1234567890ab" into the code, pupper.js
6) run pupper.js
Command is: node pupper