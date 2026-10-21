/**
 * deprecation.ts tests: one Node DeprecationWarning per code per process,
 * and a console line where `process.emitWarning` is missing.
 */

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  resetDeprecationWarningsForTests,
  warnDeprecated,
} from "./deprecation";

beforeEach(() => {
  resetDeprecationWarningsForTests();
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("warnDeprecated", () => {
  it("emits a DeprecationWarning with the code, once per code", () => {
    const emit = vi
      .spyOn(process, "emitWarning")
      .mockImplementation(() => undefined);

    warnDeprecated("INTELLIGO_DEP9999", "old is removed in 2.0.0; use new.");
    warnDeprecated("INTELLIGO_DEP9999", "old is removed in 2.0.0; use new.");

    expect(emit).toHaveBeenCalledTimes(1);
    expect(emit).toHaveBeenCalledWith("old is removed in 2.0.0; use new.", {
      type: "DeprecationWarning",
      code: "INTELLIGO_DEP9999",
    });
  });

  it("warns for each distinct code", () => {
    const emit = vi
      .spyOn(process, "emitWarning")
      .mockImplementation(() => undefined);

    warnDeprecated("INTELLIGO_DEP9998", "a");
    warnDeprecated("INTELLIGO_DEP9999", "b");

    expect(
      emit.mock.calls.map((call) => (call[1] as { code: string }).code)
    ).toEqual(["INTELLIGO_DEP9998", "INTELLIGO_DEP9999"]);
  });

  it("warns again after a reset", () => {
    const emit = vi
      .spyOn(process, "emitWarning")
      .mockImplementation(() => undefined);

    warnDeprecated("INTELLIGO_DEP9999", "a");
    resetDeprecationWarningsForTests();
    warnDeprecated("INTELLIGO_DEP9999", "a");

    expect(emit).toHaveBeenCalledTimes(2);
  });

  it("falls back to console.warn where emitWarning is missing", () => {
    const original = process.emitWarning;
    const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);
    // Only the property is replaced; `process` itself stays.
    Object.defineProperty(process, "emitWarning", {
      value: undefined,
      configurable: true,
      writable: true,
    });
    try {
      warnDeprecated("INTELLIGO_DEP9999", "old is removed in 2.0.0.");
      warnDeprecated("INTELLIGO_DEP9999", "old is removed in 2.0.0.");
    } finally {
      Object.defineProperty(process, "emitWarning", {
        value: original,
        configurable: true,
        writable: true,
      });
    }

    expect(warn).toHaveBeenCalledTimes(1);
    expect(warn).toHaveBeenCalledWith(
      "[INTELLIGO_DEP9999] old is removed in 2.0.0."
    );
  });
});
