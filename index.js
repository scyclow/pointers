 // focal points
 // source of truth
 // illusion of choice
 // maddening inevitability
 // an attempt to make sense of complexity




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



*/

function keyPressed() {
  if (keyCode === 83) {
    saveCanvas(__canvas, 'points-' + Date.now(), 'png');
  }
}


function setup() {
  SIZE = min(innerWidth, innerHeight)
  __canvas = createCanvas(SIZE, SIZE)
  noiseSeed(rnd(1000000) + rnd(1000000) + rnd(1000))

  SCALE_ADJ = SIZE/800


  W = width/SCALE_ADJ
  H = height/SCALE_ADJ
  L = 0
  R = W
  T = 0
  B = H

  colorMode(HSB, 360, 100, 100)

  CELLS = chance(
    [2, rndint(5, 24)],
    [1, rndint(24, 48)],
  )


  CELL_PADDING = rnd(-0.1, 0.25)
  CELL_SIZE = W/CELLS

  CELL_X = rndint(2, CELLS)
  POINT_X = CELL_X * CELL_SIZE // CELL_SIZE/2
  CELL_Y = rndint(2, CELLS)
  POINT_Y = CELL_Y * CELL_SIZE //- CELL_SIZE/2

  ARROW_DRIFT = chance(
    [1, rnd(3, 5)],
    [3, rnd(1, 3)],
    [5, rnd(0, 1)],
    [1, rnd(0, 1)]
  )
  HUE = rnd(360)

  MAX_VECTOR_RANGES = 10000
  // MAX_VECTOR_RANGES = rnd(3, 300)
  // DOT_STROKE_MAX = 4
  DOT_STROKE_MAX = 1

  ARROW_MIN_LEN = 1
  ARROW_MAX_LEN = 5
  // ARROW_MIN_LEN = CELLS
  // ARROW_MAX_LEN = CELLS

  HIDE_CARROTS = false
  HIDE_LINES = false
  SKIP_RATE = 0
  LAZY_CARROTS = false
  // HIDE_LINES = true
  // HIDE_CARROTS = true
  // SKIP_RATE = 0.15

  // LAZY_CARROTS = true




  FAST = false
}


function draw() {

  noLoop()
  scale(SCALE_ADJ)
  drawBg()
  // drawBorder()
  drawDot()




  // debug mode
  // eachCell((x, y) => circle(x, y, 1))




  /*

    variations
      8*6*3*2*2
      layouts
      colors
      density
      digital/skeumorphic
      uniform/variable
      single/long/short

    rare strategies
      - arrows in random directions
      - all arrows pointing in opposite direction
      - all arrows pointing in exact direction


    strategy1
      - two sections single direction
        uniform
        differing lengths

    strategy2
      - three sections single direction
        uniform
        differing lengths

    strategy3
      - four sections single direction
        uniform
        differing lengths

    strategy4
      - only diagonal

    strategy5
      - random horizontal/vertical

    strategy6
      - random diagonal/horizontal/vertical

    strategy7
      - one vector with random turns
      - trace the edge of that vector

    strategy8
      - base n/s/e/w vectors
      - choose one base vector
        - create some vectors around it pointing in the same direction
          ex.   ---->
                ====>
                ---->
                ---->

        - vectors keep going until they hit another vector
        - choose another base vector, and repeat
          ex.
                ||||||||
                vvvvv|||
                ---->vvv
                ---->o
                ---->
                ---->

                ||||||||
                vvvvv|||
                ---->vvv
                ---->o
                ---->^
                ---->|
                ^^^^^|
                ||||||

        - switch vector expansions every once in a while to get a staggered effect


                ||||||||<--
                vvvvv|||<--
                ---->vvv<--
                ---->o<----
                ---->^<----
                ---->|<----
                ^^^^^|^<---
                |||||||^<--
                ||||||||<--

      strategy9
        - draw a random direction within the 90 deg frame
  */



  fill(15)
  stroke(15)



  const drawWestVector = (row) => {
    __dotStroke = rnd(1, DOT_STROKE_MAX)

    const y = row
    let x1, x2

    for (let x = CELLS-1; x >= CELL_X; x--) {
      if (!getCell(x, y) && !x1) x1 = x
      if (getCell(x, y) && x1) {
        x2 = x + 1
        break
      }
    }

    if (x1 === x2) return

    for (let x = x1; x >= x2; x--) setCell(x, y, 'w')

    let xCursor = x1
    while (xCursor >= x2) {
      let len = min(rndint(ARROW_MIN_LEN, ARROW_MAX_LEN), xCursor - x2)
      if (xCursor - len === x2 + 1) len += 1

      arrow(coord(xCursor), coord(y), coord(xCursor - len), coord(y))
      xCursor -= (len+1)
    }
  }

  const drawEastVector = (row) => {
    __dotStroke = rnd(1, DOT_STROKE_MAX)

    const y = row
    let x1, x2

    for (let x = 1; x <= CELL_X; x++) {
      if (!getCell(x, y) && !x1) x1 = x
      if (getCell(x, y) && x1) {
        x2 = x - 1
        break
      }
    }

    if (x1 === x2) return

    for (let x = x1; x <= x2; x++) setCell(x, y, 'e')

    let xCursor = x1
    while (xCursor <= x2) {
      let len = min(rndint(ARROW_MIN_LEN, ARROW_MAX_LEN), x2 - xCursor)
      if (xCursor + len === x2 - 1) len += 1


      arrow(coord(xCursor), coord(y), coord(xCursor + len), coord(y))
      xCursor += (len+1)
    }
  }

  const drawSouthVector = (col) => {
    __dotStroke = rnd(1, DOT_STROKE_MAX)

    const x = col
    let y1, y2

    for (let y = 1; y <= CELL_Y; y++) {
      if (!getCell(x, y) && !y1) y1 = y
      if (getCell(x, y) && y1) {
        y2 = y - 1
        break
      }
    }

    if (y1 === y2) return

    for (let y = y1; y <= y2; y++) setCell(x, y, 's')

    let yCursor = y1
    while (yCursor <= y2) {
      let len = min(rndint(ARROW_MIN_LEN, ARROW_MAX_LEN), y2 - yCursor)
      if (yCursor + len === y2 - 1) len += 1

      arrow(coord(x), coord(yCursor), coord(x), coord(yCursor + len))
      yCursor += (len+1)
    }
  }

  const drawNorthVector = (col) => {
    __dotStroke = rnd(1, DOT_STROKE_MAX)

    const x = col
    let y1, y2

    for (let y = CELLS-1; y >= CELL_Y; y--) {
      if (!getCell(x, y) && !y1) y1 = y
      if (getCell(x, y) && y1) {
        y2 = y + 1
        break
      }
    }

    if (y1 === y2) return

    for (let y = y1; y >= y2; y--) setCell(x, y, 'n')

    let yCursor = y1
    while (yCursor >= y2) {
      let len = min(rndint(ARROW_MIN_LEN, ARROW_MAX_LEN), yCursor - y2)
      if (yCursor - len === y2 + 1) len += 1

      arrow(coord(x), coord(yCursor), coord(x), coord(yCursor - len))
      yCursor -= (len+1)
    }
  }


  function isComplete() {
    return this.start === this.mid1 && this.end === this.mid2
  }
  const __vectorRanges = {
    right: { fn: drawWestVector, start: 0, end: CELLS, mid1: CELL_Y, mid2: CELL_Y, isComplete },
    left: { fn: drawEastVector, start: 0, end: CELLS, mid1: CELL_Y, mid2: CELL_Y, isComplete },
    top: { fn: drawSouthVector, start: 0, end: CELLS, mid1: CELL_X, mid2: CELL_X, isComplete },
    bottom: { fn: drawNorthVector, start: 0, end: CELLS, mid1: CELL_X, mid2: CELL_X, isComplete },
    allComplete() {
      return this.right.isComplete() && this.left.isComplete() && this.top.isComplete() && this.bottom.isComplete()
    }
  }


  const drawVectorRange = (v) => {
    const edge = chance(
      [
        __vectorRanges[v].start !== __vectorRanges[v].mid1 ? 1 : 0,
        ['start', rndint(
          // __vectorRanges[v].mid1 - __vectorRanges[v].start
          1, 2
        )]
      ],
      [
        __vectorRanges[v].start !== __vectorRanges[v].mid1 ? 1 : 0,
        ['mid1', rndint(
          // __vectorRanges[v].mid1 - __vectorRanges[v].start
          1, 2
        )]
      ],
      [
        __vectorRanges[v].end !== __vectorRanges[v].mid2 ? 1 : 0,
        ['mid2', rndint(
          // __vectorRanges[v].end - __vectorRanges[v].mid2
          1, 2
        )]
      ],
      [
        __vectorRanges[v].end !== __vectorRanges[v].mid2 ? 1 : 0,
        ['end', rndint(
          // __vectorRanges[v].end - __vectorRanges[v].mid2
          1, 2
        )]
      ],
    )

    if (!edge) debugger
    times(edge[1], t => {
      __vectorRanges[v][edge[0]] += 1
      __vectorRanges[v].fn(__vectorRanges[v][edge[0]])
    })
  }


  const fillOutVectorRanges = () => {
    let i=0
    while (!__vectorRanges.allComplete() && i < MAX_VECTOR_RANGES) {
      const r = __vectorRanges.right.isComplete() ? 0 : 1
      const l = __vectorRanges.left.isComplete() ? 0 : 1
      const t = __vectorRanges.top.isComplete() ? 0 : 1
      const b = __vectorRanges.bottom.isComplete() ? 0 : 1

      const direction = chance(
        [ r, 'right'],
        [ l, 'left'],
        [ t, 'top'],
        [ b, 'bottom'],
      )

      if (__vectorRanges[direction].isComplete()) debugger
      drawVectorRange(direction)
      i++
    }
  }



  drawWestVector(CELL_Y)
  drawEastVector(CELL_Y)
  drawNorthVector(CELL_X)
  drawSouthVector(CELL_X)

  fillOutVectorRanges()


  // times(5, t => {
  //   drawWestVector(CELL_Y + 1 + t)
  // })
  //   drawWestVector(CELL_Y + 1 + 8)
  //   drawWestVector(CELLS - 1)
  //   drawWestVector(CELLS - 2)


  // times(4, t => {
  //   drawNorthVector(CELL_X + 1 + t)
  // })


  // const vector = (x1, y1, x2, y2) => {
  //   let direction
  //   if (x1 < x2) direction = 'w'
  //   if (x1 > x2) direction = 'e'
  //   if (y1 < y2) direction = 's'
  //   if (y1 > y2) direction = 'n'

  // }



  // let topRightWidth = rndint(1, 10)
  // let rightTopHeight = rndint(1, 10)

  // times(topRightWidth, t => {
  //   const x = CELL_X + t + 1;

  //   for (
  //     var y = T;
  //     y < B && !getCell(x, y);
  //     y++
  //   ) {
  //     setCell(x, y, 's')
  //   }

  //   vector(x, T, x, y-1)
  // })


  // times(rightTopHeight, t => {
  //   const y = CELL_Y - t - 1;

  //   for (
  //     var x = R;
  //     x > L && !getCell(x, y);
  //     x--
  //   ) {
  //     setCell(x, y, 'w')
  //   }

  //   vector(R, y, x+1, y)
  // })


  // times(rndint(1, 10), t => {
  //   const x = CELL_X + t + 1 + topRightWidth;

  //   for (
  //     var y = T;
  //     y < B && !getCell(x, y);
  //     y++
  //   ) {
  //     setCell(x, y, 's')
  //   }

  //   vector(x, T, x, y-1)
  // })








  // const vectors = [
  //   {
  //     name: 'T',
  //     v: times(CELLS, cx => [
  //       [cx*CELL_SIZE, 0]
  //     ]),
  //   },

  //   {
  //     name: 'B',
  //     v: times(CELLS, cx => [
  //       [cx*CELL_SIZE, CELLS*CELL_SIZE]
  //     ]),
  //   },

  //   {
  //     name: 'L',
  //     v: times(CELLS, cy => [
  //       [0, cy*CELL_SIZE]
  //     ]),
  //   },

  //   {
  //     name: 'R',
  //     v: times(CELLS, cy => [
  //       [CELLS*CELL_SIZE, cy*CELL_SIZE]
  //     ]),
  //   }
  // ]


  // const vectorBase = sample(vectors)
  // const vectorBaseWidth = rndint(vectorBase.v.length)
  // const vectorBaseStart = min(rndint(vectorBase.v.length), vectorBase.v.length - vectorBaseWidth)


  // times(vectorBaseWidth, _v => {
  //   const vector = vectorBase.v[v+vectorBaseStart]

  //   const breakFn = {
  //     T: (cx, cy) => cy < CELL_Y && !getCell(cx, cy),
  //     B: (cx, cy) => cy > CELL_Y && !getCell(cx, cy),
  //     L: (cx, cy) => cx < CELL_X && !getCell(cx, cy),
  //     R: (cx, cy) => cx < CELL_X && !getCell(cx, cy),
  //   }[vectorBase.name]


  //   // let [x, y] = vector[0]
  //   // while (breakFn(x, y)) {

  //   // }

  // })






  // // going left <-
  // times(CELL_Y+1, cy => {
  //   let cx = CELL_X + 1
  //   while (cx <= CELLS) {
  //     const len = min(rndint(ARROW_MIN_LEN, ARROW_MAX_LEN), CELLS-cx)

  //     arrow(
  //       (cx+len) * CELL_SIZE,
  //       cy * CELL_SIZE,
  //       cx * CELL_SIZE,
  //       cy * CELL_SIZE
  //     )

  //     times(len, l => setCell(cx+l, cy, 'w'))

  //     cx += (len+1)
  //   }
  // })

  // // going right ->
  // times(CELLS - CELL_Y, cy => {
  //   let cx = CELL_X - 1
  //   while (cx >= 0) {
  //     const len = min(rndint(ARROW_MIN_LEN, ARROW_MAX_LEN), cx)
  //     arrow(
  //       (cx-len) * CELL_SIZE,
  //       POINT_Y+cy * CELL_SIZE,
  //       cx * CELL_SIZE,
  //       POINT_Y+cy * CELL_SIZE
  //     )

  //     cx -= (len+1)
  //   }
  // })

  // // going down v

  // times(CELL_X+1, cx => {

  //   let cy = CELL_Y - 1
  //   while (cy >= 0) {
  //     const len = min(rndint(ARROW_MIN_LEN, ARROW_MAX_LEN), cy)
  //     arrow(
  //       cx * CELL_SIZE,
  //       (cy-len) * CELL_SIZE,
  //       cx * CELL_SIZE,
  //       cy * CELL_SIZE,
  //     )


  //     cy -= (len+1)
  //   }
  // })



  // // going up ^
  // times(CELLS-CELL_X, cx => {

  //   let cy = CELL_Y + 1
  //   while (cy <= CELLS) {
  //     const len = min(rndint(ARROW_MIN_LEN, ARROW_MAX_LEN), CELLS-cy)
  //     arrow(
  //       POINT_X+cx * CELL_SIZE,
  //       (cy+len) * CELL_SIZE,
  //       POINT_X+cx * CELL_SIZE,
  //       cy * CELL_SIZE,
  //     )

  //     cy += (len+1)
  //   }
  // })





  // cut into 2 sections
  // cut into 3 sections
  // cut into 4 sections


  // const drawArrow = sample([
  //   drawArrow1,
  //   drawArrow2,
  //   drawArrow3,
  //   drawArrow4,
  //   drawArrow5,
  // ])




  // __dotStroke = rnd(1, DOT_STROKE_MAX)


  // const startingDirection = sample(0, HALF_PI, PI, TWO_PI*0.75)



  // for (let x = L; x <= R+1; x += CELL_SIZE) {
  //   for (let y = T; y <= B+1; y += CELL_SIZE) {
  //     drawArrow(x, y)
  //     // circle(x, y, 1)

  //   }
  // }


  // times(150, (i) => {
  //   const x = rnd(L, R)
  //   const y = rnd(T, B)
  //   drawArrow5(x, y)
  // })

  // stroke('red')
  // line (W/2-150, H/2, W/2+150, H/2)
  // dotLine (W/2-150, H/2, W/2+150, H/2)







}


function drawBg() {

  // background(HUE + 30, 22, 97)
  background(HUE + 30, 12, 97)
  if (FAST) return


  const buffer = 5/SCALE_ADJ
  const baseStrokeSize = 2/SCALE_ADJ


  for (let y = T-buffer; y < B+buffer; y += baseStrokeSize) {
    let strokeSize = baseStrokeSize
    for (let x = L-buffer; x < B+buffer; x += strokeSize) {
      drawBackgroundStroke(x, y, strokeSize)
    }
  }


  // stroke(HUE + 30, 22, 97)
  // for (let x = L; x <= R; x += CELL_SIZE) {
  //   line(x, T, x, B)
  // }

  // for (let y = T; y <= B; y += CELL_SIZE) {
  //   line(L, y, R, y)
  // }
}

function drawBorder() {
  fill(15)
  stroke(15)
  const p = CELL_SIZE/2
  dotLine(L+p, T+p, R-p, T+p)
  dotLine(L+p, B-p, R-p, B-p)
  dotLine(L+p, T+p, L+p, B-p)
  dotLine(R-p, T+p, R-p, B-p)
}

function drawDot() {
  push()
  stroke('red')
  fill('red')
  if (FAST) circle(POINT_X, POINT_Y, 10)
  else dotCircle(POINT_X, POINT_Y, 10, true)
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

function vector(x1, y1, x2, y2) {
  if (y1 < y2) {

    let y = y2
    while (y >= y1) {
      const len = min(rndint(ARROW_MIN_LEN, ARROW_MAX_LEN), abs(y - y1))
      rndint(
        1, min(5, y-y2))
      arrow(
        coord(x1),
        coord(y-len),
        coord(x2),
        coord(y),
      )


      y -= (len+1)
    }
  } else {
    console.log(x1, y1, x2, y2)
    arrow(coord(x1), coord(y1), coord(x2), coord(y2))
  }

  // if (x1 > x2) {

  //     arrow(
  //       coord(x1),
  //       coord(y1),
  //       coord(x2),
  //       coord(y2),
  //     )
  // }
}




const coord = c => c * CELL_SIZE



let __cells = {}

function getCell(x, y) {
  return __cells[`${x},${y}`]
}

function setCell(x, y, v) {
  __cells[`${x},${y}`] = v
  return v
}

function markPoints(x1, y1, x2, y2, d) {
  traverseLine(x1, y1, x2, y2, (x, y) => setCell(x, y, d) )
}

function traverseLine(x1, y1, x2, y2, fn) {
  const xDir = x2 - x1 >= 0 ? 1 : -1
  const yDir = y2 - y1 >= 0 ? 1 : -1

  for (
    let x = x1;
    xDir > 0 ? x <= x2 : x >= x2;
    xDir > 0 ? x++ : x--
  )
  for (
    let y = y1;
    yDir > 0 ? y <= y2 : y >= y2;
    yDir > 0 ? y++ : y--
  ) {
    if (!fn(x, y)) return
  }
}























// randomly draw arrow pointing diagonally
function drawArrow1(x, y) {
  const a = arrowFn(x, y)

  const xL = x < POINT_X
  const xR = x > POINT_X
  const xEq = x === POINT_X
  const yT = y < POINT_Y
  const yB = y > POINT_Y
  const yEq = y === POINT_Y


  if      (xL && yT)   a.se()
  else if (xL && yB)   a.ne()
  else if (xR && yT)   a.sw()
  else if (xR && yB)   a.nw()
  else if (xL && yEq)  a.e()
  else if (xR && yEq)  a.w()
  else if (xEq && yB)  a.n()
  else if (xEq && yT)  a.s()
  else if (xEq && yEq) {}
}

function drawArrow2(x, y) {
  const a = arrowFn(x, y)

  const xL = x < POINT_X
  const xR = x > POINT_X
  const xEq = x === POINT_X
  const yT = y < POINT_Y
  const yB = y > POINT_Y
  const yEq = y === POINT_Y


  if      (xL && yT)   sampleCall([a.s, a.e])
  else if (xL && yB)   sampleCall([a.n, a.e])
  else if (xR && yT)   sampleCall([a.s, a.w])
  else if (xR && yB)   sampleCall([a.n, a.w])
  else if (xL && yEq)  a.e()
  else if (xR && yEq)  a.w()
  else if (xEq && yB)  a.n()
  else if (xEq && yT)  a.s()
  else if (xEq && yEq) {}
}


function drawArrow3(x, y) {
  const a = arrowFn(x, y)

  const xL = x < POINT_X
  const xR = x > POINT_X
  const xEq = x === POINT_X
  const yT = y < POINT_Y
  const yB = y > POINT_Y
  const yEq = y === POINT_Y



  if      (xL && yT)   sampleCall([a.s, a.e, a.se])
  else if (xL && yB)   sampleCall([a.n, a.e, a.ne])
  else if (xR && yT)   sampleCall([a.s, a.w, a.sw])
  else if (xR && yB)   sampleCall([a.n, a.w, a.nw])
  else if (xL && yEq)  a.e()
  else if (xR && yEq)  a.w()
  else if (xEq && yB)  a.n()
  else if (xEq && yT)  a.s()
  else if (xEq && yEq) {}
}


const __se = Math.random()
const __ne = Math.random()
const __sw = Math.random()
const __nw = Math.random()

function drawArrow4(x, y) {
  const a = arrowFn(x, y)

  const xL = x < POINT_X
  const xR = x > POINT_X
  const xEq = x === POINT_X
  const yT = y < POINT_Y
  const yB = y > POINT_Y
  const yEq = y === POINT_Y



  if      (xL && yT)   __se < 0.5 ? a.s() : a.e()
  else if (xL && yB)   __ne < 0.5 ? a.n() : a.e()
  else if (xR && yT)   __nw < 0.5 ? a.s() : a.w()
  else if (xR && yB)   __sw < 0.5 ? a.n() : a.w()
  else if (xL && yEq)  a.e()
  else if (xR && yEq)  a.w()
  else if (xEq && yB)  a.n()
  else if (xEq && yT)  a.s()
  else if (xEq && yEq) {}
}

function drawArrow5(x, y) {
  const a = arrowFn(x, y)
  a.dir()
}







function arrow(x1, y1, x2, y2) {
  if (FAST) {
    line(x1, y1, x2, y2)
    circle(x2, y2, 4)
    return
  }

  if (prb(SKIP_RATE)) return

  const _x1 = x1 + rnd(-ARROW_DRIFT, ARROW_DRIFT)
  const _y1 = y1 + rnd(-ARROW_DRIFT, ARROW_DRIFT)

  const _x2 = x2 + rnd(-ARROW_DRIFT, ARROW_DRIFT)
  const _y2 = y2 + rnd(-ARROW_DRIFT, ARROW_DRIFT)


  const { d, angle } = lineStats(_x2, _y2, _x1, _y1)

  const [__x2, __y2] = LAZY_CARROTS ? getXYRotation(angle+PI, rnd(3, 10), _x2, _y2) : [_x2, _y2]
  const carrotTurn = LAZY_CARROTS ? posOrNeg() * QUARTER_PI/rnd(7.9, 8.1) : 0

  const [x3, y3] = getXYRotation(angle+carrotTurn-QUARTER_PI/rnd(1.9, 2.1), min(15,d*rnd(0.23, 0.27)), __x2, __y2)
  const [x4, y4] = getXYRotation(angle+carrotTurn+QUARTER_PI/rnd(1.9, 2.1), min(15,d*rnd(0.23, 0.27)), __x2, __y2)

  push()
    if (!HIDE_LINES) {
      dotLine(_x1, _y1, _x2, _y2)
    }


    if (!HIDE_CARROTS) {
      dotLine(__x2, __y2, x3, y3)
      dotLine(__x2, __y2, x4, y4)
    }

  pop()
}

function arrowFn(x, y) {
  const drift = 4
  const left = x-(CELL_SIZE*(1-CELL_PADDING)) + nsrnd(x, y, -drift, drift)
  const right = x-(CELL_SIZE*CELL_PADDING) + nsrnd(x, y, -drift, drift)
  const top = y-(CELL_SIZE*(1-CELL_PADDING)) + nsrnd(x, y, -drift, drift)
  const bottom = y-(CELL_SIZE*CELL_PADDING) + nsrnd(x, y, -drift, drift)
  const xMid = (left + right)/2 + nsrnd(x, y, -drift, drift)
  const yMid = (top + bottom)/2 + nsrnd(x, y, -drift, drift)

  const pointSize = CELL_SIZE * 0.25

  const { angle } = lineStats(x, y, POINT_X, POINT_Y)



  return {
    se: () => arrow(left, top, right, bottom),
    ne: () => arrow(left, bottom, right, top),
    nw: () => arrow(right, bottom, left, top),
    sw: () => arrow(right, top, left, bottom),
    n:  () => arrow(xMid, bottom, xMid, top),
    s:  () => arrow(xMid, top, xMid, bottom),
    e:  () => arrow(left, yMid, right, yMid),
    w:  () => arrow(right, yMid, left, yMid),
    dir: () => arrow(
      ...getXYRotation(angle+PI, CELL_SIZE*(1-CELL_PADDING), x, y),
      x, y
    )
  }
}

// randomly draw arrow pointing directly on x/y axis
// default to horozontal arrows (unless directly under/over)
// default to vertical arrows (unless left/right)
// random x/y/diagonal




function drawBackgroundStroke(x, y, strokeSize) {
  const d = lineStats(x, y, POINT_X, POINT_Y).d/SIZE


  stroke(HUE + rnd(25, 35), rnd(3, 7) + 8*d, rnd(96, 100) - 3*d)
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
    sum += chances[i][0] / total
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
function dotLine(x1, y1, x2, y2) {
  const THICK_VAR = 1.5
  const TURB = 0.15
  const { d, angle } = lineStats(x1, y1, x2, y2)
  const t = TURB

  let x = x1
  let y = y1
  for (let i = 0; i <= d; i++) {
    const _x = x+rnd(-t, t)
    const _y = y+rnd(-t, t)

    circle(_x, _y, nsrnd(_x, _y, __dotStroke*(1-THICK_VAR), __dotStroke*(1+THICK_VAR)));

    // const angleDrift = getAngleDrift(x, y, i/d);
    ([x, y] = getXYRotation(angle, i+1, x1, y1))
  }
}


function dotCircle(x, y, d, fill=false) {
  const r = d/2
  const THICK_VAR = 1.5 * (d/300)
  const TURB = 0.15

  const circumference = d * PI *4

  let angle = 0

  if (fill) beginShape()
  for (let i = 0; i <= circumference; i++) {
    const angle = i*TWO_PI/circumference
    const [rx, ry] = getXYRotation(angle, 2, 1000, 1000)
    const r = map(
      noise(rx, ry),
      0,
      1,
      0.9*d/2,
      d/2
    )

    const [_x, _y] = getXYRotation(angle, r, x, y)
    circle(_x, _y, nsrnd(_x, _y, __dotStroke*(1-THICK_VAR), __dotStroke*(1+THICK_VAR)));

    if (fill) curveVertex(_x, _y)

  }
  if (fill) endShape()

}

function getAngleDrift(x, y, prg) {
  return map(
    noise(...getXYRotation(prg*TWO_PI, 1, x+1000, y+1000)),
    0,
    1,
    -QUARTER_PI/2,
    QUARTER_PI/2,
  )
}
