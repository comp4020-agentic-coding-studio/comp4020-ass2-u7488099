---
title: The Jungle
description:
  The jungler is the one player routinely making decisions about parts of the
  map nobody can see, so jungling is a study in acting on incomplete
  information. Builds on the trading and power concepts from earlier weeks and
  applies them to a player whose state your opponent must infer.
week: 5
date: 2027-03-22
teachers:
  - sweetpig12
question: >
  How do you make decisions about a player you cannot see?
buildsOn:
  - week-02
  - week-04
---

## Guiding question

> How do you make decisions about a player you cannot see?

## The jungle's first problem is that you're guessing

Every decision this course has covered so far is made with most of the
relevant board visible: your own lane, your own wave, your own gold count.
Jungle decisions are not, for either side. A jungler chooses where to go,
and everyone else — teammates and opponents alike — is reasoning about a
position that is, at any given moment, unconfirmed. This week treats that
as a real problem of method: how do you decide, and how do you reconstruct
after the fact, what a player who isn't visible is doing?

## Pathing is a sequence of choices, not a route

A jungle path is not fixed by which champion is being played; it's a
sequence of decisions, each gated by what's true at the moment it's made —
which camps are up, what the lanes next to each camp look like, whether a
contested camp is worth a trade with the enemy jungler. A "standard" path
is a default assumption, not a commitment, and a jungler's camp sequence so
far is itself evidence: it implies roughly what level and gold they're
carrying, which constrains what they can credibly do next.

## Builds on Week 3: waves gate jungle options

A jungler cannot decide to gank independently of the lane's wave state — the
wave decides whether the gank is even available. A frozen wave held just
outside a tower makes a gank low value, because the laner behind it won't
be caught extended. A wave slow-pushing toward that same tower is exactly
the moment worth arriving, because the laner is already out of position by
the wave's own logic, before the jungler has done anything at all. Reading a
lane's wave state is how a jungler decides where their time is worth
spending.

## Counterjungling is a resource play and an information play at once

Invading the enemy jungle to take or deny their camps denies gold and
experience directly, but doing it safely requires already having a guess
about where the enemy jungler is — otherwise the counterjungle is an invade
into them, not around them. It's one of the few plays where acting on an
inference and testing that inference happen in the same moment.

## Tracking from partial evidence

At any point, what a team can know about the enemy jungler comes from a
short list of evidence types: where they were last directly seen, which of
their camps show as cleared, which lanes show a wave-state change (Week 3)
that isn't explained by anything the laner did, and — critically — how long
ago each of those observations was made.

## Information goes stale

"Jungler seen top side two minutes ago" is a fact about the past, not the
present. By the time it's acted on, they could be anywhere reachable inside
that window. Treat an old sighting as a shrinking guarantee, not a
location — a theme this course returns to properly in Week 7.

## Reconstruction exercise

You're given:

- the enemy jungler was last directly seen entering the red-side raptor
  camp at 4:30
- by 6:00, bot lane's wave has gone from neutral to crashing into your own
  tower, unexplained by anything either bot laner did
- mid lane's wave is frozen just outside the enemy's tower
- the Rift Herald timer reads 1:00 remaining

Where is the jungler likely to be at 6:00, and what supports that? There
isn't one certain answer. A bot-side gank explains the unexplained crash
convincingly. So does a camp clear on the path toward Herald that happens
to line up with the timer. Write out both readings, and identify the one
piece of evidence — a ward, a missing kill notification, a bot laner's
recall — that would separate them.
