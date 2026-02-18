# Claude Code Tips & Tricks

A collection of practical tips for getting more out of Claude Code, compiled for the team.

## 📽️ Viewing the Presentation

There's an interactive slide deck in the `presentation/` directory built with React + Vite.

```bash
cd presentation
npm install
npm run dev
```

Then open the URL shown in your terminal (usually http://localhost:5173).

---

## Tip 1: Shell Aliases for Faster Launches

**Problem:** Typing `claude --dangerously-skip-permissions` every time is tedious, and you'll avoid using flags you can't remember.

**Solution:** Add short aliases to your `~/.zshrc` (or `~/.bashrc`).

```bash
alias cdsp='claude --dangerously-skip-permissions'
alias cc='claude --continue'
alias cr='claude --resume'
alias ccdsp='claude --continue --dangerously-skip-permissions'
alias crdsp='claude --resume --dangerously-skip-permissions'
```

### `cdsp` — Skip permissions (autopilot mode)

```bash
cdsp
# equivalent to: claude --dangerously-skip-permissions
```

No approval prompts for file edits, shell commands, etc. Claude just does it.

**When to use:** Trusted repo, well-scoped task, you want Claude to go full send.

**When NOT to use:** Unfamiliar codebases, anything touching production or credentials, when you want to review each step.

### `cc` — Continue last conversation

```bash
cc
# equivalent to: claude --continue
```

Picks up the most recent conversation *in the current directory*. Useful when you restart your terminal, switch branches, or just want to keep going where you left off.

### `cr` — Resume any conversation

```bash
cr
# equivalent to: claude --resume
```

Opens an interactive picker showing all your recent sessions across all directories. You can also pass a session ID directly: `cr <session-id>`.

Good for jumping back into a session from yesterday, or one in a different repo.

### `ccdsp` — Continue + autopilot

```bash
ccdsp
# equivalent to: claude --continue --dangerously-skip-permissions
```

Resume where you left off in this directory, with no permission prompts. This is the most common combo: you were already working here, you trust the repo, just keep going.

### `crdsp` — Resume any session + autopilot

```bash
crdsp
# equivalent to: claude --resume --dangerously-skip-permissions
```

Pick any session from your history and jump back in with full autopilot. Useful when you want to continue yesterday's deep session without approving every action.

---

## Tip 2: Planning Before Implementing — The Most Important Workflow

**Problem:** You jump straight to "build this feature" and Claude produces something that misses edge cases, doesn't fit the architecture, or needs major rework.

**Solution:** For major features, use a structured planning workflow with multiple rounds of clarification and review. Full guide: **[Planning Workflow](guides/planning-workflow.md)**

### The Short Version

```
1. Clarification: Claude asks questions, you answer (2-3 rounds)
2. Planning: Claude drafts plan, Codex reviews, Claude revises
3. Implementation: Phase by phase, commit each phase
4. Review: Codex reviews changes against plan, Claude fixes
```

### Why This Works

- **Clarification catches gaps early**, before they're baked into code
- **Multi-model review**: Codex catches things Claude misses
- **Persistent plans** live in `docs/plans/`, survive sessions, and multiple agents can reference them
- **Phased commits** are easy to review, revert, and understand

### The Clarification Prompt

```
I want you to implement [feature description].

Explore the codebase and ask me as many clarifying questions as you want.

Think through the second and third order effects, everything I'm missing,
everything this touches or affects.

Put yourself in the shoes of John Carmack and think about how he would
approach this from the most simple and elegant point of view.
```

### The Codex Review Prompt

```
Here's the plan: [paste or link]

Explore the codebase and review this plan. Check for bugs, inefficiencies,
dead code, major gaps, bad practices.

Don't nitpick — only identify changes that would exponentially improve it.
```

### Scaling for Feature Size

- **Trivial:** Skip planning, just implement
- **Small:** One round of questions, brief plan
- **Medium:** Full clarification, plan, implement, one review
- **Major:** Full workflow with multiple review rounds

---

## Tip 3: Invest in Your CLAUDE.md — Persistent Instructions That Compound

**Problem:** You correct Claude's behavior, it learns for this session, and then next session it makes the same mistake. You're teaching the same lessons over and over.

**Solution:** Put those lessons in `CLAUDE.md`. Claude Code automatically loads this file at the start of every session in that directory. Instructions in CLAUDE.md persist forever and compound over time.

### What is CLAUDE.md?

It's a markdown file in your project root that Claude Code reads automatically. Think of it as a briefing document that Claude reviews before every conversation. No special syntax; just write instructions in plain English.

```
my-project/
├── CLAUDE.md          ← Claude reads this automatically
├── src/
│   └── api/
│       └── CLAUDE.md  ← And this for work in src/api/
└── ...
```

CLAUDE.md files are hierarchical. If you have one in the project root and another in a subdirectory, Claude sees both when working in that subdirectory.

### The golden rule: Update after every correction

After correcting Claude, end with:

> "Update CLAUDE.md so you don't make that mistake again."

Claude is eerily good at writing rules for itself. It will add a concise, specific instruction that prevents the exact mistake it just made.

**Example from this codebase:**

I was frustrated after Claude kept failing to call the Railway API correctly: wrong variable names, missing `source .env`, unquoted URLs. After several corrections, I had Claude document the fix:

```markdown
### Railway API

**IMPORTANT: Always source `.env` before making API calls.**

\`\`\`bash
# From /server directory:
source .env

# Verify variables are set (do this first if calls fail):
echo "URL: $RAILWAY_API_URL"
echo "KEY: ${RAILWAY_API_KEY:0:8}..."  # Shows first 8 chars only
\`\`\`

**Debugging failed API calls:**
1. Check `source .env` was run
2. Verify variable names: `RAILWAY_API_KEY` not `API_KEY`
3. Quote the URL: `"$RAILWAY_API_URL/..."` not `$RAILWAY_API_URL/...`
```

Now Claude gets it right every time. The 5 minutes spent documenting this saves hours over the lifetime of the project.

### What to put in CLAUDE.md

| Good | Bad |
|------|-----|
| Project-specific gotchas | Generic coding advice |
| "Always run `npm run build` before committing frontend" | "Write clean code" |
| "The API key is `RAILWAY_API_KEY`, not `API_KEY`" | "Use descriptive variable names" |
| "Tests live in `__tests__/`, not `tests/`" | "Write tests for your code" |
| Corrections Claude keeps getting wrong | Things Claude already knows |

### The notes directory pattern

One powerful pattern: have Claude maintain a `notes/` directory that it updates after every PR or session. Then point CLAUDE.md at it:

```markdown
## Project Notes

See `notes/` for accumulated learnings:
- `notes/architecture-decisions.md` — Why we chose X over Y
- `notes/gotchas.md` — Things that have bitten us
- `notes/api-patterns.md` — How to call our APIs correctly
```

Claude fills this in as you work. Over time, you build a knowledge base that survives sessions and even survives you; new team members get the benefit of all accumulated learnings.

### Claude can fill in CLAUDE.md

At the end of a session, you can ask:

> "What did you learn this session that should go in CLAUDE.md for next time?"

Claude will suggest additions based on:
- Mistakes it made and how it fixed them
- Project patterns it discovered
- Things you corrected it on

This turns every session into an investment in future sessions.

### Ruthlessly edit over time

Don't let CLAUDE.md become a junk drawer. Periodically review and prune:
- Remove instructions that are no longer relevant
- Consolidate duplicates
- Promote the most important rules to the top
- Delete anything Claude consistently gets right now

The goal is a tight, high-signal document, not a 50-page manual.

---

## Tip 4: Custom Skills — Build Your Own Slash Commands

**Problem:** You keep doing the same multi-step tasks manually: searching products, generating images, syncing context from external tools. Each time, you re-explain the workflow to Claude.

**Solution:** Create custom skills. Skills are reusable capabilities you can invoke with `/skill-name`. They live in `.claude/skills/` and get committed to git, shared across the whole team.

### What are skills?

A skill is a folder with a `SKILL.md` file that teaches Claude how to do something. When you invoke `/render-ui` or `/generate-image`, Claude reads that skill's instructions and follows them.

```
.claude/
└── skills/
    └── render-ui/
        ├── SKILL.md           # Instructions Claude follows
        ├── design-system.md   # Supporting docs
        └── scripts/
            └── server.py      # Scripts the skill can call
```

### Skill anatomy: SKILL.md

```markdown
---
name: render-ui
description: >
  Render visual HTML pages alongside chat for product searches.
  Generates self-contained HTML served at localhost:3456.
allowed-tools: Bash(python *), Write
---

# render-ui

Visual companion to the terminal — render product grids and comparisons.

## When to render
- Product search results
- Product comparisons
- Single product deep dive

## Workflow
1. Ensure server is running...
2. Generate HTML following the design system...
3. Write to the html_path...
```

The frontmatter defines metadata; the body is instructions Claude follows.

### Real examples from this codebase

**`/render-ui`** renders product grids and comparisons as HTML pages in the browser. Claude runs a local server, writes HTML following a design system, and the browser auto-refreshes.

**`/generate-image`** generates images using Nano Banana Pro (fal.ai). Handles text-to-image and image editing with reference photos. Claude calls the Python script, gets CDN URLs back, and displays results in the browser.

### When to create a skill

**Rule of thumb:** If you do something more than once a day, turn it into a skill.

Examples:
- **`/techdebt`**: Run at the end of every session to find and kill duplicated code
- **`/sync-context`**: Pull 7 days of Slack, GDrive, Asana, and GitHub into one context dump
- **`/dbt-review`**: Analytics-engineer-style agent that writes dbt models, reviews code, and tests changes

### Creating a skill

1. Create `.claude/skills/your-skill/SKILL.md`
2. Write the instructions Claude should follow
3. Add any supporting scripts or docs
4. Commit to git (now the whole team has it)

Ask Claude to help:

> "Create a skill called /techdebt that scans for duplicated code, dead code, and TODO comments, then produces a prioritized list"

Claude will create the SKILL.md and any supporting files.

### Skills vs CLAUDE.md

| CLAUDE.md | Skills |
|-----------|--------|
| Always loaded | Loaded on demand (`/skill-name`) |
| General instructions | Specific workflows |
| "Always run build before committing" | "Generate product images this way" |

Use CLAUDE.md for rules that apply to everything. Use skills for specific, invocable capabilities.

### Commit them to git

Skills in `.claude/skills/` are part of your codebase. When you create a good one:
1. Commit it
2. Push to remote
3. Whole team can now use `/your-skill`

This is how you build institutional knowledge into your dev environment.

---

## Tip 5: Multi-Model Planning — Use Competing AIs to Build Better Plans

**Problem:** You ask one model to plan and build a feature. It produces something decent but misses angles, makes assumptions, and locks into one approach early.

**Solution:** Ask 3-4 frontier models to independently propose plans, then synthesize the best ideas. Full guide: **[Multi-Model Planning](guides/multi-model-planning.md)**

### The workflow

```
1. Write a clear problem statement
2. Send to GPT, Gemini, Grok, Claude; ask each for an implementation plan
3. Save conversations as markdown with csctf
4. Put all proposals in a folder
5. Ask Claude to synthesize a master plan from all of them
6. Review and refine before implementing
```

### Saving conversations

Use [csctf](https://github.com/Dicklesworthstone/chat_shared_conversation_to_file) to convert any public AI chat share link into markdown:

```bash
# Install
curl -fsSL "https://raw.githubusercontent.com/Dicklesworthstone/chat_shared_conversation_to_file/main/install.sh" | bash

# Save a conversation
csctf https://chatgpt.com/share/YOUR_SHARE_ID
```

### Why this works

Different models have different strengths. GPT is thorough on edge cases, Gemini finds prior art, Grok takes creative angles, Claude designs clean architecture. The synthesis step acts as natural peer review: weak ideas that only one model proposed get filtered out, and the final plan is more robust than any single model could produce.

The upfront time investment in planning pays for itself many times over.

---

## Tip 6: Hooks — Make Claude Code Do Things Automatically

Hooks are shell commands that run automatically in response to Claude Code events. They live in `~/.claude/settings.json` under the `"hooks"` key. This is one of the most powerful features in Claude Code.

### Available Hook Events

| Event | When it fires | Matcher filters by |
|-------|--------------|-------------------|
| `SessionStart` | New session, resume, /clear | `startup`, `resume`, `clear`, `compact` |
| `SessionEnd` | Session terminates | `clear`, `logout`, `other` |
| `Stop` | Agent finishes responding | — (always fires) |
| `Notification` | Agent needs your attention | `permission_prompt`, `idle_prompt` |
| `PreToolUse` | Before a tool executes | Tool name: `Bash`, `Edit`, `Write`, etc. |
| `PostToolUse` | After a tool succeeds | Tool name |
| `PostToolUseFailure` | After a tool fails | Tool name |
| `PreCompact` | Before context compaction | `manual`, `auto` |
| `SubagentStart` | A subagent spawns | Agent type: `Bash`, `Explore`, `Plan` |
| `SubagentStop` | A subagent finishes | Agent type |
| `UserPromptSubmit` | Before Claude processes your prompt | — (always fires) |
| `PermissionRequest` | Permission dialog appears | Tool name |

### Hook JSON Structure

```json
{
  "hooks": {
    "EventName": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "your-shell-command-here"
          }
        ]
      }
    ]
  }
}
```

- `matcher`: regex to filter when the hook fires (empty string = always fire)
- `type`: `"command"` (shell), `"prompt"` (ask a model yes/no), or `"agent"` (spawn a subagent)

### Real Examples

#### Load context on every session start

```json
"SessionStart": [
  {
    "matcher": "",
    "hooks": [
      {
        "type": "command",
        "command": "your-context-loading-script.sh"
      }
    ]
  }
]
```

Run a script at the start of every session to inject project context: issue trackers, environment info, recent git history, etc. Without this, you'd have to tell Claude manually every time.

#### Reload context after compaction

```json
"PreCompact": [
  {
    "matcher": "",
    "hooks": [
      {
        "type": "command",
        "command": "your-context-loading-script.sh"
      }
    ]
  }
]
```

When Claude's context gets too long, it compacts (summarizes) the conversation. This hook re-injects your context right before that happens, so it survives the compaction. Without it, Claude forgets your project state after a long session.

#### Save transcripts on session end

```json
"SessionEnd": [
  {
    "matcher": "",
    "hooks": [
      {
        "type": "command",
        "command": "python3 ~/scripts/extract_transcript.py --from-hook"
      }
    ]
  }
]
```

Automatically extracts and saves the full conversation transcript when you end a session. Great for team review, debugging, and building a knowledge base of past sessions.

### Other Hook Ideas

- **Auto-format after edits:** Run prettier/black after Claude writes files
  ```json
  "PostToolUse": [{ "matcher": "Write|Edit", "hooks": [{ "type": "command", "command": "prettier --write $CLAUDE_FILE_PATH" }] }]
  ```
- **Block dangerous commands:** Prevent `rm -rf` or force pushes
- **Slack notification:** Ping a channel when a long task finishes
- **Auto-lint:** Run ESLint after every file change

### Getting Claude to Set Up Hooks For You

You don't need to hand-write hook JSON. Just ask Claude Code to do it:

> "Add a hook that runs prettier on any file after you edit it"

> "Set up a SessionStart hook that prints my git status"

> "Add a PostToolUse hook for Write that runs `black` on Python files"

Claude has access to `~/.claude/settings.json` and can read, edit, and merge hooks into your existing config. It knows the JSON structure. Just describe what you want in plain English and let it wire things up.

**Pro tip:** You can also ask Claude to *generate* the scripts your hooks call:

> "Create a hook that plays a sound when you're done. Generate the sound file too."

That's literally how Tip 8 was built, in this session, by asking Claude to do it.

---

## Tip 7: Destructive Command Guard — Safety Net for Autopilot Mode

**Problem:** You want to use `--dangerously-skip-permissions` (Tip 1) for speed, but you're nervous about Claude accidentally running `rm -rf` or force-pushing to main.

**Solution:** Install [Destructive Command Guard](https://github.com/Dicklesworthstone/destructive_command_guard), a pre-execution hook that blocks dangerous commands before they run.

### What it blocks

**Git operations:**
- `git reset --hard`: destroys uncommitted changes
- `git push --force`: overwrites remote history
- `git branch -D`: deletes branches without merge checks
- `git stash clear`: permanently deletes stashed work

**Filesystem operations:**
- `rm -rf` outside temporary directories
- Recursive deletions that could wipe important data

**Inline scripts:**
- Destructive commands hidden in `python -c`, `bash -c`, `node -e` invocations

### The safety value

With DCG installed, you can run Claude in full autopilot mode (`cdsp`) knowing that actually destructive commands will be caught. The guard has sub-millisecond latency, so you won't notice it's there until it saves you.

### Installation

```bash
curl -fsSL "https://raw.githubusercontent.com/Dicklesworthstone/destructive_command_guard/master/install.sh" | bash -s -- --easy-mode
```

This auto-detects your platform (macOS, Linux, WSL) and sets up the hook.

### How it integrates with Claude Code

DCG works as a PreToolUse hook. When Claude tries to execute a command, DCG scans it first. Safe commands pass through instantly. Destructive commands get blocked with an explanation.

You can also run `dcg explain "git push --force"` to see why a specific command would be blocked.

### The mental model

Think of it as a seatbelt for autopilot mode:
- Without DCG: `cdsp` is fast but risky
- With DCG: `cdsp` is fast AND safe for the commands that actually matter

This is the missing piece that makes `--dangerously-skip-permissions` practical for everyday use.

---

## Tip 8: Sound Notifications — Gamify Your Workflow

**Problem:** You kick off a long task, switch to Slack or a browser, and have no idea when Claude is done.

**Solution:** Use hooks to play video game sounds on key events.

Add to `~/.claude/settings.json`:

```json
{
  "hooks": {
    "Stop": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "afplay ~/.claude/hooks/files/level-complete.mp3 &"
          }
        ]
      }
    ],
    "Notification": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "afplay ~/.claude/hooks/files/coin.mp3 &"
          }
        ]
      }
    ]
  }
}
```

**How it works:**
- `Stop` fires when the agent finishes a response, playing a "level complete" fanfare
- `Notification` fires when the agent needs your attention, playing a Mario coin collect sound
- The `&` backgrounds the sound so it doesn't block Claude

**Generating game sounds with ffmpeg (no downloads needed):**

```bash
mkdir -p ~/.claude/hooks/files

# Mario coin (notification)
ffmpeg -y -f lavfi -i "sine=frequency=988:duration=0.08" \
  -f lavfi -i "sine=frequency=1319:duration=0.3" \
  -filter_complex "[0][1]concat=n=2:v=0:a=1,afade=t=out:st=0.3:d=0.1" \
  ~/.claude/hooks/files/coin.mp3

# Level complete fanfare (stop)
ffmpeg -y -f lavfi -i "sine=frequency=523:duration=0.15" \
  -f lavfi -i "sine=frequency=659:duration=0.15" \
  -f lavfi -i "sine=frequency=784:duration=0.15" \
  -f lavfi -i "sine=frequency=1047:duration=0.5" \
  -filter_complex "[0][1][2][3]concat=n=4:v=0:a=1,afade=t=out:st=0.7:d=0.25" \
  ~/.claude/hooks/files/level-complete.mp3
```

Or skip ffmpeg entirely and use built-in macOS sounds:

```json
"command": "afplay /System/Library/Sounds/Glass.aiff &"
```

---

## Tip 9: Rewind — Undo Claude's Work and Try Again

**Problem:** Claude goes down the wrong path: edits 5 files, breaks something, or takes an approach you don't like. You want to go back and try a different direction.

**Solution:** Press `Esc` twice.

### How it works

1. **Press `Esc` `Esc`** (double escape), or type `/rewind`
2. A **picker appears** showing every point in your conversation (each prompt you sent is a checkpoint)
3. **Select which point to rewind to**
4. **Choose what to restore:**
   - **Conversation only**: rewind the chat but keep all file changes
   - **Code only**: revert files but keep the conversation history
   - **Both**: full rollback to that point

That's it. You're back at that checkpoint, ready to try a different approach.

### What gets reverted (and what doesn't)

| Reverted | NOT reverted |
|----------|-------------|
| Files edited via Edit/Write tools | Files changed via bash (`rm`, `mv`, `cp`) |
| Conversation history | API calls, database changes |
| Tool call results | Side effects from shell commands |

### When to use it

- **Claude took the wrong approach**: rewind and give clearer instructions
- **You want to try two approaches**: do approach A, rewind, do approach B, compare
- **Something broke**: go back to the last working state without manually undoing changes
- **Exploratory coding**: try ambitious changes knowing you can always rewind

### Tips

- **Checkpoints are automatic:** every prompt you send creates one, no setup needed
- **Not a git replacement:** think of it as session-level undo. Still commit your work.
- **Rewind before re-prompting:** if Claude misunderstood, rewind first rather than asking it to "undo" what it did. Rewind is cleaner and guaranteed to restore the exact file state.

---

## Tip 10: Terminal & Environment Setup

**Problem:** You're running multiple Claude sessions, losing track of context usage, and your terminal doesn't feel optimized for agentic work.

**Solution:** Invest in your terminal setup. The right environment makes Claude-juggling feel effortless.

### Terminal: Ghostty

The team loves [Ghostty](https://ghostty.org/). Key features for Claude Code:

- **Synchronized rendering:** no tearing or flicker during fast output
- **24-bit color:** proper syntax highlighting in diffs and code blocks
- **Proper Unicode support:** Claude's output renders correctly
- **Fast:** keeps up with Claude's streaming output

### Status line: Always know your context usage

Use `/statusline` in Claude Code to customize what appears at the bottom of your terminal. Most of us show context usage and git branch.

Add to `~/.claude/settings.json`:

```json
{
  "statusLine": {
    "command": "input=$(cat); used=$(echo \"$input\" | jq -r '.context_window.used_percentage // empty'); [ -n \"$used\" ] && printf 'Context: %.1f%% used' \"$used\" || echo 'Context: N/A'"
  }
}
```

This shows `Context: 42.3% used` at the bottom, updating after every message.

**Context thresholds:**
- **Below ~70%:** you're fine, full context available
- **70-90%:** getting heavy, consider wrapping up or committing
- **90%+:** compaction imminent, Claude will summarize and lose detail

### Tab management: One tab per task

Color-code and name your terminal tabs, one per task or worktree:

- **Tab 1 (blue):** "Feature X", main implementation
- **Tab 2 (green):** "Bugfix Y", separate worktree
- **Tab 3 (yellow):** "Analysis", read-only exploration

Some people use **tmux** for this, which also gives you:
- Persistent sessions (survives terminal crashes)
- Split panes for logs + Claude side by side
- Session names visible in your status bar

The goal: glance at your tabs and instantly know what each Claude is doing

---

## Tip 11: Own Your Context Management

**Problem:** You're deep in a session, Claude compacts the conversation, and suddenly it forgets key details you discussed earlier. The compression is lossy and you have no visibility into what got dropped.

**Solution:** Don't rely on Claude's automatic compression. Manage your own context deliberately.

### Turn off auto-compress

In your settings, disable automatic compaction. You want to control when and how context gets summarized, not have it happen silently in the background.

### Watch your usage

Use the status line (Tip 10) to monitor context percentage. When you hit 70-75%, it's time to think ahead:

- What critical decisions have been made?
- What context would Claude need if starting fresh?
- Is this a good stopping point to commit and start a new session?

### Save context to files

The most reliable context is context that lives in files:

- **CLAUDE.md**: Project rules and patterns that apply to every session
- **`docs/plans/`**: Current plans and architectural decisions
- **Session notes**: Key decisions from this specific session

Before compaction or ending a session, ask Claude:

> "What important context from this session should be saved? Write it to a file."

### Plan your sessions

Instead of one long session that fills context, plan shorter focused sessions:

1. **Session 1**: Explore and plan (ends with plan in `docs/plans/`)
2. **Session 2**: Implement phase 1 (references the plan file)
3. **Session 3**: Implement phase 2 (fresh context, same plan file)

Each session starts fresh but has access to the same persistent files. No lossy compression, no forgotten context.

### The mental model

Think of context like RAM and files like disk. RAM is fast but volatile; disk is persistent. Don't keep critical state only in RAM. Write it to disk (files) so it survives across sessions.

---

## Tip 12: Prompting — The Difference Between Good and Great Sessions

**Problem:** You type "fix the bugs" and get mediocre results. Someone else types a longer prompt and gets Claude to produce flawless work. What are they doing differently?

**Solution:** Read the full guide: **[The Art of Agent Direction](guides/prompting-guide.md)**

The cheat sheet below covers 7 patterns that consistently produce excellent results:

| Pattern | What it does | Example |
|---------|-------------|---------|
| **Intensity Calibration** | Signal how much attention to allocate | `"super careful, methodical, and critical"` |
| **Scope Control** | Expand or narrow the search space | `"cast a wider net and go super deep"` |
| **Self-Verification** | Force Claude to check its own work | `"Are you sure? Is it optimal?"` |
| **Fresh Eyes** | Reset assumptions, avoid confirmation bias | `"with fresh eyes, looking for obvious bugs"` |
| **Temporal Awareness** | Write for your future self | `"self-contained and self-documenting"` |
| **Context Anchoring** | Ground behavior in stable references | `"Reread CLAUDE.md so it's fresh"` |
| **First Principles** | Push past surface-level fixes | `"diagnose root causes using first-principle analysis"` |

### The one pattern to start with

If you only adopt one thing, make it **self-verification**. Before Claude implements anything, add:

> "Check over the plan super carefully. Are you sure it makes sense? Is it optimal? Revise if needed. It's cheaper to fix in plan space than in code."

This alone will dramatically improve output quality.

### Ready-to-use prompts

For copy/paste prompts that embody these patterns, see the **[Prompts Library](prompts/)**:

- [Idea Wizard](prompts/idea-wizard.md): Generate and ruthlessly filter improvement ideas
- [README Reviser](prompts/readme-reviser.md): Update docs to reflect recent changes
- [Big-Brained Optimizer](prompts/big-brained-optimizer.md): Find performance wins with mathematical rigor
- [Dueling Idea Wizards](prompts/dueling-idea-wizards.md): Pit two models against each other

### Clipboard manager — Your prompt library

You craft a great prompt, it works perfectly, and then it's gone, buried in a session you'll never find again. The fix: use a clipboard manager.

**Raycast** (recommended for macOS) has built-in clipboard history:
- `Cmd + Shift + V` to open history
- Search by typing keywords
- Pin your favorite prompts

**Workflow:**
1. Write a prompt that works well
2. Copy it; it's now saved forever
3. Next time: `Cmd + Shift + V`, search, paste
4. Pin your go-to prompts (code review, planning verification, etc.)

This is the lowest-effort, highest-impact habit you can build. Every good prompt you write is automatically saved.

---

## Tip 13: Subagents — Throw More Compute at Hard Problems

**Problem:** You ask Claude to do something complex. It tries to hold everything in its main context, gets confused, or runs out of space.

**Solution:** Tell Claude to use subagents. Append "use subagents" to any request where you want Claude to parallelize work or keep its main context clean.

### What are subagents?

Subagents are separate Claude instances that the main agent spawns to handle specific tasks. Each runs in its own context, does its work, and reports back. The main agent stays focused and doesn't get bogged down.

### When to use them

**Append "use subagents" when:**
- Exploring a large codebase: "Find all usages of this pattern, use subagents"
- Running multiple independent checks: "Run linting, type checking, and tests, use subagents"
- Researching multiple approaches: "Investigate these 3 libraries, use subagents"
- Any task that can be parallelized

**Why it works:**
- Each subagent has its own fresh context window
- Main agent's context stays clean and focused on orchestration
- Work happens in parallel, faster overall
- If a subagent goes down a wrong path, it doesn't pollute your main session

### Example prompts

```
Refactor this module to use the new API. Use subagents to explore
the codebase and find all the places that need to change.
```

```
I want to add caching to our API layer. Use subagents to research
Redis, Memcached, and in-memory options, then synthesize a recommendation.
```

```
Run the full test suite, lint, and type check. Use subagents so
you can run them in parallel.
```

### Keeping context clean

Even without parallelism, subagents help with context management. If you're doing a complex task with lots of exploration, the exploration can happen in subagents while your main session stays focused on the high-level plan.

Think of it as: main agent = project manager, subagents = specialists who report back.

---

## Tip 14: CLI & MCP — Extend Claude's Reach

**Problem:** You're constantly switching between Claude Code and browser UIs: Linear for tasks, Vercel for deployments, AWS console for logs. It breaks your flow.

**Solution:** Connect CLIs and MCP servers so Claude can navigate these services directly.

### The payoff

Instead of:
1. Claude tells you to check the Vercel deployment
2. You open browser, navigate to Vercel, find the project, check status
3. You come back and tell Claude what you found

You get:
1. Claude checks Vercel directly and continues working

This compounds across every service you use.

### CLIs worth connecting

Install the CLIs and authenticate once. Claude can then use them directly:

| Service | CLI | What Claude can do |
|---------|-----|-------------------|
| **Vercel** | `vercel` | Check deployments, view logs, manage env vars |
| **Railway** | `railway` | Deploy, check status, view logs |
| **AWS** | `aws` | S3 operations, Lambda logs, CloudWatch queries |
| **GitHub** | `gh` | Create PRs, check CI status, view issues |
| **Fly.io** | `fly` | Deploy, scale, check status |

### MCP servers for deeper integration

MCP (Model Context Protocol) servers give Claude richer access than CLIs alone. Example setup:

**Linear MCP**: Claude can:
- Create and update issues
- Move tasks between states
- Reply to comments
- Search across projects

With Linear MCP connected, you can say:

> "Create a bug ticket for the auth issue we just found, assign it to me, and link it to the current sprint"

And Claude does it, no browser, no copy-pasting.

### Setting up MCP

MCP servers are configured in `~/.claude/settings.json`. Example:

```json
{
  "mcpServers": {
    "linear": {
      "command": "npx",
      "args": ["-y", "@anthropic/linear-mcp"],
      "env": {
        "LINEAR_API_KEY": "your-api-key"
      }
    }
  }
}
```

Check the [MCP documentation](https://modelcontextprotocol.io/) for available servers and setup guides.

### Start with what you use most

Don't try to connect everything at once. Pick the 2-3 services you switch to most often:
- If you're always checking deployments → Vercel/Railway CLI
- If you manage tasks in Linear → Linear MCP
- If you're debugging AWS → AWS CLI

Each one you add removes a context switch from your workflow.

---

## Tip 15: Parallel Sessions — Run Multiple Claude Instances at Once

**Problem:** You're waiting for Claude to finish a task, staring at the terminal, when you could be getting other work done.

**Solution:** Run 3-5 Claude Code sessions in parallel, each in its own directory. When you hear the "level complete" sound (Tip 8), check that session, review, kick off the next step, and switch back.

> "YOU are the bottleneck. Be the clockwork deity to your agent swarms: design a beautiful and intricate machine, set it running, and then move on to the next project."
>
> — Jeffrey Emanuel

### The key insight

Each Claude session needs its own isolated directory so instances don't edit the same files and conflict with each other. Two ways to do this:

---

### Option 1: Multiple Git Checkouts (Simple)

Clone your repo multiple times:

```bash
~/projects/zamana-agent/           # Main checkout
~/projects/zamana-agent-feature/   # Second clone for feature work
~/projects/zamana-agent-bugfix/    # Third clone for bugfixes
```

**Pros:** Simple, familiar, each is fully independent.

**Cons:** Each clone has its own `.git` (disk space), commits aren't shared until pushed.

---

### Option 2: Git Worktrees (Efficient)

Create linked working directories that share the same `.git`:

```bash
# From your main repo
git worktree add ../zamana-agent-feature -b feature-x
git worktree add ../zamana-agent-bugfix bugfix-123

# List all worktrees
git worktree list

# Remove when done
git worktree remove ../zamana-agent-feature
```

**Pros:** Shared `.git` (less disk space), commits instantly visible across all worktrees, can't accidentally checkout same branch twice.

**Cons:** Each worktree still needs its own `node_modules` / venv / build artifacts.

---

### Switching between sessions

**Simple: Multiple terminal tabs**

The easiest approach is to use your terminal's tabs or windows:

- Tab 1: Main checkout, running Claude on feature A
- Tab 2: Second checkout, running Claude on feature B
- Tab 3: Third checkout, running analysis

Switch with `Cmd+1`, `Cmd+2`, `Cmd+3` (or your terminal's shortcuts). This is what most people do, and it works great.

**Advanced: Shell aliases**

Some people add aliases to quickly navigate when opening new tabs or jumping between worktrees:

```bash
# Add to ~/.zshrc
alias za='cd ~/projects/zamana-agent && pwd'
alias zb='cd ~/projects/zamana-agent-feature && pwd'
alias zc='cd ~/projects/zamana-agent-bugfix && pwd'
```

Then opening a new session is: new tab → `za && cdsp` → Claude running in worktree A.

This is a "nice to have"; tabs alone are fine.

---

### What to run in parallel

Be mindful of what work you parallelize. Good patterns:

| Session A | Session B | Why it works |
|-----------|-----------|--------------|
| Feature implementation | Separate feature in different files | No file conflicts |
| Implementation | Planning next feature | Different phases |
| Backend changes | Frontend changes | Different parts of codebase |
| Coding | Running analysis / reading logs | One writes, one reads |

Avoid running two sessions that might edit the same files. Even in separate directories, you'll have merge conflicts later.

---

### Dedicated "analysis" worktree

Some people keep one worktree just for reading (logs, queries, investigation) and never editing. This keeps your main worktrees clean and avoids accidental changes during exploration.

---

### Use what you're comfortable with

Multiple checkouts work fine. Worktrees are more efficient but have a learning curve. The important thing is the *workflow*: running parallel sessions and using sound notifications to know when to switch. Start with whatever feels natural and experiment from there.

---

## Tip 16: Think of Claude Code as an Operating System

> "We shape our tools and thereafter our tools shape us."
>
> — Marshall McLuhan

Claude Code isn't just a coding assistant. It's a general-purpose operating system that happens to be really good at code.

### Code is powerful

Claude has access to your terminal, your filesystem, the web, and any CLI or MCP server you connect. That's not "AI help with coding." It's a general-purpose agent that can do almost anything a computer can do.

This entire guide was built with Claude Code. The sound effects, the hooks, the skills, the documentation: all of it created in Claude sessions. Not because it's a demo, but because that's genuinely the fastest way to build things now.

### Where the time goes

Most of my computer time is now split between:
- **Claude Code** for building, exploring, automating
- **A browser** for reviewing, researching, communicating

And it's tilting increasingly toward the CLI. The browser is becoming the "read-only" interface; Claude Code is where work actually happens.

### You have to use it to get it

Reading tips isn't the same as feeling it. The intuition comes from:
- **Trusting it**: letting Claude go full send on a task and seeing what happens
- **Correcting it**: teaching it your preferences through CLAUDE.md
- **Pushing boundaries**: asking "can Claude do X?" and finding out the answer is usually yes

The first few sessions feel like learning a new IDE. After a week, it feels like a superpower. After a month, you can't imagine going back.

### What to do and not do

**Do:**
- Use it for everything: code, docs, analysis, automation, exploration
- Build skills and hooks that compound over time
- Trust it with well-scoped tasks in trusted repos
- Correct it and update CLAUDE.md so it learns

**Don't:**
- Run it unsupervised on production systems or sensitive credentials
- Expect it to be perfect; it's a collaborator, not an oracle
- Fight the workflow. If something feels tedious, automate it

### The meta-lesson

The best tips in this guide aren't the specific tricks; they're the mindset shifts:
- **Planning is leverage**: time spent planning saves multiples in implementation
- **Persistence compounds**: CLAUDE.md, skills, and hooks pay dividends forever
- **Parallelism scales you**: be the orchestrator, not the bottleneck

Claude Code is what you make of it. Shape the tool, and it will shape how you work.
