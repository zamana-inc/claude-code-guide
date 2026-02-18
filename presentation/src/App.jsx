import { useState, useEffect, useCallback } from 'react'
import './App.css'

const slides = [
  // Title
  {
    type: 'title',
    content: {
      title: 'Claude Code',
      subtitle: 'A Development Operating System',
      note: '45 min · Internal Team Session'
    }
  },

  // Section 1
  {
    type: 'section',
    content: {
      number: '01',
      title: 'Foundations',
      subtitle: 'Aliases · Planning · CLAUDE.md'
    }
  },

  // Aliases - what they are
  {
    type: 'insight',
    content: {
      title: 'Shell Aliases',
      points: [
        'cdsp — dangerously skip permissions (full autopilot)',
        'cc — continue the most recent session in current directory',
        'cr — resume with picker menu across all recent sessions',
        'ccdsp — continue + autopilot (most common combo)',
        'crdsp — resume picker + autopilot'
      ],
      takeaway: 'You\'ll use ccdsp constantly. It\'s muscle memory within a week.'
    }
  },

  // Aliases - setup
  {
    type: 'code',
    content: {
      title: 'Add to ~/.zshrc (or ~/.bashrc)',
      code: `alias cdsp='claude --dangerously-skip-permissions'
alias cc='claude --continue'
alias cr='claude --resume'
alias ccdsp='claude --continue --dangerously-skip-permissions'
alias crdsp='claude --resume --dangerously-skip-permissions'`,
      note: 'Then run: source ~/.zshrc'
    }
  },

  // Aliases - what flags do
  {
    type: 'detail',
    content: {
      title: 'What These Flags Do',
      items: [
        { term: '--continue', desc: 'Picks up your last session automatically. No selection menu. Just keeps going.' },
        { term: '--resume', desc: 'Shows list of recent sessions. You pick which one to continue.' },
        { term: '--dangerously-skip-permissions', desc: 'Autopilot mode. Claude executes commands without asking. Use with guard hooks (we\'ll cover those).' }
      ]
    }
  },

  // Terminal setup
  {
    type: 'insight',
    content: {
      title: 'Terminal: Use Ghostty',
      points: [
        'Synchronized rendering — no tearing or flicker',
        '24-bit color support',
        'Proper Unicode handling',
        'Fast — noticeably snappier than alternatives',
        'ghostty.org — simple install, sensible defaults'
      ],
      takeaway: 'If you\'re not using Ghostty, you\'re missing out.'
    }
  },

  // Planning - intro
  {
    type: 'section',
    content: {
      number: '',
      title: 'Planning',
      subtitle: 'The most important tip in the entire guide'
    }
  },

  // Planning - why
  {
    type: 'insight',
    content: {
      title: 'Why Plan First?',
      points: [
        'Catches gaps before they\'re baked into code',
        'Aligns understanding between you and Claude',
        'Creates persistent artifacts that survive sessions',
        'Enables review at each stage (by you or other models)',
        'Plans live in files — Claude reads them on continue/resume'
      ],
      takeaway: 'The plan file becomes the source of truth across sessions.'
    }
  },

  // Planning - the workflow
  {
    type: 'framework',
    content: {
      title: 'The 5-Phase Workflow',
      items: [
        { phase: 'Clarify', desc: 'Claude asks questions. You answer. 2-3 rounds.' },
        { phase: 'Plan', desc: 'Claude writes plan to docs/plans/feature.md' },
        { phase: 'Review', desc: 'Other agents review the plan (GPT, Gemini, etc.)' },
        { phase: 'Implement', desc: 'Execute phase by phase. Check boxes as you go.' },
        { phase: 'Final Review', desc: 'Another model reviews implementation against plan.' }
      ]
    }
  },

  // Planning - how to start (voice note)
  {
    type: 'headline',
    content: {
      text: 'Start with a voice note.',
      subtext: 'Brain dump what you want. Paste the transcript. Let Claude ask questions.'
    }
  },

  // Planning - clarification prompt
  {
    type: 'code',
    content: {
      title: 'Phase 1: Clarification Prompt',
      code: `I want you to implement [feature / paste voice note transcript].

Explore the codebase and ask me as many clarifying
questions as you want.

Think through the second and third order effects —
everything I'm missing, everything this touches.

Put yourself in the shoes of John Carmack and think
about how he would approach this simply and elegantly.`,
      note: '2-3 rounds of Q&A. Stop when questions get repetitive.'
    }
  },

  // Planning - writing the plan
  {
    type: 'code',
    content: {
      title: 'Phase 2: Write the Plan',
      code: `Based on our discussion, create a detailed implementation plan.

Write it to docs/plans/[feature-name].md

Include:
- Overview of the changes
- Files affected
- Implementation phases (checkboxes for tracking)
- Risks and mitigations
- Testing approach

Use checkboxes [ ] for each phase so we can track progress.`,
      note: 'The plan file persists. Claude reads it on every continue/resume.'
    }
  },

  // Planning - plan template
  {
    type: 'code',
    content: {
      title: 'What the Plan File Looks Like',
      code: `# Feature: User Authentication

## Status: In Progress

## Overview
Add email/password auth with JWT tokens.

## Files Affected
- src/models/User.ts — new model
- src/routes/auth.ts — new routes
- src/middleware/auth.ts — JWT verification

## Implementation Phases

### Phase 1: User Model
- [ ] Create User model with bcrypt
- [ ] Add migration

### Phase 2: Auth Routes
- [ ] POST /auth/register
- [ ] POST /auth/login
- [ ] Password reset flow

## Risks
- Rate limiting not yet implemented

## Testing
- Unit tests for auth middleware
- Integration tests for routes`,
      note: 'docs/plans/ — one file per feature'
    }
  },

  // Planning - multi-model review (Phase 3)
  {
    type: 'insight',
    content: {
      title: 'Phase 3: Other Agents Review the Plan',
      points: [
        'Tag the plan file to GPT 5.2 xhigh (or Gemini, Codex)',
        'Ask: "Review this plan. What\'s missing? What could go wrong?"',
        'Different models catch different blind spots',
        'Incorporate feedback, revise the plan',
        'Then implement'
      ],
      takeaway: 'Revising plans is 10× cheaper than debugging code.'
    }
  },

  // Planning - csctf tool
  {
    type: 'code',
    content: {
      title: 'Save AI Conversations as Markdown',
      code: `# Install csctf (chat_shared_conversation_to_file)
curl -fsSL "https://raw.githubusercontent.com/Dicklesworthstone/\\
chat_shared_conversation_to_file/main/install.sh" | bash

# Save any AI conversation by share link
csctf https://chatgpt.com/share/YOUR_SHARE_ID
csctf https://claude.ai/share/YOUR_SHARE_ID
csctf https://gemini.google.com/share/YOUR_SHARE_ID

# Output: markdown file you can reference or tag`,
      note: 'Useful for saving multi-model planning sessions as artifacts.'
    }
  },

  // Planning - implementation
  {
    type: 'code',
    content: {
      title: 'Phase 4: Implementation Prompt',
      code: `Implement the plan in docs/plans/auth.md

Work through each phase in order.

After completing each phase:
1. Mark the checkboxes as done [x] in the plan file
2. Commit the changes with a clear message

Let's start with Phase 1.`,
      note: 'Claude updates the plan file as it goes. Progress is tracked.'
    }
  },

  // Planning - final review
  {
    type: 'code',
    content: {
      title: 'Phase 5: Final Review Prompt',
      code: `@docs/plans/auth.md

Review all the changes made and compare against this plan.

Check for:
- Anything missed from the plan
- Bugs introduced
- Code quality issues
- Opportunities for improvement

Give me a prioritized list of issues to address.`,
      note: 'Tag the file — that\'s the benefit of plans living in files.'
    }
  },

  {
    type: 'quote',
    content: {
      quote: 'Revising plans is 10× cheaper than debugging code.',
      author: 'From the guide',
      context: 'on why planning matters'
    }
  },

  // Scaling guidelines
  {
    type: 'detail',
    content: {
      title: 'When to Use Full Planning',
      items: [
        { term: 'Trivial', desc: 'Skip planning. Just do it. ("Fix this typo", "Add a console.log")' },
        { term: 'Small', desc: 'One round of questions + brief plan. ("Add a button that does X")' },
        { term: 'Medium', desc: 'Full clarification → plan → implement → one review. ("Add user auth")' },
        { term: 'Major', desc: 'Full workflow with multiple reviews. ("Redesign the data layer")' }
      ]
    }
  },

  // CLAUDE.md section
  {
    type: 'headline',
    content: {
      text: 'CLAUDE.md',
      subtext: 'Persistent instructions that compound over time'
    }
  },

  {
    type: 'quote',
    content: {
      quote: 'We are like dogs.',
      author: 'Ashish Kumar Verma',
      context: 'on how we now cater to AI'
    }
  },

  // CLAUDE.md - what it is
  {
    type: 'insight',
    content: {
      title: 'What is CLAUDE.md?',
      points: [
        'A markdown file in your project root',
        'Claude automatically reads it at session start',
        'Contains project-specific instructions, gotchas, corrections',
        'Hierarchical: subdirectory CLAUDE.md files add to root one',
        'Persists learnings across sessions'
      ],
      takeaway: 'Every correction you make should end up here.'
    }
  },

  // CLAUDE.md - example
  {
    type: 'code',
    content: {
      title: 'Example CLAUDE.md',
      code: `# Project: Acme Dashboard

## Stack
- Next.js 14 with App Router
- Prisma + PostgreSQL
- TailwindCSS

## Commands
- Dev: pnpm dev
- Test: pnpm test
- Deploy: railway up

## Important
- Always use server actions, not API routes
- Environment: RAILWAY_TOKEN, not DEPLOY_TOKEN
- Tests are in __tests__/, not tests/

## Gotchas
- Auth middleware is in lib/auth.ts, not middleware.ts
- Use date-fns, not moment (we removed moment)
- Always source .env before API calls`,
      note: 'Put corrections here immediately after Claude makes a mistake'
    }
  },

  // CLAUDE.md - the workflow
  {
    type: 'insight',
    content: {
      title: 'The Golden Rule',
      points: [
        'When Claude makes a mistake, correct it',
        'Then immediately: "Update CLAUDE.md so you don\'t make that mistake again"',
        'Claude writes a concise instruction preventing the exact mistake',
        'Claude will never make that mistake again in this project',
        'At session end: "What did you learn that should go in CLAUDE.md?"'
      ],
      takeaway: '5 minutes documenting saves hours over the project lifetime.'
    }
  },

  // CLAUDE.md - docs pattern
  {
    type: 'code',
    content: {
      title: 'The Docs Directory Pattern',
      code: `# In CLAUDE.md, point at accumulated learnings:

## Project Documentation

See docs/ for accumulated learnings:
- docs/architecture-decisions.md — Why we chose X over Y
- docs/gotchas.md — Things that have bitten us
- docs/api-patterns.md — How to call our APIs correctly

Claude fills these in over time. Knowledge base that
survives sessions and is visible to the whole team.`,
      note: 'Commit docs/ to git. Team shares the learnings.'
    }
  },

  // Section 2
  {
    type: 'section',
    content: {
      number: '02',
      title: 'Advanced Control',
      subtitle: 'Skills · Hooks · Guards'
    }
  },

  // Skills
  {
    type: 'insight',
    content: {
      title: 'Custom Skills',
      points: [
        'Slash commands you define yourself',
        'Live in .claude/skills/skill-name/SKILL.md',
        'Triggered with /skill-name in conversation',
        'Can include supporting docs, API keys, prompts',
        'Commit to git — whole team gets them'
      ],
      takeaway: 'Rule: If you do something more than once a day, turn it into a skill.'
    }
  },

  // Skills - structure
  {
    type: 'code',
    content: {
      title: 'Skill Directory Structure',
      code: `.claude/
└── skills/
    └── generate-image/
        ├── SKILL.md           # Instructions Claude follows
        ├── api-docs.md        # API reference
        └── examples/          # Example prompts that work`,
      note: 'Ask Claude: "Create a skill called /generate-image that..."'
    }
  },

  // Skills - example (Nano Banana)
  {
    type: 'code',
    content: {
      title: 'Example: /generate-image Skill',
      code: `---
name: generate-image
description: Generate images using Nano Banana Pro API
allowed-tools: Bash, Write, Read
---

# /generate-image

When I say /generate-image [description]:

1. Use the Nano Banana Pro API
2. API key is in $NANO_BANANA_API_KEY
3. Endpoint: POST https://api.nanobanana.pro/v1/generate
4. Prompt format: Be specific, include style keywords
5. Save output to assets/generated/

## Good prompts
- "A minimalist logo of a rocket, flat design, blue gradient"
- "Dashboard UI mockup, dark mode, glassmorphism"`,
      note: 'Without this skill, you\'d explain the API every single time.'
    }
  },

  // Hooks
  {
    type: 'insight',
    content: {
      title: 'Hooks',
      points: [
        'Shell commands that run on Claude events',
        'SessionStart — load context, set up environment',
        'Stop — play sounds, save transcripts',
        'PreToolUse — guard against dangerous commands',
        'PostToolUse — auto-format after edits',
        'PreCompact — save context before summarization'
      ],
      takeaway: 'Automation that runs invisibly in the background.'
    }
  },

  // Hooks - events
  {
    type: 'detail',
    content: {
      title: 'Hook Events',
      items: [
        { term: 'SessionStart', desc: 'New session, resume, /clear. Load context scripts.' },
        { term: 'Stop', desc: 'Agent finishes responding. Play "done" sounds.' },
        { term: 'Notification', desc: 'Agent needs attention. Play alert sounds.' },
        { term: 'PreToolUse', desc: 'Before tool executes. Guard dangerous commands.' },
        { term: 'PostToolUse', desc: 'After tool succeeds. Auto-format files.' },
        { term: 'PreCompact', desc: 'Before context compaction. Save important state.' }
      ]
    }
  },

  // Hooks - sound setup
  {
    type: 'code',
    content: {
      title: 'Sound Notifications (~/.claude/settings.json)',
      code: `{
  "hooks": {
    "Stop": [{
      "matcher": "",
      "hooks": [{
        "type": "command",
        "command": "afplay ~/.claude/sounds/done.mp3 &"
      }]
    }],
    "Notification": [{
      "matcher": "",
      "hooks": [{
        "type": "command",
        "command": "afplay ~/.claude/sounds/ping.mp3 &"
      }]
    }]
  }
}`,
      note: 'Hear when Claude finishes. Context-switch without watching terminal.'
    }
  },

  // Guards
  {
    type: 'insight',
    content: {
      title: 'Destructive Command Guard',
      points: [
        'A PreToolUse hook that blocks dangerous commands',
        'rm -rf, git reset --hard, git push --force, DROP TABLE',
        'Sub-millisecond latency — you won\'t notice it',
        'Lets you use autopilot mode (cdsp) safely',
        'Exit code 2 = block the command'
      ],
      takeaway: 'A seatbelt for --dangerously-skip-permissions.'
    }
  },

  // Guards - setup
  {
    type: 'code',
    content: {
      title: 'Guard Hook Setup',
      code: `# In ~/.claude/settings.json
"PreToolUse": [{
  "matcher": "Bash",
  "hooks": [{
    "type": "command",
    "command": "node ~/.claude/hooks/guard.js"
  }]
}]

# guard.js reads $CLAUDE_TOOL_INPUT and checks for:
# - rm -rf (without specific safe path)
# - git reset --hard
# - git push --force
# - DROP TABLE, TRUNCATE
# Exit 0 = allow, Exit 2 = block`,
      note: 'See the guide for full guard.js implementation'
    }
  },

  // Rewind
  {
    type: 'insight',
    content: {
      title: 'Rewind (Esc Esc or /rewind)',
      points: [
        'Undo Claude\'s work and try a different approach',
        'Press Escape twice or type /rewind',
        'Picker shows every point in conversation',
        'Choose: Conversation only, Code only, or Both',
        'File edits get reverted. Bash commands (git push, rm) don\'t.'
      ],
      takeaway: 'Wrong direction? Rewind and try again. Cheaper than debugging.'
    }
  },

  // Rewind - when
  {
    type: 'insight',
    content: {
      title: 'When to Use Rewind',
      points: [
        'Claude took the wrong approach — rewind, re-prompt with more direction',
        'Want to try two approaches — rewind after first, try second, compare',
        'Context management — rewind to before a large exploration that bloated context',
        'Something went wrong — recover conversation state',
        'Exploratory coding — experiment freely, rewind to clean state'
      ],
      takeaway: 'Not a git replacement — use for conversation + code state recovery.'
    }
  },

  // CLI & MCP
  {
    type: 'insight',
    content: {
      title: 'CLI & MCP (Extend Claude\'s Reach)',
      points: [
        'Connect CLIs: Vercel, Railway, AWS, GitHub, Fly.io',
        'Claude can deploy, check status, manage services directly',
        'MCP servers for deeper integration (Linear, Notion, etc.)',
        'No more context-switching to terminals and dashboards',
        'Set up in ~/.claude/settings.json under mcpServers'
      ],
      takeaway: 'Start with 2-3 most-used services. Add more as needed.'
    }
  },

  // MCP example
  {
    type: 'code',
    content: {
      title: 'MCP Server Setup Example',
      code: `// In ~/.claude/settings.json
{
  "mcpServers": {
    "linear": {
      "command": "npx",
      "args": ["-y", "@linear/mcp-server"],
      "env": {
        "LINEAR_API_KEY": "lin_api_..."
      }
    }
  }
}

// Now Claude can create issues, search tickets, update status`,
      note: 'Claude navigates these services directly, no copy-paste loop'
    }
  },

  // Section 3
  {
    type: 'section',
    content: {
      number: '03',
      title: 'Context & Prompting',
      subtitle: 'Managing context · Patterns that work'
    }
  },

  // Context
  {
    type: 'quote',
    content: {
      quote: 'Think of context like RAM, files like disk.',
      author: 'From the guide',
      context: 'on managing context'
    }
  },

  // Context - management
  {
    type: 'insight',
    content: {
      title: 'Own Your Context',
      points: [
        'Turn off auto-compress in settings',
        'Enable status line to see context percentage',
        'Below 70% — you\'re fine',
        '70-90% — getting heavy, consider wrapping up',
        '90%+ — compaction imminent, save important context to files'
      ],
      takeaway: 'Don\'t keep critical state only in context. Write it to disk.'
    }
  },

  // Context - session strategy
  {
    type: 'insight',
    content: {
      title: 'Plan Sessions, Not One Long One',
      points: [
        'Session 1: Explore and plan (ends with plan in docs/plans/)',
        'Session 2: Implement phase 1 (references the plan file)',
        'Session 3: Implement phase 2 (fresh context, same plan)',
        'Each session starts fresh but has access to persistent files',
        'No lossy compression — clean handoffs'
      ],
      takeaway: 'Files survive sessions. Context doesn\'t.'
    }
  },

  // Prompting
  {
    type: 'headline',
    content: {
      text: 'Prompting Patterns',
      subtext: 'The difference between good and great output'
    }
  },

  // Prompting - patterns with examples
  {
    type: 'code',
    content: {
      title: 'Pattern 1: Intensity',
      code: `# Weak
"Check this code"

# Strong
"Do a super careful, methodical check of this code.
Use ultrathink."

# When to use: Complex debugging, security reviews,
# anything where you want Claude to slow down`,
      note: 'Stacked intensity words signal importance → more compute'
    }
  },

  {
    type: 'code',
    content: {
      title: 'Pattern 2: Scope Control',
      code: `# Too narrow (default)
"Find where this function is called"

# Expanded breadth
"Cast a wider net — find all usages of this pattern
across the entire codebase, don't restrict yourself."

# Expanded depth
"Go super deep on this module. Trace execution flows,
understand every import and export."`,
      note: 'Controls whether Claude explores broadly or deeply'
    }
  },

  {
    type: 'code',
    content: {
      title: 'Pattern 3: Self-Verification',
      code: `# Add at end of any request
"Are you sure? Is it optimal?
Could we change anything to make it better?"

# Forces Claude to double-check before responding
# Catches mistakes that slip through on first pass
# Especially useful before implementing plans`,
      note: 'Cheap insurance — catches obvious misses'
    }
  },

  {
    type: 'code',
    content: {
      title: 'Pattern 4: Fresh Eyes',
      code: `# After Claude has been working a while
"Look at this with fresh eyes — reset your assumptions."

# For code review
"Review this as if you're seeing it for the first time,
written by someone else."

# Breaks tunnel vision, surfaces issues Claude normalized`,
      note: 'Use when Claude seems stuck or is missing obvious things'
    }
  },

  {
    type: 'code',
    content: {
      title: 'Pattern 5: Anchoring',
      code: `# After context compaction or long sessions
"Reread CLAUDE.md so it's fresh in your mind."

# When Claude starts drifting from project conventions
"Check CLAUDE.md — are you following our patterns?"

# Re-grounds Claude to your project's rules`,
      note: 'Essential after compaction when rules get fuzzy'
    }
  },

  {
    type: 'code',
    content: {
      title: 'Pattern 6: Temporal Awareness',
      code: `# Write for future contexts (other sessions, other people)
"Explain this as if to someone with no context."

# Make outputs self-contained
"Include background, reasoning, and the larger goal
so this document stands alone."

# Future-proof your artifacts`,
      note: 'Essential for plans and docs that survive sessions'
    }
  },

  {
    type: 'code',
    content: {
      title: 'Pattern 7: First Principles',
      code: `# Understand before fixing
"Diagnose root causes using first-principle analysis."

# Context before action
"Understand the purpose of this code in the larger
workflow before making changes."

# Root cause over symptom
"Don't just fix the error — understand why it happened."`,
      note: 'Prevents surface-level fixes that cause new bugs'
    }
  },

  // Stacked modifiers example
  {
    type: 'code',
    content: {
      title: 'Example: Stacked Modifiers',
      code: `# Without stacking
"Review this code"

# With stacking (signals importance → more compute)
"Do a super careful, methodical, critical review of
this code. Think through every edge case. Be
systematically meticulous."

# Stack: super + careful + methodical + critical +
#        systematically + meticulous`,
      note: 'The more you stack, the more compute the model allocates.'
    }
  },

  // Ready-to-use prompts reference
  {
    type: 'insight',
    content: {
      title: 'Ready-to-Use Prompts in the Repo',
      points: [
        'Idea Wizard — 30 ideas → filter to 5 best',
        'Big-Brained Optimizer — find gross inefficiencies',
        'README Reviser — update docs for recent changes',
        'Dueling Idea Wizards — two models critique each other',
        'Codex Plan/Implementation Review — multi-model reviews'
      ],
      takeaway: 'Clone the repo. All prompts are in /prompts — ready to copy.'
    }
  },

  // Section 4
  {
    type: 'section',
    content: {
      number: '04',
      title: 'Scaling',
      subtitle: 'Subagents · Parallel Sessions'
    }
  },

  // Subagents
  {
    type: 'insight',
    content: {
      title: 'Subagents',
      points: [
        'Separate Claude instances the main agent spawns',
        'Each runs in its own fresh context',
        'Main agent stays clean — orchestrates, doesn\'t get polluted',
        'Work happens in parallel',
        'If a subagent goes wrong, it doesn\'t affect main session'
      ],
      takeaway: 'Main agent = project manager. Subagents = specialists.'
    }
  },

  // Subagents - when
  {
    type: 'code',
    content: {
      title: 'When to Use Subagents',
      code: `# Exploring large codebase
"Find all usages of this pattern, use subagents"

# Running multiple independent checks
"Run linting, type checking, and tests, use subagents"

# Researching multiple approaches
"Investigate Redis, Memcached, and in-memory caching,
use subagents, then synthesize a recommendation"

# Any parallelizable task
Just append "use subagents" to your prompt`,
      note: 'Subagents report back to main agent with findings'
    }
  },

  // Parallel sessions - intro
  {
    type: 'headline',
    content: {
      text: 'Run Multiple Sessions in Parallel',
      subtext: 'Three levels of parallelism, from simple to advanced'
    }
  },

  // Parallel - level 1
  {
    type: 'insight',
    content: {
      title: 'Level 1: Multiple Tabs (Simplest)',
      points: [
        'Open multiple terminal tabs, each with Claude',
        'Manually ensure non-overlapping file changes',
        'One tab implementing, another tab planning the next feature',
        'No special setup required',
        'Just be mindful of what each session is touching'
      ],
      takeaway: 'Start here. Most of the benefit, none of the setup.'
    }
  },

  // Parallel - level 2
  {
    type: 'insight',
    content: {
      title: 'Level 2: Multiple Checkouts',
      points: [
        'Clone your repo multiple times',
        '~/project-main, ~/project-feature-a, ~/project-feature-b',
        'Each checkout is fully independent',
        'No risk of file conflicts between sessions',
        'Uses more disk space (each has full .git)'
      ],
      takeaway: 'Use when you want complete isolation between features.'
    }
  },

  // Parallel - level 3
  {
    type: 'code',
    content: {
      title: 'Level 3: Git Worktrees (Most Efficient)',
      code: `# Create linked working directories (share same .git)
git worktree add ../project-feature -b feature-x
git worktree add ../project-bugfix bugfix-123

# List all worktrees
git worktree list

# Remove when done
git worktree remove ../project-feature

# Benefits:
# - Shared .git (less disk space)
# - Commits instantly visible across worktrees
# - Can't accidentally checkout same branch twice`,
      note: 'Best of both worlds: isolation + efficiency'
    }
  },

  // Parallel - what to run
  {
    type: 'insight',
    content: {
      title: 'What to Run in Parallel',
      points: [
        'Feature A + Feature B (different files) ✓',
        'Implementation + Planning next feature ✓',
        'Backend changes + Frontend changes ✓',
        'Coding + Running analysis/reading logs ✓',
        'Two sessions editing same files ✗ (merge conflicts)'
      ],
      takeaway: 'Sound notifications tell you when each completes. You orchestrate.'
    }
  },

  {
    type: 'quote',
    content: {
      quote: 'You are the bottleneck — be the clockwork deity orchestrating your agent swarms.',
      author: 'From the guide',
      context: 'on parallelism'
    }
  },

  // Section 5
  {
    type: 'section',
    content: {
      number: '05',
      title: 'The Mindset',
      subtitle: 'Claude Code as an OS'
    }
  },

  // Mindset
  {
    type: 'insight',
    content: {
      title: 'It\'s Not a Coding Assistant',
      points: [
        'It\'s a general-purpose agent operating system',
        'Has access to terminal, filesystem, web, CLIs, MCP servers',
        'Can run for hours autonomously on complex tasks',
        'Your job is to direct it, plan, review — not do the work',
        'This entire guide was built with Claude Code'
      ],
      takeaway: 'The intuition comes from using it, not reading about it.'
    }
  },

  // Mindset - shifts
  {
    type: 'list',
    content: {
      title: 'Shifts That Matter',
      items: [
        'Planning is leverage — time spent planning saves 10× in implementation',
        'Persistence compounds — CLAUDE.md, skills, hooks, docs build over time',
        'Parallelism scales you — run multiple sessions, be the orchestrator'
      ]
    }
  },

  // Files that survive
  {
    type: 'insight',
    content: {
      title: 'Files That Survive Sessions',
      points: [
        'CLAUDE.md — project rules, gotchas, corrections',
        'docs/plans/ — feature plans, architecture decisions',
        'docs/ — API patterns, decision rationale, gotchas',
        '.claude/skills/ — custom slash commands (committed to git)',
        '~/.claude/settings.json — hooks, status line, preferences'
      ],
      takeaway: 'Build infrastructure that compounds. Don\'t repeat yourself across sessions.'
    }
  },

  {
    type: 'quote',
    content: {
      quote: 'You have to use it to get it.',
      author: 'From the guide',
      context: 'the intuition comes from doing, not reading'
    }
  },

  // Next session preview
  {
    type: 'detail',
    content: {
      title: 'Next Session: Agent Flywheel',
      items: [
        { term: 'Beads', desc: 'Graph-aware task tracking — PageRank for priority, dependency analysis' },
        { term: 'Agent Mail', desc: 'Multi-agent coordination — message passing + file locking' },
        { term: 'CASS', desc: 'Session memory — searchable history across all agent conversations' },
        { term: 'The Loop', desc: 'Plan → Coordinate → Execute → Remember → Scan (each cycle compounds)' }
      ]
    }
  },

  // Final
  {
    type: 'end',
    content: {
      title: 'This session: Foundations.',
      subtitle: 'Next session: Agent Flywheel — multi-agent workflows at scale.',
      cta: 'claude-code-guide repo · agent-flywheel.com/learn'
    }
  }
]

function Slide({ slide, isActive }) {
  const { type, content } = slide

  if (type === 'title') {
    return (
      <div className={`slide slide-title ${isActive ? 'active' : ''}`}>
        <h1>{content.title}</h1>
        <p className="subtitle">{content.subtitle}</p>
        <span className="note">{content.note}</span>
      </div>
    )
  }

  if (type === 'section') {
    return (
      <div className={`slide slide-section ${isActive ? 'active' : ''}`}>
        {content.number && <span className="section-number">{content.number}</span>}
        <h2>{content.title}</h2>
        <p className="section-subtitle">{content.subtitle}</p>
      </div>
    )
  }

  if (type === 'quote') {
    return (
      <div className={`slide slide-quote ${isActive ? 'active' : ''}`}>
        <blockquote>"{content.quote}"</blockquote>
        <cite>
          <strong>{content.author}</strong>
          <span>{content.context}</span>
        </cite>
      </div>
    )
  }

  if (type === 'headline') {
    return (
      <div className={`slide slide-headline ${isActive ? 'active' : ''}`}>
        <h2>{content.text}</h2>
        <p>{content.subtext}</p>
      </div>
    )
  }

  if (type === 'insight') {
    return (
      <div className={`slide slide-insight ${isActive ? 'active' : ''}`}>
        <h3>{content.title}</h3>
        <ul>
          {content.points.map((point, i) => (
            <li key={i}>{point}</li>
          ))}
        </ul>
        <p className="takeaway">{content.takeaway}</p>
      </div>
    )
  }

  if (type === 'framework') {
    return (
      <div className={`slide slide-framework ${isActive ? 'active' : ''}`}>
        <h3>{content.title}</h3>
        <div className="phases">
          {content.items.map((item, i) => (
            <div key={i} className="phase">
              <span className="phase-name">{item.phase}</span>
              <span className="phase-desc">{item.desc}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (type === 'list') {
    return (
      <div className={`slide slide-list ${isActive ? 'active' : ''}`}>
        <h3>{content.title}</h3>
        <ol>
          {content.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ol>
      </div>
    )
  }

  if (type === 'code') {
    return (
      <div className={`slide slide-code ${isActive ? 'active' : ''}`}>
        <h3>{content.title}</h3>
        <pre><code>{content.code}</code></pre>
        {content.note && <p className="code-note">{content.note}</p>}
      </div>
    )
  }

  if (type === 'detail') {
    return (
      <div className={`slide slide-detail ${isActive ? 'active' : ''}`}>
        <h3>{content.title}</h3>
        <dl>
          {content.items.map((item, i) => (
            <div key={i} className="detail-item">
              <dt>{item.term}</dt>
              <dd>{item.desc}</dd>
            </div>
          ))}
        </dl>
      </div>
    )
  }

  if (type === 'end') {
    return (
      <div className={`slide slide-end ${isActive ? 'active' : ''}`}>
        <h2>{content.title}</h2>
        <p>{content.subtitle}</p>
        <span className="cta">{content.cta}</span>
      </div>
    )
  }

  return null
}

function App() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const goNext = useCallback(() => {
    setCurrentSlide(prev => Math.min(prev + 1, slides.length - 1))
  }, [])

  const goPrev = useCallback(() => {
    setCurrentSlide(prev => Math.max(prev - 1, 0))
  }, [])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') {
        e.preventDefault()
        goNext()
      } else if (e.key === 'ArrowLeft' || e.key === 'Backspace') {
        e.preventDefault()
        goPrev()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goNext, goPrev])

  return (
    <div className="presentation">
      <div className="slides-container">
        {slides.map((slide, index) => (
          <Slide
            key={index}
            slide={slide}
            isActive={index === currentSlide}
          />
        ))}
      </div>

      <div className="progress">
        <div
          className="progress-bar"
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        />
      </div>

      <div className="controls">
        <span className="slide-counter">{currentSlide + 1} / {slides.length}</span>
      </div>
    </div>
  )
}

export default App
