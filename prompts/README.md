# Prompts Library

Battle-tested prompts for Claude Code, ready to copy/paste.

---

## Planning Workflow Prompts

Used in the [Planning Workflow](../guides/planning-workflow.md) for major features.

| Prompt | What it does |
|--------|-------------|
| [Clarification](clarification.md) | Get Claude to ask questions and think through effects before planning |
| [Codex Plan Review](codex-plan-review.md) | Have Codex review a plan before implementation |
| [Codex Implementation Review](codex-implementation-review.md) | Have Codex review changes against the original plan |

---

## Idea Generation Prompts

From Jeffrey Emanuel ([@doodlestein](https://x.com/doodlestein)).

| Prompt | What it does |
|--------|-------------|
| [Idea Wizard](idea-wizard.md) | Generate and ruthlessly filter improvement ideas |
| [README Reviser](readme-reviser.md) | Update docs to reflect recent changes |
| [Big-Brained Optimizer](big-brained-optimizer.md) | Find performance wins with mathematical rigor |
| [Dueling Idea Wizards](dueling-idea-wizards.md) | Pit two models against each other to find genuinely good ideas |

---

## How to Use

1. Copy the prompt from the file
2. Paste into Claude Code (or your clipboard manager; see the main README)
3. Modify the project-specific references (CLAUDE.md, README.md, etc.)
4. Run it

These prompts use `ultrathink`, a Claude Code directive that allocates more thinking tokens for complex reasoning.
