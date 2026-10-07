# PowerShell launcher for Knightfall Proof-Carrying Cognitive AI
param(
    [Parameter(ValueFromRemainingArguments = $true)]
    [string[]]$Arguments
)

$pythonExe = $null

# 1. Check known install location
$knownPath = "C:\Users\Lenovo\AppData\Local\Programs\Python\Python312\python.exe"
if (Test-Path $knownPath) {
    $pythonExe = $knownPath
}
# 2. Check if python is in PATH
elseif (Get-Command python -ErrorAction SilentlyContinue) {
    $pythonExe = "python"
}
# 3. Check py launcher
elseif (Get-Command py -ErrorAction SilentlyContinue) {
    $pythonExe = "py"
}

if (-not $pythonExe) {
    Write-Error "Python 3 was not found. Please install Python 3.10+ or check your PATH."
    exit 1
}

$scriptPath = Join-Path $PSScriptRoot "proof_analyst\analyst_agent.py"
if ($Arguments.Count -eq 0) {
    & $pythonExe $scriptPath "--interactive"
} else {
    & $pythonExe $scriptPath @Arguments
}
