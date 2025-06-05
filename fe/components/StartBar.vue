<template>
    <div
        class="fixed bottom-0 w-full  taskbar-3d  bg-blue-800 text-white flex items-center justify-between px-4 pl-0 py-0 text-sm">
        <div class="flex items-center">
            <div class="start-button flex bg-green-600 mr-2 rounded-r-[10px] items-center cursor-pointer hover:bg-green-700 transition duration-300"
                @click="toggleStart">
                <img src="/icons/msn-logo.webp" class="w-5 h-5 ml-2" />
                <button class=" px-2 py-1 ">View Sites</button>
            </div>
            <div v-if="showMenu" class="absolute bottom-10 left-4 bg-gray-200 text-black p-2 shadow">
                <div v-for="site in sites" :key="site.title" @click="open(site)"
                   class="cursor-pointer hover:bg-blue-100 px-2 py-1 flex items-center space-x-2">
                    <div v-html="getRandomCuteIcon()"></div>
                    <div>{{ site.title }}</div>
                </div>
            </div>
            <!-- <div class="flex items-center space-x-2"> -->
            <div :class="['px-2 py-1 text-sm border border-gray-600 flex', isBlinking ? 'bg-yellow-300' : 'bg-gray-200']"
                @click="openChat">
                <img src="/icons/msnlogo.png" class="w-5 h-5 mr-2" /> MSN Chat
            </div>
            <!-- </div> -->
        </div>

      <div class="flex items-center space-x-2">
        <div class="text-[.8vw]">© 2025 internetxarchitec</div>
        <img src="/icons/msnlogo.png" class="w-5 h-5 ml-2" />
        <!-- <div>{{ new Date().toLocaleTimeString() }}</div> -->
        <div>{{ currentTime }}</div>
      </div>
    </div>
</template>




<script setup>
const emit = defineEmits(['openSite', 'openChat'])
const isBlinking = ref(false)

const cuteIcons = [
  '💖', '🎀', '🧸', '🌸', '✨', '🦋', '💅', '🍒',
  '<img src="/gifs/y2k1.gif" class="inline w-4 h-4" />',
  '<img src="/gifs/y2k2.gif" class="inline w-4 h-4" />',
  '<img src="/gifs/y2k3.gif" class="inline w-4 h-4" />',
  '<img src="/gifs/y2k4.gif" class="inline w-4 h-4" />'
]


const props = defineProps({
    blinkChat: Boolean,
})

import { ref, onMounted, onBeforeUnmount } from 'vue';

const currentTime = ref(new Date().toLocaleTimeString());
let timer;

function getRandomCuteIcon() {
  return cuteIcons[Math.floor(Math.random() * cuteIcons.length)]
}


onMounted(() => {
  timer = setInterval(() => {
    currentTime.value = new Date().toLocaleTimeString();
  }, 1000);
});

onBeforeUnmount(() => {
  clearInterval(timer);
});

onMounted(() => {
    setInterval(() => {
        isBlinking.value = !isBlinking.value
    }, 700)
})

function openChat() {
    emit('openChat')
    isBlinking.value = false
    showChat.value = true
    playSound('/sounds/chat-open.wav')
}

const desktopIcons = [
    { title: 'Design', url: 'https://example.com', icon: '/icons/msnlogo.png' },
    { title: 'About Me', url: 'https://example2.com', icon: '/icons/msnlogo.png' },
]


const showMenu = ref(false)

const sites = [
    { title: 'https://www.palazzoeventi.com/', url: 'https://www.palazzoeventi.com/' },
    { title: 'https://www.henhouselondon.co.uk/', url: 'https://www.henhouselondon.co.uk/' },
    { title: 'https://www.andcoshop.com/', url: 'https://www.andcoshop.com/hometemp' },
    { title: 'meganpoem.vercel.app', url: 'meganpoem.vercel.app' },
    { title: 'https://www.alwaproduction.co.uk/', url: 'https://www.alwaproduction.co.uk/' },
    { title: 'https://tasc-ten.vercel.app/', url: 'https://tasc-ten.vercel.app/' },

]

function toggleStart() {
    showMenu.value = !showMenu.value
}

function open(site) {
    showMenu.value = false
    emit('openSite', site)
}
</script>