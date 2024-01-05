<template>
  <Notifications />
  <div>
    <h1 class="sm:text-3xl text-2xl text-center pt-10 sm:pb-10 pb-5">
      Pokemon Detail
    </h1>
    <router-link
      to="/pokemon"
      class="absolute sm:top-24 top-20 sm:left-10 left-4"
      >{{ '<<' }} Go Back</router-link
    >
    <div v-if="pokemon" class="text-left max-w-[600px] mx-4 sm:text-lg pb-20">
      <h2 class="capitalize">
        <span class="font-semibold">Name:</span> {{ pokemon?.name }}
      </h2>
      <p><span class="font-semibold">Height</span>: {{ pokemon?.height }}</p>
      <p><span class="font-semibold">Weight</span>: {{ pokemon?.weight }}</p>
      <p><span class="font-semibold">Order</span>: {{ pokemon?.order }}</p>
      <p>
        <span class="font-semibold">Base exxperience</span>:
        {{ pokemon?.base_experience }}
      </p>
      <p>
        <span class="font-semibold">Abilities</span>: {{ displayAbilities() }}
      </p>
      <p><span class="font-semibold">Moves</span>: {{ displayMoves() }}</p>
    </div>
    <div v-else>Loading...</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import usePokemonStore from '../store/pokemon'
import Notifications from '../components/Notifications.vue'

const store = usePokemonStore()
const pokemon = ref()
const route = useRoute()

const getPokemonIdFromRoute = (): string => {
  return route.params.id?.toString() || ''
}

const fetchPokemon = () => {
  const pokemonId = getPokemonIdFromRoute()
  store.fetchSinglePokemon(`/pokemon/${pokemonId}/`)
}

onMounted(() => {
  fetchPokemon()
})

watchEffect(() => {
  pokemon.value = store.singlePokemon
})

const displayAbilities = () => {
  if (pokemon?.value && pokemon?.value.abilities) {
    return pokemon.value.abilities
      .map((ability: any) => ability?.ability?.name)
      .join(', ')
  }
  return ''
}

const displayMoves = () => {
  if (pokemon?.value && pokemon?.value.moves) {
    return pokemon.value.moves.map((move: any) => move?.move?.name).join(', ')
  }
  return ''
}
</script>
