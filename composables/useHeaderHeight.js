import { ref, readonly } from 'vue'

// Create a global reactive state for header height that can be shared across components
const globalHeaderHeight = ref('0px')

export const useHeaderHeight = () => {
  // Method to update header height
  const updateHeaderHeight = (headerElement) => {
    if (headerElement) {
      const height = headerElement.offsetHeight - 1; // -1 to avoid any gap
      globalHeaderHeight.value = `${height}px`
      console.log('Header height updated:', height)
    }
  }
  
  // Method to get header height as CSS variable
  const getHeaderHeightCSSVar = () => {
    return {
      '--header-height': globalHeaderHeight.value
    }
  }
  
  return {
    headerHeight: readonly(globalHeaderHeight),
    updateHeaderHeight,
    getHeaderHeightCSSVar
  }
} 