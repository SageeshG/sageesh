# Knightfall — Knightfall AI & Proof-Carrying Financial Analytics

> **Motto:** *"Math with receipts. Every insight carries its proof."*

A modern, high-performance web experience and autonomous data analyst system built for financial and multi-table integrity verification.

---

## 1. How to Run the Website (Knightfall AI UI)

The dev server is live on `http://127.0.0.1:5173/`.

To launch or restart the web application in Antigravity IDE:
```powershell
$env:PATH = "C:\Program Files\nodejs;" + $env:PATH
npm run dev
```

Then open [http://127.0.0.1:5173/](http://127.0.0.1:5173/) in your browser:
1. Click **"Knightfall AI"** in the top navigation bar (liquid mesh glowing pill) or click **"See Features"** in the hero footer.
2. The liquid-mesh dark theme Knightfall AI modal opens with:
   - **Liquid Mesh UI**: Deep dark aesthetic with ambient animated fluid mesh gradients and caustic highlights.
   - **Quick Run Suggestion Chips**: 1-click execution for Net Revenue, Duplicates, Top Spender, FX Rates, Discrepancies, and Trick Traps.
   - **Natural Language Search Bar**: Ask any question about revenue, orders, customers, or data traps.
   - **Formal Proof Receipt**: Live mathematical verdict, step-by-step audit, 7-trap checkmarks, and cryptographic SHA-256 receipt.
   - **Active Data Tables**: Multi-table inspector showing raw transactions, highlighted duplicates, and cross-table conflicts.
   - **Verifier Python Code**: Copy and run reproducible verification scripts.
3. Click **"Add Files"** in the top navigation bar (`+` pill) to drag-and-drop your own CSV or JSON files, audit them for the 7 traps, and transfer directly to Knightfall AI.
4. Click **"AI Query"** in the top navigation bar to see core questions mapped to the proof engine.

---

## 2. How to Run Knightfall AI in Antigravity IDE Terminal (CLI)

You can run the autonomous proof-carrying analyst directly from the Antigravity IDE terminal using the built-in runner scripts:

### Option A: Interactive CLI Mode (Ask Any Question)
```powershell
.\run_analyst.ps1
```
*(or in Windows CMD:* `run_analyst.bat`*)*

### Option B: Run Full 12-Test Trap & Math Validation Suite
```powershell
.\run_analyst.ps1 --test-all
```

### Option C: Ask a Specific Question Directly
```powershell
.\run_analyst.ps1 "What is the net completed revenue in USD across all orders?"
.\run_analyst.ps1 "Who is the top customer by spend?"
.\run_analyst.ps1 "What is the revenue discrepancy between CRM and Finance?"
.\run_analyst.ps1 "What was our net profit in Q5?"
```

*(These runners automatically connect to Python 3.12 at `C:\Users\Lenovo\AppData\Local\Programs\Python\Python312\python.exe` or your system PATH).*

---

## 3. The Two Golden Rules & 7 Traps Handled

1. **Rule 1 (Proof-Carrying Math):** Every number comes with self-contained, working, re-runnable Python code.
2. **Rule 2 (Controlled Refusal):** When questions are contradictory, non-existent, or trick questions (e.g. Q5 or Campaign Zeta), the AI safely refuses with mathematical justification.
