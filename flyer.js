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
  A simulation of me drawing 100 variations of the same pattern.
  My focus and attention to detail wanes with each drawing as the maddening inevitability of it all begins to sink in.



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




























/* 8/29 thoughts
  - earlier drawings should be straighter, cleaner, denser


  "What's the point od it all?"

*/




function keyPressed() {
  if (keyCode === 83) {
    saveCanvas(__canvas, 'pointers-' + Date.now(), 'png');
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

  MINT_SIZE = 100
  TOKEN_ID = (Number(tokenData.tokenId) % 1000000)
  CHAOS = (TOKEN_ID / MINT_SIZE)

  CELLS = chance(
    [TOKEN_ID && 7, rndint(5, 8)],
    [TOKEN_ID && 25, rndint(8, 14)],
    [TOKEN_ID && 35, rndint(14, 20)],
    [33, rndint(20, 48)],
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


  MAX_VECTOR_RANGES = 20
  chance(
    [1, rnd(3, 20)],
    [4, rnd(20, 200)],
    [10, rnd(200, 1000)],
    [10, 10000]
  )

  DASH_RATE = chance(
    [3, 1],
    [10, rnd(0.1, 0.25)],
    [87, 0]
  )

  // const randLayout = CHAOS**15
  // LAYOUT = chance(
  //   [(1 - randLayout)*0.9, 0], // standard
  //   [(1 - randLayout)*0.1, 1], // grid
  //   [randLayout, 2] // random
  // )

  LAYOUT = chance(
    [85, 0], // standard
    [TOKEN_ID > 5 && 10, 1], // grid
    [TOKEN_ID > 5 && 4, 2] // flowy
  )

  ARROW_MIN_LEN = prb(0.1) ? CELLS : rndint(1, 5)
  ARROW_MAX_LEN = prb(0.1) ? CELLS : rndint(1, 5) + ARROW_MIN_LEN
  ARROW_DRIFT = map(CHAOS, 0, 1, 0, 15)

  // ****** *10?
  ARROW_ANGLE_DRIFT_AMOUNT = map(CHAOS**2, 0, 1, 0, 2.5)

  ARROW_ANGLE_VAR = map(CHAOS, 0, 1, 0, 1.2)
  LAZY_CARROTS = prb(CHAOS)

  CARROT_TURN = map(CHAOS, 0, 1, 0, 0.1)
  CARROT_DIST_MIN = map(CHAOS, 0, 1, 0, 5)
  CARROT_DIST_MAX = map(CHAOS, 0, 1, 0, 18)

  SQUIGGLEY = prb(0.1)



  SKIP_RATE = map(CHAOS, 0, 1, 0, 0.3)
  STROKE_VARIANCE = map(CHAOS, 0, 1, 0, 1.1)
  STROKE_TURBULENCE = map(CHAOS, 0, 1, 0, 0.25)
  IS_DARK = prb(0.25)
  SMUDGE = prb(CHAOS**3) && !IS_DARK ? map(CHAOS, 0, 1, 0, 0.001)*CHAOS**3 : 0

  DOT_STROKE_MIN = rndint(1, 7*min(1, 24/CELLS))
  DOT_STROKE_MAX = min(DOT_STROKE_MIN + rndint(6*CHAOS), 9)
  SHOW_GRID = prb(0.1)
  REVERSE_COLORS = prb(0.03)

  COLORS = IS_DARK
    ? { // night mode
      stroke: 230,
      bg: 15,
      dot: color(0, 57, 90, .95),
      bgS: (d, x, y) => color(
        0,
        0,
        rnd(8, 18) + map(noise(x/400, y/400), 0, 1, -2.5, 2.5)
      ),
      grid: color(0, 0, 90, 0.25)
    }
    : { // paper
      stroke: color(0, 0, rnd(10, 20)),
      bg: color(HUE+30, 5, 97),
      dot: color(0, 78, 95, .85),
      bgS: (d, x, y) => color(
        HUE + rnd(25, 35),
        rnd(3, 7) + 0.5*d + map(noise(x/400, y/400), 0, 1, 0, 5),
        rnd(93, 100) - 0.5*d - map(noise(x/400, y/400), 0, 1, 0, 5)
      ),
      grid: color(HUE+5, 20, 18, 0.2)
    }

    if (REVERSE_COLORS) {
      [COLORS.dot, COLORS.stroke] = [COLORS.stroke, COLORS.dot]
    }



  console.log("What's the point of it all?")


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


let nunito;
function preload() {
  nunito = loadFont('Nunito/static/Nunito-SemiBold.ttf');
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
    drawFlowy()
    // times(CELLS**2/3, c => {
    //   const x = rnd(R)
    //   const y = rnd(B)
    //   const { angle } = lineStats(POINT_X, POINT_Y, x, y)
    //   arrow(
    //     ...getXYRotation(angle, CELL_SIZE*rnd(0.5, 3), x, y),
    //     x, y
    //   )
    // })
  }

  textFont(nunito)
  textSize(50)
  text('Pointers', 130, 464)

  textSize(35)
  text('Friday 12/9', 520, 469)

  text('Dutch Auction', 126, 603)
  text('1:30pm EST', 510, 600)

  text('2.0 ETH', 168, 738)
  text('0.1 ETH', 550, 736)


  arrow(341, 451, 498, 455, true)
  arrow(223, 482, 226, 569, true)
  arrow(601, 490, 600, 557, true)
  arrow(370, 591, 490, 590, true)
  arrow(222, 617, 223, 696, true)
  arrow(312, 721, 531, 721, true)




  drawEastArrow(8, 3, 9)
  drawEastArrow(9, 4, 8)


  drawSouthArrow(3, 3, 3)
  drawSouthArrow(4, 3, 3)
  drawSouthArrow(5, 3, 3)
  drawSouthArrow(6, 3, 3)
  drawSouthArrow(7, 3, 3)
  drawSouthArrow(8, 4, 2)
  drawSouthArrow(9, 5, 1)
  drawSouthArrow(10, 5, 1)
  drawSouthArrow(11, 5, 1)
  drawSouthArrow(11, 5, 1)
  drawSouthArrow(12, 5, 1)
  drawSouthArrow(13, 5, 1)
  drawSouthArrow(14, 5, 1)
  drawSouthArrow(15, 5, 1)
  drawSouthArrow(16, 5, 1)


  // arrow(129, 122, 128, 259, true)

}


function mouseClicked() {
  console.log(mouseX/SCALE_ADJ, mouseY/SCALE_ADJ)
}




const drawWestArrow = (x, y, len) => arrow(coord(x), coord(y), coord(x - len), coord(y))
const drawEastArrow = (x, y, len) => arrow(coord(x), coord(y), coord(x + len), coord(y))
const drawSouthArrow = (x, y, len) => arrow(coord(x), coord(y), coord(x), coord(y + len))
const drawNorthArrow = (x, y, len) => arrow(coord(x), coord(y), coord(x), coord(y - len))
const drawSEArrow = (x, y, len) => arrow(coord(x), coord(y), coord(x + len), coord(y + len))
const drawNEArrow = (x, y, len) => arrow(coord(x), coord(y), coord(x + len), coord(y - len))
const drawNWArrow = (x, y, len) => arrow(coord(x), coord(y), coord(x - len), coord(y - len))
const drawSWArrow = (x, y, len) => arrow(coord(x), coord(y), coord(x - len), coord(y + len))
const drawDirectionalArrow = (x, y, len, angleMod=0) => {
  if (x === CELL_X && y === CELL_Y) return

  const cx = coord(x)
  const cy = coord(y)
  const { angle } = lineStats(cx, cy, POINT_X, POINT_Y)
  const [x2, y2] = getXYRotation(angle+angleMod, len*CELL_SIZE, cx, cy)

  arrow(cx, cy, x2, y2)
}

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
  const GRID_ARROW_SIZE = rnd(0.4, 0.65)
  const a = () => prb(0.1) ? 1 : prb(0.5) ? 0 : rnd(0, 0.25)

  const NE_ARROW = prb(0.1) ? 1 : prb(0.5) ? 0 : rnd(0, 0.25)
  const SE_ARROW = prb(0.1) ? 1 : prb(0.5) ? 0 : rnd(0, 0.25)
  const NW_ARROW = prb(0.1) ? 1 : prb(0.5) ? 0 : rnd(0, 0.25)
  const SW_ARROW = prb(0.1) ? 1 : prb(0.5) ? 0 : rnd(0, 0.25)

  const directional = prb(0.1)
  const directionalPrb = rnd(0, 0.15)

  eachCell((x, y, cx, cy) => {
    if ([0, CELLS].includes(cx) || [0, CELLS].includes(cy)) return
    let arrowFn
    if (directional || prb(directionalPrb)) arrowFn = drawDirectionalArrow
    else if (cx === CELL_X && cy === CELL_Y) arrowFn = () => {}
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

// function drawFlowy3() {
//   ARROW_DRIFT = ARROW_DRIFT * 0.1
//   STROKE_VARIANCE = STROKE_VARIANCE * 0.5
//   DOT_STROKE_MAX = min(DOT_STROKE_MIN + rndint(3*CHAOS), 5)


//   const GRID_ARROW_SIZE = rnd(0.4, 0.65)

//   eachCell((x, y, cx, cy) => {
//     drawDirectionalArrow(cx, cy, GRID_ARROW_SIZE, map(noise(x/500, y/500), 0, 1, -0.1, 0.1))
//   })


  // const layers = 40
  // const arrowLen = 20
  // const arrowPadding = 5

  // times(layers, l => {
  //   const nArrows = l * 3

  //   times(nArrows, a => {
  //     const modifier =  rnd(0.9, 1.1)
  //     const len = arrowLen * modifier
  //     const padding = modifier
  //     const startAngle = a * TWO_PI/nArrows
  //     const [x1, y1] = getXYRotation(startAngle + rnd(-0.1, 0.1), 20 + l*(arrowLen+padding), POINT_X, POINT_Y)

  //     const endAngle = PI + startAngle + (l * map(noise(x1/500, y1/500), 0, 1, -0.1, 0.1))
  //     const [x2, y2] = getXYRotation(endAngle, arrowLen, x1, y1)

  //     arrow(x1, y1, x2, y2)
  //   })
  // })
// }

// function drawFlowy2() {
//   ARROW_DRIFT = ARROW_DRIFT * 0.1
//   STROKE_VARIANCE = STROKE_VARIANCE * 0.5
//   DOT_STROKE_MAX = min(DOT_STROKE_MIN + rndint(3*CHAOS), 5)

//   const layers = 40
//   const arrowLen = 20
//   const arrowPadding = 5
//   times(layers, l => {
//     const nArrows = l * 2 + rndint(0, 4)

//     times(nArrows, a => {
//       const modifier = rnd(0.9, 2)
//       const len = arrowLen * modifier
//       const padding = arrowPadding * modifier + 5
//       const startAngle = a * TWO_PI/nArrows
//       const [x1, y1] = getXYRotation(startAngle + rnd(-0.1, 0.1), 20 + l*(arrowLen)+padding, POINT_X, POINT_Y)

//       const endAngle = PI + startAngle + (l * map(noise(x1/500, y1/500), 0, 1, -0.025, 0.025))
//       const [x2, y2] = getXYRotation(endAngle, arrowLen, x1, y1)

//       arrow(x1, y1, x2, y2)
//     })
//   })
// }






function drawFlowy() {
  ARROW_DRIFT = ARROW_DRIFT * 0.1
  STROKE_VARIANCE = STROKE_VARIANCE * 0.5
  DOT_STROKE_MAX = min(DOT_STROKE_MIN + rndint(3*CHAOS), 5)

  const c2 = CHAOS**2.5
  const paddingMin = 15
  const paddingMax = paddingMin + (c2 * 30)
  const lenMin = 30 - (c2*20)
  const lenMax = 30 + (c2*20)
  const flow = CHAOS * 0.4

  // const nPaths = 4
  const nPaths = CELLS*4
  times(nPaths, t => {
    if (prb(0.66 *CHAOS) && t) return
    const startOffset = rnd(0, 500)
    let angle = t*TWO_PI/nPaths //+ rnd(-TWO_PI, TWO_PI)/(nPaths*6)
    let [x2, y2] = getXYRotation(angle, startOffset+rnd(paddingMin, paddingMax)*2, POINT_X, POINT_Y)
    let [x1, y1] = getXYRotation(angle, rnd(lenMin, lenMax), x2, y2)

    let i = 0

    while (x2 > L && x2 < R && y2 > T && y2 < B && i < 50) {
      arrow(x1, y1, x2, y2)

      angle = lineStats(x2, y2, x1, y1).angle + map(
        noise(x2/20, y2/20),
        0,
        1,
        -flow,
        flow
      )

      ;([x2, y2] = getXYRotation(angle, rnd(paddingMin, paddingMax), x1, y1))

      ;([x1, y1] = getXYRotation(angle, rnd(lenMin, lenMax), x2, y2))

      i++
    }
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
    stroke(COLORS.grid)
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






function arrow(x1, y1, x2, y2, ignoreSkip=false) {
  stroke(COLORS.stroke)
  fill(COLORS.stroke)
  __dotStroke = rnd(DOT_STROKE_MIN, DOT_STROKE_MAX)
  if (DEBUG_MODE) {
    line(x1, y1, x2, y2)
    circle(x2, y2, 4)
    return
  }

  if (!ignoreSkip && prb(SKIP_RATE)) return

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

  const [__x2, __y2] = getXYRotation(angle+PI, rnd(CARROT_DIST_MIN, CARROT_DIST_MAX), _x2, _y2)
  // const carrotTurn = LAZY_CARROTS ? posOrNeg() * QUARTER_PI/(rnd(7.9, 8.1)) : 0
  const carrotTurn = CARROT_TURN + rnd(-0.005, 0.005)

  const [x3, y3] = getXYRotation(angle+carrotTurn-QUARTER_PI/(2+rnd(-ARROW_ANGLE_VAR, ARROW_ANGLE_VAR)), min(15,d*rnd(0.23, 0.27)), __x2, __y2)
  const [x4, y4] = getXYRotation(angle+carrotTurn+QUARTER_PI/(2+rnd(-ARROW_ANGLE_VAR, ARROW_ANGLE_VAR)), min(15,d*rnd(0.23, 0.27)), __x2, __y2)

  push()
  dotLine(_x1, _y1, _x2, _y2, 1, prb(DASH_RATE), SQUIGGLEY)
  dotLine(__x2, __y2, x3, y3, 0.25)
  dotLine(__x2, __y2, x4, y4, 0.25)
  pop()
}








function drawBackgroundStroke(x, y, strokeSize) {
  const d = lineStats(x, y, POINT_X, POINT_Y).d/SIZE

  stroke(COLORS.bgS(d, x, y))
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
function dotLine(x1, y1, x2, y2, driftFactor=1, dashed=false, squiggle=false) {
  const { d, angle } = lineStats(x1, y1, x2, y2)
  const t = STROKE_TURBULENCE

  let x = x1
  let y = y1
  let skip = false
  for (let i = 0; i <= d; i++) {
    const [_x, _y] = getXYRotation(
      angle+HALF_PI,
      getAngleDrift(x1, y1, i/d,
        squiggle
        ? sin(i/PI) * map(CHAOS, 0, 1, 1, 9) * map(DOT_STROKE_MIN, 1, 7, 0.5, 3)
        : driftFactor * d/16
      ),
      x+rnd(-t, t),
      y+rnd(-t, t)
    )

    if (i && i%10 === 0) skip = !skip
    if (skip && dashed) continue

    circle(_x, _y, nsrnd(_x, _y, __dotStroke*(1-STROKE_VARIANCE), __dotStroke*(1+STROKE_VARIANCE)));

    ([x, y] = getXYRotation(angle, i+1, x1, y1))
  }

}


function dotCircle(x, y, d, fill=false) {
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
