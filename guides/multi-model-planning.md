# Multi-Model Planning

How to use competing AI models to produce better plans than any single model could alone.

---

## The Idea

Don't start coding. Start by gathering diverse perspectives on the problem from multiple frontier models, then synthesize the best ideas into a single master plan.

This produces dramatically better results than asking one model to plan and implement everything.

---

## Phase 1: Collect Competing Proposals

Ask multiple frontier models to propose implementation plans for the same problem. Give each model the same prompt with minimal guidance — just 2-3 messages to clarify the goal.

| Model | What it tends to bring |
|-------|----------------------|
| GPT | Structured, thorough, strong on edge cases |
| Gemini | Broad research, finds prior art and alternatives |
| Grok | Creative angles, unconventional approaches |
| Claude | Clean architecture, good system design |

The key instruction: describe the problem clearly and ask for a complete implementation plan. Don't over-constrain — you want divergent thinking.

### Saving Conversations

Use [csctf](https://github.com/Dicklesworthstone/chat_shared_conversation_to_file) to save each conversation as markdown:

```bash
# Install
curl -fsSL "https://raw.githubusercontent.com/Dicklesworthstone/chat_shared_conversation_to_file/main/install.sh" | bash

# Save each model's conversation
csctf https://chatgpt.com/share/YOUR_SHARE_ID
csctf https://gemini.google.com/share/YOUR_SHARE_ID
csctf https://grok.com/share/YOUR_SHARE_ID
csctf https://claude.ai/share/YOUR_SHARE_ID
```

Put all the saved files in a folder:

```
competing_proposals/
  chatgpt-proposal.md
  gemini-proposal.md
  grok-proposal.md
  claude-proposal.md
```

---

## Phase 2: Synthesize Into a Master Plan

Have one model read all proposals and create a hybrid plan that takes the best parts of each.

```bash
# Using Claude Code
claude "Read all the files in competing_proposals/.
Create a hybrid plan that takes the best parts of each.
Write it to MASTER_PLAN.md"
```

The resulting plan should be comprehensive — architecture, data models, API surface, implementation roadmap. In real projects, these plans can run to thousands of lines.

---

## What Makes a Great Plan

### Structure

A good plan has clear sections that progressively elaborate:

1. **Executive Summary** — Problem + solution in 1 page
2. **Core Architecture** — Design principles, high-level components
3. **Data Models** — Schemas for all entities (TypeScript/Zod, JSON examples)
4. **CLI/API Surface** — Every command or endpoint with usage examples
5. **Core Algorithms** — Key logic explained with pseudocode or examples
6. **Integration Points** — How it connects to existing systems
7. **Error Handling** — What can go wrong, how to recover
8. **Storage & Persistence** — Directory structure, config, state management
9. **Implementation Roadmap** — Prioritized phases with dependencies
10. **Comparison Tables** — Why this approach over alternatives

### Patterns That Make Plans Effective

**Theory-First:** Each feature includes schema definition -> algorithm -> usage examples -> implementation notes. Never jumps to code before explaining the *why*.

**Progressive Elaboration:** Simple concepts expand into nested detail. A concept starts as a bullet point, becomes a state machine, then includes transition rules and edge cases.

**Concrete Examples Throughout:** Not just "validate inputs" but actual interfaces, JSON outputs, command examples, and diagrams showing data flow.

**Edge Cases Anticipated:** The plan addresses error handling, failure modes, and boundary conditions before implementation begins.

**Comparison Tables:** Key decisions contextualized against alternatives. Shows trade-offs between approaches from different model proposals.

---

## Why This Works

Different models have different strengths, training data, and reasoning patterns. By collecting proposals from multiple models:

- You get **approaches you wouldn't have thought of** — each model finds different solutions
- You get **natural peer review** — the synthesis step exposes weak ideas that only one model proposed
- The final plan is **more robust** — it's survived a form of adversarial review
- You start implementation with **high confidence** — the plan has been stress-tested before a line of code is written

---

## Quick Reference

```
1. Write a clear problem statement
2. Send to 3-4 frontier models (GPT, Gemini, Grok, Claude)
3. Save conversations with csctf
4. Put all proposals in a folder
5. Ask Claude to synthesize a master plan
6. Review and refine the plan before implementing
7. Use the plan as your implementation guide
```

The upfront time investment in planning pays for itself many times over. A 5,000-line plan can guide weeks of clean implementation. A missing plan leads to weeks of rework.

---

## The Clockwork Deity Mindset

> "YOU are the bottleneck. Be the clockwork deity to your agent swarms: design a beautiful and intricate machine, set it running, and then move on to the next project. By the time you come back to the first one, you should have huge chunks of work already done and ready."
>
> — Jeffrey Emanuel ([@doodlestein](https://x.com/doodlestein))

The multi-model approach extends beyond just planning. Once you have a solid plan:

1. **Kick off Claude Code** on a well-scoped task from the plan
2. **While it works**, switch to another terminal and start a second session on a different task
3. **When you hear the sound** (see Tip 4), check back, review, approve, move to the next chunk
4. **Repeat** — you become the orchestrator, not the bottleneck

This is the natural evolution of the multi-model workflow: you're not just using multiple models for planning, you're running multiple agents in parallel during implementation.

The limiting factor is no longer how fast you can code. It's how fast you can:
- Break work into parallelizable chunks
- Review and approve agent output
- Course-correct when something goes wrong

Design the machine. Set it running. Move on. Come back to completed work.
