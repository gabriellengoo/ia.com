<template>
    <Window title="MSN Messenger" class="overflow-hidden" :logo="'/icons/msnlogo.png'" :width="250" :height="200" @close="close">
      <div class="text-xs space-y-2 pb-[2vw] overflow-scroll">
        <div class="bg-white text-black p-1 border border-gray-300 rounded shadow">
          <!-- <b>💬 coolfriend:</b> hey are u online?? -->
          <b>💬 anman2001:</b> wanna go 2 see ndubz live??
        </div>
        <div class="bg-blue-200 text-black p-1 border border-blue-400 rounded shadow text-right">
          <b>me:</b> ya lol
        </div>
        <div class="bg-blue-200 text-black p-1 border border-blue-400 rounded shadow text-right">
          <b>me:</b> also got a new phone, bb curve ;p
        </div>
        <div class="bg-white text-black p-1 border border-gray-300 rounded shadow">
          <!-- <b>💬 coolfriend:</b> hey are u online?? -->
          <b>💬 anmang2001:</b> omd no way!!
        </div>
        <div class="bg-white text-black p-1 border border-gray-300 rounded shadow">
          <!-- <b>💬 coolfriend:</b> hey are u online?? -->
          <b>💬 niniugulalaxoxo:</b> i want pics on ur phone
        </div>
        <div class="bg-blue-200 text-black p-1 border border-blue-400 rounded shadow text-right">
          <b>me:</b> look!
          <img src="/me.jpg" class="w-auto h-[8vw] mr-2" />
          7oi36lnd0.jpg
        </div>
        <div class="bg-blue-200 text-black p-1 border border-blue-400 rounded shadow text-right">
          <b>me:</b> So ur just not gonna txt back yeah? Safe. :’( don’t bbm l8r xoxo
        </div>
        <div class="bg-blue-200 text-black p-1 border border-blue-400 rounded shadow text-right">
          <b>me:</b> hellooooo
        </div>
        <div class="bg-blue-200 text-black p-1 border border-blue-400 rounded shadow text-right">
          <b>me:</b> :((((((
        </div>
        <div class="bg-blue-200 text-black p-1 border border-blue-400 rounded shadow text-right">
          <b>me:</b> mums callin me for dinner away, g2g
        </div>
      </div>
    </Window>
  </template>
  
  <script setup>
  import Window from './Window.vue'
  const emit = defineEmits(['close'])
  const close = () => emit('close')
  </script>
  