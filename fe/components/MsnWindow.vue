<template>
  <div v-if="visible" class="absolute border border-gray-700 bg-gray-100 w-[60vw] h-[60vh] shadow-xl z-50"
    :style="{ top: top + 'px', left: left + 'px' }">
    <div class="flex items-center justify-between bg-[#dd7daf] text-white px-2 py-1 cursor-move" @mousedown="startDrag">
      <div class="flex items-center">
        <img src="https://win98icons.alexmeub.com/icons/png/msie1-4.png" alt="Logo" class="w-auto pr-1 h-4" />
        <span class="text-sm font-semibold">{{ title }}</span>
      </div>
      <!-- ✨ Sparkles in 4 corners -->
      <div v-if="visible" class="absolute z-40 pointer-events-none sparkle-container"
        :style="{  width: '60vw', height: '70vh' }">
        <!-- Top Left -->
        <img src="/gifs/sparkle.gif" class="sparkle sparkle-top-left" />
        <!-- Top Right -->
        <img src="/gifs/sparkle.gif" class="sparkle sparkle-top-right" />
        <!-- Bottom Left -->
        <img src="/gifs/sparkle.gif" class="sparkle sparkle-bottom-left" />
        <!-- Bottom Right -->
        <img src="/gifs/sparkle.gif" class="sparkle sparkle-bottom-right" />
      </div>

      <div class="flex space-x-1">
        <button class="w-4 h-4 taskbar-3d  border border-white text-white text-xs leading-none">_</button>
        <button class="w-4 h-4 taskbar-3d border border-white text-white text-xs leading-none">□</button>
        <button
          class="w-4 h-4 taskbar-3dcose bg-[#df3f3f] border border-white rounded-[.2vw] text-white text-xs leading-none"
          @click="closeWindow">X</button>
      </div>
    </div>
    <div class="h-full bg-white p-2 overflow-hidden">
      <iframe :src="url" class="w-full h-4/5 border mb-2"></iframe>
      <a :href="url" target="_blank" class="underline text-blue-600">View site externally</a>
      <p class="text-xs">site made with .. </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps(['title', 'url', 'visible'])
const emit = defineEmits(['close'])

let top = ref(100)
let left = ref(100)
let isDragging = false
let offset = { x: 0, y: 0 }

function startDrag(e) {
  isDragging = true
  offset.x = e.clientX - left.value
  offset.y = e.clientY - top.value
  document.addEventListener('mousemove', drag)
  document.addEventListener('mouseup', stopDrag)
}

function drag(e) {
  if (isDragging) {
    left.value = e.clientX - offset.x
    top.value = e.clientY - offset.y
  }
}

function stopDrag() {
  isDragging = false
  document.removeEventListener('mousemove', drag)
  document.removeEventListener('mouseup', stopDrag)
}

function close() {
  emit('close')
}
</script>