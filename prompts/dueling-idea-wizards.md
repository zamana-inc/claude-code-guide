# The Dueling Idea Wizards

Pit two frontier models against each other to find genuinely good ideas through adversarial evaluation.

**By:** Jeffrey Emanuel ([@doodlestein](https://x.com/doodlestein))

**Requires:** 2 agents (e.g., Claude Opus 4.5 + GPT-5 or Codex)

---

## The Workflow

### Step 1: Context Loading (Both Models)

Give both models the same context prompt:

```
First read ALL of the CLAUDE.md file and README.md file super carefully and understand ALL of both!

Then use your code investigation agent mode to fully understand the code and technical architecture and purpose of the project.
```

### Step 2: Idea Generation (Both Models)

Give both models the Idea Wizard prompt:

```
Come up with your very best ideas for improving this project to make it more robust, reliable, performant, intuitive, user-friendly, ergonomic, useful, compelling, etc. while still being obviously accretive and pragmatic.

Come up with 30 ideas and then really think through each idea carefully, how it would work, how users are likely to perceive it, how we would implement it, etc; then winnow that list down to your VERY best 5 ideas.

Explain each of the 5 ideas in order from best to worst and give your full, detailed rationale and justification for how and why it would make the project obviously better and why you're confident of that assessment.

Use ultrathink.
```

### Step 3: Cross-Evaluation (Both Models)

After each model responds, show them the other model's ideas:

```
I asked another model the same thing and it came up with this list:

<paste the output from the other model here>

Now, I want you to very carefully consider and evaluate each of them and then give me your candid evaluation and score them from 0 (worst) to 1000 (best) as an overall score that reflects how good and smart the idea is, how useful in practical, real-life scenarios it would be for humans and AI coding agents like yourself, how practical it would be to implement it all correctly, whether the utility/advantages of the new feature/idea would easily justify the increased complexity and tech debt, etc.

Use ultrathink.
```

### Step 4: Show Counter-Ratings (Both Models)

Show each model how the other rated *their* ideas:

```
I asked the other model the exact same thing, to score YOUR ideas using the same grading methodology; here is what it came up with:

<paste the output from the other model here>
```

Now wait for the fireworks.

---

## Why It Works

**Adversarial filtering:** Models are surprisingly willing to critique each other. Ideas that only one model likes get killed. Ideas both models rate highly are genuinely good.

**Ego dynamics:** Models get "catty" defending their ideas and critiquing the other's. This surfaces honest evaluations rather than polite agreement.

**Diverse perspectives:** Different models have different strengths and blind spots. Cross-evaluation exposes both.

**Quantified confidence:** The 0-1000 scoring forces precision — no vague "this is good."

---

## Interpreting Results

| Both Rate High (800+) | Genuinely good idea — prioritize |
| Both Rate Low (<400) | Kill it |
| Disagreement (one high, one low) | Investigate — might be model-specific insight or blind spot |
| Defensive responses | Model is protecting a weak idea — be skeptical |

---

## Patterns Used

- Multi-Model Planning (two models, same problem)
- Self-Verification (cross-evaluation)
- Intensity Calibration (`ultrathink`)
- Fresh Eyes (each model reviews the other's work)

---

## When to Use

- When you have too many ideas and need to filter ruthlessly
- When you want high confidence that an idea is good before investing in implementation
- When you suspect one model might have blind spots
- When you want entertainment (seriously, they get catty)
