#!/usr/bin/env python3
from __future__ import annotations

import shutil
import sys
from pathlib import Path


def main() -> int:
    project_root = Path.cwd()
    target = project_root / "ui-flow-design"
    skill_root = Path(__file__).resolve().parents[1]
    template = skill_root / "assets" / "react-tailwind-flow-template"

    if target.exists():
        if (target / "package.json").exists() and (target / "src" / "App.tsx").exists():
            print(f"ui-flow-design already exists and looks like a React project: {target}")
            return 0
        print(
            f"Refusing to overwrite existing non-React directory: {target}",
            file=sys.stderr,
        )
        return 2

    if not template.exists():
        print(f"Missing template directory: {template}", file=sys.stderr)
        return 3

    shutil.copytree(template, target)
    print(f"Created React UI flow project: {target}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
