<!-- filepath: src/components/Modal.vue -->
<template>
    <div v-if="isVisible" class="modal-overlay" @click="closeOnOverlayClick">
      <div class="modal-content" @click.stop>
        <button class="modal-close" @click="close" aria-label="Close popup">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <slot></slot>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "Modal",
    props: {
      modelValue: {
        type: Boolean,
        required: true,
      },
      closeOnOverlay: {
        type: Boolean,
        default: true,
      },
    },
    computed: {
      isVisible() {
        return this.modelValue;
      },
    },
    methods: {
      close() {
        this.$emit("update:modelValue", false);
      },
      closeOnOverlayClick() {
        if (this.closeOnOverlay) {
          this.close();
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1001;
  }
  
  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    position: relative;
    max-width: 60vw;
  }
  
  .modal-close {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
  }
  </style>