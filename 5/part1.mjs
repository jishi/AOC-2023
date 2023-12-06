import fs from 'fs';
import path from 'path';

const startTime = process.hrtime.bigint();

const input = fs.readFileSync(path.join(path.dirname(process.argv[1]), 'input.txt')).toString();

const chunks = input.split('\n\n');

const maps = {};

const [_, seedData] = chunks.shift().split(': ');
const seeds = seedData.split(' ').map(Number);
chunks.forEach(x => {
  const lines = x.split('\n');

  const _maps = [];
  const [title, _] = lines.shift().split(' ');
  lines.forEach(x => {
    const values = x.split(' ').map(Number);
    _maps.push(values);
  });
  maps[title] = _maps;
});

console.log(maps);

function findInMap(mapName, key) {
  const _maps = maps[mapName];
  const applicableMap = _maps.find(x => key >= x[1] && key <= x[1]+x[2]);

  if (!applicableMap) return;

  const diff = applicableMap[0] - applicableMap[1];
  return key + diff;
}

const destinations = [];

seeds.forEach(x => {
  const soil = findInMap('seed-to-soil', x) ?? x;
  const fertilizer = findInMap('soil-to-fertilizer', soil) ?? soil;
  const water = findInMap('fertilizer-to-water', fertilizer) ?? fertilizer;
  const light = findInMap('water-to-light', water) ?? water;
  const temperature = findInMap('light-to-temperature', light) ?? light;
  const humidity = findInMap('temperature-to-humidity', temperature) ?? temperature;
  const location = findInMap('humidity-to-location', humidity) ?? humidity;
  destinations.push(location);
});

console.log(destinations, Math.min(...destinations));