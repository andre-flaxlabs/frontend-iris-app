<script setup lang="ts">
import { ref, defineProps } from 'vue'
import GoogleLogo from '@/assets/images/GoogleLogo.svg'
import GoogleAdsLogo from '@/assets/images/GoogleAdsLogo.svg'
import MetaLogo from '@/assets/images/MetaLogo.svg'
import TikTok from '@/assets/images/TikTok.svg'
import { Target, Eye, CircleCheck, Search, MoveRight } from 'lucide-vue-next'
import ModalAlertDetails from './ModalAlertDetails.vue'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import api from '@/services/api'
import ModalConfirmation from './ModalConfirmation.vue'

export interface Alert {
  id: string
  ad_source: string
  campaign_id: number
  campaign_name: string
  title: string
  description: string
  metrics: Metrics[]
  actions: Actions[]
  reference_date: string
  closed_at: string
  created_at: string
  updated_at: string
  customer: Customer
  is_active: boolean
}

interface Actions {
  text: string
}

export interface Metrics {
  code: string
  alias: string
  rounded_value: string
}

export interface Customer {
  id: number
  code: string
  name: string
  google_ads_client_id: string
  breakeven_roas: string
  is_active: boolean
  created_at: string
}

const props = defineProps<{
  alerts: Alert[]
}>()

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'short',
  day: 'numeric'
})

const brandData = ref([
  {
    logo: GoogleAdsLogo,
    name: 'google_ads'
  },
  {
    logo: MetaLogo,
    name: 'Facebook Ads'
  },
  {
    logo: TikTok,
    name: 'TikTok'
  }
])

const queryClient = useQueryClient()

const { mutate: updateAlertStatus } = useMutation({
  mutationFn: (alertId: string) => {
    return api.patch(`/alerts/${alertId}/`, { is_active: false })
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['ListAlerts'] })
    selectedAlertId.value = null
  }
})

const isModalAlertDetailsOpen = ref(false)
const selectedAlert = ref<Alert | null>(null)

const openModalAlertDetails = (alert: Alert) => {
  selectedAlert.value = alert
  isModalAlertDetailsOpen.value = true
}

const closeModalAlertDetails = () => {
  isModalAlertDetailsOpen.value = false
  selectedAlert.value = null
}

const selectedAlertId = ref<string | null>(null)
const isModalDeactivateAlertOpen = ref(false)

const openModalDeactivateAlert = (alertId: string) => {
  selectedAlertId.value = alertId
  isModalDeactivateAlertOpen.value = true
}

const closeModalDeactivateAlert = () => {
  selectedAlertId.value = null
  isModalDeactivateAlertOpen.value = false
}

const getBrandLogo = (ad_source: string) => {
  const brand = brandData.value.find((brand) => brand.name === ad_source)
  return brand ? brand.logo : ''
}
</script>

<template>
  <table class="w-full mt-6 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead class="text-md text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th class=""></th>
        <th class="px-6 py-3 text-center font-medium uppercase">Source</th>
        <th class="px-6 py-3 text-center font-medium uppercase">Customer</th>
        <th class="px-6 py-3 text-center font-medium uppercase">Campaign</th>
        <th class="px-6 py-3 text-center font-medium uppercase">Action</th>
        <th class="px-6 py-3 text-center font-medium uppercase">Date</th>
        <th class="px-6 py-3 text-center font-medium uppercase"></th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="alert in alerts"
        :key="alert.id"
        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
      >
        <td class=""><Target :size="14" class="text-green-500 animate-pulse mr-2" /></td>

        <td class="flex items-center justify-center p-2 xl:p-5">
          <div class="flex-shrink-0">
            <img :src="getBrandLogo(alert.ad_source)" alt="Brand" class="w-10 h-10 object-cover" />
          </div>
        </td>

        <td class="px-6 py-4 items-center dark:text-gray-300">
          {{ alert.customer.name }} ({{ alert.customer.code }})
        </td>

        <td class="px-6 py-4 dark:text-gray-300">
          <div class="flex grid-cols-2 items-center justify-center">
            <!-- <a
              :href="alert.link"
              class="col-span-1 text-violet-600 hover:text-violet-800 cursor-pointer mr-2"
              target="_blank"
            >
              <SquareArrowOutUpRight :size="18" />
            </a> -->
            <span class="flex">
              {{ alert.campaign_name }}
            </span>
          </div>
        </td>

        <td class="px-6 py-4 dark:text-gray-300">
          <div class="flex items-center justify-center">
            <div>
              <Search
                @click="openModalAlertDetails(alert)"
                :size="18"
                class="text-violet-600 hover:text-violet-800 cursor-pointer mr-2"
              />
            </div>
            <div class="">
              {{ alert.title }}
            </div>
          </div>
        </td>
        <!-- <td class="px-6 py-4 dark:text-gray-300">
                    <div class="flex items-center">
                        <Target :size="14" class="text-violet-600 animate-pulse mr-2"/>
                        {{ note.status }}
                    </div>
                </td> -->
        <td class="px-1 py-4 dark:text-gray-300">
          {{ dateFormatter.format(new Date(alert.reference_date)) }}
        </td>
        <td class="px-6 py-4 dark:text-gray-300">
          <CircleCheck
            @click="openModalDeactivateAlert(alert.id)"
            :class="{
              'text-violet-600 hover:text-green-500 cursor-pointer': alert.is_active,
              'text-gray-400 cursor-not-allowed': !alert.is_active
            }"
          />
        </td>
      </tr>
    </tbody>
  </table>

  <ModalAlertDetails :isOpen="isModalAlertDetailsOpen" @close="closeModalAlertDetails">
    <template v-if="selectedAlert">
      <div class="flex items-center mb-3">
        <span
          class="bg-purple-100 text-violet-600 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-violet-600 border border-violet-400"
          >{{ selectedAlert.customer.code }}</span
        >
        <span
          class="bg-purple-100 text-violet-600 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-violet-600 border border-violet-400"
          >{{ selectedAlert.customer.name }}</span
        >
        <span
          class="bg-purple-100 text-violet-600 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-violet-600 border border-violet-400"
          >{{ selectedAlert.campaign_name }}</span
        >
      </div>
      <div v-if="selectedAlert.metrics.length > 0">
        <div v-for="(metric, index) in selectedAlert.metrics" :key="index" class="flex">
          <div class="mr-2 font-medium uppercase text-gray-700 dark:text-white">
            {{ metric.alias }}:
          </div>
          <div class="text-gray-500 dark:text-gray-300">{{ metric.rounded_value }}</div>
        </div>
      </div>
      <hr
        class="h-px my-4 bg-gradient-to-r from-purple-400 to-pink-600 border-0 dark:bg-gray-700"
      />
      <div>
        <div class="font-medium uppercase text-gray-700 dark:text-gray-400">Description:</div>
        <div class="text-gray-500 dark:text-gray-300">{{ selectedAlert.description }}</div>
      </div>

      <div class="mt-4 font-medium uppercase text-gray-700 dark:text-gray-400">Actions:</div>
      <div
        v-for="(action, index) in selectedAlert.actions"
        :key="index"
        class="text-gray-500 dark:text-gray-300 mb-2"
      >
        <div class="flex"><MoveRight class="mr-2 text-violet-600" /> {{ action.text }}</div>
      </div>
    </template>
  </ModalAlertDetails>
  <ModalConfirmation
    v-if="selectedAlertId"
    :isOpen="isModalDeactivateAlertOpen"
    :alert="selectedAlertId"
    @close="closeModalDeactivateAlert"
    @confirm="updateAlertStatus(selectedAlertId)"
  >
    <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
      <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900"
        >Deactivate alert</DialogTitle
      >
      <div class="mt-2">
        <p class="text-sm text-gray-500">Are you sure you want to deactivate this alert?</p>
      </div>
    </div>
  </ModalConfirmation>
</template>
