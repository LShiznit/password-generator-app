class Slider {
  constructor() {
    // this.track = queryTrack
    // this.thumb = queryThumb
    this.track = document.querySelector('.track')
    this.thumb = document.querySelector('.thumb')
    this.rectTrack = track.getBoundingClientRect()
    this.rectThumb = thumb.getBoundingClientRect()
    this.sliderPercentageX // used for label reading
  }

  slideThumb() {
    this.thumb.onmousedown = function (e) {
      e.preventDefault()
      slideX(e)
      function slideX(e) {
        let percentX = (
          (e.clientX - this.rectTrack.x) /
          this.MathrectTrack.width
        ).toPrecision(3)

        // BOUND LABEL READING WITHIN 100%
        if (percentX > 1) {
          this.sliderPercentageX = Math.floor(percentX)
        } else if (percentX < 0) {
          this.sliderPercentageX = Math.ceil(percentX)
        } else {
          this.sliderPercentageX = percentX
        }
        if (
          this.rectTrack.x + this.rectTrack.width >= e.pageX &&
          e.pageX >= this.rectTrack.x
        ) {
          this.thumb.style.left = `${percentX * 100}%`
        }
        // console.log(`pX: ${e.pageX} pY: ${e.pageY} // cX: ${e.clientX} cY: ${e.clientY}`)

        // MOUSE UP IF OUT OF BOUNDS - X AXIS
        if (
          e.pageX < this.rectTrack.left - this.rectThumb.width / 2 ||
          e.pageX > this.rectTrack.right + this.rectThumb.width / 2
        ) {
          document.removeEventListener('mousemove', slideX)
          this.thumb.onmouseup = null
        }
        // MOUSE UP IF OUT OF BOUNDS - Y AXIS
        if (
          e.pageY < this.rectTrack.top - this.rectThumb.height / 2 ||
          e.pageY > this.rectTrack.bottom + this.rectThumb.height / 2
        ) {
          document.removeEventListener('mousemove', slideX)
          this.thumb.onmouseup = null
        }
      }
      document.addEventListener('mousemove', slideX)

      this.thumb.addEventListener('mouseup', function (e) {
        document.removeEventListener('mousemove', slideX)
        this.thumb.onmouseup = null
      })
    }

    // REMOVE DRAG FROM MOUSEDOWN
    this.thumb.ondragstart = function () {
      return false
    }
  }
}
