<template>
  <el-card style="max-width: 600px">
    <div class="flex justify-between items-center">
      <h2>{{ isLogin ? 'Login' : 'Register' }}</h2>
      <el-button @click="switchForm">
        {{ isLogin ? 'Register' : 'Login' }}
      </el-button>
    </div>

    <el-form
      :model="form"
      size="large"
      label-position="top"
      style="max-width: 600px"
    >
      <el-form-item label="Email" prop="email">
        <el-input v-model="form.email" />
      </el-form-item>

      <el-form-item label="Password" prop="password">
        <el-input v-model="form.password" />
      </el-form-item>

      <el-form-item>
        <el-button v-if="isLogin" type="primary" @click="onSubmit('login')">
          Login
        </el-button>

        <el-button v-else type="primary" @click="onSubmit('register')">
          Register
        </el-button>

        <el-button @click="clearForm">
          Cancel
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue'
  import { useUserStore } from '../stores/user'
  import { useRouter } from 'vue-router'

  const authStore = useUserStore()
  const router = useRouter()
  const isLogin = ref<boolean>(true)
  const form = reactive({
    email: '',
    password: ''
  })

  const switchForm = () => {
    isLogin.value = !isLogin.value
  }

  const clearForm = () => {
    form.email = ''
    form.password = ''
  }

  const onSubmit = async (state: 'login' | 'register') => {
    const { email, password } = form
    if (state === 'login') {
      await authStore.login({ email, password })
    } else {
      await authStore.registration({ email, password })
    }

    if (authStore.isAuth) {
      await router.push('/');
    }
  }
</script>
