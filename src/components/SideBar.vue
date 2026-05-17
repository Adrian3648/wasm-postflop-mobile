<template>
  <aside class="flex lg:flex-col flex-row shrink-0 lg:w-56 w-full my-2 lg:my-4 overflow-x-auto lg:overflow-y-auto lg:overflow-x-visible lg:border-r-2 border-b-2 lg:border-b-0 gap-1 lg:gap-0 px-2 lg:px-0">
    <button :class="itemStyle('about') + ' shrink-0 lg:w-full'" @click="store.sideView = 'about'">
      About
    </button>

    <button
      :class="itemStyle('oop-range') + ' shrink-0 lg:w-full'"
      @click="store.sideView = 'oop-range'"
    >
      OOP Range
      <span class="flex my-2 justify-center">
        <RangeMiniViewer :player="0" />
      </span>
    </button>

    <button :class="itemStyle('ip-range') + ' shrink-0 lg:w-full'" @click="store.sideView = 'ip-range'">
      IP Range
      <span class="flex my-2 justify-center">
        <RangeMiniViewer :player="1" />
      </span>
    </button>

    <button :class="itemStyle('board') + ' shrink-0 lg:w-full'" @click="store.sideView = 'board'">
      Board
      <span class="flex mt-1 justify-center font-semibold">
        <span
          v-for="(item, i) in boardTexts"
          :key="i"
          :class="
            'inline-block ' + (i === 3 ? 'mx-1 ' : 'mx-0.5 ') + item.colorClass
          "
        >
          {{ item.rank + item.suit }}
        </span>
      </span>
    </button>

    <button
      :class="itemStyle('tree-config') + ' shrink-0 lg:w-full'"
      @click="store.sideView = 'tree-config'"
    >
      Tree Configuration
    </button>

    <button
      :class="itemStyle('run-solver')"
      @click="store.sideView = 'run-solver'"
    >
      Run Solver
    </button>
  </aside>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { SideView, useStore, useConfigStore } from "../store";
import { cardText } from "../utils";

import RangeMiniViewer from "./RangeMiniViewer.vue";

export default defineComponent({
  components: {
    RangeMiniViewer,
  },

  setup() {
    const store = useStore();
    const config = useConfigStore();

    const boardTexts = computed(() => {
      if (config.board.length === 0) {
        return [{ rank: "-", suit: "", colorClass: "text-black" }];
      } else {
        return config.board.map(cardText);
      }
    });

    return {
      store,
      boardTexts,
      itemStyle: (view: SideView) => {
        return (
          "side-bar-item " +
          (view === store.sideView ? "font-bold bg-blue-100" : "")
        );
      },
    };
  },
});
</script>

<style scoped>
.side-bar-item {
  @apply block mx-2 my-1 px-4 py-3 rounded-3xl;
  @apply text-left text-[1.0625rem] select-none;
  @apply transition-colors hover:bg-blue-100;
}
</style>
