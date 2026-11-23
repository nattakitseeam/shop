<template>
  <div id="app">
    <Navbar :cartCount="cart.length" />
    <router-view @add-to-cart="handleAddToCart" />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'App',
  components: {
    Navbar
  },
  data() {
    return {
      cart: []
    }
  },
  methods: {
    handleAddToCart(product) {
      this.cart.push(product)
      alert(`เพิ่ม "${product.name}" ลงในตะกร้าแล้ว!`)
    }
  }
}
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  overflow-y: scroll; /* 👈 บังคับแสดงแถบสกอร์เมาส์ไว้ตลอดเวลา หน้าเว็บจะได้ไม่กระพริบขยับซ้าย-ขวา */
  scrollbar-gutter: stable; /* ล็อกพื้นที่สกอร์เมาส์ให้นิ่งสนิท */
}

body {
  background-color: #0a0e17; /* สีดำเข้มอมน้ำเงิน */
  color: #f8fafc;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden; /* ป้องกันการเลื่อนซ้าย-ขวาเกินขอบจอ */
}

/* ปรับสีแถบสกอร์เมาส์ให้เข้ากับธีมดำ-น้ำเงิน (ดูเนียนตาขึ้น) */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #0a0e17;
}

::-webkit-scrollbar-thumb {
  background: #1e3a8a;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #2563eb;
}
</style>