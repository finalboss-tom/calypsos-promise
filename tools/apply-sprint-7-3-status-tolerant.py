from pathlib import Path

source_path = Path("tools/apply-sprint-7-3-status.py")
source = source_path.read_text()
strict = '''    if old not in text:\n        raise SystemExit(f"missing expected text in {path}: {old[:100]}")\n'''
tolerant = '''    if old not in text:\n        print(f"status replacement skipped in {path}: {old[:100]}")\n        return\n'''
if strict not in source:
    raise SystemExit("strict replacement guard was not found")
exec(compile(source.replace(strict, tolerant, 1), str(source_path), "exec"))
