# The Big-Brained Optimizer

Find performance optimizations with mathematical rigor — only changes that provably preserve functionality.

**By:** Jeffrey Emanuel ([@doodlestein](https://x.com/doodlestein))

---

## The Prompt

```
First read ALL of the CLAUDE.md file and README.md file super carefully and understand ALL of both!

Then use your code investigation agent mode to fully understand the code, and technical architecture and purpose of the project.

Then, once you've done an extremely thorough and meticulous job at all that and deeply understood the entire existing system and what it does, its purpose, and how it is implemented and how all the pieces connect with each other, I need you to hyper-intensively investigate and study and ruminate on these questions as they pertain to this project:

Are there any other gross inefficiencies in the core system? Places in the codebase where:

1) changes would actually move the needle in terms of overall latency/responsiveness and throughput;

2) and where our changes would be provably isomorphic in terms of functionality, so that we would know for sure that it wouldn't change the resulting outputs given the same inputs (for approximate numerical methods, you can interpret "the same" as "within epsilon distance");

3) where you have clear vision to an obviously better approach in terms of algorithms or data structures (note that for this, you can include in your contemplations lesser-known data structures and more esoteric/sophisticated/mathematical algorithms as well as ways to recast the problem(s) so that another paradigm is exposed, such as convex optimization theory or dynamic programming techniques.

Also note that if there are well-written third-party libraries you know of that would work well, we can include them in the project).

Use ultrathink.
```

---

## Why It Works

**Deep context first:** "Read ALL... super carefully and understand ALL" ensures full codebase comprehension before suggesting changes.

**Three-part filter:** Changes must (1) actually matter for performance, (2) provably preserve functionality, and (3) be obviously better. Most "optimization" ideas fail at least one of these.

**Mathematical rigor:** "Provably isomorphic" and "within epsilon distance" set a high bar — no hand-wavy "this should be faster."

**Expanded solution space:** Explicitly invites esoteric algorithms, lesser-known data structures, and paradigm recasting (convex optimization, dynamic programming).

**Third-party awareness:** Permits well-written libraries rather than NIH syndrome.

---

## Patterns Used

- Context Anchoring (read ALL of CLAUDE.md and README.md)
- Intensity Calibration (`ultrathink`, "hyper-intensively")
- First Principles (provably isomorphic, algorithm analysis)
- Scope Control (only changes that move the needle)

---

## When to Use

- Before optimizing anything — run this first to find what actually matters
- When you suspect performance issues but aren't sure where
- When you want mathematical confidence that changes won't break things
- When you're open to non-obvious algorithmic improvements
