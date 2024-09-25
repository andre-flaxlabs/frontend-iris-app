<script setup lang="ts">
import { ref, watch } from 'vue'
import { PackagePlus } from 'lucide-vue-next'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { useForm, useField } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as zod from 'zod'
import api from '@/services/api'

export interface Customer {
  id: string
  code: string
  shopify_store: string
  shopify_store_slug: string
  name: string
  google_ads_client_id: string
  breakeven_roas: string
  is_active: boolean
}

// Props and emits
const props = defineProps<{ isOpen: boolean; customer: Customer | null }>()
const emit = defineEmits(['close'])

// Function to close the modal
const closeModal = () => {
  resetForm()
  emit('close')
}

// Schema form validation
const validationSchema = toTypedSchema(
  zod.object({
    name: zod.string().min(1, { message: 'Name of customer is required' }).nullable(),
    code: zod
      .string()
      .min(1, { message: 'Code of customer is required' })
      .max(10, { message: 'Must have less than 10 characters' }),
    shopify_store: zod.string(),
    shopify_store_slug: zod.string(),
    google_ads_client_id: zod.string().optional().nullable(),
    breakeven_roas: zod.string().nullable().optional(),
    is_active: zod.boolean().default(true)
  })
)

const { handleSubmit, errors, values, resetForm } = useForm({
  validationSchema
})

// Accessing individual form fields
const { value: name } = useField('name')
const { value: code } = useField('code')
const { value: shopify_store } = useField('shopify_store')
const { value: shopify_store_slug } = useField('shopify_store_slug')
const { value: google_ads_client_id } = useField('google_ads_client_id')
const { value: breakeven_roas } = useField('breakeven_roas')
const { value: is_active } = useField('is_active')

// Sync form data with props.customer
watch(
  () => props.customer,
  (newCustomer) => {
    if (newCustomer) {
      name.value = newCustomer.name
      code.value = newCustomer.code
      shopify_store.value = newCustomer.shopify_store
      shopify_store_slug.value = newCustomer.shopify_store_slug
      google_ads_client_id.value = newCustomer.google_ads_client_id
      breakeven_roas.value = newCustomer.breakeven_roas
      is_active.value = newCustomer.is_active
    }
  },
  { immediate: true }
)

// Query Client for mutation
const queryClient = useQueryClient()

// Mutation function to update customer
const { mutate: updateCustomer } = useMutation({
  mutationFn: (formData: Record<string, any>) => {
    return api.patch(`/customers/${formData.id}/`, formData)
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['ListCustomers'] })
  }
})

// Form submission handler
const onSubmit = handleSubmit((formData) => {
  updateCustomer({ ...formData, id: props.customer?.id })
  closeModal()
})
</script>
<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
  >
    <div class="relative bg-white dark:bg-gray-800 rounded-lg p-8 w-full max-w-2xl">
      <div class="flex justify-between items-start pb-3">
        <div class="text-center w-full">
          <div class="inline-block mx-auto mb-3">
            <span class="flex justify-center items-center">
              <svg
                width="60"
                height="60"
                viewBox="0 0 60 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect opacity="0.1" width="60" height="60" rx="30" fill="#7c3aed"></rect>
              </svg>
              <!-- Lucide Icon -->
              <PackagePlus
                class="absolute"
                :size="32"
                stroke="#7c3aed"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </span>
          </div>
          <h3 class="mt-3 pb-2 text-xl font-semibold text-black dark:text-white sm:text-2xl">
            Edit Customer
          </h3>
          <span
            class="mx-auto mb-6 inline-block h-1 w-23 rounded bg-violet-600 text-white dark:text-gray-800"
          >
            ---------
          </span>
        </div>
        <button
          @click="closeModal"
          class="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
        >
          ✕
        </button>
      </div>

      <form @submit.prevent="onSubmit">
        <div class="flex space-x-4 mb-4">
          <div class="w-2/3">
            <label class="block mb-2.5 text-sm font-medium text-gray-700 dark:text-white"
              >Name</label
            >
            <input
              v-model="name"
              type="text"
              class="w-full rounded-lg border border-gray-200 py-3 px-4 focus:outline-none focus:border-white focus:ring-1 focus:ring-violet-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
            />
            <span class="text-red-500">{{ errors.name }}</span>
          </div>
          <div class="w-1/3">
            <label class="block mb-2.5 text-sm font-medium text-gray-700 dark:text-white"
              >Code</label
            >
            <input
              v-model="code"
              type="text"
              class="w-full rounded-lg border border-gray-200 py-3 px-4 focus:outline-none focus:border-white focus:ring-1 focus:ring-violet-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
            />
            <span class="text-red-500">{{ errors.code }}</span>
          </div>
        </div>

        <div class="flex space-x-4 mb-4">
          <div class="w-2/4">
            <label class="block mb-2.5 text-sm font-medium text-gray-700 dark:text-white"
              >Shopify Store</label
            >
            <input
              v-model="shopify_store"
              placeholder="Shopify Store Name"
              type="text"
              class="w-full rounded-lg border border-gray-200 py-3 px-4 focus:outline-none focus:border-white focus:ring-1 focus:ring-violet-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
            />
            <span class="text-red-500 text-sm">{{ errors.name }}</span>
          </div>
          <div class="w-2/4">
            <label class="block mb-2.5 text-sm font-medium text-gray-700 dark:text-white"
              >Shopify Store Slug</label
            >
            <input
              v-model="shopify_store_slug"
              placeholder="ABC"
              type="text"
              class="w-full rounded-lg border border-gray-200 py-3 px-4 focus:outline-none focus:border-white focus:ring-1 focus:ring-violet-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
            />
            <span class="text-red-500 text-sm">{{ errors.code }}</span>
          </div>
        </div>

        <div class="mb-4">
          <label class="block mb-2.5 text-sm font-medium text-gray-700 dark:text-white"
            >Google Ads Client ID</label
          >
          <input
            v-model="google_ads_client_id"
            type="text"
            class="w-full rounded-lg border border-gray-200 py-3 px-4 focus:outline-none focus:border-white focus:ring-1 focus:ring-violet-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
          />
          <span class="text-red-500">{{ errors.google_ads_client_id }}</span>
        </div>

        <div class="mb-4">
          <label class="block mb-2.5 text-sm font-medium text-gray-700 dark:text-white"
            >Breakeven ROAS</label
          >
          <input
            v-model="breakeven_roas"
            type="text"
            class="w-full rounded-lg border border-gray-200 py-3 px-4 focus:outline-none focus:border-white focus:ring-1 focus:ring-violet-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
          />
          <span class="text-red-500">{{ errors.breakeven_roas }}</span>
        </div>

        <div class="mb-6 flex items-center">
          <input
            v-model="is_active"
            type="checkbox"
            class="h-4 w-4 rounded border-gray-300 accent-violet-600 text-violet-600 focus:ring-violet-600"
          />
          <label class="ml-2 block text-sm font-medium text-gray-700 dark:text-white">Active</label>
        </div>

        <div class="flex justify-end">
          <button
            type="button"
            @click="closeModal"
            class="mr-4 bg-gray-500 text-sm text-white px-4 py-2 rounded-md hover:bg-gray-600 dark:hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="bg-violet-600 text-white text-sm px-4 py-2 rounded-md hover:bg-violet-700 dark:hover:bg-violet-700"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
