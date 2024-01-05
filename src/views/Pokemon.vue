<template>
  <Notifications />
  <section>
    <h1 class="sm:text-3xl text-2xl text-center pt-10 sm:pb-20 pb-10">
      Pokemons
      <span class="text-center">{{ store.counts }}</span>
    </h1>
    <div
      v-if="pokemons"
      class="card grid sm:grid-cols-2 grid-cols-1 gap-10 pb-10"
    >
      <router-link
        v-for="(pokemon, index) in pokemons"
        v-bind:key="index"
        v-bind:to="`/pokemon/pokemon-detail/${extractPokemonIdFromUrl(
          pokemon.url,
        )}`"
        class="card px-20 py-6 border-2 rounded-md cursor-pointer hover:bg-gray-100 transition-all duration-150"
      >
        <span class="text-xl text-gray-600">
          {{ pokemon?.name }} <br />
          {{ extractPokemonIdFromUrl(pokemon?.url) }}
        </span>
      </router-link>
    </div>
    <div v-else>Loading...</div>
    <div
      class="backdrop-blur-sm bg-white/30 fixed bottom-0 sm:right-60 right-0 p-6"
    >
      <button
        v-bind:class="{ 'cursor-not-allowed': store.offset === 0 }"
        class="px-6 py-2 bg-gray-700 hover:bg-gray-500 text-white rounded-md mr-4"
        v-bind:disabled="!store.previous"
        v-on:click="loadPrevious"
      >
        {{ '<<' }} Prev
      </button>
      <button
        class="px-6 py-2 bg-gray-700 hover:bg-gray-500 text-white rounded-md"
        v-bind:disabled="!store.next"
        v-on:click="loadNext"
      >
        Next {{ '>>' }}
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import usePokemonStore from '../store/pokemon'
import Notifications from '../components/Notifications.vue'

const store = usePokemonStore()

const pokemons = ref(store.allPokemons || [])

onMounted(() => {
  store.fetchPokemons()
  pokemons.value = store.allPokemons
})

watch(
  () => store.allPokemons,
  () => {
    pokemons.value = store.allPokemons
  },
)

const extractPokemonIdFromUrl = (url: string): string => {
  const segments = url.split('/').filter(Boolean)

  // am getting the last segment here since the returned data posses no individual ID's
  return segments[segments.length - 1]
}

const loadNext = async () => {
  await store.fetchNext()
}

const loadPrevious = async () => {
  await store.fetchPrevious()
}
</script>
