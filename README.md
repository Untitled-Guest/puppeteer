# puppeteer
1) install node js (I assume that you have)
2) install puppeteer:
Command is npm install puppeteer
the folder "node_modules" should be created
3) open chrome in a custom port, from your command prompt:
Command is: start chrome --remote-debugging-port=9222 --user-data-dir="C:\chrome-debug-profile"
4) After it opens, find the specific chrome window
Open this link: http://localhost:9222/json/version
5) Copy the webSocketDebuggerUrl
Format is: "ws://localhost:9222/devtools/browser/a438787f-94d8-4f9e-8736-1234567890ab"
into the code, pupper.js
6) Open drednot leaderboard and pass the verification
7) run pupper
Command is: node pupper

EXTRA) Wait for some time for the verification to run (idk what is suitable)