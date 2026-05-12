# SECURITY.md  
Axodus Dashboard • Security Policy  
_Last updated April 21 2025_

---

## Supported Versions

| Component / Branch | Version Range | Status |
| ------------------ | ------------- | ------ |
| **Dashboard Front‑end** | `>= 5.1.0` | :white_check_mark: Supported |
| | `5.0.x` | :x: End‑of‑life |
| | `4.0.x` | :white_check_mark: Supported (LTS) |
| | `< 4.0` | :x: Unsupported |
| **API / Back‑end** | `>= 2.0` | :white_check_mark: |
| | `< 2.0` | :x: |
| **Smart‑Contracts** | `v1.x` (`Aggregator.sol`, etc.) | :white_check_mark: Active |
| | `< 1.0` | :x: |

> Security fixes are back‑ported to the **latest minor** of each supported major
> version. Upgrade promptly to remain protected.

---

## Reporting a Vulnerability

We encourage responsible disclosure and will **never take legal action** against
researchers acting in good faith.

| Channel | Use for | How |
| ------- | ------- | --- |
| **Email (preferred)** | Any suspected vulnerability | `security@axodus.finance`<br>Encrypt with our PGP key (`0xA1X0DUS`) |
| **Security Form** | Low‑sensitivity reports | <https://axodus.finance/security/report> |
| **Bug‑bounty portal** | Reward‑eligible issues | <https://hackerone.com/axodus> |

### What to Include
* Proof‑of‑concept or reproducible steps  
* Affected version/commit, environment, network, wallet, etc.  
* Impact assessment (data exposure, financial loss, DoS, …)  
* Suggested remediation (optional)

### Response SLA
| Phase | Timeframe (business days, UTC‑3) |
| ----- | -------------------------------- |
| **Acknowledgement** | ≤ 2 days |
| **Initial triage & CVSS score** | ≤ 5 days |
| **Status update cadence** | Weekly until resolution |
| **Public advisory** | ≤ 90 days † |

† We may extend the 90‑day window by agreement when a coordinated fix
requires more time.

---

## Triage & Remediation Flow

1. **Triage team review**  
   * Reproduce, assign CVSS v3.1 base score, label severity.  
   * Confirm scope (frontend, API, smart‑contract, infra).
2. **Patch preparation** (private branch).  
   * For smart‑contracts, include full test suite + audit notes.  
   * For web/API, create regression tests.
3. **Internal validation** (CI + manual).  
4. **Coordinated Release**  
   * Publish fixed versions & advisory (`GHSA‑xxxx`).  
   * Credit reporter (opt‑in Hall of Fame) and arrange bounty.  
5. **Back‑porting** to supported LTS lines.  
6. **Public disclosure** after patch is available or at 90‑day deadline.

---

## Severity Guidelines

| CVSS v3.1 Base | Severity | Typical Action |
| -------------- | -------- | -------------- |
| **≥ 9.0** | _Critical_ | Immediate out‑of‑band release |
| 7.0 – 8.9 | _High_ | Patch in next security release (≤ 7 days) |
| 4.0 – 6.9 | _Medium_ | Patch in next minor / patch cycle |
| < 4.0 | _Low_ | Document / fix as time permits |

We reference the latest [FIRST CVSS v3.1 spec](https://www.first.org/cvss/) for
scoring.

---

## Recognition & Rewards

* **Hall of Fame** – Annual list of top contributors.  
* **Bug Bounties** – Monetary rewards via HackerOne (see portal for scope &
  payout table).  
* **Swag** – Stickers, T‑shirts, hardware wallets for notable reports.

---

## Out‑of‑Scope Findings

* UI/UX bugs with no security impact  
* Rate‑limiting / anti‑bot bypass with no data exposure  
* Self‑XSS in debug consoles  
* Vulnerabilities only exploitable on outdated browsers or end‑of‑life
  dependencies  
* Denial‑of‑service that requires > 10 Gbps traffic (unrealistic scale)

---

## Legal Safe Harbor

We will not pursue civil or criminal action, nor will we initiate a complaint
with law enforcement, for accidental, good‑faith violation of this policy.
Conditions:

* Do **not** compromise user data or privacy beyond what is necessary to prove
  the vulnerability.  
* Do **not** exploit the issue for personal gain.  
* Do **not** publicly disclose before receiving written confirmation that the
  fix is available or the 90‑day deadline elapses.  
* Comply with relevant laws in your jurisdiction.

---

## Stay Informed

* **Security advisories:** <https://github.com/mzfshark/axodus/security/advisories>  
* **RSS feed:** `https://axodus.finance/security.xml`  
* **PGP key & fingerprints:** <https://axodus.finance/pgp.txt>

---

_Thank you for helping keep Axodus and its users safe!_

