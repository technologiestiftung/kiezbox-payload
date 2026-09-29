---
name: fix-issue
description: Fix a GitHub issue — read it, branch, implement, verify, then propose a commit
disable-model-invocation: true
---

Fix GitHub issue $ARGUMENTS.

1. Run `gh issue view $ARGUMENTS` to read the issue and its comments.
2. Create a branch off `main`: `fix/<issue-number>-<short-slug>` (or `feat/…` for features).
3. Find the relevant code. If the change touches several files or the approach is unclear,
   write a short plan first and wait for confirmation.
4. Write a failing test that reproduces the issue where possible, then implement the fix.
5. Run the verification commands from CLAUDE.md and fix any failures at the root cause.
6. Show the diff summary and propose a conventional commit message that references the
   issue (`Fixes #<number>`), plus a PR description summarising the change and the
   verification output. Stop here — the developer commits, pushes and opens the PR.
