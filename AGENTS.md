# Repository Guidelines

## Language / 言語

日本語を使って。

## Coding Style & Naming Conventions
- Indentation: 2 spaces for web (JS/TS), 4 spaces for Python.
- Naming: folders `kebab-case`, files follow language norms (`snake_case.py`, `camelCase` identifiers in JS/TS).
- Formatting: use `prettier` for web, `black` for Python; run via `make format`.
- Linting: `eslint`/`tsc` for web, `ruff`/`mypy` for Python; run via `make lint`.

## Testing Guidelines
- Framework: `pytest` (Python) or `vitest/jest` (web). Prefer fast, unit-first tests.
- Location: mirror `src/` under `tests/`. Name tests `test_*.py` (Python) or `*.test.ts` (web).
- Coverage: target ≥80%. Measure via `make test`.

## Commit & Pull Request Guidelines
- Commits: follow Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`). One logical change per commit.
- PRs: include clear description, linked issues (e.g., `Closes #123`), and screenshots/logs for UX changes.
- CI must pass: build, lint, test. Request review once green.

## Security & Configuration Tips
- Environment config: keep secrets in `.env` (never commit). Provide `.env.example` and load via tooling.
- Avoid embedding secrets in code; rotate credentials if leaked.

## Agent-Specific Instructions
- This `AGENTS.md` informs contributors and automation. Tools should prefer `Makefile` tasks to ensure consistent workflows.

