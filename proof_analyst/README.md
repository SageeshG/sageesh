# HNX26PSI08: Proof-Carrying Data Analyst (Agentic GenAI)

> **Motto:** *"Math with receipts. Every insight carries its proof."*

This repository implements the complete solution for **HNX26PSI08: Proof-Carrying Data Analyst**, addressing real-world messy multi-table data with deterministic verification code, zero hallucination, and controlled refusal.

---

## 1. Problem Overview & Core Philosophy

In real-world data analytics, an LLM making up a confident, incorrect number is disastrous. 

### The Two Golden Rules:
1. **Rule 1 (Proof-Carrying Math):** Every number must come with self-contained, working, re-runnable code. The verifier executes the code independently; if the code fails or outputs a different answer, the agent scores 0.
2. **Rule 2 (Controlled Refusal):** When data is ambiguous, contradictory, or missing, the agent **must refuse**: *"I cannot determine this from the data because..."* with exact mathematical justification. A confident wrong answer scores worse than an honest, reasoned refusal.

---

## 2. The 7 Traps Handled

| # | Trap | Example in Data | Agent's Defensive Behavior |
|---|------|-----------------|----------------------------|
| **1** | **Units Don't Match** | Mixed `$ USD` and `€ EUR` in `orders_messy.csv` | Flags currency mismatch; joins `fx_rates.csv` to normalize into USD before summing. |
| **2** | **Dates are Ambiguous** | Mixed formats (`YYYY-MM-DD` vs `DD/MM/YYYY`) | Enforces ISO 8601 parsing; flags month/day ambiguities. |
| **3** | **Rows are Duplicated** | `ORD-102` & `ORD-106` duplicated in transactions | Applies deduplication on primary keys (`order_id`) with audit count. |
| **4** | **Tables Contradict Each Other** | `crm_sales.csv` ($3.55M) vs `finance_ledger.csv` ($3.17M) | **Safely Refuses**: Rejects guessing when two authoritative sources conflict without an audit reconciliation trail. |
| **5** | **Critical Data Missing** | Blank/null `customer_id` (ORD-104) | Identifies missing values and flags whether they impact the aggregate calculation. |
| **6** | **Question Has No Valid Answer** | "What was conversion for marketing campaign Zeta?" | **Safely Refuses**: Proves entity `Zeta` is missing from all registered tables. |
| **7** | **Question Designed to Trick** | "What was the revenue in Q5?" | **Safely Refuses**: Highlights that fiscal calendar contains only Q1 through Q4. |

---

## 3. How to Run in Antigravity IDE

You can run the autonomous Proof-Carrying Analyst directly from the Antigravity IDE terminal.

### Mode A: Interactive Ask-Me-Anything Mode (CLI REPL)
Type any question interactively in the terminal:
```powershell
.\run_analyst.ps1
# or in CMD:
run_analyst.bat
```
Example session:
```text
Ask Question > Who is the top customer?
VERDICT: MATHEMATICALLY_PROVEN
ANSWER:  Top Customer: CUST-05 ($500.00 USD)
PROOF HASH: 6269dec928b02f4541483827b774605162ee157e357a4cccc023b6025d1d322c

Ask Question > What was the revenue in Q5?
VERDICT: SAFELY_REFUSED
ANSWER:  I cannot determine this from the data.
REASON:  Trap #7 [Trick Question]: Non-existent time period requested (e.g. Q5 or future period).
```

### Mode B: Direct Single-Query Execution
Pass any question directly as a command-line argument:
```powershell
.\run_analyst.ps1 "What is the average completed order value?"
.\run_analyst.ps1 "What are the details for ORD-102?"
.\run_analyst.ps1 "What is the revenue discrepancy between CRM and Finance?"
```

### Mode C: Full 12-Test Trap & Math Validation Suite
```powershell
.\run_analyst.ps1 --test-all
```

*(Uses Python standard library with SQLite3 in-memory engine — zero external dependencies needed!)*

---

## 4. How to Use on the Website

The agent is fully integrated into your **Knightfall** landing page:
1. Click **"Cognitive AI"** in the top navigation bar (it has a pulsing green indicator).
2. Or click **"See Features"** in the hero footer.
3. An interactive modal opens with:
   - **Ask Any Question Search Bar:** Type any question in natural language (order lookups, customer metrics, currencies, revenue, traps).
   - **Question Explorer Tab:** Browse 20 curated questions grouped into 6 categories (Revenue, Orders, Customers, FX, Discrepancies, Traps). Click any card to instantly verify.
   - **Quick Actions:** Click **"Test With Trap"** or **"Random Query"** to challenge the AI.
   - **Formal Proof Receipt Tab:** Displays the verified verdict, human answer, execution trace, 7-trap audit checkmarks, and cryptographic SHA-256 receipt.
   - **Messy Multi-Tables Inspector Tab:** View the raw data tables with highlighted duplicate rows, currency badges, and table contradictions.
   - **Verifier Code Viewer Tab:** View and copy the exact Python script that checks the math.
   - **"Verify Answer" Live Button:** Re-runs the sandbox evaluation in real time.
