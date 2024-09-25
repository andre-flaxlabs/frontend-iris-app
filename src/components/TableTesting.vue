<script setup>
import { ref } from 'vue';
import { useQuery } from '@tanstack/vue-query';


const filters = ref({
  type: '',
  relevance_level: '',
  patient__user: '',
  patient__user__is_active: '',
  reference_date_after: '',
  reference_date_before: '',
  start_reference_date: '',
  end_reference_date: '',
});

async function fetchNotes() {
  console.log(filters.value)
  const queryString = new URLSearchParams(filters.value).toString();
  const url = `/api/notes/?${queryString}`;
  try {
    const response = await fetch(url, {
      method: 'GET',
      
      headers: {
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzIzNjY3ODMwLCJpYXQiOjE3MjM1ODE0MzAsImp0aSI6ImFmMjBlZDg0ZDk0ZDRkZDg5NzViMzQ0ODdhZDVkYjdhIiwidXNlcl9pZCI6MTZ9.8jyZ3viLUXJ2qYG48lzvZZlh3AIWFXM_2xkqvwZub_M',
    },
    
    });
    const notes = await response.json()
    console.log(notes)
    return notes.results;
  } catch (error) {
    console.error('Error fetching notes:', error);
    throw error;
  }
}

const { data: notes, isLoading, isError, error } = useQuery({
  queryKey: ['ListNotes', filters],
  queryFn: fetchNotes,
  onSuccess: (data) => {
    notes.value = data.results;
    console.log(notes.value);
  },
});

function handleInputChange(event) {
  const { name, value } = event.target;
  filters.value = { ...filters.value, [name]: value };
}

function handleSelectChange(name, value) {
  filters.value = { ...filters.value, [name]: value };
}

const dateFormatter = new Intl.DateTimeFormat('pt-BR');
</script>

<template>
  <div class="h-full px-4 py-6 lg:px-8">
    <div class="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div class="flex items-center justify-between space-y-2">
        <div>
          <h2 class="text-2xl font-bold tracking-tight">Notas de Pacientes</h2>
          <p class="text-muted-foreground">Aqui estão as notas dos seus pacientes</p>
        </div>
        <div class="flex items-center space-x-2">
          <!-- AddNoteButton component or any button for adding notes -->
        </div>
      </div>
      <div>
        <div class="flex items-center justify-between">
          <div class="flex flex-1 items-center space-x-2">
            <select @change="handleSelectChange('type', $event.target.value)" class="w-[180px]">
              <option value="">Tipo</option>
              <option value="S">Compartilhado</option>
              <option value="N">Privado</option>
            </select>

            <select @change="handleSelectChange('relevance_level', $event.target.value)" class="w-[180px]">
              <option value="">Relevância</option>
              <option value="H">Alta</option>
              <option value="M">Média</option>
              <option value="L">Baixa</option>
            </select>
          </div>
        </div>

        <table class="w-full mt-6 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th class="px-6 py-3">Paciente</th>
              <th class="px-6 py-3">Título</th>
              <th class="px-6 py-3">Tipo</th>
              <th class="px-6 py-3">Relevância</th>
              <th class="px-6 py-3">Data</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="note in notes" :key="note.id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {{ note.patient.user.first_name }} {{ note.patient.user.last_name }}
              </th>
              <td class="px-6 py-4">{{ note.title }}</td>
              <td class="px-6 py-4">{{ note.type }}</td>
              <td class="px-6 py-4">{{ note.relevance_level }}</td>
              <td class="px-6 py-4">{{ dateFormatter.format(new Date(note.reference_date)) }}</td>
            </tr>
          </tbody>
        </table>

        <div v-if="isLoading" class="text-center">Loading...</div>
        <div v-if="isError" class="text-center text-red-500">{{ error.message }}</div>
      </div>
    </div>
  </div>
</template>