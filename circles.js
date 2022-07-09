 // focal points
 // source of truth





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
    saveCanvas(__canvas, 'points-' + tokenData.hash, 'png');
  }
}


function setup() {
  SIZE = min(innerWidth, innerHeight)
  __canvas = createCanvas(innerWidth, innerHeight)
  noiseSeed(rnd(1000000) + rnd(1000000) + rnd(1000))

  SCALE_ADJ = SIZE/800


  W = width/SCALE_ADJ
  H = height/SCALE_ADJ
  L = 0
  R = W
  T = 0
  B = H

  colorMode(HSB, 360, 100, 100)



}


function draw() {

  noLoop()
  // translate(width/2, height/2)
  scale(SCALE_ADJ)

  background(35, 80, 90)


  noFill()
  stroke(180, 80, 90)

  const r = rnd()
  for (let x = L; x < R+1; x += 5)
  for (let y = T; y < B+1; y += 5) {


    circle(x, y, 10 * noise(x/800, y/800))
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
    if (seed <= sum) return chances[i][1]
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

    ([x, y] = getXYRotation(angle, 1, x, y))
  }

}
