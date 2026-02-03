# The README Reviser

Update documentation to reflect recent changes without making it read like a changelog.

**By:** Jeffrey Emanuel ([@doodlestein](https://x.com/doodlestein))

---

## The Prompt

```
OK, we have made tons of recent changes that aren't yet reflected in the README file.

First, reread CLAUDE.md so it's still fresh in your mind. Use ultrathink.

Now, we need to revise the README for these changes (don't write about them as 'changes' however, make it read like it was always like that, since we don't have any users yet!).

Also, what else can we put in there to make the README longer and more detailed about what we built, why it's useful, how it works, the algorithms/design principles used, etc? This should be incremental NEW content, not replacement for what is there already.

And generally, look for any chunks of important features/functionality that are currently fully implemented in the code, but unmentioned, under-documented, under-explained, or under-justified in the README file.
```

---

## Why It Works

**Context anchoring:** "Reread CLAUDE.md" ensures the agent operates with full project context before touching docs.

**Framing instruction:** "Make it read like it was always like that" prevents changelog-style writing that confuses new readers.

**Gap detection:** "Look for chunks of important features... unmentioned" explicitly asks for discovery of undocumented functionality.

**Incremental mindset:** "Incremental NEW content, not replacement" prevents destructive rewrites.

---

## Patterns Used

- Context Anchoring (reread CLAUDE.md)
- Intensity Calibration (`ultrathink`)
- Scope Control (look for ALL unmentioned features)
- Fresh Eyes (find undocumented functionality)

---

## When to Use

- After a sprint of feature work
- Before a release or demo
- When onboarding new team members who will read the README
- Anytime the code has drifted ahead of the docs
