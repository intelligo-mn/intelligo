@echo off
setlocal
:PROMPT
echo This will push ana core to production
SET /P AREYOUSURE=Are you sure (Y/[N])?
IF /I "%AREYOUSURE%" NEQ "Y" GOTO END

echo pushing docker to production
docker build -t projectana/anacore:latest .
docker push projectana/anacore:latest

:END
echo aborting
endlocal