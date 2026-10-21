/**
 * One seed for every property suite, so a property never turns an
 * unrelated change red at random and a mutant dies or survives the same
 * way on every run.
 *
 * `FC_SEED=random` draws a fresh seed per run to explore; `FC_RUNS` sets
 * how many cases each property tries. A failure prints `{ seed, path }`,
 * which `fc.assert(prop, { seed, path })` replays.
 */
import fc from "fast-check";

const FIXED_SEED = 20261021;

const seed =
  process.env.FC_SEED === "random"
    ? undefined
    : Number(process.env.FC_SEED ?? FIXED_SEED);

fc.configureGlobal({
  seed,
  numRuns: Number(process.env.FC_RUNS ?? 100),
});
