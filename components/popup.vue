<template>
  <div v-if="isVisible" class="popup-overlay" @click="closePopup">
    <div class="popup-wrapper" @click.stop>
      <div class="popup-content">
        <!-- Desktop Image -->
        <div class="popup-image desktop-image">
          <img 
            :src="desktopImage" 
            :alt="imageAlt"
            @load="onImageLoad"
            @error="onImageError"
          />
        </div>
        
        <!-- Mobile Image -->
        <div class="popup-image mobile-image">
          <img 
            :src="mobileImage" 
            :alt="imageAlt"
            @load="onImageLoad"
            @error="onImageError"
          />
        </div>
      </div>
      
      <button class="popup-close" @click="closePopup" aria-label="Close popup">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Popup',
  props: {
    desktopImage: {
      type: String,
      default: '/images/popup-desktop.jpg'
    },
    mobileImage: {
      type: String,
      default: '/images/popup-mobile.jpg'
    },
    imageAlt: {
      type: String,
      default: 'Popup image'
    },
    autoShow: {
      type: Boolean,
      default: true
    },
    showDelay: {
      type: Number,
      default: 2000 // 2 seconds
    },
    showOnce: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isVisible: false,
      hasBeenShown: false
    }
  },
  mounted() {
    if (this.autoShow && this.shouldShow()) {
      setTimeout(() => {
        this.showPopup()
      }, this.showDelay)
    }
  },
  methods: {
    shouldShow() {
      if (!this.showOnce) return true
      
      // Check if popup has been shown before (using localStorage)
      const hasShown = localStorage.getItem('popup-shown')
      return !hasShown
    },
    showPopup() {
      if (this.shouldShow()) {
        this.isVisible = true
        this.hasBeenShown = true
        
        if (this.showOnce) {
          localStorage.setItem('popup-shown', 'true')
        }
        
        // Prevent body scroll when popup is open
        document.body.style.overflow = 'hidden'
        
        this.$emit('popup-shown')
      }
    },
    closePopup() {
      this.isVisible = false
      
      // Restore body scroll
      document.body.style.overflow = ''
      
      this.$emit('popup-closed')
    },
    onImageLoad() {
      this.$emit('image-loaded')
    },
    onImageError() {
      console.warn('Popup image failed to load')
      this.$emit('image-error')
    }
  },
  beforeUnmount() {
    // Ensure body scroll is restored if component is destroyed while popup is open
    if (this.isVisible) {
      document.body.style.overflow = ''
    }
  }
}
</script>

<style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  padding: 20px;
  box-sizing: border-box;
  animation: fadeIn 0.3s ease-out;
}

.popup-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  max-width: 90%;
  max-height: 90%;
}

.popup-content {
  position: relative;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: slideIn 0.3s ease-out;
  max-width: 100%;
  max-height: calc(100% - 70px); /* Account for button and gap */
}

.popup-close {
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #333;
  flex-shrink: 0;
}

.popup-close:hover {
  background: rgba(255, 255, 255, 1);
  transform: scale(1.1);
}

.popup-image {
  display: block;
  width: 100%;
  height: 100%;
}

.popup-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

/* Desktop image - shown by default */
.desktop-image {
  display: block;
}

.mobile-image {
  display: none;
}

/* Mobile styles */
@media screen and (max-width: 768px) {
  .popup-overlay {
    padding: 10px;
  }
  
  .popup-wrapper {
    max-width: 95%;
    max-height: 95%;
    gap: 2rem;
  }
  
  .popup-content {
    border-radius: 8px;
    max-height: calc(100% - 55px); /* Account for smaller button and gap */
  }
  
  .popup-close {
    width: 35px;
    height: 35px;
  }
  
  /* Show mobile image, hide desktop image */
  .desktop-image {
    display: none;
  }
  
  .mobile-image {
    display: block;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: scale(0.8) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
</style> 