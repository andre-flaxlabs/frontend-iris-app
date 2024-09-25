<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useAuth } from './stores/auth'

const auth = useAuth()
</script>

<template>
  <header>
    <div class="wrapper"></div>
  </header>

  <RouterView />
</template>
