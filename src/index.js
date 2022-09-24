const track = document.querySelector('.track')
const trackBackground = document.querySelector('.track-background')
const thumb = document.querySelector('.thumb')
const passLength = document.querySelector('.char-label div')
const passDisplay = document.getElementById('password')
const rectTrack = track.getBoundingClientRect()
const rectThumb = thumb.getBoundingClientRect()
var sliderPercentageX = '' // used for label reading
const btnGen = document.querySelector('.btn-lrg')
const validChar = {
  upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lower: 'abcdefghijklmnopqrstuvwxyz',
  nums: '0123456789',
  syms: '!?{}[]*"$%&/()";:,.-_<>=',
}
var charPool = ''
var password = ''
var charTypes = {
  upper: document.querySelector('#upperCase').checked,
  lower: document.querySelector('#lowerCase').checked,
  nums: document.querySelector('#numbers').checked,
  syms: document.querySelector('#symbols').checked,
}
var keysA = Object.keys(charTypes)
var ranTypes = keysA.filter((key) => charTypes[key] == true)
const strengths = {
  deg1: [0, '#f64a4a', 'TOO WEAK!'],
  deg2: [1, '#fb7c58', 'WEAK'],
  deg3: [2, '#f8cd65', 'MEDIUM'],
  deg4: [3, '#a4ffaf', 'STRONG'],
}
const strengthDisplay = document.querySelector('.strengthText')
const strengthBoxes = document.querySelectorAll('.sBox')

const clipboardEl = document.getElementById('clipboard')

clipboardEl.addEventListener('click', () => {
  const password = passDisplay.innerText
  if (!password) {
    return
  }
  navigator.clipboard.writeText(password)
  alert('Password copied to clipboard!')
})

btnGen.addEventListener('click', function () {
  passDisplay.innerText = generatePassword()
})

document.addEventListener('mousedown', strengthCheck)
document.addEventListener('mouseup', strengthCheck)

function strengthCheck() {
  charCheck()
  keysA = Object.keys(charTypes)
  ranTypes = keysA.filter((key) => charTypes[key] == true)

  for (let i = 0; i <= 3; i++) {
    strengthBoxes[i].style.backgroundColor = '#24232c'
    strengthBoxes[i].style.outline = '2px solid #e6e5ea'
  }

  if (passLength.innerText <= 5 || ranTypes.length < 2) {
    // TOO WEAK!
    strengthDisplay.innerText = strengths.deg1.at(2)
    for (let i = 0; i <= strengths.deg1.at(0); i++) {
      strengthBoxes[i].style.backgroundColor = strengths.deg1.at(1)
      strengthBoxes[i].style.outlineColor = strengths.deg1.at(1)
    }
  } else if (5 < passLength.innerText && passLength.innerText <= 8) {
    // WEAK
    strengthDisplay.innerText = strengths.deg2.at(2)
    for (let i = 0; i <= strengths.deg2.at(0); i++) {
      strengthBoxes[i].style.backgroundColor = strengths.deg2.at(1)
      strengthBoxes[i].style.outlineColor = strengths.deg2.at(1)
    }
  } else if (8 < passLength.innerText && passLength.innerText <= 10) {
    // MEDIUM
    strengthDisplay.innerText = strengths.deg3.at(2)
    for (let i = 0; i <= strengths.deg3.at(0); i++) {
      strengthBoxes[i].style.backgroundColor = strengths.deg3.at(1)
      strengthBoxes[i].style.outlineColor = strengths.deg3.at(1)
    }
  } else if (
    10 < passLength.innerText &&
    passLength.innerText <= 20 &&
    ranTypes.length >= 2
  ) {
    // STRONG
    strengthDisplay.innerText = strengths.deg4.at(2)
    for (let i = 0; i <= strengths.deg4.at(0); i++) {
      strengthBoxes[i].style.backgroundColor = strengths.deg4.at(1)
      strengthBoxes[i].style.outlineColor = strengths.deg4.at(1)
    }
  }
}
function charCheck() {
  charTypes = {
    upper: document.querySelector('#upperCase').checked,
    lower: document.querySelector('#lowerCase').checked,
    nums: document.querySelector('#numbers').checked,
    syms: document.querySelector('#symbols').checked,
  }
  return charTypes
}
function generatePassword() {
  // const keysA = Object.keys(charTypes)
  // const ranTypes = keysA.filter((key) => charTypes[key] == true)
  // ranTypes.forEach((el) => (charPool += validChar[el]))
  // RESET VARS ON CLICK
  password = ''
  charPool = ''
  // CHARACTER SET INCLUSION
  // const keysA = Object.keys(charTypes)
  // const ranTypes = keysA.filter((key) => charTypes[key] == true)

  strengthCheck()
  charCheck()
  ranTypes.forEach((el) => (charPool += validChar[el]))
  // if no char set selected
  if (ranTypes == false) {
    passDisplay.style.color = 'red'
    setTimeout(() => {
      passDisplay.style.color = '#e6e5ea'
    }, '1500')
    return (password = 'select check 1 box')
  } else {
    // GENERATE PASSWORD
    for (let i = 0; i <= passLength.innerText - 1; i++) {
      let randomInt = Math.floor(Math.random() * charPool.length)
      password =
        password + charPool[Math.floor(Math.random() * charPool.length)]
    }
    return password
  }
}
thumb.onmousedown = function (e) {
  e.preventDefault()
  slideX(e)
  function slideX(e) {
    let percentX = ((e.clientX - rectTrack.x) / rectTrack.width).toPrecision(3)
    // BOUND LABEL READING WITHIN 100%
    if (percentX > 1) {
      sliderPercentageX = Math.floor(percentX)
    } else if (percentX < 0) {
      sliderPercentageX = Math.ceil(percentX)
    } else {
      sliderPercentageX = percentX
    }
    passLength.innerText = Math.round(sliderPercentageX * 20)
    // MOVE PROGRESS SLIDER
    if (rectTrack.x + rectTrack.width >= e.pageX && e.pageX >= rectTrack.x) {
      thumb.style.left = `${percentX * 100}%`
      thumb.style.cursor = 'grabbing'
      trackBackground.style.cssText = `
      clip-path: inset(0 ${100 - percentX * 100}% 0 0);    
      `
    }
    // MOUSE UP IF OUT OF BOUNDS - X AXIS
    if (
      e.pageX < rectTrack.left - rectThumb.width / 2 ||
      e.pageX > rectTrack.right + rectThumb.width / 2
    ) {
      document.removeEventListener('mousemove', slideX)
      thumb.onmouseup = null
      thumb.style.cursor = 'grab'
    }
    // MOUSE UP IF OUT OF BOUNDS - Y AXIS
    if (
      e.pageY < rectTrack.top - rectThumb.height / 2 ||
      e.pageY > rectTrack.bottom + rectThumb.height / 2
    ) {
      document.removeEventListener('mousemove', slideX)
      thumb.onmouseup = null
    }
  }
  document.addEventListener('mousemove', slideX)
  thumb.addEventListener('mouseup', function (e) {
    document.removeEventListener('mousemove', slideX)
    thumb.onmouseup = null
    thumb.style.cursor = 'grab'
  })
}
