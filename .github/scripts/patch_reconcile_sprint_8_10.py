from pathlib import Path

path = Path(".github/scripts/reconcile_sprint_8_10.py")
content = path.read_text(encoding="utf-8")
old = "accessibility certification, performance release, payment system"
new = "independent accessibility certification, affected-user validation, field-performance study, payment system"
count = content.count(old)
if count != 1:
    raise SystemExit(f"expected one matcher phrase, found {count}")
path.write_text(content.replace(old, new), encoding="utf-8")
print("Reconciliation matcher aligned to current docs/README.md wording.")
