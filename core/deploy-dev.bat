@echo off
setlocal
:PROMPT
echo This will push ana core to development
SET /P AREYOUSURE=Are you sure (Y/[N])?
IF /I "%AREYOUSURE%" NEQ "Y" GOTO END

echo pushing docker to development
docker build -t projectana/anacore:development .
docker push projectana/anacore:development

:END
echo aborting
endlocal