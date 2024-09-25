<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue'
// import CardsData from '@/components/CardsData.vue';
// import GoogleLogo from '@/assets/images/GoogleLogo.svg';
// import MetaLogo from "@/assets/images/MetaLogo.svg";
// import TikTok from "@/assets/images/TikTok.svg";
// import TableAlerts from '@/components/TableAlerts.vue';
// import { ref, computed } from 'vue';
// import { ArrowRight, ArrowLeft } from 'lucide-vue-next';

// const selectedCard = ref<string | null>(null);
// const filters = ref({
//   adsSource: '', // This will be used to filter by the selected ad source
//   relevance_level: '',
//   patient__user: '',
//   patient__user__is_active: '',
//   reference_date_after: '',
//   reference_date_before: '',
//   start_reference_date: '',
//   end_reference_date: '',
// });

// const page = ref({
//   next: 'null',
//   previous: 'null',
// });

// function handleSelectChange(name, value) {
//   filters.value = { ...filters.value, [name]: value };
// }

// async function handlePagination(value: string) {
//   console.log(value);
//   const url = value;
//   notesQuery.value = url.replace("http://127.0.0.1:8000", "");
// }

// const fakeData = [
//   {
//     id: '1',
//     adsSource: 'Google Ads',
//     customerName: 'The Hats Pro',
//     custumerCode: 'THP',
//     tracked_roas: "2.70",
//     breakeven_roas: "120.00",
//     roas_target: "1000.00",
//     title: 'Campaign 1001',
//     description: 'The TRACKED ROAS and BUDGET UTILIZATION are below the ROAS TARGET for 7 consecutive days.',
//     action: 'Lower ROAS TARGET by 15%, setting it to 297.5%',
//     campaignName: 'Summer Sale',
//     status: 'Active',
//     date: '2024-07-15',
//     link: 'https://ads.google.com/aw/overview?campaignId=20931446363&ocid=1383259875',
//   },
//   {
//     id: '2',
//     adsSource: 'Google Ads',
//     customerName: 'Store B',
//     custumerCode: 'BTH',
//     tracked_roas: "3.20",
//     breakeven_roas: "120.00",
//     roas_target: "950.00",
//     title: 'Campaign 1002',
//     description: 'The campaign has experienced a significant drop in performance metrics for the past week.',
//     action: 'Review and optimize ad creatives to improve engagement.',
//     campaignName: 'Winter Sale',
//     status: 'Active',
//     date: '2024-12-01',
//     link: 'https://ads.google.com/aw/overview?campaignId=20931446364&ocid=1383259876',
//   },
//   {
//     id: '3',
//     adsSource: 'Google Ads',
//     customerName: 'Store C',
//     custumerCode: 'CTH',
//     tracked_roas: "1.80",
//     breakeven_roas: "90.00",
//     roas_target: "1100.00",
//     title: 'Campaign 1003',
//     description: 'Click-through rates (CTR) have decreased by 20% compared to the previous month.',
//     action: 'Adjust bidding strategy to increase visibility.',
//     campaignName: 'Spring Offers',
//     status: 'Active',
//     date: '2024-03-22',
//     link: 'https://ads.google.com/aw/overview?campaignId=20931446365&ocid=1383259877',
//   },
//   {
//     id: '4',
//     adsSource: 'TikTok',
//     customerName: 'Brand X',
//     custumerCode: 'XTB',
//     tracked_roas: "2.50",
//     breakeven_roas: "110.00",
//     roas_target: "1020.00",
//     title: 'Campaign 2001',
//     description: 'Engagement rates have consistently declined over the past 10 days.',
//     action: 'Introduce new trends and content formats to re-engage the audience.',
//     campaignName: 'TikTok Trends',
//     status: 'Active',
//     date: '2024-08-10',
//     link: 'https://ads.tiktok.com/aw/overview?campaignId=20931446366&ocid=1383259878',
//   },
//   {
//     id: '5',
//     adsSource: 'TikTok',
//     customerName: 'Brand Y',
//     custumerCode: 'YTB',
//     tracked_roas: "1.90",
//     breakeven_roas: "95.00",
//     roas_target: "980.00",
//     title: 'Campaign 2002',
//     description: 'Video completion rates are below 50%, affecting overall campaign performance.',
//     action: 'Optimize video length and content to increase viewer retention.',
//     campaignName: 'Video Viral',
//     status: 'Inactive',
//     date: '2024-09-15',
//     link: 'https://ads.tiktok.com/aw/overview?campaignId=20931446367&ocid=1383259879',
//   },
//   {
//     id: '6',
//     adsSource: 'TikTok',
//     customerName: 'Brand Z',
//     custumerCode: 'ZTB',
//     tracked_roas: "2.20",
//     breakeven_roas: "105.00",
//     roas_target: "1005.00",
//     title: 'Campaign 2003',
//     description: 'TikTok-specific promotion has not met the expected conversion rates.',
//     action: 'Reevaluate targeting and adjust the promotion strategy.',
//     campaignName: 'TikTok Special',
//     status: 'Active',
//     date: '2024-11-01',
//     link: 'https://ads.tiktok.com/aw/overview?campaignId=20931446368&ocid=1383259880',
//   },
//   {
//     id: '7',
//     adsSource: 'Facebook Ads',
//     customerName: 'Company A',
//     custumerCode: 'AFC',
//     tracked_roas: "2.80",
//     breakeven_roas: "100.00",
//     roas_target: "1010.00",
//     title: 'Campaign 3001',
//     description: 'Targeted ads have seen a drop in engagement over the last two weeks.',
//     action: 'Refine audience targeting to better match user interests.',
//     campaignName: 'FB Growth',
//     status: 'Active',
//     date: '2024-06-20',
//     link: 'https://www.facebook.com/adsmanager/manage/campaigns?campaignId=20931446369',
//   },
//   {
//     id: '8',
//     adsSource: 'Facebook Ads',
//     customerName: 'Company B',
//     custumerCode: 'BFC',
//     tracked_roas: "2.00",
//     breakeven_roas: "115.00",
//     roas_target: "990.00",
//     title: 'Campaign 3002',
//     description: 'Holiday promotional ads are underperforming in key markets.',
//     action: 'Increase budget allocation to top-performing regions.',
//     campaignName: 'Holiday Special',
//     status: 'Inactive',
//     date: '2024-12-10',
//     link: 'https://www.facebook.com/adsmanager/manage/campaigns?campaignId=20931446370',
//   },
//   {
//     id: '9',
//     adsSource: 'Facebook Ads',
//     customerName: 'Company C',
//     custumerCode: 'CFC',
//     tracked_roas: "2.10",
//     breakeven_roas: "105.00",
//     roas_target: "980.00",
//     title: 'Campaign 3003',
//     description: 'Engagement with dynamic content is lower than expected.',
//     action: 'Experiment with different ad formats to boost interaction.',
//     campaignName: 'Dynamic Ads',
//     status: 'Active',
//     date: '2024-10-05',
//     link: 'https://www.facebook.com/adsmanager/manage/campaigns?campaignId=20931446371',
//   },
// ];

// const cardFilterBrand = ref([
//   {
//     image: GoogleLogo,
//     title: 'Google Ads',
//     alerts: 3,
//     value: 'Google Ads'
//   },
//   {
//     image: MetaLogo,
//     title: 'Facebook Ads',
//     alerts: 3,
//     value: 'Facebook Ads'
//   },
//   {
//     image: TikTok,
//     title: 'TikTok',
//     alerts: 3,
//     value: 'TikTok'
//   },
// ]);

// function handleCardClick(value: string) {
//   if (selectedCard.value === value) {
//     // Deselect the card if it was already selected
//     selectedCard.value = null;
//     filters.value.adsSource = ''; // Reset the filter
//   } else {
//     // Select the card and set the filter
//     selectedCard.value = value;
//     filters.value.adsSource = value;
//   }
// }

// // Computed property to filter data based on the selected card
// const filteredData = computed(() => {
//   if (!filters.value.adsSource) {
//     return fakeData;
//   }
//   return fakeData.filter(item => item.adsSource === filters.value.adsSource);
// });
</script>

<template>
  <DefaultLayout>
    <h3>Campaigns View</h3>
    <!-- <div class="mx-auto max-w-sreen-2xl p-4 md:p-6 2xl:p-10">
    <div class="flex felx-col gap-10">
    <div class="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1"><h4 class="mb-6 text-xl font-semibold text-black dark:text-white">Top Channels</h4><div class="flex flex-col"><div class="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5"><div class="p-2.5 xl:p-5"><h5 class="text-sm font-medium uppercase xsm:text-base">Source</h5></div><div class="p-2.5 text-center xl:p-5"><h5 class="text-sm font-medium uppercase xsm:text-base">Visitors</h5></div><div class="p-2.5 text-center xl:p-5"><h5 class="text-sm font-medium uppercase xsm:text-base">Revenues</h5></div><div class="hidden p-2.5 text-center sm:block xl:p-5"><h5 class="text-sm font-medium uppercase xsm:text-base">Sales</h5></div><div class="hidden p-2.5 text-center sm:block xl:p-5"><h5 class="text-sm font-medium uppercase xsm:text-base">Conversion</h5></div></div><div class="grid grid-cols-3 sm:grid-cols-5 border-b border-stroke dark:border-strokedark"><div class="flex items-center gap-3 p-2.5 xl:p-5"><div class="flex-shrink-0"><img src="data:image/svg+xml,%3csvg%20width='48'%20height='48'%20viewBox='0%200%2048%2048'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3ccircle%20cx='24'%20cy='24'%20r='24'%20fill='%23EEF0F2'/%3e%3cg%20clip-path='url(%23clip0_38_23844)'%3e%3cpath%20d='M36.0002%2024.2661C36.0147%2023.4411%2035.9278%2022.6174%2035.7414%2021.8128H24.2451V26.2661H30.9933C30.8655%2027.0469%2030.5778%2027.7943%2030.1476%2028.4634C29.7174%2029.1324%2029.1536%2029.7093%2028.49%2030.1593L28.4665%2030.3085L32.1016%2033.0681L32.3533%2033.0928C34.6661%2030.9994%2035.9997%2027.9193%2035.9997%2024.2661'%20fill='%234285F4'/%3e%3cpath%20d='M24.2449%2036C27.5509%2036%2030.3264%2034.9332%2032.3539%2033.0932L28.4898%2030.1597C27.4559%2030.8666%2026.0681%2031.36%2024.2449%2031.36C22.6965%2031.3511%2021.1902%2030.8646%2019.9398%2029.9695C18.6894%2029.0744%2017.7584%2027.8161%2017.2789%2026.3732L17.1354%2026.3852L13.3556%2029.2518L13.3062%2029.3865C14.3241%2031.3747%2015.8864%2033.0463%2017.8183%2034.2142C19.7502%2035.3822%2021.9755%2036.0005%2024.2454%2036'%20fill='%2334A853'/%3e%3cpath%20d='M17.2788%2026.3733C17.011%2025.6094%2016.8728%2024.8077%2016.8697%2024C16.8746%2023.1936%2017.0077%2022.393%2017.2642%2021.6267L17.2574%2021.4677L13.4312%2018.5549L13.3061%2018.6133C12.4473%2020.2842%2012%2022.129%2012%2023.9999C12%2025.8708%2012.4473%2027.7156%2013.3061%2029.3865L17.2788%2026.3733Z'%20fill='%23FBBC05'/%3e%3cpath%20d='M24.2449%2016.64C25.9995%2016.6133%2027.6964%2017.2537%2028.9796%2018.4267L32.4355%2015.12C30.219%2013.0822%2027.2838%2011.9642%2024.2449%2012C21.975%2011.9995%2019.7497%2012.6177%2017.8179%2013.7856C15.886%2014.9535%2014.3237%2016.625%2013.3057%2018.6132L17.2652%2021.6267C17.7495%2020.1841%2018.6836%2018.9268%2019.9358%2018.0321C21.1881%2017.1374%2022.6953%2016.6505%2024.2449%2016.64Z'%20fill='%23EB4335'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_38_23844'%3e%3crect%20width='24'%20height='24'%20fill='white'%20transform='translate(12%2012)'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e" alt="Brand"></div><p class="hidden text-black dark:text-white sm:block">Google</p></div><div class="flex items-center justify-center p-2.5 xl:p-5"><p class="text-black dark:text-white">3.5K</p></div><div class="flex items-center justify-center p-2.5 xl:p-5"><p class="text-meta-3">$5,768</p></div><div class="hidden items-center justify-center p-2.5 sm:flex xl:p-5"><p class="text-black dark:text-white">590</p></div><div class="hidden items-center justify-center p-2.5 sm:flex xl:p-5"><p class="text-meta-5">4.8%</p></div></div><div class="grid grid-cols-3 sm:grid-cols-5 border-b border-stroke dark:border-strokedark"><div class="flex items-center gap-3 p-2.5 xl:p-5"><div class="flex-shrink-0"><img src="data:image/svg+xml,%3csvg%20width='48'%20height='48'%20viewBox='0%200%2048%2048'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3ccircle%20cx='24'%20cy='24.0001'%20r='24'%20fill='%232B96F0'/%3e%3cpath%20d='M33.0375%2017.7376L34.4625%2015.9376C34.875%2015.4501%2034.9875%2015.0751%2035.025%2014.8876C33.9%2015.5626%2032.85%2015.7876%2032.175%2015.7876H31.9125L31.7625%2015.6376C30.8625%2014.8501%2029.7375%2014.4376%2028.5375%2014.4376C25.9125%2014.4376%2023.85%2016.6126%2023.85%2019.1251C23.85%2019.2751%2023.85%2019.5001%2023.8875%2019.6501L24%2020.4001L23.2125%2020.3626C18.4125%2020.2126%2014.475%2016.0876%2013.8375%2015.3751C12.7875%2017.2501%2013.3875%2019.0501%2014.025%2020.1751L15.3%2022.2751L13.275%2021.1501C13.3125%2022.7251%2013.9125%2023.9626%2015.075%2024.8626L16.0875%2025.6126L15.075%2026.0251C15.7125%2027.9376%2017.1375%2028.7251%2018.1875%2029.0251L19.575%2029.4001L18.2625%2030.3001C16.1625%2031.8001%2013.5375%2031.6876%2012.375%2031.5751C14.7375%2033.2251%2017.55%2033.6001%2019.5%2033.6001C20.9625%2033.6001%2022.05%2033.4501%2022.3125%2033.3376C32.8125%2030.8626%2033.3%2021.4876%2033.3%2019.6126V19.3501L33.525%2019.2001C34.8%2018.0001%2035.325%2017.3626%2035.625%2016.9876C35.5125%2017.0251%2035.3625%2017.1001%2035.2125%2017.1376L33.0375%2017.7376Z'%20fill='white'/%3e%3c/svg%3e" alt="Brand"></div><p class="hidden text-black dark:text-white sm:block">Twitter</p></div><div class="flex items-center justify-center p-2.5 xl:p-5"><p class="text-black dark:text-white">2.2K</p></div><div class="flex items-center justify-center p-2.5 xl:p-5"><p class="text-meta-3">$4,635</p></div><div class="hidden items-center justify-center p-2.5 sm:flex xl:p-5"><p class="text-black dark:text-white">467</p></div><div class="hidden items-center justify-center p-2.5 sm:flex xl:p-5"><p class="text-meta-5">4.3%</p></div></div><div class="grid grid-cols-3 sm:grid-cols-5 border-b border-stroke dark:border-strokedark"><div class="flex items-center gap-3 p-2.5 xl:p-5"><div class="flex-shrink-0"><img src="data:image/svg+xml,%3csvg%20width='48'%20height='48'%20viewBox='0%200%2048%2048'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3ccircle%20cx='24'%20cy='24.0001'%20r='24'%20fill='%23212529'/%3e%3cg%20clip-path='url(%23clip0_38_23867)'%3e%3cpath%20d='M24%2012.6751C17.625%2012.6751%2012.375%2017.8501%2012.375%2024.3001C12.375%2029.4001%2015.7125%2033.7501%2020.3625%2035.3251C20.9625%2035.4376%2021.15%2035.0626%2021.15%2034.8001C21.15%2034.5376%2021.15%2033.7876%2021.1125%2032.7751C17.8875%2033.5251%2017.2125%2031.2001%2017.2125%2031.2001C16.6875%2029.8876%2015.9%2029.5126%2015.9%2029.5126C14.85%2028.7626%2015.9375%2028.7626%2015.9375%2028.7626C17.1%2028.8001%2017.7375%2029.9626%2017.7375%2029.9626C18.75%2031.7626%2020.475%2031.2376%2021.1125%2030.9001C21.225%2030.1501%2021.525%2029.6251%2021.8625%2029.3251C19.3125%2029.0626%2016.575%2028.0501%2016.575%2023.6251C16.575%2022.3501%2017.0625%2021.3376%2017.775%2020.5501C17.6625%2020.2876%2017.25%2019.0876%2017.8875%2017.4751C17.8875%2017.4751%2018.9%2017.1751%2021.1125%2018.6751C22.05%2018.4126%2023.025%2018.2626%2024.0375%2018.2626C25.05%2018.2626%2026.0625%2018.3751%2026.9625%2018.6751C29.175%2017.2126%2030.15%2017.4751%2030.15%2017.4751C30.7875%2019.0501%2030.4125%2020.2876%2030.2625%2020.5501C31.0125%2021.3376%2031.4625%2022.3876%2031.4625%2023.6251C31.4625%2028.0501%2028.725%2029.0626%2026.175%2029.3251C26.5875%2029.7001%2026.9625%2030.4501%2026.9625%2031.5001C26.9625%2033.0751%2026.925%2034.3126%2026.925%2034.6876C26.925%2034.9876%2027.15%2035.3251%2027.7125%2035.2126C32.2875%2033.6751%2035.625%2029.3626%2035.625%2024.2251C35.5875%2017.8501%2030.375%2012.6751%2024%2012.6751Z'%20fill='white'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_38_23867'%3e%3crect%20width='24'%20height='24'%20fill='white'%20transform='translate(12%2012.0001)'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e" alt="Brand"></div><p class="hidden text-black dark:text-white sm:block">Github</p></div><div class="flex items-center justify-center p-2.5 xl:p-5"><p class="text-black dark:text-white">2.1K</p></div><div class="flex items-center justify-center p-2.5 xl:p-5"><p class="text-meta-3">$4,290</p></div><div class="hidden items-center justify-center p-2.5 sm:flex xl:p-5"><p class="text-black dark:text-white">420</p></div><div class="hidden items-center justify-center p-2.5 sm:flex xl:p-5"><p class="text-meta-5">3.7%</p></div></div><div class="grid grid-cols-3 sm:grid-cols-5 border-b border-stroke dark:border-strokedark"><div class="flex items-center gap-3 p-2.5 xl:p-5"><div class="flex-shrink-0"><img src="data:image/svg+xml,%3csvg%20width='48'%20height='48'%20viewBox='0%200%2048%2048'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3ccircle%20cx='24'%20cy='24.0002'%20r='24'%20fill='%234DC1FF'/%3e%3cpath%20d='M35.625%2018.6002C35.5125%2020.8877%2033.9375%2024.0002%2030.8625%2027.9377C27.7125%2032.0627%2025.0125%2034.1252%2022.8375%2034.1252C21.525%2034.1252%2020.3625%2032.9252%2019.3875%2030.3752C18.75%2028.1252%2018.1875%2025.8002%2017.5125%2023.4752C16.8375%2021.0002%2016.0875%2019.7252%2015.225%2019.7252C15.075%2019.7252%2014.4375%2020.1002%2013.3875%2020.8502L12.375%2019.3502C13.5375%2018.3377%2014.6625%2017.3252%2015.825%2016.2752C17.3625%2014.9627%2018.45%2014.2502%2019.275%2014.2127C21.075%2014.0627%2022.1625%2015.3377%2022.6125%2017.9252C23.025%2020.7752%2023.3625%2022.5752%2023.55%2023.2502C24.075%2025.6127%2024.675%2026.7752%2025.2375%2026.7752C25.725%2026.7752%2026.4375%2026.0252%2027.45%2024.4877C28.4625%2022.9502%2028.9125%2021.7502%2029.025%2020.9627C29.175%2019.6502%2028.6125%2018.9377%2027.45%2018.9377C26.925%2018.9377%2026.325%2019.0502%2025.7625%2019.3502C26.8875%2015.6002%2029.025%2013.7627%2032.25%2013.8377C34.6125%2013.9502%2035.7375%2015.5252%2035.625%2018.6002Z'%20fill='white'/%3e%3c/svg%3e" alt="Brand"></div><p class="hidden text-black dark:text-white sm:block">Vimeo</p></div><div class="flex items-center justify-center p-2.5 xl:p-5"><p class="text-black dark:text-white">1.5K</p></div><div class="flex items-center justify-center p-2.5 xl:p-5"><p class="text-meta-3">$3,580</p></div><div class="hidden items-center justify-center p-2.5 sm:flex xl:p-5"><p class="text-black dark:text-white">389</p></div><div class="hidden items-center justify-center p-2.5 sm:flex xl:p-5"><p class="text-meta-5">2.5%</p></div></div><div class="grid grid-cols-3 sm:grid-cols-5"><div class="flex items-center gap-3 p-2.5 xl:p-5"><div class="flex-shrink-0"><img src="data:image/svg+xml,%3csvg%20width='48'%20height='48'%20viewBox='0%200%2048%2048'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3ccircle%20cx='24'%20cy='24.0002'%20r='24'%20fill='%233162C9'/%3e%3cg%20clip-path='url(%23clip0_38_23887)'%3e%3cpath%20d='M25.789%2035.9983V25.0533H29.3269L29.8566%2020.7878H25.789V18.0645C25.789%2016.8295%2026.1192%2015.9879%2027.8248%2015.9879L30%2015.9868V12.1719C29.6236%2012.1201%2028.3325%2012.004%2026.8304%2012.004C23.6942%2012.004%2021.5471%2013.9917%2021.5471%2017.6422V20.7879H18V25.0534H21.547V35.9984L25.789%2035.9983Z'%20fill='white'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_38_23887'%3e%3crect%20width='12'%20height='24'%20fill='white'%20transform='translate(18%2012.0002)'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e" alt="Brand"></div><p class="hidden text-black dark:text-white sm:block">Facebook</p></div><div class="flex items-center justify-center p-2.5 xl:p-5"><p class="text-black dark:text-white">3.5K</p></div><div class="flex items-center justify-center p-2.5 xl:p-5"><p class="text-meta-3">$6,768</p></div><div class="hidden items-center justify-center p-2.5 sm:flex xl:p-5"><p class="text-black dark:text-white">390</p></div><div class="hidden items-center justify-center p-2.5 sm:flex xl:p-5"><p class="text-meta-5">4.2%</p></div></div></div></div>
  
  </div>
  </div> -->
    <!-- <div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-8">
      <div v-for="item, index in cardFilterBrand" 
        :key="index" 
        @click="handleCardClick(item.value)"
        :class="{
          'bg-gray-100 text-black dark:bg-gray-900 dark:border-violet-600 dark:hover:bg-gray-700': selectedCard === item.value,
          'bg-white text-black ': selectedCard !== item.value
        }"
        class="block max-w-sm p-6 border border-gray-200 rounded-sm shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 cursor-pointer"
      >
        <img :src="item.image" class="w-12 h-12 object-cover">
        <div class="mt-4 flex items-end justify-between">
          <div>
            <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">{{item.title}}</h5>
            <p class="font-normal text-gray-700 dark:text-gray-400">Total alerts:</p>
          </div>
          <span class="flex items-center gap-1 text-sm font-medium dark:text-white">
            {{ item.alerts }}
          </span>
        </div>
      </div>
    </div>
    
    <div class="my-4">
      <div class="h-full rounded-sm border border-md bg-white px-4 py-6 lg:px-8 dark:bg-gray-800 dark:border-gray-700 sm:px-8 xl:pb-1">
        <div class="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
          <div class="flex items-center justify-between space-y-2">
            <div>
              <h2 class="text-2xl font-semibold tracking-tight dark:text-white">Alerts</h2>
            </div>
          </div>

          <TableAlerts :notes="filteredData" />

          <div class="flex items-center justify-between border-t border-zinc-200 p-4 dark:border-strokedark sm:px-6">
            <p class="text-base font-medium text-zinc-500 dark:text-white md:text-lg">
              1-10 of {{ filteredData.length }}
            </p>
            <div class="flex items-center justify-end space-x-3">
              <button @click="handlePagination(page.previous)" :value="page.previous" class="flex h-8 w-8 items-center justify-center rounded border border-zinc-200 bg-zinc-50 dark:bg-gray-950 dark:border-gray-700 hover:border-zinc-200 dark:hover:bg-violet-600 dark:hover:border-violet-600 hover:bg-violet-600 hover:text-white dark:hover:border-primary">
                <ArrowLeft :size="20" class="text-zinc-500 hover:text-white dark:text-gray-300 dark:hover:text-white" />
              </button>
              <button @click="handlePagination(page.next)" :value="page.next" class="flex h-8 w-8 items-center justify-center rounded border border-zinc-200 bg-zinc-50 dark:bg-gray-950 dark:border-gray-700 dark:hover:bg-violet-600 dark:hover:border-violet-600 hover:border-zinc-200 hover:bg-violet-600 hover:text-white dark:hover:border-primary">
                <ArrowRight :size="20" class="text-zinc-500 hover:text-white dark:text-gray-300 dark:hover:text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div> -->
  </DefaultLayout>
</template>
