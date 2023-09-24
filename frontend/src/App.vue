<template>
  <div>
    <nav>
      <RouterLink to="/">User List</RouterLink> | 
      <RouterLink to="/add">Add User</RouterLink>
    </nav>
    <RouterView/>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<style scoped>
nav {
  margin-bottom: 20px;
}
</style>
