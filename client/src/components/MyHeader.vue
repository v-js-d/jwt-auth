<template>
  <nav class="flex items-center justify-between p-5">
    <RouterLink v-if="authStore.isAuth" to="/">Home</RouterLink>

    <el-button
      v-if="authStore.isAuth"
      type="primary"
      @click="logout"
    >
      Logout
    </el-button>
  </nav>
</template>

<script setup lang="ts">
  import { RouterLink } from 'vue-router'
  import { useUserStore } from '../stores/user'
  import { useRouter } from 'vue-router'

   const authStore = useUserStore()

   const router = useRouter()

   const logout = () => {
    authStore.logout()
    router.push('/auth')
   }
</script>
