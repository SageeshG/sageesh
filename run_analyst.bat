@echo off
setlocal

rem Check if python is in PATH
where python >nul 2>&1
if %ERRORLEVEL% equ 0 (
    python "%~dp0proof_analyst\analyst_agent.py" %*
    goto :eof
)

rem Check known Python 3.12 install location
if exist "C:\Users\Lenovo\AppData\Local\Programs\Python\Python312\python.exe" (
    "C:\Users\Lenovo\AppData\Local\Programs\Python\Python312\python.exe" "%~dp0proof_analyst\analyst_agent.py" %*
    goto :eof
)

rem Check py launcher
where py >nul 2>&1
if %ERRORLEVEL% equ 0 (
    py -3 "%~dp0proof_analyst\analyst_agent.py" %*
    goto :eof
)

echo [ERROR] Python 3 was not found. Please install Python or ensure it is in your PATH.
exit /b 1
