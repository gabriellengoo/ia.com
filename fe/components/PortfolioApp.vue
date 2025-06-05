<template>
    <!-- <div class="h-screen w-screen bg-[#0078D7] relative" > -->
    <!-- <div class="relative h-screen w-screen bg-cover bg-center overflow-hidden"
        style="background-image: url('/icons/msnlogo.png')"> -->
        <!-- /gifs/bg.jpg /gifs/y2k1.gif-->
        <div class="relative h-screen w-screen bg-cover bg-center overflow-hidden"
        style="background-image: url('/gifs/bg.jpg')">
        <MsnWindow v-for="(window, i) in openWindows" :key="i" :title="window.title" :url="window.url"
            :visible="window.visible" @close="closeWindow(i)" />

        <StartBar @openChat="showChat = true" @openSite="openSite" :blink-chat="blinkChat" />
        <ChatPopup v-if="showChat" @close="closeChat" />
    </div>
</template>

<script setup>
import MsnWindow from './MsnWindow.vue'
import StartBar from './StartBar.vue'
import ChatPopup from '@/components/ChatPopup.vue'

const showChat = ref(false)
const blinkChat = ref(false)

function openSite(site) {
  addWindow(site)
}



function closeSite(index) {
    openWindows.value.splice(index, 1)
}

function closeChat() {
    showChat.value = false
}

// Optional: simulate incoming message to trigger blink
onMounted(() => {
    setTimeout(() => {
        blinkChat.value = true
    }, 5000)
})



const openWindows = ref([])

function addWindow(site) {
    openWindows.value.push({ ...site, visible: true })
}

function closeWindow(index) {
    openWindows.value[index].visible = false
}
</script>