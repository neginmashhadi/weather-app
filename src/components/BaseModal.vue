<template>
  <!-- THIS IS THE INFORMATION MODAL SETUP  -->
  <Teleport to="body">
      <Transition name="modal-outer">
        <div
          v-show="activeModal"
          class="absolute w-full bg-black bg-opacity-30 h-screen top-0 left-0 flex justify-center px-8"
        >
          <Transition name="modal-inner">
            <div
              v-if="activeModal"
              class="p-4 bg-white self-start mt-32 max-w-screen-md"
            >
              <slot />
              <!-- the close button that for the information modal -->
              <button
                class="text-white mt-8 bg-weather-primary py-2 px-6"
                @click="$emit('close-modal')"
              >
                close
              </button>
            </div>
          </Transition>
        </div>
      </Transition>
  </Teleport>
</template>
  
  <script setup>
defineEmits(["close-modal"]);
defineProps({
  activeModal: {
    type: Boolean,
    defaule: false,
  },
});
</script>
  
  <style scoped>
.modal-outer-enter-active,
.modal-outer-leave-active {
  transition: opacity 0.3s cubic-bezier(0.52, 002. 02. 1);
}

.modal-outer-enter-from,
.modal-outer-leave-to {
  opacity: none;
}

.modal-inner-enter-active {
  transition: all 0.3s cubic-bezier(0.52, 002. 02. 1) 0.15s;
}

.modal-inner-leave-active {
  transition: all 0.3s cubic-bezier(0.52, 002. 02. 1);
}

.modal-inner-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.modal-inner-leave-to {
  transform: scale(0.8);
}
</style>

