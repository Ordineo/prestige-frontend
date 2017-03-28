start /min cmd /c node src/app/shared/gatekeeper/server.js
start /min cmd /c "%ProgramFiles%\MongoDB\Server\3.4\bin\mongod.exe" --dbpath data
start /min cmd /c node-red
start /min cmd /c ng serve
