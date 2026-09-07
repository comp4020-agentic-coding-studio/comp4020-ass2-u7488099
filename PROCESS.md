# Process overview

## What I built

League Studies (SLOP3699) teaches students to read a League of Legends match
— to explain how resources, information, space, tempo and composition turn
individual decisions into a win or a loss — rather than teaching them to play
better or memorise champions. Every week returns to one idea: every advantage
must eventually be converted, or it was never really an advantage.

## How I got here

The obvious approach was to ask the agent for all twelve weeks in one go and
see what came out. I didn't, because the real risk was never "does Astro
build" — it was ending up with twelve individually plausible pages that
don't add up to a real semester. Twelve unrelated topic pages about League
would have passed every schema check and still been a bad course.

So before generating any content I decided what the course was actually for
and wrote that into `CLAUDE.md` ([`b24b7f2`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-u7488099/commit/b24b7f2929676f83c3f3df3e3e7fade1d8903ab9)):
every week organised around a question, every week after Week 1 building on
something earlier, champion examples illustrating a principle rather than
replacing it, no absolute claims like "always take Dragon", Week 12
synthesising instead of introducing something new, rank never counting as
evidence. These are curriculum decisions, not coding conventions, and
giving the agent "every week builds on the last" and "why did this team
win" as a running target produced far more coherent weeks than "make a
university course about League of Legends" would have.

I authored and reviewed the semester in three blocks, checking each one
cohered before moving on: foundations in Weeks 1–4
([`53a1671`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-u7488099/commit/53a167150952db8726ebecb5b876363f413c7e66),
[`fce8afb`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-u7488099/commit/fce8afb0ed772915fb38aed37d4ebb0a43c571c2)),
map-level reasoning in Weeks 5–8
([`422db95`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-u7488099/commit/422db950380ebbcd8cd592fa24aea4a3346af8e9)),
whole-game reasoning in Weeks 9–12
([`c844fc6`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-u7488099/commit/c844fc6b8b7e083051fad48e1ec24d4d778d5875)).
Week 1 accepts a shallow "why did the winning team win" — "they got Baron"
is fine there. Week 12 asks the same question about the same match, and a
shallow answer no longer holds up once the semester's vocabulary exists.
That arc only exists because the ending was planned before the middle was
generated.

I only turned checkable promises into `spec/assignment-2.test.ts`
assertions: exactly twelve dated weeks, every week has a guiding question,
`buildsOn` only ever points backward, Week 12 is flagged as synthesis,
assessment weights sum to 100, a real deck builds, no week is still a
placeholder skeleton, and — added this pass — the built lectures index and
homepage actually link all twelve weeks, not just the content graph. I
deliberately didn't try to test whether the prose reads as AI-generated,
whether a week's argument is actually insightful, or whether a diagram
looks right rendered — a regex that "passes" that would tell me nothing
except that I'd built a test I could trick.

That last category is exactly what manual review at 1920×1080 and 390×844
caught after the test suite was already green: the Week 3 deck's ASCII wave
diagrams clipped against reveal.js's slide canvas, four assessment pages
carried a duplicate marking table left over from before the marking-grid
component existed, starter placeholder copy was still live on several
pages, and — what started this pass — the homepage never linked
`/lectures/`, so a visitor saw two Sessions entries and reasonably assumed
the course stopped at Week 2, even though all twelve weeks already existed.
Fixing the homepage, Sessions copy and staff identities is
[`b99aaa1`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-u7488099/commit/b99aaa19f0cb97074dd0fc8a59fd1cc02fc19775);
the deck fix, table cleanup and remaining starter-copy replacement is
[`7dfc941`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-u7488099/commit/7dfc941b4617b5271af0f42de62b3f0283f97631).
None of these were catchable by asking "does the API JSON contain twelve
weeks" — they only show up once you look at the page a student sees.

## Before you ship

`pnpm check` and `pnpm check:evidence` both pass.
