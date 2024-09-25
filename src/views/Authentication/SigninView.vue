<script setup lang="ts">
import api from '@/services/api'
import { useAuth } from '@/stores/auth'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { CircleX } from 'lucide-vue-next'

const auth = useAuth()

const user = reactive({
  email: '',
  password: ''
})

const router = useRouter()
const errorMessage = ref('')

async function signIn() {
  const { success, message } = await auth.login(user.email, user.password)
  if (success) {
    router.push('/')
  } else {
    errorMessage.value = message || 'Invalid username or password.'
  }
}
</script>
<template>
  <section class="bg-gray-50 dark:bg-gray-900">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a
        href="#"
        class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
      >
        <img class="w-10 h-10 mr-2" src="/favicon2.png" alt="logo" />
      </a>
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
          >
            Sign in to your account
          </h1>
          <div
            v-if="errorMessage"
            class="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <span class="flex-shrink-0 inline w-4 h-4 me-3">
              <CircleX :size="16" />
            </span>

            <div>
              <!-- <span class="font-medium">Error: </span> -->
              {{ errorMessage }}
            </div>
          </div>
          <form class="space-y-4 md:space-y-6" @submit.prevent="signIn">
            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Your email</label
              >
              <input
                v-model="user.email"
                type="text"
                name="email"
                id="email"
                class="bg-gray-50 border border-gray-200 text-gray-900 rounded-lg block w-full p-2.5 focus:outline-none focus:border-white focus:ring-1 focus:ring-violet-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                placeholder="name@flaxlabs.com"
              />
            </div>
            <div>
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Password</label
              >
              <input
                v-model="user.password"
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-200 text-gray-900 rounded-lg block w-full p-2.5 focus:outline-none focus:border-white focus:ring-1 focus:ring-violet-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
              />
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-start">
                <div class="flex items-center h-5">
                  <input
                    id="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-violet-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                  />
                </div>
                <div class="ml-3 text-sm">
                  <label for="remember" class="text-gray-500 dark:text-gray-300">Remember me</label>
                </div>
              </div>
              <a
                href="#"
                class="text-sm font-medium text-violet-600 hover:underline dark:text-primary-500"
                >Forgot password?</a
              >
            </div>
            <button
              type="submit"
              class="w-full text-white bg-violet-600 hover:bg-violet-700 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Sign in
            </button>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              Don’t have an account yet?
              <a
                href="/auth/signup"
                class="font-medium text-violet-600 hover:underline dark:text-primary-500"
                >Sign up</a
              >
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
