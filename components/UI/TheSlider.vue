<template>
  <div
    class="slider"
    :class="{
      'slider--ssr': isSSR,
      'slider--auto-play': settings.autoplay,
      'slider--disabled': settings.unagile,
      'slider--fade': settings.fade && !settings.unagile,
      'slider--rtl': settings.rtl,
      'slider--no-nav-buttons': !settings.navButtons,
    }"
    @touchstart="() => {}"
  >

<!--    <div v-if="currentWidth <= 576">-->


      <div ref="list" class="slider__list">
        <div
          ref="track"
          class="slider__track"
          :style="{
            transform: `translate(${translateX + marginX}px)`,
            transition: `transform ${settings.timing} ${transitionDelay}ms`,
          }"
          @mouseover="handleMouseOver('track')"
          @mouseout="handleMouseOut('track')"
        >

          <div v-show="slidesCloned" ref="slidesClonedBefore" class="slider__slides slider__slides--cloned">
            <slot />
          </div>

          <div ref="slides" class="slider__slides slider__slides--regular">
            <slot />
          </div>

          <div v-show="slidesCloned" ref="slidesClonedAfter" class="slider__slides slider__slides--cloned">
            <slot />
          </div>


        </div>
      </div>

      <div v-if="$slots.caption" class="slider__caption">
        <slot name="caption" />
      </div>

      <div
        v-if="!settings.unagile && (settings.navButtons || settings.dots)"
        class="slider__actions"
      >
        <button
          v-if="settings.navButtons && !settings.unagile"
          ref="prevButton"
          class="slider__nav-button slider__nav-button--prev"
          :disabled="!canGoToPrev"
          type="button"
          @click="goToPrev(), restartAutoPlay()"
        ></button>

        <ul
          v-if="settings.dots && !settings.unagile"
          ref="dots"
          class="slider__dots"
        >
          <li
            v-for="n in countSlides"
            :key="n"
            class="slider__dot"
            :class="{ 'slider__dot--current': n - 1 === currentSlide }"
            @mouseover="handleMouseOver('dot')"
            @mouseout="handleMouseOut('dot')"
          >
            <button type="button" @click="goTo(n - 1), restartAutoPlay()">
              {{ n }}
            </button>
          </li>
        </ul>

        <button
          v-if="settings.navButtons && !settings.unagile"
          ref="nextButton"
          class="slider__nav-button slider__nav-button--next"
          :disabled="!canGoToNext"
          type="button"
          @click="goToNext(), restartAutoPlay()"
        ></button>
      </div>

<!--    </div>-->

<!--    <div v-else>-->

<!--      <div style="display:flex;gap:2rem;">-->
<!--        <div style="height:405px;width:750px;">-->


<!--          <div ref="list" class="slider__list">-->
<!--            <div-->
<!--                ref="track"-->
<!--                class="slider__track"-->
<!--                :style="{-->
<!--            transform: `translate(${translateX + marginX}px)`,-->
<!--            transition: `transform ${settings.timing} ${transitionDelay}ms`,-->
<!--          }"-->
<!--                @mouseover="handleMouseOver('track')"-->
<!--                @mouseout="handleMouseOut('track')"-->
<!--                id="board"-->
<!--            >-->

<!--              <div v-show="slidesCloned" ref="slidesClonedBefore" class="slider__slides slider__slides&#45;&#45;cloned">-->
<!--                <slot />-->
<!--              </div>-->

<!--              <div ref="slides" class="slider__slides slider__slides&#45;&#45;regular">-->
<!--                <slot />-->
<!--              </div>-->

<!--              <div v-show="slidesCloned" ref="slidesClonedAfter" class="slider__slides slider__slides&#45;&#45;cloned">-->
<!--                <slot />-->
<!--              </div>-->


<!--            </div>-->
<!--          </div>-->



<!--        </div>-->
<!--        <div style="min-height:405px;width:282px;align-content: flex-start;display:flex;flex-wrap:wrap;justify-content:space-between;">-->


<!--          <div-->
<!--              v-for="n in countSlides"-->
<!--              :key="n"-->
<!--              class="slider__preview"-->
<!--              :class="{ 'slider__preview&#45;&#45;current': n - 1 === currentSlide }"-->
<!--              style="box-sizing:border-box;width:100%;max-width:130px;height:70px;margin-bottom:16px;overflow:hidden;"-->
<!--              @click="goTo(n - 1), restartAutoPlay()"-->
<!--          ><img :src="showThumb(n-1)" alt="" style="width:130px;height:auto;object-fit:cover"/></div>-->



<!--&lt;!&ndash;          <ul&ndash;&gt;-->
<!--&lt;!&ndash;              v-if="settings.dots && !settings.unagile"&ndash;&gt;-->
<!--&lt;!&ndash;              ref="dots"&ndash;&gt;-->
<!--&lt;!&ndash;              class="slider__dots"&ndash;&gt;-->
<!--&lt;!&ndash;          >&ndash;&gt;-->
<!--&lt;!&ndash;            <li&ndash;&gt;-->
<!--&lt;!&ndash;                v-for="n in countSlides"&ndash;&gt;-->
<!--&lt;!&ndash;                :key="n"&ndash;&gt;-->
<!--&lt;!&ndash;                class="slider__dot"&ndash;&gt;-->
<!--&lt;!&ndash;                :class="{ 'slider__dot&#45;&#45;current': n - 1 === currentSlide }"&ndash;&gt;-->
<!--&lt;!&ndash;                @mouseover="handleMouseOver('dot')"&ndash;&gt;-->
<!--&lt;!&ndash;                @mouseout="handleMouseOut('dot')"&ndash;&gt;-->
<!--&lt;!&ndash;            >&ndash;&gt;-->
<!--&lt;!&ndash;              <button type="button" @click="goTo(n - 1), restartAutoPlay()">&ndash;&gt;-->
<!--&lt;!&ndash;                {{ n }}&ndash;&gt;-->
<!--&lt;!&ndash;              </button>&ndash;&gt;-->
<!--&lt;!&ndash;            </li>&ndash;&gt;-->
<!--&lt;!&ndash;          </ul>&ndash;&gt;-->




<!--        </div>-->
<!--      </div>-->

<!--    </div>-->

  </div>
</template>

<script>
import handlers from "./SliderMixins/handlers";
import helpers from "./SliderMixins/helpers";
import methods from "./SliderMixins/methods";
import preparations from "./SliderMixins/preparations";
import settings from "./SliderMixins/settings";
import watchers from "./SliderMixins/watchers";

export default {
  name: "TheSlider",

  mixins: [handlers, helpers, methods, preparations, settings, watchers],

  data() {
    return {
      autoplayInterval: null,
      autoplayRemaining: null,
      autoplayStartTimestamp: null,
      autoplayTimeout: null,
      currentSlide: null,
      dragDistance: 0,
      dragStartX: 0,
      dragStartY: 0,
      isAutoplayPaused: false,
      isMouseDown: false,
      slides: [],
      slidesClonedAfter: [],
      slidesClonedBefore: [],
      isSSR: true,
      transitionDelay: 0,
      translateX: 0,
      widthWindow: 0,
      widthContainer: 0,
      activeSlide: null,
    };
  },

  computed: {
    breakpoints: function () {
      return !this.initialSettings.responsive
        ? []
        : this.initialSettings.responsive.map((item) => item.breakpoint);
    },

    canGoToPrev: function () {
      return this.settings.infinite || this.currentSlide > 0;
    },

    canGoToNext: function () {
      return this.settings.infinite || this.currentSlide < this.countSlides - 1;
    },

    countSlides: function () {
      return this.isSSR
        ? this.htmlCollectionToArray(this.$slots.default).length
        : this.slides.length;
    },

    countSlidesAll: function () {
      return this.slidesAll.length;
    },

    currentWidth: function () {
      return window.screen.width;
    },

    currentBreakpoint: function () {
      let breakpoints = this.breakpoints.map((item) => item).reverse();
      return this.initialSettings.mobileFirst
        ? breakpoints.find((item) => item < this.widthWindow) || 0
        : breakpoints.find((item) => item > this.widthWindow) || null;
    },

    marginX: function () {
      if (this.settings.unagile) {
        return 0;
      }

      let marginX = this.slidesCloned ? this.countSlides * this.widthSlide : 0;

      // Center mode margin
      if (this.settings.centerMode) {
        marginX -=
          (Math.floor(this.settings.slidesToShow / 2) -
            +(this.settings.slidesToShow % 2 === 0)) *
          this.widthSlide;
      }

      return this.settings.rtl ? marginX : -1 * marginX;
    },

    slidesCloned: function () {
      return (
        !this.settings.unagile && !this.settings.fade && this.settings.infinite
      );
    },

    slidesAll: function () {
      return this.slidesCloned
        ? [
            ...this.slidesClonedBefore,
            ...this.slides,
            ...this.slidesClonedAfter,
          ]
        : this.slides;
    },

    widthSlide: function () {
      return !this.settings.unagile
        ? this.widthContainer / this.settings.slidesToShow
        : "auto";
    },
  },

  mounted() {
    // Windows resize listener
    window.addEventListener("resize", this.getWidth, { passive: false });

    // Mouse and touch events
    this.$refs.track.addEventListener("touchstart", this.handleMouseDown, {
      passive: false,
    });
    this.$refs.track.addEventListener("touchend", this.handleMouseUp, {
      passive: false,
    });
    this.$refs.track.addEventListener("touchmove", this.handleMouseMove, {
      passive: false,
    });

    this.$refs.track.addEventListener("mousedown", this.handleMouseDown, {
      passive: false,
    });
    this.$refs.track.addEventListener("mouseup", this.handleMouseUp, {
      passive: false,
    });
    this.$refs.track.addEventListener("mousemove", this.handleMouseMove, {
      passive: false,
    });

    // Init
    this.isSSR = false;
    this.reload();
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.getWidth), { passive: false };

    this.$refs.track.removeEventListener("touchstart", this.handleMouseDown);
    this.$refs.track.removeEventListener("touchend", this.handleMouseUp);
    this.$refs.track.removeEventListener("touchmove", this.handleMouseMove);
    this.$refs.track.removeEventListener("mousedown", this.handleMouseDown);
    this.$refs.track.removeEventListener("mouseup", this.handleMouseUp);
    this.$refs.track.removeEventListener("mousemove", this.handleMouseMove);

    this.disableAutoPlay();
  },

  methods: {
    // Return current breakpoint
    getCurrentBreakpoint() {
      return this.currentBreakpoint;
    },

    getCurrentWidth() {
      return this.currentWidth;
    },

    // Return settings for current breakpoint
    getCurrentSettings() {
      return this.settings;
    },

    // Return current slide index
    getCurrentSlide() {
      return this.currentSlide;
    },

    // Return initial settings
    getInitialSettings() {
      return this.initialSettings;
    },

    // Go to slide
    goTo(n, transition = true, asNav = false) {
      // Break goTo() if unagile is active
      if (this.settings.unagile) {
        return false;
      }

      if (!asNav) {
        this.settings.asNavFor.forEach((carousel) => {
          if (carousel) {
            carousel.goTo(n, transition, true);
          }
        });
      }

      let slideNextReal = n;

      if (transition) {
        if (this.settings.infinite && n < 0) {
          slideNextReal = this.countSlides - 1;
        } else if (n >= this.countSlides) {
          slideNextReal = 0;
        }

        this.$emit("before-change", {
          currentSlide: this.currentSlide,
          nextSlide: slideNextReal,
        });

        this.currentSlide = slideNextReal;

        if (n !== slideNextReal) {
          setTimeout(() => {
            this.goTo(slideNextReal, false);
          }, this.settings.speed);
        }
      }

      let translateX = !this.settings.fade
        ? n * this.widthSlide * this.settings.slidesToScroll
        : 0;
      this.transitionDelay = transition ? this.speed : 0;

      if (
        this.infinite ||
        this.currentSlide + this.slidesToShow <= this.countSlides
      ) {
        this.translateX = this.settings.rtl ? translateX : -1 * translateX;
      }
    },

    showThumb(n) {
      //let path = '';
      let tags = this.$slots.default[n].children[0].children;
      for(let i = 0; i < tags.length; i++) {
        if(tags[i].tag === 'img') {
          //path = tags[i].data.attrs.src;
          //console.log('el: ', tags[i].data.attrs.src);
          return tags[i].data.attrs.src;
        }
      }
      //console.log('path: ', path);
      //return path;
      // return '<br>';
    },

    // Go to next slide
    goToNext() {
      if (this.canGoToNext) {
        this.goTo(this.currentSlide + 1);
      }
    },

    // Go to previous slide
    goToPrev() {
      if (this.canGoToPrev) {
        this.goTo(this.currentSlide - 1);
      }
    },

    // Reload carousel
    reload() {
      this.getWidth();
      this.prepareSlides();
      this.prepareCarousel();
      this.toggleFade();
      this.toggleAutoPlay();
    },
  },
};
</script>

<style>
.slider {
  position: relative;
  cursor: pointer;
}

.slider--ssr .slider__slides--cloned {
  display: none;
}

.slider--ssr .slider__slides > * {
  overflow: hidden;
  width: 0;
}

.slider--ssr .slider__slides > *:first-child {
  width: 100%;
}

.slider--rtl .slider__track,
.slider--rtl .slider__slides,
.slider--rtl .slider__actions,
.slider--rtl .slider__dots {
  flex-direction: row-reverse;
}

.slider:focus,
.slider:active,
.slider *:focus,
.slider *:active {
  outline: none;
}

.slider__list {
  display: block;
  overflow: hidden;
  position: relative;
  width: 100%;
}

.slider__track {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}

.slider__actions {
  position: absolute;
  bottom: 10%;
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.slider__nav-button {
  width: 56px;
  height: 80px;
}
.slider__nav-button {
  background: url("@/assets/images/icons/arrowSlider.svg") no-repeat center
    center;
  background-size: contain;
  border: none;
}
.slider__nav-button--next {
  margin-right: 30px;
}
.slider__nav-button--prev {
  margin-left: 30px;
  transform: rotate(180deg);
}
.slider--no-nav-buttons .slider__actions {
  justify-content: center;
}

.slider__slides {
  align-items: center;
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  flex-shrink: unset;
  flex-wrap: nowrap;
  justify-content: flex-start;
}

.slider--disabled .slider__slides {
  display: block;
  width: 100%;
}

.slider__slide {
  display: block;
  flex-grow: 1;
  flex-shrink: 0;
}

.slider__slide,
.slider__slide * {
  -webkit-user-drag: none;
}

.slider--fade .slider__slide {
  opacity: 0;
  position: relative;
  z-index: 0;
}

.slider--fade .slider__slide--active {
  opacity: 1;
  z-index: 2;
}

.slider--fade .slider__slide--expiring {
  opacity: 1;
  transition-duration: 0s;
  z-index: 1;
}

.slider__nav-button[disabled] {
  cursor: default;
}

.slider__dots {
  align-items: center;
  display: flex;
  list-style: none;
  padding: 0;
  white-space: nowrap;
  align-self: flex-end;
  gap: 5px;
}

.slider__dot button {
  cursor: pointer;
  display: block;
  font-size: 0;
  line-height: 0;
  border-radius: 50%;
  background: none;
  width: 15px;
  height: 15px;
  border: 1px solid #fff;
}
.slider__dot--current {
  background: #fff;
  border-radius: 50%;
}
</style>

