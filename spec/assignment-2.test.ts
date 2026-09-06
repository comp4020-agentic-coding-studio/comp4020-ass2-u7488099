import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

interface ApiNode {
  id: string;
  type: string;
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
});
