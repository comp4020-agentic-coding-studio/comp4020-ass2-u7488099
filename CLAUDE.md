# League Studies (SLOP3699) — course authoring rules

This repository implements **SLOP3699 League Studies**, a 3000-level
undergraduate Slop University course about analysing League of Legends
gameplay.

## Course purpose

The course does not teach students how to climb ranked, memorise champions, or
follow a generic beginner guide.

It teaches students to read a League of Legends match: to explain how
resources, information, space, tempo and team composition turn decisions into
wins and losses.

The central recurring principle is:

> Every advantage must eventually be converted.

Gold, kills, vision, tempo, objectives and pressure matter because of what they
allow a team to do next.

## Audience

Assume students already understand the basic rules of League of Legends:

- lanes and roles
- champions and abilities
- items
- minions
- major objectives
- the basic goal of destroying the Nexus

Do not spend teaching weeks explaining beginner controls or basic terminology
unless needed for a deeper concept.

No minimum rank is required. Rank is not evidence.

## Curriculum rules

- Every teaching week must be organised around a question, not merely a topic.
- Every week after Week 1 must explicitly build on at least one concept
  introduced earlier.
- Every week must contain at least one concrete game state, scenario, replay
  moment, map state, draft or decision for students to reason about.
- Strategic claims must explain why a decision is good or bad in context.
- Avoid absolute rules such as "always take Dragon" or "never fight here" when
  the correct decision depends on game state.
- Champion-specific examples may illustrate principles, but must never replace
  the principle.
- The course must not become a champion guide, item guide, patch-summary site,
  or solo-queue climbing guide.
- Weeks should not all use the same page structure. Use different forms of
  evidence and activity where appropriate.
- Week 12 must synthesise earlier concepts rather than introduce a major new
  one.
- Students should finish the course better able to answer the question: *Why
  did this team win?*

## Voice

Write in plain, direct language.

Avoid generic esports marketing prose, motivational filler and AI-shaped
introductions.

Do not write phrases such as:

- "In the fast-paced world of League of Legends…"
- "Whether you're a beginner or a seasoned veteran…"
- "League of Legends is more than just a game…"

Treat League Studies as a serious academic field with occasional dry humour.

## Assessments

Assess reasoning, not trivia.

Students should be asked to explain decisions using evidence from game states,
replays or drafts.

Do not create factual multiple-choice tests about champion abilities, item
costs or patch notes as major assessments.

Assessment weights must total 100%.

## Site/content integrity

Preserve SlopU's fixed content model, generated API, marks and required
branding.

Do not change the provisioned final three digits `699` of the course code. The
course should be `SLOP3699` unless there is a technical reason the starter
expects the level digit elsewhere.

Keep all twelve teaching weeks dated.

At least one lecture must link to a real deck that builds.

`pnpm check` and `pnpm check:evidence` must pass before shipping.
