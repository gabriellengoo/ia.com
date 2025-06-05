<template>
    <div
      class="absolute border border-gray-500 bg-[#C0C0C0] shadow-xl"
      :style="{ top: `${position.y}px`, left: `${position.x}px`, width: `${width}px`, height: `${height}px`, zIndex: zIndex }"
      @mousedown="bringToFront"
    >
      <!-- Window Header -->
      <div
        class="flex items-center justify-between bg-[#000080] text-white px-2 py-1 cursor-move"
        @mousedown.prevent="startDrag"
      >
      <div class="flex items-center">
          <img v-if="logo" :src="logo" alt="Logo" class="w-auto pr-1 h-4" />
          <span class="text-sm font-semibold">{{ title }}</span>
      </div>
        <div class="flex space-x-1">
          <button class="w-4 h-4 taskbar-3d  border border-white text-white text-xs leading-none">_</button>
          <button class="w-4 h-4 taskbar-3d border border-white text-white text-xs leading-none">□</button>
          <button class="w-4 h-4 taskbar-3dcose bg-[#df3f3f] border border-white rounded-[.2vw] text-white text-xs leading-none" @click="closeWindow">X</button>
        </div>
      </div>
  
      <!-- Window Content -->
      <div class="p-2 overflow-auto h-full">
        <slot />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  
  const props = defineProps({
  title: String,
  logo: String, // ✅ add this line
  width: { type: Number, default: 300 },
  height: { type: Number, default: 200 },
  zIndex: { type: Number, default: 1 },
})

  
  const emit = defineEmits(['close'])
  
  const position = ref({ x: 100, y: 100 })
  let isDragging = false
  let dragOffset = { x: 0, y: 0 }
  
  function startDrag(event) {
    isDragging = true
    dragOffset.x = event.clientX - position.value.x
    dragOffset.y = event.clientY - position.value.y
    document.addEventListener('mousemove', onDrag)
    document.addEventListener('mouseup', stopDrag)
  }
  
  function onDrag(event) {
    if (isDragging) {
      position.value.x = event.clientX - dragOffset.x
      position.value.y = event.clientY - dragOffset.y
    }
  }
  
  function stopDrag() {
    isDragging = false
    document.removeEventListener('mousemove', onDrag)
    document.removeEventListener('mouseup', stopDrag)
  }
  
  function bringToFront() {
    // Implement z-index management if needed
  }
  
  function closeWindow() {
    emit('close')
  }
  </script>
  
  <style scoped>
  /* Add any additional styling here */
  </style>
  