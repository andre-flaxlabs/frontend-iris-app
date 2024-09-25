<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import MetaLogo from '@/assets/images/MetaLogo.svg'
import GoogleAdsLogo from '@/assets/images/GoogleAdsLogo.svg'

import TikTok from '@/assets/images/TikTok.svg'
import TableAlerts from '@/components/TableAlerts.vue'
import { ref } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { ArrowRight, ArrowLeft } from 'lucide-vue-next'
import { useAuth } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import api from '@/services/api'
import getQueryString from '@/utils/url'

const selectedCardFilter = ref<string | null>(null)
const filters = ref({
  ad_source: ''
})

const page = ref<{ next: string | null; previous: string | null }>({
  next: 'null',
  previous: 'null'
})

const authStore = useAuth()

const totalAlerts = ref<number>(0)
const currentRange = ref<string>('')
const itemsPerPage = ref<number>(0)
const offset = ref<number>(0)

const baseURL = import.meta.env.VITE_APP_BASE_URL

const alertsQuery = ref<string>('/alerts/?is_active=True')

const adsSourceAlertTotal = ref<Record<string, number>>({
  google_ads: 0,
  meta_ads: 0,
  tiktok: 0
})

async function fetchAlerts() {
  const url = alertsQuery.value
  console.log(url)
  try {
    const response = await api.get(url)

    const alerts = response.data
    console.log(alerts)
    updateAlertData(alerts)
    setAdsSourceAlertTotal()
    updateRangeDisplay()

    return alerts.results
  } catch (error) {
    console.error('Error fetching alerts:', error)
    throw error
  }
}

function setAdsSourceAlertTotal() {
  cardFilterBrand.value = cardFilterBrand.value.map((card) => {
    return {
      ...card,
      alerts: adsSourceAlertTotal.value[card.value as keyof typeof adsSourceAlertTotal.value] || 0
    }
  })
}

function updateAlertData(alerts: {
  links: { next: string | null; previous: string | null }
  page_size: number
  count: number
  offset: number
  google_ads_alert_count: number
  meta_ads_alert_count: number
  tik_tok_alert_count: number
}) {
  page.value.next = alerts.links.next
  page.value.previous = alerts.links.previous

  itemsPerPage.value = alerts.page_size
  totalAlerts.value = alerts.count
  offset.value = alerts.offset

  adsSourceAlertTotal.value.google_ads = alerts.google_ads_alert_count
  adsSourceAlertTotal.value.meta_ads = alerts.meta_ads_alert_count
  adsSourceAlertTotal.value.tiktok = alerts.tik_tok_alert_count
}

function updateRangeDisplay() {
  const start = offset.value + 1

  const end = Math.min(offset.value + itemsPerPage.value, totalAlerts.value)

  currentRange.value = `${start}-${end} of ${totalAlerts.value}`
}

const {
  data: alerts,
  isLoading,
  isError
} = useQuery({
  queryKey: ['ListAlerts', alertsQuery],
  queryFn: fetchAlerts
})

// async function fetchNotes() {
//   const url = notesQuery.value
//   console.log(url)

//   try {
//     const response = await fetch(url, {
//       method: 'GET',
//       headers: {
//       'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI0MzUzNTEwLCJpYXQiOjE3MjQyNjcxMTAsImp0aSI6IjI5NzZjNWY3OWY4OTRlYTE4MDA4YWM2OWQzMzQzOTVkIiwidXNlcl9pZCI6MTZ9.5amp8pJOW_s8isxS1dMJVkNE60PHTiR025eU4sGwz-M',
//     },

//     });
//     const notes = await response.json()
//     console.log(notes)
//     page.value.next = notes.next
//     page.value.previous = notes.previous
//     count.value = notes.count
//     return fakeData;
//   } catch (error) {
//     console.error('Error fetching notes:', error);
//     throw error;
//   }
// }

// const { data: notes, isLoading, isError, error } = useQuery({
//   queryKey: ['ListNotes', notesQuery],
//   queryFn: fetchNotes,
//   onSuccess: (data) => {
//     notes.value = data.results;
//     console.log(notes.value);
//   },
//   refetchInterval: 60000
// });

// function handleInputChange(event) {
//   const { name, value } = event.target;
//   filters.value = { ...filters.value, [name]: value };
// }

// function handleSelectChange(name, value) {
//   filters.value = { ...filters.value, [name]: value };
// }

async function handlePagination(value: string | null) {
  if (value) {
    const newUrl = value.replace('http', 'https')
    const newValue = newUrl.replace(baseURL, '')

    alertsQuery.value = newValue
  } else {
    return null
  }
}

const cardFilterBrand = ref([
  {
    image: GoogleAdsLogo,
    title: 'Google Ads',
    value: 'google_ads',
    alerts: 0
  },
  {
    image: MetaLogo,
    title: 'Meta Ads',
    value: 'meta_ads',
    alerts: 0
  },
  {
    image: TikTok,
    title: 'TikTok',
    value: 'tiktok',
    alerts: 0
  }
])

function handleCardClick(value: string) {
  if (selectedCardFilter.value === value) {
    // Deselect the card if it was already selected
    selectedCardFilter.value = null
    filters.value.ad_source = '' // Reset the filter
  } else {
    // Select the card and set the filter
    selectedCardFilter.value = value
    filters.value.ad_source = value
  }

  const queryString = new URLSearchParams(filters.value).toString()
  const url = `/alerts/?${queryString}&is_active=True`
  alertsQuery.value = url
}

// Computed property to filter data based on the selected card
// const filteredData = computed(() => {
//   if (!filters.value.ad_source) {
//     return fakeData
//   }
//   return fakeData.filter((item) => item.ad_source === filters.value.ad_source)
// })
</script>
<template>
  <DefaultLayout>
    <div class="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
      <!-- Card Filter Ads Source -->
      <div class="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6 xl:grid-cols-3 2xl:gap-8">
        <div
          v-for="(item, index) in cardFilterBrand"
          :key="index"
          @click="handleCardClick(item.value)"
          :class="{
            'bg-gray-100 text-black dark:bg-gray-900 dark:border-violet-600 dark:hover:bg-gray-700':
              selectedCardFilter === item.value,
            'bg-white text-black ': selectedCardFilter !== item.value
          }"
          class="block max-w-2xl p-6 border border-gray-200 rounded-sm shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 cursor-pointer"
        >
          <img :src="item.image" class="w-12 h-12 object-cover" />

          <div class="mt-4 flex items-end justify-between">
            <div>
              <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                {{ item.title }}
              </h5>
              <p class="font-normal text-gray-700 dark:text-gray-400">Total alerts:</p>
            </div>
            <span class="flex items-center gap-1 text-lg font-medium dark:text-white">
              {{ item.alerts }}</span
            >
          </div>
        </div>
      </div>
      <!-- Card Filter Ads Source -->

      <!-- Table Alerts  -->
      <div
        class="rounded-sm border my-4 border-gray-200 bg-white px-5 pt-6 pb-2 shadow-default mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10 dark:bg-gray-800 dark:border-gray-700 sm:px-7 xl:pb-1"
      >
        <h4 class="mb-6 text-xl font-semibold text-black dark:text-white">Alerts</h4>

        <TableAlerts :alerts="alerts" />

        <div
          class="flex items-center justify-between border-t border-zinc-200 p-4 dark:border-strokedark sm:px-6"
        >
          <p
            v-if="totalAlerts === 0"
            class="text-base font-medium text-zinc-500 dark:text-white md:text-lg"
          >
            No results found
          </p>
          <p v-else class="text-base font-medium text-zinc-500 dark:text-white md:text-lg">
            {{ currentRange }}
            <!-- 1-5 of {{ totalAlerts }} -->
          </p>

          <!-- Pagination -->
          <div class="flex items-center justify-end space-x-3">
            <button
              :disabled="!page.previous"
              :class="{ 'cursor-not-allowed opacity-50': !page.previous }"
              @click="handlePagination(page.previous)"
              :value="page.previous ?? ''"
              class="flex h-8 w-8 items-center justify-center rounded border border-zinc-200 bg-zinc-50 dark:bg-gray-950 dark:border-gray-700 hover:border-zinc-200 dark:hover:bg-violet-600 dark:hover:border-violet-600 hover:bg-violet-600 hover:text-white dark:hover:border-primary"
            >
              <ArrowLeft
                :size="20"
                class="text-zinc-500 hover:text-white dark:text-gray-300 dark:hover:text-white"
              />
            </button>
            <button
              :disabled="!page.next"
              @click="handlePagination(page.next)"
              :class="{ 'cursor-not-allowed opacity-50': !page.next }"
              :value="page.next ?? ''"
              class="flex h-8 w-8 items-center justify-center rounded border border-zinc-200 bg-zinc-50 dark:bg-gray-950 dark:border-gray-700 dark:hover:bg-violet-600 dark:hover:border-violet-600 hover:border-zinc-200 hover:bg-violet-600 hover:text-white dark:hover:border-primary"
            >
              <ArrowRight
                :size="20"
                class="text-zinc-500 hover:text-white dark:text-gray-300 dark:hover:text-white"
              />
            </button>
          </div>
          <!-- Pagination -->
        </div>
      </div>
    </div>

    <!-- Table Alerts -->
  </DefaultLayout>
</template>
