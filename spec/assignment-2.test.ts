import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

interface ApiNode {
  id: string;
  type: string;
  meta?: Record<string, unknown>;
}

interface CourseApi {
  course: { code: string };
  nodes: ApiNode[];
}

const api = JSON.parse(readFileSync(resolve("dist/api/index.json"), "utf8")) as CourseApi;

// Assigned at provisioning time — the last three digits of this repo's
// SLOPxxxx code, which the brief requires every course code to keep.
const PROVISIONED_DIGITS = "699";

describe("assignment 2 spec", () => {
  it("keeps the SLOPxxxx digits this repo was provisioned with", () => {
    expect(api.course.code).toMatch(new RegExp(`${PROVISIONED_DIGITS}$`));
  });

  it("runs across twelve dated teaching weeks", () => {
    const weeks = new Set(
      api.nodes
        .filter((node) => ["sessions", "lectures"].includes(node.type))
        .map((node) => node.meta?.week),
    );
    for (let week = 1; week <= 12; week++) {
      expect(weeks.has(week), `no session or lecture dated for week ${week}`).toBe(true);
    }
  });

  it("has an assessment scheme that adds up to 100%", () => {
    const total = api.nodes
      .filter((node) => node.type === "assessments")
      .reduce((sum, node) => sum + Number(node.meta?.weight ?? 0), 0);
    expect(total).toBe(100);
  });

  it("has at least one lecture carrying a real, built deck", () => {
    const deckLectures = api.nodes.filter(
      (node) => node.type === "lectures" && typeof node.meta?.slides === "string",
    );
    expect(deckLectures.length, "no lecture links a deck via `slides:`").toBeGreaterThan(0);

    const builtDecks = deckLectures.filter((node) => {
      const slides = node.meta?.slides as string;
      const deckName = slides.replace(/^\/decks\//, "").replace(/\/$/, "");
      return existsSync(resolve("dist/decks", deckName, "index.html"));
    });
    expect(builtDecks.length, "linked deck did not build to dist/decks/<name>/").toBeGreaterThan(0);
  });
});
