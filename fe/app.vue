<template>
  <div>
    <!-- <NuxtRouteAnnouncer />
    <NuxtWelcome /> -->
    <!-- <SplitScreen /> -->

    <Window v-if="showSpotify" title="🎵 Spotify Player" :width="500" :height="150" @close="showSpotify = false">
    <iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/3MhEFRPMJYjJEoL6fEJupW?utm_source=generator&theme=0" width="100%" height="102" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
  </Window>
    <PortfolioApp />
  </div>
</template>

<script setup>

import PortfolioApp from '~/components/PortfolioApp.vue';
import Window from '@/components/Window.vue'


const showSpotify = ref(true)
</script>


