<template>
  <div class="swiper-slide-wrap">
    <div class="swiper-slider" ref="slides" @scroll.passive="handleScroll" @touchend="endScroll" @touchstart="startScroll">
      <slot />
    </div>
  </div>
</template>
<!--<script>-->
<!--fetch('big image source').then((response) => response.blob()).then((blob) => {-->
<!--  let img = document.querySelector('#image');-->
<!--  img.onload = () => URL.revokeObjectUrl(img.src)-->
<!--  img.src = URL.createObjectUrl(blob)-->
<!--  img.style.filter = 'none';-->
<!--})-->
<!--</script>-->
<style>
.swiper-slide-wrap {
  border-radius: 2rem;
}
.swiper-slider {
  width: calc(100% + 2px);
  height: 342px;
  display: flex;
  overflow-x: auto;
  border-radius:2rem;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior-y: none;
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.swiper-slider::-webkit-scrollbar {
  width: 0;
  height: 0;
}
.swiper-slide {
  width: calc(100% + 2px);
  flex-shrink: 0;
  height: 100%;
}
.swiper-slide>img {
  border-left:1px solid #fff;
  border-right:1px solid #fff;
}
</style>
<script>
export default {
  name: 'TheSwiper',
  data() {
    return {
      position: 0,
      tmpPosition: 0,
      direction: 'right',
      start: 0,
      stop: 0,
      positionMin: 0,
      positionMax: 0,
      currentPosition: 0,
      fullWidth:0,
      elementWidth: 0,
    };
  },
  methods: {
    handleScroll(e) {
      this.currentPosition = e.target.scrollLeft;
      this.fullWidth = e.target.scrollWidth;
      let length_ = e.target.children.length;
      this.elementWidth = Math.round(this.fullWidth / length_);
      let min = 0;
      for(let i = 1; i <= length_; i++) {
        let max = i * this.elementWidth
        if(this.currentPosition > min && this.currentPosition < max) {
          this.positionMin  = min;
          this.positionMax  = max;
        }
        min = max;
      }
    },
    endScroll(e) {

      console.log('this.currentPosition: ', this.currentPosition);

      this.end = e.changedTouches[0].clientX;
      if(this.end > this.start) {
        console.log('swipe right');
        this.position = this.positionMin;
      } else if(this.end < this.start) {
        this.position = this.positionMax;
      }
      const container = this.$refs.slides;

      let point = this.currentPosition > 0
          ? this.currentPosition > this.fullWidth
              ? this.fullWidth - this.elementWidth
              : this.position
          : 0;

      container.scrollTo({left: point, behavior: 'smooth'});
    },
    startScroll(e) {
      //if (e.changedTouches[0].pageX > 20 && e.changedTouches[0].pageX < window.innerWidth - 20) {
        this.start = e.targetTouches[0].clientX;
     // } else {
      //  e.preventDefault();
     // }
    }
  },
};
</script>
