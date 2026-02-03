# The Art of Agent Direction

Prompting patterns that produce excellent results with Claude Code.

---

## Why Prompting Matters

The difference between a mediocre agent session and a brilliant one often comes down to how you direct the agent. These patterns are drawn from real-world workflows that consistently produce excellent results.

---

## Pattern 1: Intensity Calibration

AI models allocate "compute" based on perceived task importance. Stacked modifiers signal that a task deserves maximum attention.

```
# Low intensity (default behavior)
"Check the code for bugs"

# High intensity (elevated attention)
"Do a super careful, methodical, and critical check
with fresh eyes to find any obvious bugs, problems,
errors, issues, silly mistakes, etc. and then
systematically and meticulously and intelligently
correct them."
```

**Key phrases:** `super carefully`, `methodical`, `critical`, `systematically and meticulously`

These aren't filler words. They're calibration signals that tell the model to allocate more reasoning depth to the task.

**Claude Code specific:** The word `ultrathink` is a directive that tells Claude Code to allocate significantly more thinking tokens. Using intensity words like "think deeply" or "reason carefully" helps across all models, but `ultrathink` is a specific lever in Claude Code.

---

## Pattern 2: Scope Control

Models tend to take shortcuts. Explicit scope directives push against premature narrowing.

**Breadth directives:**
- `"take ALL of that"`
- `"Don't restrict yourself"`
- `"cast a wider net"`
- `"comprehensive and granular"`

**Depth directives:**
- `"go super deep"`
- `"deeply investigate and understand"`
- `"trace their functionality and execution flows"`
- `"first-principle analysis"`

```
# Avoiding narrow focus
"Don't restrict yourself to the latest commits,
cast a wider net and go super deep!"

# Comprehensive coverage
"Take ALL of that and elaborate on it more,
then create a comprehensive and granular set..."

# Depth with breadth
"Randomly explore the code files in this project,
choosing code files to deeply investigate and understand
and trace their functionality and execution flows
through the related code files which they import
or which they are imported by."
```

---

## Pattern 3: Forcing Self-Verification

Questions trigger metacognition — forcing the model to evaluate its own output before finalizing.

| Prompt | Effect |
|--------|--------|
| `"Are you sure it makes sense?"` | Basic sanity check |
| `"Is it optimal?"` | Pushes beyond "good enough" |
| `"Could we change anything to make it work better for users?"` | User-centric optimization |
| `"Check over each item super carefully"` | Item-by-item review |

```
# The Plan Review Pattern
"Check over each item super carefully—
are you sure it makes sense?
Is it optimal?
Could we change anything to make the system work better?
If so, revise them.
It's a lot easier and faster to operate in 'plan space'
before we start implementing these things!"
```

**Plan Space Principle:** Revising plans is 10x cheaper than debugging implementations. Force verification at the planning stage.

---

## Pattern 4: The Fresh Eyes Technique

Psychological reset techniques help agents approach code without prior assumptions or confirmation bias.

| Technique | Prompt | Effect |
|-----------|--------|--------|
| Explicit Reset | `with "fresh eyes"` | Discard prior assumptions |
| Random Exploration | `"randomly explore the code files"` | Avoid tunnel vision |
| Peer Framing | `"reviewing code written by your fellow agents"` | Create psychological distance |

```
# The Fresh Eyes Code Review
"I want you to carefully read over all of the new code
you just wrote and other existing code you just modified
with 'fresh eyes' looking super carefully for any obvious
bugs, errors, problems, issues, confusion, etc.
Carefully fix anything you uncover."

# Peer Review Framing
"Turn your attention to reviewing the code written by
your fellow agents and checking for any issues, bugs,
errors, problems, inefficiencies, security problems,
reliability issues, etc. and carefully diagnose their
underlying root causes using first-principle analysis."
```

---

## Pattern 5: Temporal Awareness

Great prompts consider future contexts — the agent that will continue this work, the human who will review it, the "future self" who needs to understand it.

```
# Self-Documenting Output
"Create a comprehensive set of notes with detailed comments
so that the whole thing is totally self-contained and
self-documenting (including relevant background,
reasoning/justification, considerations, etc.—
anything we'd want our 'future self' to know about
the goals and intentions and thought process and how it
serves the over-arching goals of the project)."
```

- **Future Self** — Write as if explaining to someone with no context
- **Self-Contained** — Output should work independently of current conversation
- **Over-Arching Goals** — Connect current work to the bigger picture

---

## Pattern 6: Context Anchoring

Stable reference documents (like CLAUDE.md) serve as behavioral anchors. Re-reading them is especially critical after context compaction.

```
# The Post-Compaction Refresh
"Reread CLAUDE.md so it's still fresh in your mind.
Use ultrathink."
```

**Why this matters after compaction:**
1. **Context decay** — Rules lose salience as more content is added
2. **Summarization loss** — Compaction may miss nuances
3. **Drift prevention** — Periodic grounding prevents behavioral divergence
4. **Fresh frame** — Re-reading establishes correct operating context

```
# Making Rules Explicit
"You may NOT delete any file or directory unless I
explicitly give the exact command in this session."
```

---

## Pattern 7: First Principles Analysis

Push for deep understanding over surface-level pattern matching.

```
# Root Cause Emphasis
"Carefully diagnose their underlying root causes
using first-principle analysis and then fix or
revise them if necessary."

# Context Before Action
"Once you understand the purpose of the code in
the larger context of the workflows, I want you
to do a super careful, methodical check..."
```

- **Understand Before Fixing** — Trace execution flows and dependencies first
- **Root Cause Over Symptom** — Diagnose underlying issues, not surface manifestations
- **Larger Context** — Understand how code fits into overall workflows

---

## Putting It All Together

A real prompt that combines multiple patterns:

```
"Reread CLAUDE.md so it's still fresh in your mind.     ← Anchoring
Use ultrathink.                                          ← Intensity

I want you to sort of randomly explore the code files    ← Fresh Eyes
in this project, choosing code files to deeply           ← Scope (depth)
investigate and understand and trace their functionality  ← First Principles
and execution flows through the related code files
which they import or which they are imported by.

Once you understand the purpose of the code in the       ← Context First
larger context of the workflows, I want you to do a
super careful, methodical, and critical check with       ← Intensity (stacked)
'fresh eyes' to find any obvious bugs, problems,         ← Fresh Eyes
errors, issues, silly mistakes, etc. and then
systematically and meticulously and intelligently         ← Intensity (triple)
correct them.

Be sure to comply with ALL rules in CLAUDE.md and        ← Anchoring
ensure that any code you write or revise conforms to
the best practice guides referenced in the CLAUDE.md file."
```

---

## Quick Reference

| Pattern | When to use | Key phrases |
|---------|------------|-------------|
| **Intensity** | Tasks requiring maximum precision | `super carefully`, `methodical`, `ultrathink` |
| **Scope Expansion** | Avoiding narrow focus or shortcuts | `take ALL`, `cast wider net`, `comprehensive` |
| **Self-Verification** | Before implementing or finalizing | `are you sure?`, `is it optimal?`, `revise if needed` |
| **Fresh Eyes** | Code review, finding missed issues | `fresh eyes`, `fellow agents`, `randomly explore` |
| **Temporal** | Creating persistent artifacts | `future self`, `self-documenting`, `self-contained` |
| **Anchoring** | After compaction or drift risk | `reread CLAUDE.md`, `comply with ALL rules` |
| **First Principles** | Debugging or understanding complex code | `root causes`, `first-principle`, `larger context` |

---

## Ready-to-Use Prompts

For battle-tested prompts that combine these patterns, see the **[Prompts Library](prompts/)**:

- [Idea Wizard](prompts/idea-wizard.md) — Generate 30 ideas, filter to 5 best
- [README Reviser](prompts/readme-reviser.md) — Update docs without changelog-style writing
- [Big-Brained Optimizer](prompts/big-brained-optimizer.md) — Find provably correct optimizations
- [Dueling Idea Wizards](prompts/dueling-idea-wizards.md) — Two models critique each other's ideas
