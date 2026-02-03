# Planning Workflow for Major Features

How to plan, implement, and review major features using Claude Code and Codex together.

This workflow produces better results than jumping straight to implementation. The upfront investment in clarification and planning prevents rework, catches edge cases early, and creates persistent documentation.

---

## Why Markdown Plans Over Plan Mode

Claude Code has a built-in plan mode, but for major features, use your own markdown files in `docs/plans/` instead:

- **Persistent** — Plans survive across sessions
- **Multi-agent** — Both Claude and Codex can reference the same file
- **Trackable** — STATUS.md shows what's active, complete, or archived
- **Documentable** — Completed plans can become docs for your team

---

## Phase 1: Clarification

Before planning, get Claude to deeply understand what you want.

### The Prompt

```
I want you to implement [feature description / voice note brain dump].

Explore the codebase and ask me as many clarifying questions as you want.

Think through the second and third order effects of the changes — everything I'm missing, everything this touches or affects.

Put yourself in the shoes of John Carmack and think about how he would approach this from the most simple and elegant point of view.
```

### The Process

1. Claude explores the codebase
2. Claude asks clarifying questions
3. You answer
4. Repeat 2-3 rounds until there's no marginal gain from more questions

**When to stop:** When Claude's questions are getting repetitive or you're not learning anything new from the exchange.

---

## Phase 2: Planning

Now have Claude draft a plan.

### Create the Plan

```
Based on our discussion, create a detailed implementation plan.

Write it to docs/plans/[feature-name].md

Include:
- Overview of the changes
- Files affected
- Implementation phases (checkboxes for tracking)
- Risks and mitigations
- Testing approach

Use checkboxes [ ] for each phase so we can track progress.
```

### Plan File Template

```markdown
# Feature Name

## Status: In Progress | Complete | Archived

## Overview
What this feature does and why.

## Files Affected
- path/to/file.ts — what changes
- path/to/other.ts — what changes

## Implementation Phases

### Phase 1: [Name]
- [ ] Step 1
- [ ] Step 2
- [ ] Step 3

### Phase 2: [Name]
- [ ] Step 1
- [ ] Step 2

## Risks & Mitigations
- Risk: X could break Y
- Mitigation: Add tests for Y before changing X

## Testing
How to verify this works.
```

### Codex Review (Round 1)

Share the plan with Codex and ask it to review:

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

Codex takes time but gives valuable feedback from a different perspective.

### Revise with Claude

Copy Codex's feedback back to Claude:

```
Codex reviewed the plan and gave this feedback:

[paste Codex feedback]

Revise the plan to address these points.
```

### Codex Review (Round 2)

Repeat the Codex review on the revised plan. Usually 2 rounds is enough.

---

## Phase 3: Implementation

Now implement the plan in phases.

### The Prompt

```
Implement the plan in docs/plans/[feature-name].md

Work through each phase in order.
After completing each phase:
1. Mark the checkboxes as done [x] in the plan file
2. Commit the changes with a clear message

Let's start with Phase 1.
```

### Branch Strategy

For major features, create a feature branch:

```
git checkout -b feature/[feature-name]
```

This keeps main clean and lets you review all changes together before merging.

---

## Phase 4: Review

After implementation, have Codex review the changes against the plan.

### Codex Final Review

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

### Address Feedback

Share Codex's feedback with Claude and iterate:

```
Codex reviewed the implementation and found these issues:

[paste feedback]

Address these in priority order.
```

One or two rounds of review/fix is usually enough.

### Mark Complete

Update the plan status to Complete and update STATUS.md.

Completed plans can be moved to your docs-site for team reference.

---

## Quick Reference

```
Phase 1: Clarification
├── Claude explores codebase
├── Claude asks questions
├── You answer
└── Repeat 2-3 rounds

Phase 2: Planning
├── Claude drafts plan → docs/plans/feature.md
├── Codex reviews plan
├── Claude revises
└── Codex reviews again (optional)

Phase 3: Implementation
├── Create feature branch
├── Claude implements phase by phase
├── Claude marks checkboxes as done
└── Claude commits each phase

Phase 4: Review
├── Codex reviews changes against plan
├── Claude addresses feedback
├── Repeat if needed
└── Mark plan complete
```

---

## For Smaller Features

Scale down the process:

- **Trivial changes:** Skip planning, just implement
- **Small features:** One round of questions, brief plan, implement
- **Medium features:** Full clarification, plan, implement, one review round
- **Major features:** Full workflow with multiple review rounds

Use judgment — the goal is quality outcomes, not process for its own sake.
