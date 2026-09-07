import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

interface ApiNode {
  id: string;
  type: string;
  related?: string[];
  meta?: Record<string, unknown>;
}

interface CourseApi {
  course: { code: string; level: number };
  nodes: ApiNode[];
}

const api = JSON.parse(readFileSync(resolve("dist/api/index.json"), "utf8")) as CourseApi;

// Assigned at provisioning time — this repo's SLOPxxxx code must keep these
// last three digits; the brief fixes the course at level 3 (SLOP3699).
const PROVISIONED_DIGITS = "699";
const FIXED_CODE = "SLOP3699";
const FIXED_LEVEL = 3;

const lectures = api.nodes.filter((node) => node.type === "lectures");
const lectureByWeek = new Map(lectures.map((node) => [node.meta?.week, node]));

const weekNumberFromSlug = (slug: string): number | undefined => {
  const match = /^week-(\d+)$/.exec(slug);
  return match ? Number(match[1]) : undefined;
};

describe("assignment 2 spec", () => {
  it("keeps the SLOPxxxx digits this repo was provisioned with", () => {
    expect(api.course.code).toMatch(new RegExp(`${PROVISIONED_DIGITS}$`));
  });

  it("stays fixed at SLOP3699, level 3", () => {
    expect(api.course.code).toBe(FIXED_CODE);
    expect(api.course.level).toBe(FIXED_LEVEL);
  });

  it("has exactly twelve dated teaching weeks", () => {
    const weeks = new Set(lectures.map((node) => node.meta?.week));
    expect(weeks.size).toBe(12);
    for (let week = 1; week <= 12; week++) {
      expect(weeks.has(week), `no lecture dated for week ${week}`).toBe(true);
    }
  });

  it("gives every week a guiding question", () => {
    for (let week = 1; week <= 12; week++) {
      const node = lectureByWeek.get(week);
      expect(node, `week ${week} has no lecture`).toBeDefined();
      const question = node?.meta?.question;
      expect(typeof question === "string" && question.trim().length > 0, `week ${week} has no guiding question`).toBe(
        true,
      );
    }
  });

  it("has weeks 2-12 each reference at least one earlier week", () => {
    for (let week = 2; week <= 12; week++) {
      const node = lectureByWeek.get(week);
      const buildsOn = (node?.meta?.buildsOn ?? []) as string[];
      expect(buildsOn.length, `week ${week} does not build on an earlier week`).toBeGreaterThan(0);
      const referencesEarlierWeek = buildsOn.some((slug) => {
        const priorWeek = weekNumberFromSlug(slug);
        return priorWeek !== undefined && priorWeek < week;
      });
      expect(referencesEarlierWeek, `week ${week}'s buildsOn does not point to an earlier week`).toBe(true);
    }
  });

  it("marks week 12 as synthesis, not a new concept", () => {
    const week12 = lectureByWeek.get(12);
    expect(week12?.meta?.synthesis).toBe(true);
  });

  it("has an assessment scheme that adds up to 100%", () => {
    const total = api.nodes
      .filter((node) => node.type === "assessments")
      .reduce((sum, node) => sum + Number(node.meta?.weight ?? 0), 0);
    expect(total).toBe(100);
  });

  it("has at least one lecture carrying a real, built deck", () => {
    const deckLectures = lectures.filter((node) => typeof node.meta?.slides === "string");
    expect(deckLectures.length, "no lecture links a deck via `slides:`").toBeGreaterThan(0);

    const builtDecks = deckLectures.filter((node) => {
      const slides = node.meta?.slides as string;
      const deckName = slides.replace(/^\/decks\//, "").replace(/\/$/, "");
      return existsSync(resolve("dist/decks", deckName, "index.html"));
    });
    expect(builtDecks.length, "linked deck did not build to dist/decks/<name>/").toBeGreaterThan(0);
  });

  it("builds the Week 3 deck as a real multi-slide deck, not a placeholder shell", () => {
    const week3 = lectureByWeek.get(3);
    const slides = week3?.meta?.slides as string | undefined;
    expect(slides, "week 3 has no linked deck").toBeDefined();

    const deckName = (slides as string).replace(/^\/decks\//, "").replace(/\/$/, "");
    const html = readFileSync(resolve("dist/decks", deckName, "index.html"), "utf8");
    const slideCount = (html.match(/<section/g) ?? []).length;
    expect(slideCount, "week 3 deck has too few slides to be real teaching content").toBeGreaterThanOrEqual(6);
  });

  it("gives all twelve teaching weeks authored content, not placeholder skeletons", () => {
    for (let week = 1; week <= 12; week++) {
      const padded = week.toString().padStart(2, "0");
      const raw = readFileSync(resolve(`src/content/lectures/week-${padded}.md`), "utf8");
      expect(raw, `week ${week} still reads as an unauthored skeleton`).not.toMatch(/SKELETON/);
    }
  });

  const assessmentWeights: [string, number][] = [
    ["assessments/solo-queue-autopsy", 20],
    ["assessments/invisible-jungler", 20],
    ["assessments/draft-to-game-plan", 25],
    ["assessments/match-autopsy", 35],
  ];

  it.each(assessmentWeights)("gives %s a real, internally-consistent marking breakdown at weight %d", (id, weight) => {
    const assessment = api.nodes.find((node) => node.id === id);
    expect(assessment, `${id} is missing`).toBeDefined();

    const marking = assessment?.meta?.marking as { mode?: string; criteria?: { weight: number }[] } | undefined;
    expect(marking?.mode, `${id} has no real marking breakdown`).toBe("weighted");

    const total = (marking?.criteria ?? []).reduce((sum, criterion) => sum + criterion.weight, 0);
    expect(total, `${id}'s criteria weights do not sum to 100`).toBe(100);

    expect(assessment?.meta?.weight, `${id}'s overall course weight changed`).toBe(weight);
  });

  it("only links each assessment to weeks taught before it is due", () => {
    const assessments = api.nodes.filter((node) => node.type === "assessments");
    for (const assessment of assessments) {
      const due = new Date(assessment.meta?.due as string);
      const related = (assessment.related ?? []) as string[];
      for (const slug of related) {
        if (!slug.startsWith("lectures/")) continue;
        const lecture = lectures.find((node) => node.id === slug);
        expect(lecture, `${assessment.id} links ${slug}, which does not exist`).toBeDefined();
        const taughtDate = new Date(lecture?.meta?.date as string);
        expect(
          taughtDate.getTime() < due.getTime(),
          `${assessment.id} is due before ${slug} is taught`,
        ).toBe(true);
      }
    }
  });

  // The API-node count above only proves twelve week entries exist somewhere
  // in the content graph. A prospective student never sees that JSON — they
  // see the rendered /lectures/ index — so this checks the built HTML itself
  // links to every week, which is the thing that actually makes the
  // twelve-week semester discoverable.
  it("links every one of the twelve teaching weeks from the built lectures index page", () => {
    const html = readFileSync(resolve("dist/lectures/index.html"), "utf8");
    for (let week = 1; week <= 12; week++) {
      const slug = `week-${String(week).padStart(2, "0")}`;
      const linked = new RegExp(`href="[^"]*/lectures/${slug}/"`).test(html);
      expect(linked, `built lectures index has no link to ${slug}`).toBe(true);
    }
  });

  it("links the full lecture schedule from the homepage", () => {
    const html = readFileSync(resolve("dist/index.html"), "utf8");
    expect(/href="[^"]*\/lectures\/"/.test(html), "homepage has no link to /lectures/").toBe(true);
  });
});
