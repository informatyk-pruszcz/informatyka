export const goals = {square:{width:3,height:3}, rectangle:{width:5,height:3}};
export function startingProgram() { return {repeat:2, steps:[{type:'move',value:2},{type:'turn',value:'right'}]}; }
export function validProgram(p) {
  return Number.isInteger(p?.repeat) && p.repeat >= 1 && p.repeat <= 8 && Array.isArray(p.steps) &&
    p.steps.length <= 12 && p.steps.every(s =>
      (s?.type === 'move' && Number.isInteger(s.value) && s.value >= 1 && s.value <= 8) ||
      (s?.type === 'turn' && ['left','right'].includes(s.value)));
}
export function traceProgram(program, goalId) {
  if (!validProgram(program) || !Object.hasOwn(goals, goalId)) throw Error('Nieznany program lub cel.');
  const {width, height} = goals[goalId];
  const directions = [[1,0,'w prawo'],[0,1,'w dół'],[-1,0,'w lewo'],[0,-1,'w górę']];
  const points = [[0,0]], segments = [], edges = new Set();
  let x = 0, y = 0, heading = 0, distance = 0, outside = false;
  for (let n = 0; n < program.repeat; n++) {
    for (const step of program.steps) {
      if (step.type === 'turn') { heading = (heading + (step.value === 'right' ? 1 : 3)) % 4; continue; }
      const [dx,dy,label] = directions[heading]; segments.push(label + ' o ' + step.value);
      for (let i = 0; i < step.value; i++) {
        const nextX = x + dx, nextY = y + dy;
        const side = dx === 0 ? (x === 0 || x === width) : (y === 0 || y === height);
        if (!side || nextX < 0 || nextX > width || nextY < 0 || nextY > height) outside = true;
        edges.add([Math.min(x,nextX),Math.min(y,nextY),dx === 0 ? 'v' : 'h'].join(','));
        x = nextX; y = nextY; distance++;
      }
      points.push([x,y]);
    }
  }
  const length = 2 * (width + height);
  const drawn = !outside && x === 0 && y === 0 && distance === length && edges.size === length;
  let message;
  if (!distance) message = 'Robot pozostał na starcie. Dodaj ruch do wnętrza pętli.';
  else if (outside) message = 'Robot zjechał z obrysu. Sprawdź długość ruchu i kierunek obrotu na pierwszym rogu, na którym trasy się rozchodzą.';
  else if (edges.size < distance) message = 'Robot powtórzył odcinek. Sprawdź liczbę powtórzeń i kierunki obrotów.';
  else if (!drawn) message = 'Część trasy jest gotowa. Porównaj przebytą drogę z obwodem i sprawdź, czy robot wrócił na start.';
  else if (program.repeat === 1) message = 'Figura jest gotowa. Znajdź powtarzającą się grupę poleceń i użyj co najmniej dwóch powtórzeń.';
  else message = goalId === 'square' ? 'Kwadrat gotowy. Wybierz prostokąt i zmień program.' : 'Prostokąt gotowy. Wskaż grupę poleceń, która się powtarzała.';
  return {points, segments, distance, length, complete:drawn && program.repeat > 1, message};
}
