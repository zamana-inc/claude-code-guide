# The Codex Plan Review Prompt

Have Codex review a plan before implementation to catch gaps Claude missed.

**Best used with:** OpenAI Codex / GPT with code exploration capabilities

---

## The Prompt

```
Here's the plan: [paste plan or link to file]

Explore the codebase carefully and review this plan.

Check for:
- Bugs or logical errors in the approach
- Inefficiencies
- Dead code this might create
- Major gaps
- Bad code practices

Don't nitpick — only identify changes that would exponentially improve the implementation.
```

---

## Why It Works

**Multi-model review:** Different models catch different issues. Codex sees things Claude misses.

**Codebase exploration:** "Explore the codebase carefully" ensures the review is grounded in actual code, not just the plan text.

**Exponential filter:** "Don't nitpick — only exponential improvements" prevents a wall of minor suggestions and focuses on what matters.

**Structured checklist:** The explicit categories (bugs, inefficiencies, dead code, gaps, practices) ensure comprehensive coverage.

---

## How to Use

1. Have Claude create a plan in `docs/plans/`
2. Share the plan with Codex using this prompt
3. Wait for Codex to explore and respond (this takes time)
4. Copy Codex's feedback back to Claude
5. Have Claude revise the plan
6. Optionally repeat for another round

---

## Patterns Used

- Multi-Model Planning (different model for review)
- Fresh Eyes (Codex reviews Claude's work)
- Scope Control (exponential improvements only)

---

## When to Use

- After Claude drafts a plan for a major feature
- Before starting implementation
- When you want high confidence the plan is solid
- When the feature is complex or touches many files
