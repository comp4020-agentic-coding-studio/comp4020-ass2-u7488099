---
title: The Invisible Jungler
description:
  Analyse partially hidden game states and infer where the enemy jungler is
  likely to be, using evidence rather than guesswork.
week: 7
due: 2027-04-19T12:00:00+10:00
weight: 20
marking:
  mode: weighted
  criteria:
    - name: Evidence and citation
      weight: 25
    - name: Quality of inference
      weight: 20
    - name: Handling uncertainty
      weight: 20
    - name: Use of course concepts (Weeks 3, 5, 6, 7)
      weight: 20
    - name: Decision quality given available information
      weight: 15
spec:
  - infers a plausible jungler location from a partially hidden game state, citing concrete evidence rather than intuition
  - names at least one plausible alternative location the same evidence does not rule out
  - states what additional information would change the conclusion
  - recommends an action for the player or team that follows from the inference and its uncertainty, not from assuming the guess is correct
  - a well-supported inference that turns out wrong is marked on its reasoning, not penalised for missing the hidden ground truth
related:
  - lectures/week-03
  - lectures/week-05
  - lectures/week-06
  - lectures/week-07
---

## The brief

> Analyse partially hidden game states and infer where the enemy jungler is
> likely to be, using evidence rather than guesswork.

You will be given several checkpoints, each built from a real (or
realistic) partial game state: replay screenshots, minimap states, event
timers and lane states, at a moment where the enemy jungler is not visible.
None of these are trick questions with a single hidden correct answer
waiting to be revealed. The point of the assessment is the reasoning, not
the guess — which is why the marking below rewards a well-supported
inference that turns out to be wrong over an unsupported one that happens
to be right.

## What you submit

For **each checkpoint**, answer all five of the following, in order:

1. **Where is the enemy jungler most likely to be?** A specific location or
   small area, not "somewhere on the map."
2. **What evidence supports that inference?** Cite what's actually visible
   in the checkpoint — wave states (Week 3), last-seen location and time,
   missing camps, ward timers, tempo spent elsewhere (Week 6) — not a
   general impression.
3. **What alternative locations remain plausible?** At least one. If the
   evidence only supports one location with no live alternative, say so and
   explain why the evidence is that decisive — that's rare, and it should
   be argued, not assumed.
4. **What information would change the conclusion?** Name a specific piece
   of evidence — a ward placed in a specific spot, a kill notification, a
   recall — that would move you from your answer to one of the
   alternatives, or confirm it.
5. **Given the uncertainty, what should the player or team do?** A concrete
   action (send vision, delay a commitment, group before contesting), not a
   restatement of the inferred location. This should read like Week 7's
   map-state exercise: a decision made despite acknowledged uncertainty,
   not a decision that depends on the guess being correct.

## Marking

|Criterion|Weight|
|---|---|
|Evidence and citation|25%|
|Quality of inference|20%|
|Handling uncertainty|20%|
|Use of course concepts (Weeks 3, 5, 6, 7)|20%|
|Decision quality given available information|15%|

**Evidence and citation** rewards pointing at specific, checkable details in
the checkpoint over a general impression of where a jungler "probably" is.

**Quality of inference** rewards reasoning that connects the cited evidence
to the conclusion — the chain from wave state or timing to location — over
an inference that simply asserts a location the evidence happens to fit.

**Handling uncertainty** rewards naming plausible alternatives and what
would resolve between them, over presenting a single guess as though it
were certain. This is where the assessment penalises confident guessing
regardless of whether the guess turns out correct.

**Use of course concepts** rewards explanations built from wave states
(Week 3), jungle tracking and staleness (Week 5), tempo and opportunity
cost (Week 6), or the observed/inferred/missing/stale distinctions
(Week 7) — over commentary that doesn't name what evidence is actually
doing the work.

**Decision quality given available information** rewards a recommended
action that makes sense given what's known and unknown at that checkpoint.
A cautious action justified by real uncertainty scores higher than a bold
one that only works if the guess happens to be right — and a correct
location paired with a poorly reasoned decision does not earn full marks
here.
