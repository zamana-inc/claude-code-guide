# The Clarification Prompt

Get Claude to deeply understand a feature before planning or implementing.

---

## The Prompt

```
I want you to implement [feature description / voice note brain dump].

Explore the codebase and ask me as many clarifying questions as you want.

Think through the second and third order effects of the changes — everything I'm missing, everything this touches or affects.

Put yourself in the shoes of John Carmack and think about how he would approach this from the most simple and elegant point of view.
```

---

## Why It Works

**Forced exploration:** "Explore the codebase" ensures Claude understands the existing architecture before proposing changes.

**Unlimited questions:** "As many clarifying questions as you want" signals that thoroughness is valued over speed.

**Second-order thinking:** Explicitly asking for downstream effects catches issues that surface-level analysis misses.

**Simplicity anchor:** The John Carmack framing pushes toward elegant solutions rather than over-engineered ones.

---

## How to Use

1. Start with your feature idea (can be rough, even a voice note transcription)
2. Send this prompt
3. Answer Claude's questions
4. Repeat 2-3 rounds until questions stop yielding new insights
5. Then move to planning

---

## Patterns Used

- Scope Control (explore codebase, second/third order effects)
- Self-Verification (questions force reflection)
- First Principles (Carmack framing)

---

## When to Use

- Before any major feature implementation
- When you have a rough idea but haven't thought through details
- When a feature touches multiple parts of the codebase
- When you want to avoid rework from missed requirements
