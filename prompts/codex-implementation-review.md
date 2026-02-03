# The Codex Implementation Review Prompt

Have Codex review completed implementation against the original plan.

**Best used with:** OpenAI Codex / GPT with code exploration capabilities

---

## The Prompt

```
Here's the plan we implemented: [paste plan]

Review all the changes made and compare against the plan.

Check for:
- Anything missed from the plan
- Bugs introduced
- Code quality issues
- Opportunities for improvement

Give me a prioritized list of issues to address.
```

---

## Why It Works

**Plan as spec:** The original plan serves as a specification to review against, making the review concrete rather than open-ended.

**Comprehensive check:** The four categories (missed items, bugs, quality, improvements) cover both correctness and quality.

**Prioritized output:** "Prioritized list" ensures you know what to fix first rather than getting an unordered wall of feedback.

**Actionable:** The output is directly usable — share with Claude to address in priority order.

---

## How to Use

1. Complete implementation (all phases done, committed)
2. Share the original plan + this prompt with Codex
3. Wait for Codex to review (takes time)
4. Copy the prioritized list back to Claude
5. Have Claude address issues in order
6. Optionally repeat for another round

---

## Patterns Used

- Multi-Model Planning (different model for review)
- Self-Verification (plan as verification spec)
- Fresh Eyes (Codex reviews Claude's implementation)

---

## When to Use

- After completing implementation of a major feature
- Before merging a feature branch
- When you want confidence the implementation matches the plan
- As a final quality gate before marking a plan complete
