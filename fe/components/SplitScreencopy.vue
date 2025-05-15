<template>
    <div id="scroll-container">
        <!-- Left Side -->
        <div class="scroll-column left-side">
            <div class="scroll-track">
                <div class="scroll-content">
                    <div v-if="media?.mediaItems">
                        <div v-for="(item, i) in media.mediaItems" :key="i">
                            <!-- Check if it's an image -->
                            <img v-if="item.asset?.url" :src="item.asset.url" alt="Media image" />

                            <!-- Check if it's a Vimeo embed -->
                            <div v-else-if="item.vimeoUrl" class="video-wrapper" ref="videoWrappers">
                                <div class="video-inner">
                                    <iframe :src="item.vimeoUrl + '?autoplay=1&background=1&muted=1'" frameborder="0"
                                        allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
                                    <canvas class="mosaic-canvas"></canvas>
                                </div>
                            </div>


                        </div>
                    </div>

                </div>
                <!-- duplicate -->
                <div class="scroll-content">
                    <div v-if="media?.mediaItems">
                        <div v-for="(item, i) in media.mediaItems" :key="i">
                            <!-- Check if it's an image -->
                            <img v-if="item.asset?.url" :src="item.asset.url" alt="Media image" />

                            <!-- Check if it's a Vimeo embed -->
                            <div v-else-if="item.vimeoUrl" class="video-wrapper" ref="videoWrappers">
                                <div class="video-inner">
                                    <iframe :src="item.vimeoUrl + '?autoplay=1&background=1&muted=1'" frameborder="0"
                                        allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
                                    <canvas class="mosaic-canvas"></canvas>
                                </div>
                            </div>


                        </div>
                    </div>

                </div>
            </div>
        </div>

        <!-- Right Side -->
        <div class="scroll-column right-side">
            <div class="scroll-track">
                <div class="scroll-content">
                    <div v-if="media?.mediaItemsright">
                        <div v-for="(item, i) in media.mediaItemsright" :key="i">
                            <!-- Check if it's an image -->
                            <img v-if="item.asset?.url" :src="item.asset.url" alt="Media image" />

                            <!-- Check if it's a Vimeo embed -->
                            <div v-else-if="item.vimeoUrl" class="video-container">
                                <iframe :src="item.vimeoUrl" frameborder="0"
                                    allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="scroll-content">
                    <div v-if="media?.mediaItemsright">
                        <div v-for="(item, i) in media.mediaItemsright" :key="i">
                            <!-- Check if it's an image -->
                            <img v-if="item.asset?.url" :src="item.asset.url" alt="Media image" />

                            <!-- Check if it's a Vimeo embed -->
                            <div v-else-if="item.vimeoUrl" class="video-container">
                                <iframe :src="item.vimeoUrl" frameborder="0"
                                    allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, computed, nextTick } from 'vue'
import gsap from 'gsap'

const { data } = await useSanityQuery(`*[_type == "mediaContent"][0]{
  title,
  mediaItems[]{
    ...,
    asset->{
      url
    }
  },
  mediaItemsright[]{
    ...,
    asset->{
      url
    }
  }
}`)
const media = computed(() => data.value)



onMounted(async () => {

    await nextTick()

    const wrappers = document.querySelectorAll('.video-wrapper')

    wrappers.forEach(wrapper => {
    const canvas = wrapper.querySelector('canvas')
    const ctx = canvas.getContext('2d')

    // Resize canvas
    const resizeCanvas = () => {
      canvas.width = wrapper.offsetWidth
      canvas.height = wrapper.offsetHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Simulate pixel mosaic using rectangles
    const drawMosaic = () => {
      const width = canvas.width
      const height = canvas.height
      const blockSize = 30

      ctx.clearRect(0, 0, width, height)

      for (let y = 0; y < height; y += blockSize) {
        for (let x = 0; x < width; x += blockSize) {
          const r = Math.floor(255 * Math.random())
          const g = Math.floor(255 * Math.random())
          const b = Math.floor(255 * Math.random())
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.9)`
          ctx.fillRect(x, y, blockSize, blockSize)
        }
      }
    }

    drawMosaic()

    // Remove mosaic on hover
    wrapper.addEventListener('mouseenter', () => {
      canvas.style.opacity = 0
    })

    wrapper.addEventListener('mouseleave', () => {
      canvas.style.opacity = 1
      drawMosaic()
    })
  })

    const isMobile = window.matchMedia("(pointer: coarse)").matches;

    if (isMobile) {
        gsap.to(".left-side .scroll-track", {
            y: "-50%",
            duration: 30,
            ease: "none",
            repeat: -1,
        });

        gsap.set(".right-side .scroll-track", { y: "-50%" });
        gsap.to(".right-side .scroll-track", {
            y: "0%",
            duration: 30,
            ease: "none",
            repeat: -1,
        });
    } else {
        const leftTrack = document.querySelector(".left-side .scroll-track");
        const rightTrack = document.querySelector(".right-side .scroll-track");

        let currentLeft = 0;
        let currentRight = -leftTrack.offsetHeight / 2;

        window.addEventListener("wheel", (e) => {
            const delta = e.deltaY;

            currentLeft -= delta;
            currentRight += delta;

            const maxScroll = leftTrack.scrollHeight / 2;

            currentLeft = Math.max(-maxScroll, Math.min(0, currentLeft));
            currentRight = Math.max(-maxScroll, Math.min(0, currentRight));

            gsap.to(leftTrack, {
                y: currentLeft,
                duration: 0.5,
                ease: "power2.out",
            });

            gsap.to(rightTrack, {
                y: currentRight,
                duration: 0.5,
                ease: "power2.out",
            });
        });
    }
});
</script>


<style scoped>
#scroll-container {
    display: flex;
    height: 100vh;
    overflow: hidden;
}

.scroll-column {
    flex: 1;
    overflow: hidden;
    position: relative;
}

.left-side {
    /* background-color: lightblue; */
}

.right-side {
    /* background-color: lightcoral; */
}

.scroll-track {
    display: flex;
    flex-direction: column;
}

.scroll-content {
    display: flex;
    flex-direction: column;
}

video,
img {
    /* margin-bottom: 20px; */
    width: 100%;
    /* border: 2px solid #ccc; */
}

.video-container {
    position: relative;
    padding-top: 56.25%;
    width: 100%;
    height: 0;
    overflow: hidden;
}

.video-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0;
}

.video-container-wrapper {
    position: relative;
}

.pixel-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url('/pixel-overlay.png');
    /* Update path as needed */
    background-repeat: repeat;
    background-size: contain;
    pointer-events: none;
    opacity: 0.9;
    transition: opacity 0.3s ease;
    filter: blur(3px);
    mix-blend-mode: screen;
}

.video-container-wrapper:hover .pixel-overlay {
    opacity: 0;
}

.video-wrapper {
  position: relative;
  width: 100%;
  padding-top: 56.25%;
  overflow: hidden;
}

.video-inner {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
}

.video-inner iframe {
  width: 100%;
  height: 100%;
  border: none;
}

.mosaic-canvas {
  position: absolute;
  top: 0; left: 0;
  width: 100%;
  height: 100%;
  z-index: 3;
  pointer-events: none;
  transition: opacity 0.3s;
}

</style>