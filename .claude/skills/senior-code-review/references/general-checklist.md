# General Senior Review Checklist

Applies to any language. Report only what actually applies.

## Correctness
- Does the code do what it claims? Trace the main path and at least one failure path.
- Edge cases: empty, null/undefined, zero, negative, very large, duplicate, unicode, timezones, concurrency.
- Off-by-one, wrong comparison (`==` vs `===`), floating-point money math, mutating shared data.
- Async: missing `await`, unhandled rejections, ordering assumptions, parallel vs sequential mistakes.

## Security
- Untrusted input used without validation/sanitization (injection, XSS, path traversal).
- Secrets in code, logs, or client bundles.
- AuthN/AuthZ checks missing or done only on the client.
- Insecure defaults, weak crypto, sensitive data in URLs.

## Architecture & design
- Single responsibility: components/functions doing too much (UI + fetching + business logic in one file).
- Separation of concerns: business logic testable without UI.
- Duplication that should be extracted — and premature abstraction that should not exist.
- Coupling: hidden dependencies, global mutable state, circular imports.
- Consistency with existing patterns in the codebase.
- Will this scale to the obvious next requirement without a rewrite?

## TypeScript / typing
- `any`, unsafe `as` casts, non-null assertions `!` hiding real nullability.
- Types not matching runtime API data; no runtime validation (zod etc.) at boundaries.
- Overly wide types (`string` where a union fits), missing discriminated unions for state.
- Exported functions/components without explicit prop types.

## Error handling & observability
- Errors swallowed, generic messages shown to users, no logging/reporting.
- Retries without backoff; no timeouts.
- User-facing failure states missing.

## Readability & maintainability
- Names that reveal intent; no misleading names.
- Functions short enough to understand; deep nesting → early returns.
- Magic numbers/strings → named constants.
- Comments explain *why*, not *what*; stale or commented-out code removed.
- Dead code, unused imports/variables, TODOs without tickets.

## Testing
- New logic has tests; bug fixes have regression tests.
- Tests cover failure paths, not only the happy path.
- Tests are deterministic (no real timers/network without control).

## Diff-specific (staged changes / PR)
- Change is focused; unrelated refactors mixed in should be split out.
- Half-finished changes: new code paths not wired up, removed code still referenced.
- Migrations, config, docs, translations, types updated alongside the code.
- Backwards compatibility: API contracts, stored data shapes, feature flags.
- Commit hygiene: debug code, `console.log`, `.only` in tests, large generated files.
