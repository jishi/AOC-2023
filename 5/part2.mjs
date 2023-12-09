import fs from 'fs';
import path from 'path';

const startTime = process.hrtime.bigint();

const input = fs.readFileSync(path.join(path.dirname(process.argv[1]), 'input.txt')).toString();

const chunks = input.split('\n\n');

const maps = [];

const [_, seedData] = chunks.shift().split(': ');
const seeds = seedData.split(' ').map(Number);

const seedRanges = [];

// Parsing seed ranges
seeds.forEach((x, i) => {
  if (i % 2 == 1) return;
  seedRanges.push({
    start: x,
    end: x + seeds[i + 1],
  });
});

// parsing mappings, keep them in an incremental array, i.e (destination is not used, only offset is relevant)
// [
//    { offset: -2, source: { start: 0, end: 123456 } },
//    ...
// ]
chunks.forEach(x => {
  const lines = x.split('\n');

  const _maps = [];
  const [title, _] = lines.shift().split(' ');
  lines.forEach(x => {
    const values = x.split(' ').map(Number);

    _maps.push({
      offset: values[0] - values[1],
      source: {
        start: values[1],
        end: values[1] + values[2] - 1,
      }
    });
  });
  maps.push(_maps);
});

// recursive function to traverse the splitting of seed ranges
function findLowestOfRange(mapIndex, range) {
  const _maps = maps[mapIndex];

  if (!_maps) {
    console.log(range);
    return range.start;
  }

  // Find first matching map
  const matchedMap = _maps.find(x => {
    if (range.start >= x.source.start && range.start <= x.source.end)
      return true;

    if (range.end >= x.source.start && range.end <= x.source.end)
      return true;

    return false;
  });

  let newRange = range;
  // Populate with superfluous ranges that didn't fit into the matched map, since these needs to be re-run for the same mapping level (e.g seed-to-soil)
  const otherRanges = [];

  if (matchedMap) {
    newRange = {
      start: Math.max(range.start, matchedMap.source.start) + matchedMap.offset,
      end: Math.min(range.end, matchedMap.source.end) + matchedMap.offset
    }
    if (range.end > matchedMap.source.end) {
      // leftover range at end
      otherRanges.push({ start: matchedMap.source.end+1, end: range.end });
    }

    if (range.start < matchedMap.source.start) {
      otherRanges.push({ start: range.start, end: matchedMap.source.start-1});
    }
  }

  // Run the new range against the next mapping (mapIndex + 1, soil-to-fertilizer), and the superfluous ranges against the same level of mapping since they weren't mapped against other potential maps (e.g seed-to-soil)
  // We only care about the lowest value candidate in the end.
  const lowest = Math.min(findLowestOfRange(mapIndex+1, newRange), ...otherRanges.map(x => findLowestOfRange(mapIndex, x)));
  return lowest;

}

const lowest = seedRanges.map(x => findLowestOfRange(0, x));

// console.log(findLowestOfRange(0, seedRanges[1]));

console.log(Math.min(...lowest));

console.log(Number(process.hrtime.bigint() - startTime), 'ns');
console.log(Number(process.hrtime.bigint() - startTime)/1e6, 'ms');

