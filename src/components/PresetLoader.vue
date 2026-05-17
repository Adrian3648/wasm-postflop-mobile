<template>
  <div class="my-3 p-3 bg-blue-50 border border-blue-200 rounded">
    <div class="flex items-center gap-2 flex-wrap">
      <span class="font-semibold text-sm">Preset GTOwizard:</span>
      <select
        v-model="selectedPreset"
        class="px-2 py-1 rounded border border-gray-300 text-sm flex-grow"
      >
        <option value="">— Elige preset —</option>
        <optgroup label="RFI — 30 BB">
          <option value="RFI_UTG_30">UTG RFI @ 30bb</option>
          <option value="RFI_HJ_30">HJ RFI @ 30bb</option>
          <option value="RFI_CO_30">CO RFI @ 30bb</option>
          <option value="RFI_BTN_30">BTN RFI @ 30bb</option>
          <option value="RFI_SB_30">SB RFI @ 30bb</option>
        </optgroup>
        <optgroup label="RFI — 100 BB">
          <option value="RFI_UTG_100">UTG RFI @ 100bb</option>
          <option value="RFI_HJ_100">HJ RFI @ 100bb</option>
          <option value="RFI_CO_100">CO RFI @ 100bb</option>
          <option value="RFI_BTN_100">BTN RFI @ 100bb</option>
          <option value="RFI_SB_100">SB RFI @ 100bb</option>
        </optgroup>
        <optgroup label="BB Call (postflop SRP) — 30 BB">
          <option value="BBC_BTN_30">BB Call vs BTN @ 30bb</option>
          <option value="BBC_CO_30">BB Call vs CO @ 30bb</option>
          <option value="BBC_HJ_30">BB Call vs HJ @ 30bb</option>
          <option value="BBC_UTG_30">BB Call vs UTG @ 30bb</option>
          <option value="BBC_SB_30">BB Call vs SB @ 30bb</option>
        </optgroup>
        <optgroup label="BB Call (postflop SRP) — 100 BB">
          <option value="BBC_BTN_100">BB Call vs BTN @ 100bb</option>
          <option value="BBC_CO_100">BB Call vs CO @ 100bb</option>
          <option value="BBC_HJ_100">BB Call vs HJ @ 100bb</option>
          <option value="BBC_UTG_100">BB Call vs UTG @ 100bb</option>
          <option value="BBC_SB_100">BB Call vs SB @ 100bb</option>
        </optgroup>
        <optgroup label="BB 3-bet — 100 BB">
          <option value="BBR_BTN_100">BB 3-bet vs BTN @ 100bb</option>
          <option value="BBR_CO_100">BB 3-bet vs CO @ 100bb</option>
          <option value="BBR_HJ_100">BB 3-bet vs HJ @ 100bb</option>
          <option value="BBR_UTG_100">BB 3-bet vs UTG @ 100bb</option>
        </optgroup>
      </select>
      <button
        class="button-base button-blue text-sm"
        @click="loadPreset"
        :disabled="!selectedPreset"
      >
        Cargar
      </button>
    </div>
    <div class="mt-1 text-xs text-gray-600">
      Rangos extraídos de GTOwizard MTT ChipEV 8-max (ante 0.125bb).
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { PRESETS } from "../preset-ranges";

export default defineComponent({
  emits: ["load"],
  setup(_, { emit }) {
    const selectedPreset = ref("");
    const loadPreset = () => {
      if (!selectedPreset.value) return;
      const rangeStr = PRESETS[selectedPreset.value];
      if (rangeStr) emit("load", rangeStr);
    };
    return { selectedPreset, loadPreset };
  },
});
</script>
