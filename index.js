 // focal points
 // source of truth
 // illusion of choice
 // maddening inevitability
 // an attempt to make sense of complexity
 // Pointers





 /* POINTERS -> Custom minting contract
    100 mints
    each mint has random level of chaos, different color palette
    each token is sent to a dead wallet on mint
    buyer gets a proxy/derivative token that points to the original token



  MINTER CONTRACT
  - mints AB Pointer to contract
  - collector gets pointer pointer token
  - burning pointer pointer gives them the pointer
  - can opt to burn the original pointer. can retain the pointer pointer
  - i burn the 0 token
  - allow people to mint pointers of pointers of pointers of pointers


  OR

  64 original pointers
  - contract that allows people to mint next level of pointer
  - ex. i mint #7. someone else can choose to mint a #7 pointer. the next person who wants a #7 pointer gets a #7 pointer pointer



 */





 /*
  TODO
    - fix resolution issues
    - wonky dashes
    - maybe add smudges back in

 */




/*
Conspiracy
- icons with arrows pointing between them
- some icons are circled
- mainly single stroke/bg colors. every once in a while an accent color
- sometimes icons circled
- sometimes = when they are close
- text along line

- icons
  - CGK
  - barcode
  - dollar sign
  - star
  - text (three letter acronyms, single letter acronyms)
    - JFK, CIA, FBI, Q, 5G, DEA, SEC, NYPD, LAPD
  - ? !















DESCRIPTION
  A simulation of me pondering the inevitability of it all while I draw the same pattern 100 times.
  A simulation of me drawing what I wanted this project to look like 100 times.

  Low effort generative art





  In this piece, I simulate myself drawing the same doodle 64 times. The doodle consists of drawing a dot on a grid, and then drawing a series of non overlapping arrows pointing in the general direction of the dot.

  the quality of the doodle degrades over time as i grow sick of the routine, and the maddening inevitability of it all starts to sink in.






Analysis
  One theme that I've sort of indirectly explored in FIM and Maps (and to a large extent in the FastCash universe) is the invisible role of th author
  there is a sort of transparent deception ocurring in a lot of my work.
  in FIM, there is the invisible role of the money printer. this invisible actor, who is never directly called out within the universe of FIM, clearly has a presence. the disclaimer combined with the context suggests that the money printer is not me perse. so if not me, who is drawing the signature, deciding which serial numbers are fancy, deciding the authenticity and estimated value of bills? and who is the one making mistakes when the bill is misprinted? and what are the context of those mistakes?
  in FastCash and The Giveaway, there are really two stories going on. there's the story that's internal to the universe of the project, and then there's the story of the artist creating the project. but if the artist's creation is external to the universe of the story, then that begs the question of what the internal story creation process is like

*/

function keyPressed() {
  if (keyCode === 83) {
    saveCanvas(__canvas, 'points-' + Date.now(), 'png');
  }
}


let __vectorRanges
function setup() {
  SIZE = min(innerWidth, innerHeight)
  __canvas = createCanvas(SIZE, SIZE)
  noiseSeed(rnd(1000000) + rnd(1000000) + rnd(1000))

  SCALE_ADJ = SIZE/800


  W = 800
  H = 800
  L = 0
  R = W
  T = 0
  B = H

  colorMode(HSB, 360, 100, 100)

  CELLS = chance(
    [1, rndint(5, 8)],
    [6, rndint(8, 20)],
    [3, rndint(20, 48)],
  )

  // CELLS = chance(
  //   [6, rndint(5, 7)],
  //   [20, rndint(7, 12)],
  //   [20, rndint(12, 18)],
  //   [9, rndint(18, 26)],
  //   [9, rndint(26, 48)],
  // )


  CELL_PADDING = rnd(-0.1, 0.25)
  CELL_SIZE = W/CELLS

  CELL_X = rndint(2, CELLS)
  POINT_X = CELL_X * CELL_SIZE // CELL_SIZE/2
  CELL_Y = rndint(2, CELLS)
  POINT_Y = CELL_Y * CELL_SIZE //- CELL_SIZE/2


  HUE = rnd(-10, 10)

  // MAX_VECTOR_RANGES = rnd(3, 300)
  // DOT_STROKE_MAX = 4

  // STROKE_VARIANCE = 1.5

  MINT_SIZE = 64


  MAX_VECTOR_RANGES = chance(
    [1, rnd(3, 20)],
    [4, rnd(20, 200)],
    [10, rnd(200, 1000)],
    [10, 10000]
  )
  TOKEN_ID = (Number(tokenData.tokenId) % 1000000)
  CHAOS = TOKEN_ID / MINT_SIZE

  DASH_RATE = chance(
    [3, 1],
    [6, rnd()],
    [55, 0]
  )

  LAYOUT = chance(
    [(1 - CHAOS**15)*0.9, 0], // standard
    [(1 - CHAOS**15)*0.1, 1], // grid
    [CHAOS**15, 2] // random
  )

  ARROW_MIN_LEN = prb(0.1) ? CELLS : rndint(1, 5)
  ARROW_MAX_LEN = prb(0.1) ? CELLS : rndint(1, 5) + ARROW_MIN_LEN
  ARROW_DRIFT = map(CHAOS, 0, 1, 0, 10)
  ARROW_ANGLE_DRIFT_AMOUNT = map(CHAOS, 0, 1, 0, 1)
  ARROW_ANGLE_VAR = map(CHAOS, 0, 1, 0, 0.8)
  LAZY_CARROTS = prb(CHAOS)


  SKIP_RATE = map(CHAOS, 0, 1, 0, 0.2)
  STROKE_VARIANCE = map(CHAOS, 0, 1, 0, 0.75)
  STROKE_TURBULENCE = map(CHAOS, 0, 1, 0, 0.15)
  IS_DARK = prb(0.25)
  SMUDGE = prb(CHAOS**3) && !IS_DARK ? map(CHAOS, 0, 1, 0, 0.001)*CHAOS**3 : 0

  DOT_STROKE_MIN = rndint(1, 7*min(1, 24/CELLS))
  DOT_STROKE_MAX = min(DOT_STROKE_MIN + rndint(4*CHAOS), 9)
  SHOW_GRID = false

  COLORS = IS_DARK
    ? { // night mode
      stroke: 230,
      bg: 15,
      dot: color(0, 57, 90, .95),
      // dot: color(0, 73, 100, .95),
      bgS: () => rnd(8, 18)
    } : { // paper

      stroke: prb(0.7) ? color(0, 0, rnd(10, 20)) : color(210, 65, 30),
      bg: color(HUE + 30, 5, 97),
      dot: color(0, 78, 95, .85),
      bgS: (d) => color(
        HUE + rnd(25, 35),
        rnd(3, 7) + 0.5*d,
        rnd(93, 100) - 0.5*d
      )
    }





  // CELLS = rndint(24, 48)

  // ARROW_MIN_LEN = 1
  // ARROW_MAX_LEN = 5
  // ARROW_DRIFT = 5
  // ARROW_ANGLE_DRIFT_AMOUNT = 1
  // DOT_STROKE_MAX = 1
  // LAZY_CARROTS = true
  // SKIP_RATE = 0.2
  // STROKE_VARIANCE = 1.5
  // STROKE_TURBULENCE = 0.15



  // ARROW_MIN_LEN = CELLS
  // ARROW_MAX_LEN = CELLS
  // ARROW_DRIFT = 0
  // ARROW_ANGLE_DRIFT_AMOUNT = 0
  // DOT_STROKE_MAX = 1
  // LAZY_CARROTS = false
  // SKIP_RATE = 0
  // STROKE_VARIANCE = 0
  // STROKE_TURBULENCE = 0



  // ARROW_MIN_LEN = prb(0.2) ? CELLS : rnd(1, 16)
  // ARROW_MAX_LEN = ARROW_MIN_LEN + rnd(1, 8)
  // SKIP_RATE = prb(0.2) ? rnd(0, 0.75) : 0
  // LAZY_CARROTS = prb(0.3)
  // ARROW_ANGLE_DRIFT_AMOUNT = prb(0.5) ? rnd(0.1, 1.5) : 0
  // LAZY_CARROTS = prb(0.5)
  // ARROW_DRIFT = rnd(0, 5)
  // DOT_STROKE_MAX = rnd(1, 2)




  /*

    all quarters same rule
    half/half
    half/quarters
    quarters
      - all n/s
        - grid
        - vector
        - single line
      - all e/w
        - grid
        - vector
        - single line
      - all diagonal
      - interlocking vector

      - grid random
      - grid directional
      - random placement
        - grid-random
        - directional






  */



  DEBUG_MODE = false


  function isComplete() {
    return this.start === this.mid1 && this.end === this.mid2
  }
  __vectorRanges = {
    right: { fn: drawWestVector, start: 0, end: CELLS, mid1: CELL_Y, mid2: CELL_Y, isComplete },
    left: { fn: drawEastVector, start: 0, end: CELLS, mid1: CELL_Y, mid2: CELL_Y, isComplete },
    top: { fn: drawSouthVector, start: 0, end: CELLS, mid1: CELL_X, mid2: CELL_X, isComplete },
    bottom: { fn: drawNorthVector, start: 0, end: CELLS, mid1: CELL_X, mid2: CELL_X, isComplete },
    allComplete() {
      return this.right.isComplete() && this.left.isComplete() && this.top.isComplete() && this.bottom.isComplete()
    }
  }
}


function draw() {
  noLoop()
  scale(SCALE_ADJ)
  drawBg()
  drawDot()



  if (LAYOUT === 0) {
    drawWestVector(CELL_Y)
    drawEastVector(CELL_Y)
    drawNorthVector(CELL_X)
    drawSouthVector(CELL_X)

    fillOutVectorRanges()
  } else if (LAYOUT === 1) {
    drawGrid()
  } else {
    times(CELLS**2/3, c => {
      const x = rnd(R)
      const y = rnd(B)
      const { angle } = lineStats(POINT_X, POINT_Y, x, y)
      arrow(
        ...getXYRotation(angle, CELL_SIZE*rnd(0.5, 3), x, y),
        x, y
      )
    })
  }





}







const drawWestArrow = (x, y, len) => arrow(coord(x), coord(y), coord(x - len), coord(y))
const drawEastArrow = (x, y, len) => arrow(coord(x), coord(y), coord(x + len), coord(y))
const drawSouthArrow = (x, y, len) => arrow(coord(x), coord(y), coord(x), coord(y + len))
const drawNorthArrow = (x, y, len) => arrow(coord(x), coord(y), coord(x), coord(y - len))
const drawSEArrow = (x, y, len) => arrow(coord(x), coord(y), coord(x + len), coord(y + len))
const drawNEArrow = (x, y, len) => arrow(coord(x), coord(y), coord(x + len), coord(y - len))
const drawNWArrow = (x, y, len) => arrow(coord(x), coord(y), coord(x - len), coord(y - len))
const drawSWArrow = (x, y, len) => arrow(coord(x), coord(y), coord(x - len), coord(y + len))

const getArrowLen = cursorDist => min(rndint(ARROW_MIN_LEN, ARROW_MAX_LEN), cursorDist)


function drawWestVector (row) {
  const y = row
  let x1 , x2

  for (let x = CELLS-1; x >= CELL_X; x--) {
    if (!getCell(x, y) && !x1) x1 = x
    if (getCell(x, y) && x1) {
      x2 = x + 1
      break
    }
  }

  if (x1 === x2) return setCell(x1, y, 'w')


  for (let x = x1; x >= x2; x--) setCell(x, y, 'w')

  let xCursor = x1
  while (xCursor >= x2) {
    let len = getArrowLen(xCursor - x2)
    if (xCursor - len === x2 + 1) len += 1

    drawWestArrow(xCursor, y, len)
    xCursor -= (len+1)
  }
}

function drawEastVector (row) {
  const y = row
  let x1 , x2


  for (let x = 1; x <= CELL_X; x++) {
    if ((!getCell(x, y)) && !x1) x1 = x
    if (getCell(x, y) && x1) {
      x2 = x - 1
      break
    }
  }



  if (x1 === x2) return setCell(x1, y, 'e')

  for (let x = x1; x <= x2; x++) setCell(x, y, 'e')

  let xCursor = x1
  while (xCursor <= x2) {
    let len = getArrowLen(x2 - xCursor)
    if (xCursor + len === x2 - 1) len += 1


    drawEastArrow(xCursor, y, len)
    xCursor += (len+1)
  }
}

function drawSouthVector (col) {
  const x = col
  let y1 , y2

  for (let y = 1; y <= CELL_Y; y++) {
    if (!getCell(x, y) && !y1) y1 = y
    if (getCell(x, y) && y1) {
      y2 = y - 1
      break
    }
  }

  if (y1 === y2) return setCell(x, y1, 's')

  for (let y = y1; y <= y2; y++) setCell(x, y, 's')

  let yCursor = y1
  while (yCursor <= y2) {
    let len = getArrowLen(y2 - yCursor)
    if (yCursor + len === y2 - 1) len += 1

    drawSouthArrow(x, yCursor, len)
    yCursor += (len+1)
  }
}

function drawNorthVector (col) {
  const x = col
  let y1 , y2

  for (let y = CELLS-1; y >= CELL_Y; y--) {
    if (!getCell(x, y) && !y1) y1 = y
    if (getCell(x, y) && y1) {
      y2 = y + 1
      break
    }
  }

  if (y1 === y2) return setCell(x, y1, 'n')

  for (let y = y1; y >= y2; y--) setCell(x, y, 'n')

  let yCursor = y1
  while (yCursor >= y2) {
    let len = getArrowLen(yCursor - y2)
    if (yCursor - len === y2 + 1) len += 1

    drawNorthArrow(x, yCursor, len)
    yCursor -= (len+1)
  }
}





function drawVectorRange(v) {
  const v1Closed = __vectorRanges[v].start !== __vectorRanges[v].mid1
  const v2Closed = __vectorRanges[v].end !== __vectorRanges[v].mid2
  const edge = chance(
    [v1Closed, ['start', rndint(1, 2)]],
    [v1Closed, ['mid1', rndint(1, 2)]],
    [v2Closed, ['mid2', rndint(1, 2)]],
    [v2Closed, ['end', rndint(1, 2)]],
  )

  times(edge[1], t => {
    __vectorRanges[v][edge[0]] += 1
    __vectorRanges[v].fn(__vectorRanges[v][edge[0]])
  })
}


function fillOutVectorRanges() {
  let i=0
  while (!__vectorRanges.allComplete() && i < MAX_VECTOR_RANGES) {
    const r = !__vectorRanges.right.isComplete()
    const l = !__vectorRanges.left.isComplete()
    const t = !__vectorRanges.top.isComplete()
    const b = !__vectorRanges.bottom.isComplete()

    const direction = chance(
      [r, 'right'],
      [l, 'left'],
      [t, 'top'],
      [b, 'bottom'],
    )
    drawVectorRange(direction)
    i++
  }
}

function drawGrid() {
  const GRID_ARROW_SIZE = rnd(0.3, 0.8)
  const a = () => prb(0.1) ? 1 : prb(0.5) ? 0 : rnd(0, 0.25)

  const NE_ARROW = prb(0.1) ? 1 : prb(0.5) ? 0 : rnd(0, 0.25)
  const SE_ARROW = prb(0.1) ? 1 : prb(0.5) ? 0 : rnd(0, 0.25)
  const NW_ARROW = prb(0.1) ? 1 : prb(0.5) ? 0 : rnd(0, 0.25)
  const SW_ARROW = prb(0.1) ? 1 : prb(0.5) ? 0 : rnd(0, 0.25)
  eachCell((x, y, cx, cy) => {
    if ([0, CELLS].includes(cx) || [0, CELLS].includes(cy)) return
    let arrowFn
    if (cx === CELL_X && cy === CELL_Y) arrowFn = () => {}
    else if (cx === CELL_X && cy > CELL_Y) arrowFn = drawNorthArrow
    else if (cx === CELL_X && cy < CELL_Y) arrowFn = drawSouthArrow
    else if (cx > CELL_X && cy === CELL_Y) arrowFn = drawWestArrow
    else if (cx < CELL_X && cy === CELL_Y) arrowFn = drawEastArrow
    else if (cx < CELL_X && cy < CELL_Y) arrowFn = chance([(1-SE_ARROW)/2, drawEastArrow], [(1-SE_ARROW)/2, drawSouthArrow], [SE_ARROW, drawSEArrow])
    else if (cx < CELL_X && cy > CELL_Y) arrowFn = chance([(1-NE_ARROW)/2, drawEastArrow], [(1-NE_ARROW)/2, drawNorthArrow], [NE_ARROW, drawNEArrow])
    else if (cx > CELL_X && cy > CELL_Y) arrowFn = chance([(1-NW_ARROW)/2, drawWestArrow], [(1-NW_ARROW)/2, drawNorthArrow], [NW_ARROW, drawNWArrow])
    else if (cx > CELL_X && cy < CELL_Y) arrowFn = chance([(1-SW_ARROW)/2, drawWestArrow], [(1-SW_ARROW)/2, drawSouthArrow], [SW_ARROW, drawSWArrow])

    arrowFn(cx, cy, GRID_ARROW_SIZE)
  })
}





function drawBg() {
  background(COLORS.bg)

  if (DEBUG_MODE) return

  const buffer = 5
  const baseStrokeSize = 2


  for (let y = T-buffer; y < B+buffer; y += baseStrokeSize) {
    let strokeSize = baseStrokeSize
    for (let x = L-buffer; x < R+buffer; x += strokeSize) {
      drawBackgroundStroke(x, y, strokeSize)

      if (prb(SMUDGE)) {
        [x3, y3] = getXYRotation(
          rnd(0, TWO_PI),
          5,
          x,
          y
        )
        stroke(COLORS.stroke)

        dotLine(x, y, x3, y3)
      }
    }
  }

  if (SHOW_GRID) {

    push()
    stroke(hue(COLORS.stroke), 21, 97, 0.8)
    for (let x = L; x <= R; x += CELL_SIZE) {
      line(x, T, x, B)
    }

    for (let y = T; y <= B; y += CELL_SIZE) {
      line(L, y, R, y)
    }
    pop()
  }
}


function drawDot() {
  push()
  noStroke()
  fill(COLORS.dot)
  if (DEBUG_MODE) circle(POINT_X, POINT_Y, 10)
  else {
    const d = 9 + rnd(9*(24/CELLS))
    dotCircle(POINT_X, POINT_Y, d, true)
  }
  pop()
  setCell(CELL_X, CELL_Y, 'r')
}



function eachCell(fn) {
  for (let cx = 0; cx <= CELLS; cx++)
  for (let cy = 0; cy <= CELLS; cy++) {
    const x = cx * CELL_SIZE
    const y = cy * CELL_SIZE
    fn(x, y, cx, cy)
  }
}






const coord = c => c * CELL_SIZE



let __cells = {}

function getCell(x, y) {
  return __cells[`${x||0},${y||0}`]
}

function setCell(x, y, v) {
  __cells[`${x||0},${y||0}`] = v
  return v
}






function arrow(x1, y1, x2, y2, isInner=false) {
  stroke(COLORS.stroke)
  fill(COLORS.stroke)
  __dotStroke = rnd(DOT_STROKE_MIN, DOT_STROKE_MAX)
  if (DEBUG_MODE) {
    line(x1, y1, x2, y2)
    circle(x2, y2, 4)
    return
  }

  if (prb(SKIP_RATE)) return

  const getDrift = (d=1) => rnd(-ARROW_DRIFT/d, ARROW_DRIFT/d)

  const x1Drift = getDrift()
  const y1Drift = getDrift()
  const x2Drift = LAYOUT === 1 ? x1Drift + getDrift(2) : getDrift()
  const y2Drift = LAYOUT === 1 ? y1Drift + getDrift(2) : getDrift()

  const _x1 = x1 + x1Drift
  const _y1 = y1 + y1Drift

  const _x2 = x2 + x2Drift
  const _y2 = y2 + y2Drift


  const { d, angle } = lineStats(_x2, _y2, _x1, _y1)

  const [__x2, __y2] = LAZY_CARROTS ? getXYRotation(angle+PI, rnd(3, 10), _x2, _y2) : [_x2, _y2]
  const carrotTurn = LAZY_CARROTS ? posOrNeg() * QUARTER_PI/rnd(7.9, 8.1) : 0

  const [x3, y3] = getXYRotation(angle+carrotTurn-QUARTER_PI/(2+rnd(-ARROW_ANGLE_VAR, ARROW_ANGLE_VAR)), min(15,d*rnd(0.23, 0.27)), __x2, __y2)
  const [x4, y4] = getXYRotation(angle+carrotTurn+QUARTER_PI/(2+rnd(-ARROW_ANGLE_VAR, ARROW_ANGLE_VAR)), min(15,d*rnd(0.23, 0.27)), __x2, __y2)

  push()
  dotLine(_x1, _y1, _x2, _y2, 1, prb(DASH_RATE))
  dotLine(__x2, __y2, x3, y3, 0.25)
  dotLine(__x2, __y2, x4, y4, 0.25)
  pop()
}








function drawBackgroundStroke(x, y, strokeSize) {
  const d = lineStats(x, y, POINT_X, POINT_Y).d/SIZE

  stroke(COLORS.bgS(d))
  const angle = noise(x, y)
  const offset = 1


  const [x0, y0] = getXYRotation(
    PI + angle + rnd(-QUARTER_PI, QUARTER_PI),
    5,
    x + rnd(-offset, offset),
    y + rnd(-offset, offset)
  )
  const [x1, y1] = getXYRotation(
    angle + rnd(-QUARTER_PI, QUARTER_PI),
    5,
    x,
    y
  )

  line(x0, y0, x1, y1)
}




function debugView() {
  background('yellow')

  for (let x = 0; x <= W+1; x += CELL_SIZE) {
    line(x, 0, x, H)
  }

  for (let y = 0; y <= H+1; y += CELL_SIZE) {
    line(0, y, W, y)
  }
}



let __randomSeed = parseInt(tokenData.hash.slice(50, 58), 16)

const rndint = (mn, mx) => int(rnd(mn, mx))
function rnd(mn, mx) {
  __randomSeed ^= __randomSeed << 13
  __randomSeed ^= __randomSeed >> 17
  __randomSeed ^= __randomSeed << 5
  const out = (((__randomSeed < 0) ? ~__randomSeed + 1 : __randomSeed) % 1000) / 1000
  if (mx != null) return mn + out * (mx - mn)
  else if (mn != null) return out * mn
  else return out
}


function getXYRotation (deg, radius, cx=0, cy=0) {
  return [
    sin(deg) * radius + cx,
    cos(deg) * radius + cy,
  ]
}


function times(t, fn) {
  const out = []
  for (let i = 0; i < t; i++) out.push(fn(i))
  return out
}

function chance(...chances) {
  const total = chances.reduce((t, c) => t + c[0], 0)
  const seed = rnd()
  let sum = 0
  for (let i = 0; i < chances.length; i++) {
    const val =
      chances[i][0] === true ? 1
      : chances[i][0] === false ? 0
      : chances[i][0]
    sum += val / total
    if (seed <= sum && chances[i][0]) return chances[i][1]
  }
}

const lineStats = (x1, y1, x2, y2) => ({
  d: dist(x1, y1, x2, y2),
  angle: atan2(x2 - x1, y2 - y1)
})
const hfix = h => ((h%360) + 360) % 360
const prb = x => rnd() < x
const sample = (a) => a[int(rnd(a.length))]
const sampleCall = (a) => sample(a)()
const nsrnd = (x, y, mn, mx) => mn + noise(x/15, y/15) * (mx-mn) + rnd(-0.25, 0.25)
const posOrNeg = () => prb(0.5) ? 1 : -1


__dotStroke = 1
function dotLine(x1, y1, x2, y2, driftFactor=1, dashed=false) {
  rnd(DOT_STROKE_MIN, DOT_STROKE_MAX)
  const { d, angle } = lineStats(x1, y1, x2, y2)
  const t = STROKE_TURBULENCE

  let x = x1
  let y = y1
  let skip = false
  for (let i = 0; i <= d; i++) {
    const [_x, _y] = getXYRotation(
      angle+HALF_PI,
      getAngleDrift(x1, y1, i/d, driftFactor * d/16),
      x+rnd(-t, t),
      y+rnd(-t, t)
    )

    if (i%10 === 0) skip = !skip
    if (skip && dashed) continue



    circle(_x, _y, nsrnd(_x, _y, __dotStroke*(1-STROKE_VARIANCE), __dotStroke*(1+STROKE_VARIANCE)));

    // const angleDrift = 0.25;
    const angleDrift = 0;
    ([x, y] = getXYRotation(angle+angleDrift, i+1, x1, y1))
  }

}


function dotCircle(x, y, d, fill=false) {
  const r = d/2
  const strokeVar = STROKE_VARIANCE * (d/300)

  const circumference = d * PI *4

  let angle = 0

  if (fill) beginShape()
  for (let i = 0; i <= circumference; i++) {
    const angle = i*TWO_PI/circumference
    const [rx, ry] = getXYRotation(angle, 2, x+1000, y+1000)
    const r = map(
      noise(rx, ry),
      0,
      1,
      map(CHAOS, 0, 1, 1, 0.8)*d/2,
      d/2
    )

    const [_x, _y] = getXYRotation(angle, r, x, y)
    if (!fill) circle(_x, _y, nsrnd(_x, _y, __dotStroke*(1-strokeVar), __dotStroke*(1+strokeVar)));

    if (fill) curveVertex(_x, _y)

  }
  if (fill) endShape()

}

function getAngleDrift(x, y, prg, driftFactor) {
  const driftMagnitude = ARROW_ANGLE_DRIFT_AMOUNT * driftFactor
  return map(
    noise(...getXYRotation(prg*TWO_PI, 0.15, x, y)),
    0,
    1,
    -driftMagnitude,
    driftMagnitude,
  ) * sin(PI*prg)
}
