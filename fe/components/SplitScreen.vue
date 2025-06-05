<template>
    <div id="scroll-container">
        <!-- Left Side -->
        <div class="scroll-column left-side">
            <div class="scroll-track">
                <div class="scroll-content">
                    <div v-if="media?.mediaItems">
                        <div v-for="(item, i) in media.mediaItems" :key="i">
                            <img class="imgblur" v-if="item.type === 'image'" :src="item.asset.url" alt="Image" />

                            <div v-else-if="item.type === 'vimeo'" class="video-wrapper" ref="videoWrappers">
                                <div class="video-inner">
                                    <iframe :src="item.vimeoUrl + '?autoplay=1&background=1&muted=1'" frameborder="0"
                                        allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
                                    <img v-if="item.hoverImage?.url" :src="item.hoverImage.url" class="hover-mosaic" />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="scroll-content">
                    <div v-if="media?.mediaItems">
                        <div v-for="(item, i) in media.mediaItems" :key="i">
                            <img class="imgblur" v-if="item.type === 'image'" :src="item.asset.url" alt="Image" />

                            <div v-else-if="item.type === 'vimeo'" class="video-wrapper" ref="videoWrappers">
                                <div class="video-inner">
                                    <iframe :src="item.vimeoUrl + '?autoplay=1&background=1&muted=1'" frameborder="0"
                                        allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
                                    <img v-if="item.hoverImage?.url" :src="item.hoverImage.url" class="hover-mosaic" />
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


                    <div v-for="(item, i) in media.mediaItemsright" :key="i">
                        <img class="imgblur" v-if="item.type === 'image'" :src="item.asset.url" alt="Image" />

                        <div v-else-if="item.type === 'vimeo'" class="video-wrapper" ref="videoWrappers">
                            <div class="video-inner">
                                <iframe :src="item.vimeoUrl + '?autoplay=1&background=1&muted=1'" frameborder="0"
                                    allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
                                <img v-if="item.hoverImage?.url" :src="item.hoverImage.url" class="hover-mosaic" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="scroll-content">


                    <div v-for="(item, i) in media.mediaItemsright" :key="i">
                        <img class="imgblur" v-if="item.type === 'image'" :src="item.asset.url" alt="Image" />

                        <div v-else-if="item.type === 'vimeo'" class="video-wrapper" ref="videoWrappers">
                            <div class="video-inner">
                                <iframe :src="item.vimeoUrl + '?autoplay=1&background=1&muted=1'" frameborder="0"
                                    allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
                                <img v-if="item.hoverImage?.url" :src="item.hoverImage.url" class="hover-mosaic" />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>

    <!-- Flashing Image Layer -->
    <div class="flash-layer">
        <div v-for="(img, index) in flashImages" :key="index" class="flash-image">
            <img :src="img.src" />
        </div>
    </div>

    <h1
        class="tapmes fixed bottom-10 text-center w-full text-sm sm:text-lg text-white z-50 pointer-events-none animate-fade-in">
        The Internet Arcitect</h1>

</template>

<script setup>
import { ref, onMounted, computed, nextTick } from 'vue'
import gsap from 'gsap'

const { data } = await useSanityQuery(`*[_type == "mediaContent"][0]{
  title,
  mediaItems[]{
    ...,
    _type == "image" => {
      "type": "image",
      "asset": asset->{
        url
      }
    },
    _type == "vimeo" => {
      "type": "vimeo",
      vimeoUrl,
      "hoverImage": hoverImage.asset->{
        url
      }
    }
  },
  mediaItemsright[]{
    ...,
    _type == "image" => {
      "type": "image",
      "asset": asset->{
        url
      }
    },
    _type == "vimeo" => {
      "type": "vimeo",
      vimeoUrl,
      "hoverImage": hoverImage.asset->{
        url
      }
    }
  },
  flashImages[]{
    asset->{
      url
    }
  }
}`)


const media = computed(() => data.value)


const flashImages = ref([])





onMounted(async () => {

    flashImages.value = media.value.flashImages || []

    // Loop that randomly flashes an image
    setInterval(() => {
        if (!flashImages.value.length) return

        const index = Math.floor(Math.random() * flashImages.value.length)
        const imageUrl = flashImages.value[index].asset?.url




        const img = document.createElement('img')
        img.src = imageUrl
        img.style.position = 'fixed'
        img.style.zIndex = 9999
        img.style.opacity = 0
        img.style.pointerEvents = 'none'
        //   img.style.transition = 'opacity 0.3s ease'
        //   img.style.transform = `rotate(${Math.random() * 360}deg) scale(${0.5 + Math.random()})`
        img.style.width = '150px'
        img.style.transform = `scale(${2.5 + Math.random()})`

        // Random position
        img.style.top = `${Math.random() * window.innerHeight}px`
        img.style.left = `${Math.random() * window.innerWidth}px`

        document.body.appendChild(img)

        // Show and then remove
        requestAnimationFrame(() => {
            img.style.opacity = 1
        })

        setTimeout(() => {
            img.style.opacity = 0
            setTimeout(() => img.remove(), 300)
        }, 500) // stays for 500ms
    }, 2000) // new flash every 2 seconds


    await nextTick()


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

        gsap.set(leftTrack, { y: 0 });
        gsap.set(rightTrack, { y: -leftTrack.offsetHeight / 2 });


        window.addEventListener("wheel", (e) => {
            const delta = e.deltaY;

            currentLeft -= delta;
            currentRight += delta;

            const maxScroll = leftTrack.offsetHeight / 2;


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
.imgblur {
    filter: blur(5px);
    transition: filter 0.3s ease;
    /* filter: grayscale(1) blur(5px); */
}

.imgblur:hover {
    filter: blur(0px);
    /* filter: grayscale(0) blur(0px); */
    transition: filter 0.3s ease;
}

.tapmes {
    color: #d4d3c5;
    font-size: 1.5vw;
    font-weight: bold;
    text-align: center;
    /* Black outline using multiple shadows around the text */
    text-shadow:
        -1px -1px 0 #000,
        1px -1px 0 #000,
        -1px 1px 0 #000,
        1px 1px 0 #000,
        0 0 10px white,
        /* White glow */
        0 0 20px white;
    animation: glow 2s ease-in-out infinite alternate;
}

@keyframes glow {
    from {
        text-shadow:
            -1px -1px 0 #000,
            1px -1px 0 #000,
            -1px 1px 0 #000,
            1px 1px 0 #000,
            0 0 5px white;
    }

    to {
        text-shadow:
            -1px -1px 0 #000,
            1px -1px 0 #000,
            -1px 1px 0 #000,
            1px 1px 0 #000,
            0 0 15px white,
            0 0 30px white;
    }
}

.flash-layer {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    pointer-events: none;
    z-index: 1000;
}

.flash-image img {
    width: 100px;
    /* Adjust size */
    height: auto;
    opacity: 0;
    mix-blend-mode: screen;

}


.video-wrapper {
    aspect-ratio: 16 / 9;
}


.hover-image {
    width: 100%;
    height: auto;
    display: block;
    object-fit: cover;
}


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

/* .video-inner {
    filter: grayscale(1);
}

.video-inner:hover {
    filter: grayscale(0);
} */

.video-container-wrapper {
    position: relative;
}

.video-wrapper {
    position: relative;
    width: 100%;
    height: auto;
    overflow: hidden;
}

.video-inner {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.video-inner iframe {
    width: 100%;
    height: 100%;
    /* display: block;
    position: relative; */
    z-index: 1;
}

.hover-mosaic {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 2;
    transition: opacity 0.3s ease;
    pointer-events: none;
    /* So iframe hover still triggers */
}

.video-wrapper:hover .hover-mosaic {
    opacity: 0;
}
</style>