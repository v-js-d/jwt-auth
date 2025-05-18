<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <MyHeader/>
      </el-header>
      <el-main>
        <RouterView />
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
  import { RouterView } from 'vue-router'
  import MyHeader from '@/components/MyHeader.vue'
  import { useUserStore } from './stores/user'
  import { onMounted, watch, computed } from 'vue'
  import { useRouter } from 'vue-router'

  const authStore = useUserStore()
  const router = useRouter()
  const layout = computed(() => authStore.isAuth)

  onMounted(async () => {
    await authStore.checkAuth()
  })

  watch(() => layout.value,(isAuth: boolean) => {
    if (isAuth) {
      router.push('/default')
    } else {
      router.push('/auth')
    }
  })
</script>
