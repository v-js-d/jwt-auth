<template>
  <div class="grid grid-cols-1 gap-5">
    <h1 class="text-center">Пользователь авторизован {{ name }}</h1>
    <h2 class="text-center">
       {{
          authStore.user.isActivated
          ? 'Аккаунт активирован по почте'
          : 'Активируйте аккаунт по почте'
        }}
      </h2>

    <div>
      <el-button
       type="primary"
       @click="getUsers"
      >
        Get users
      </el-button>
    </div>

    <div v-if="users.length > 0">
      <pre>{{ users }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useUserStore } from '../stores/user'
  import { computed, ref } from 'vue'
  import type { IUser } from '../types/store/IUser'
  import UserApi from '../api/UserApi'

  const authStore = useUserStore()
  const name = computed(() => authStore.user.email)
  const users = ref<IUser[]>([])

  const getUsers = async () => {
    try {
      const response = await UserApi.fetchUsers()
      if (response.status === 200) {
        users.value = response.data
      }
    } catch (error) {
      console.log(error)
    }
  }
</script>
