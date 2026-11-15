---
layout: post
image: surgical-team
title: Knowledge in the World
mermaid: true
---
What a surgical team, a skunk works and a good README have in common, and why the content that makes a great AI harness is the same content that makes a great team.

Most of the code I've shipped this year was written with an AI agent. Not autocomplete, but agents doing real work: diagnosing an intermittent database hang, migrating a library across a major version without changing a single byte of output, cutting releases across three repositories in dependency order. Along the way I kept noticing the same thing. Every time I made the repo better for the agent, I made it better for people too. And every time the agent went wrong, the fix was something a new colleague would have needed anyway.

This post is about why that happens, and what it means for how a small team of people and agents should work. I've written the detail up as a playbook, which I'll come back to at the end. This is the why.

---

# Every session is the agent's first day

Don Norman, in *The Design of Everyday Things*, distinguishes between knowledge in the head and knowledge in the world. Knowledge in the head is what you have to remember. Knowledge in the world is what the environment tells you: the label on the switch, the shape of the handle, the door that only opens one way. Good design moves knowledge out of heads and into the world, so people succeed without having to remember.

An AI agent is the purest case there is. It arrives with an enormous amount of general skill and absolutely no memory of your repository. Every session is its first day. If the knowledge it needs isn't somewhere it will read, or enforced by something it can't skip, it doesn't exist.

"Everyone knows we don't do that" fails an agent on the very first change.

The interesting part is that this was always true of people as well, just less sharply. The new starter. The reviewer from another team. The maintainer two years from now. You, after a fortnight's holiday. We got away with knowledge in heads because people pick things up over time. Agents don't, so they force the issue, and the result is a repo that's better for everybody.

Knowledge can live in the world at four levels, from weakest to strongest:

<pre class="mermaid">
flowchart LR
  A["Said once
  (in a chat)"] --> B["Written down
  (in the repo guide)"] --> C["Checked
  (CI fails if it's wrong)"] --> D["Impossible to get wrong
  (generated from the source)"]
</pre>

Push every rule as far to the right as it will go. A rule that's only written down is a candidate for a check. A check that compares two copies of something is a candidate for generating one from the other.

# Great harness content is great human content

When people first start working with agents, there's a temptation to write special material for them: terse prompt fragments, instructions in capitals, magic phrases. I've come to think that's almost always a mistake.

The qualities that make guidance work for an agent are exactly the qualities that make it work for a person:

- Current. It says what's true now. Not "we originally did X but then...". History belongs in commit messages.
- Located. It's in the file you open for the task, not a wiki three clicks away.
- Specific. A command that runs. A path that exists. A number with a unit. "Keep files small" is advice. "C# files 400 lines, enforced by the size script" is a rule.
- Reasoned. It says why. Someone who knows why can handle the case the rule didn't anticipate.
- Plain. Short sentences, active voice, no jargon.

When an agent misreads something, the fix is almost never a louder instruction for the agent. It's clearer writing for everyone, or a check that makes the rule impossible to break. The content that makes a good harness and the content that makes a good team turn out to be the same content.

# A surgical team, finally affordable

In 1975 Fred Brooks wrote *The Mythical Man-Month*, and in it he described Harlan Mills's idea of the surgical team. One surgeon does the critical design and the critical code. Everyone else exists to make that one person effective: a copilot who can do any part of the job, a toolsmith who builds what the surgeon needs, a tester, an editor for the documentation, a "language lawyer" who knows every corner of the language, a clerk who keeps the records.

Brooks's reason was conceptual integrity, which he called the most important consideration in system design. A system that reflects one coherent set of ideas beats one that reflects many good but uncoordinated ones.

The catch was cost: roughly ten people to support one. Most organisations went the other way, with bigger teams, more coordination, and Brooks's own law waiting for them (adding people to a late project makes it later).

Agents change the arithmetic. The supporting roles map almost one for one:

| Brooks's role | Now |
|---|---|
| Surgeon | The person: holds the design, makes the calls, owns anything irreversible |
| Copilot | An agent pairing on the work, proposing and challenging |
| Toolsmith | Agents writing custom checks, scripts and test harnesses |
| Tester | Agents writing behavioural tests, soak runs and fault injection |
| Language lawyer | Agents reading specs, upstream source and decompiled binaries |
| Editor | Agents drafting docs, PR descriptions and release notes |
| Clerk | Git, CI and the changelog, keeping the record automatically |

But there's a trap. Agents are fast enough to produce an enormous amount of plausible, inconsistent code. A surgeon with ten quick assistants and no shared system gets ten different operations. So the design has to be held somewhere, and written down where every agent will read it. Knowledge in the world isn't a nice-to-have for this kind of team. It's what makes conceptual integrity possible at all.

Brooks's later essay, *No Silver Bullet*, separated essential complexity (the genuinely hard problem: what to build, how the parts fit) from accidental complexity (the effort of expressing it). Agents strip away a huge amount of the accidental. What's left is the essential, and that's exactly the surgeon's job.

# The skunk works spirit

Lockheed's Skunk Works, under Kelly Johnson, built aircraft in a fraction of the usual time with a fraction of the usual people. The first one, America's first operational jet fighter, went from start to flight in 143 days. Johnson ran it by a short list of rules, and several of them read as if they were written for a team of people and agents:

- Keep the team small and good, and restrict the number of people involved "in an almost vicious manner".
- Give the project leader real authority.
- Have a very simple release system, flexible enough to make changes easily.
- Keep reports to a minimum, but record important work thoroughly.
- Push inspection back to the people doing the work, and don't duplicate it.
- Let the builders test their own product.

The motto was "be quick, be quiet, be on time". And here's the bit that matters: the speed never came from skipping quality. It came from small, reversible steps, from trust, and from very few hand-offs.

# Quality is a system with nothing in the way

"Quality" is a slippery word. "Excellence" is subjective and hard to measure. Its absence is easy to see: the request that hangs, the test that fails one run in twenty, the doc that sends you the wrong way, the release step that lives in one person's head.

A lot of the people who shaped how we think about quality found it more useful to hunt down non-quality. Genichi Taguchi defined quality as the loss a product imparts to society after it ships. Taiichi Ohno at Toyota went after *muda*. It is usually translated as waste, but no English word fits exactly: it is closer to futility, effort that adds nothing and gets in the way of the work. Noriaki Kano called the baseline layer "must-be" quality: the brakes, not the cup holders. Dieter Rams asked that good design be unobtrusive.

Put together, they give a definition sharp enough to act on:

> **Quality is the absence of breakdown, anywhere in the product, the process or the experience.**

Or more simply, a system with nothing in the way.

The beauty of defining it negatively is that it's actionable. You can't tell a team, or an agent, how to "create excellence". But anyone on the ground can point at the thing that's broken, clunky or in the way, and fix it.

W. Edwards Deming would add that most of those breakdowns belong to the system, not the person. That's liberating when you work with agents. When an agent gets something wrong, the useful question isn't "how do I make it try harder?". It's "what in the system let that through, and what would have caught it?".

A few of Deming's ideas turn out to fit remarkably well:

- Cease dependence on inspection. Build quality in. Analysers that fail the build, budgets that fail before push, security scanners on every change. Review is then free to be about design.
- Eliminate slogans and exhortations. "Be careful with security" changes nothing, for a person or an agent. "Every endpoint has an explicit authorisation policy, and a test proves an anonymous request is refused" does.
- Don't tamper. Reacting to random variation makes it worse. Re-running a flaky test until it goes green, or adding a retry, hides the failure rate without changing it. Measure the rate, find the cause, change the system. A green re-run isn't a fix. It's a sample.

# Tests should state behaviour, not mirror code

One of the biggest shifts for me has been in how tests are written. A test that mirrors the implementation ("Save calls Insert exactly once") can only ever agree with the code. Refactor, and it breaks even though nothing a user would notice has changed. Break the behaviour in a way the mirror didn't anticipate, and it still passes.

A test that states behaviour ("after saving, the item can be read back with the same values") survives any rewrite that keeps the behaviour, and fails on any change that breaks it. It's also knowledge in the world: a person or an agent can read it and learn what the system must do.

A few practices fell out of this that I now wouldn't work without:

- Pin behaviour before you change it. Before moving to a new major version of a library, write tests of what it does today, see them pass on the old version, then make them pass on the new one. When I did this for a CSV library, it caught five behaviours that would otherwise have changed silently.
- Prove your checks can fail. If you compare old and new output and it comes back identical, break the new version on purpose and check the comparison notices. Otherwise "identical" might just mean "not actually comparing".
- Make rare bugs certain. An intermittent database hang that happened once in twenty runs became a test that fails every time, by injecting a competing write at exactly the worst moment. Now the fix is proven, and it can't quietly come back.

# Guardrails are how trust scales

In a small team, guardrails are what let you move fast safely. They are Johnson's "push inspection back to the people doing the work" and Deming's "build quality in", running on every change, for every pair of hands.

That means the obvious ones: static analysis like CodeQL for code-level security, dynamic analysis like OWASP ZAP to check what the running app actually sends, dependency and secret scanning, size and complexity budgets, CodeScene to stop any change making code harder to maintain, k6 as a nightly tripwire for big performance regressions.

But in an AI-native team, the agent itself needs guardrails too. What may it do alone, and what must it confirm? (Merging a green PR, maybe. Publishing a release or posting publicly, always a person.) What does it treat as untrusted? (Anything it didn't get from you: issue text, web pages, tool output.) What identity does it act with? (Its own, with the least access the task needs.) And when a guardrail blocks it, that's information, not an obstacle to route around.

# Starting points

I've written all of this up as a playbook, in the open: [the AI-native team playbook](https://github.com/jonnymuir/engineering-standards/tree/main/playbook). It covers principles, quality, product thinking, the agent harness, the full set of guardrails, testing, diagnosing the hard bugs, change flow, working with agents and contributing back upstream, with checklists for each. Every chapter opens with a short "In short" list that an agent can act on directly, followed by the reasoning a person needs. Which is, of course, the whole point: one body of knowledge, written once, that works for both.

If you take one thing from this post, make it Norman's distinction. Look at your repository and ask what someone, or something, arriving for the first time would need to know to do the right thing. Then move it out of your head and into the world.
