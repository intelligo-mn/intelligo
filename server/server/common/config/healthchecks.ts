import { Application } from 'express';
const physical = require('express-physical');
const v8 = require('v8');

// Sync healthcheck

/**
 * The v8 heap is actually split into regions or spaces:
 * new_space, old_space, code_space, map_space and large_object_space.
 * The first two roughly corresponds to nursery and tenured object heap,
 * though in theory objects can sit in any of the five spaces.
 */
const heap = () => {
  const limit = 90;
  const name = 'Heap size';
  const type = physical.type.SELF;
  const space = v8.getHeapSpaceStatistics();
  const oldSpaceTotal = space[1].space_size;
  const oldSpaceUsed = space[1].space_used_size;
  const used = (100 / oldSpaceTotal) * oldSpaceUsed;

  return used > limit
    ? physical.response({
        name,
        type,
        healthy: false,
        severity: physical.severity.WARNING,
        actionable: true,
        message: `Heap usage is at ${used}%`
      })
    : physical.response({
        name,
        type,
        healthy: true,
        actionable: false
      });
};

/**
 * Configure application healthcheck endpoints
 * @param app
 */
export const configHealthChecks = (app: Application) => {
  app.use('/healthcheck', physical([heap]));
};

export default configHealthChecks;
