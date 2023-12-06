const rect1 = [[0,0], [2,2]];
const rect2 = [[1,1],[3,3]];

function isOverlap(r1, r2) {
  return r1[0][0] <= r2[1][0]
    && r1[1][0] >= r2[0][0]
    && r1[0][1] <= r2[1][1]
    && r1[1][1] >= r2[0][1];
}

console.log(isOverlap(rect1, rect2));

console.log(isOverlap([[0,0], [1,1]], [[2,2],[3,3]]));
console.log(isOverlap([[1,2], [4,2]], [[2,2],[4,6]]));
console.log(isOverlap([[0,0], [1,1]], [[0,0],[2,2]]));