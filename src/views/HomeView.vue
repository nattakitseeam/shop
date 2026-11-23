<template>
  <div class="home-page">
    <!-- Hero Banner -->
    <header class="hero">
      <div class="hero-content">
        <!-- กรอบปุ่มที่มีตัวการ์ตูนวิ่งไล่กันบนขอบด้านบน -->
        <div class="hero-badge">
          <div class="badge-track">
            <!-- ตัวที่ 1: ตัวสีน้ำตาล -->
            <div class="critter-runner critter-brown">
              <svg viewBox="0 0 40 36" width="22" height="20">
                <circle cx="11" cy="10" r="3.5" fill="#8C583A" />
                <circle cx="27" cy="10" r="3.5" fill="#8C583A" />
                <path d="M8 28 V16 C8 9 13 6 19 6 C25 6 30 9 30 16 V28 Z" fill="#B67B56" />
                <ellipse cx="17" cy="20" rx="5.5" ry="4" fill="#F3E5D8" />
                <ellipse cx="16" cy="18.5" rx="2.2" ry="1.5" fill="#FF6B5B" />
                <circle cx="13" cy="15" r="1.8" fill="#1E1E1E" />
                <circle cx="12.5" cy="14.5" r="0.6" fill="#FFFFFF" />
                <circle cx="22" cy="15" r="1.8" fill="#1E1E1E" />
                <circle cx="21.5" cy="14.5" r="0.6" fill="#FFFFFF" />
                <ellipse cx="24" cy="19.5" rx="2" ry="1.2" fill="#E88D8D" opacity="0.8" />
                <ellipse cx="18" cy="24.5" rx="3" ry="2" fill="#E6D2C1" stroke="#8C583A" stroke-width="0.8" />
                <path d="M33 8 C33 8 35.5 11.5 35.5 13 C35.5 14.4 34.4 15.5 33 15.5 C31.6 15.5 30.5 14.4 30.5 13 C30.5 11.5 33 8 33 8 Z" fill="#38BDF8" />
                <ellipse class="foot-left" cx="13" cy="31" rx="3.2" ry="2" fill="#E6D2C1" stroke="#7A4B30" stroke-width="1" />
                <ellipse class="foot-right" cx="25" cy="31" rx="3.2" ry="2" fill="#E6D2C1" stroke="#7A4B30" stroke-width="1" />
              </svg>
            </div>

            <!-- ตัวที่ 2: ตัวสีเทา -->
            <div class="critter-runner critter-grey">
              <svg viewBox="0 0 40 36" width="22" height="20">
                <circle cx="11" cy="10" r="3.5" fill="#4B5563" />
                <circle cx="27" cy="10" r="3.5" fill="#4B5563" />
                <path d="M8 28 V16 C8 9 13 6 19 6 C25 6 30 9 30 16 V28 Z" fill="#6B7A89" />
                <ellipse cx="17" cy="20" rx="5.5" ry="4" fill="#E5E7EB" />
                <ellipse cx="16" cy="18.5" rx="2.2" ry="1.5" fill="#FF6B5B" />
                <circle cx="13" cy="15" r="1.8" fill="#1E1E1E" />
                <circle cx="12.5" cy="14.5" r="0.6" fill="#FFFFFF" />
                <circle cx="22" cy="15" r="1.8" fill="#1E1E1E" />
                <circle cx="21.5" cy="14.5" r="0.6" fill="#FFFFFF" />
                <ellipse cx="24" cy="19.5" rx="2" ry="1.2" fill="#E88D8D" opacity="0.8" />
                <ellipse cx="18" cy="24.5" rx="3" ry="2" fill="#D1D5DB" stroke="#4B5563" stroke-width="0.8" />
                <ellipse class="foot-left" cx="13" cy="31" rx="3.2" ry="2" fill="#D1D5DB" stroke="#374151" stroke-width="1" />
                <ellipse class="foot-right" cx="25" cy="31" rx="3.2" ry="2" fill="#D1D5DB" stroke="#374151" stroke-width="1" />
              </svg>
            </div>
          </div>

          <span class="badge-text">EXCLUSIVE SETTING</span>
        </div>

        <h2><span>Primo Store</span></h2>
        <p>NET | SETTING | RESHADE | ROAD</p>
      </div>
    </header>

    <!-- Main Content -->
    <main class="container">
      <!-- Filter Tabs -->
      <div class="filter-bar">
        <button 
          v-for="cat in categories" 
          :key="cat"
          :class="['filter-btn', { active: selectedCategory === cat }]"
          @click="selectedCategory = cat"
        >
          {{ cat }}
        </button>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p>กำลังโหลดรายการสินค้าจาก Primo API...</p>
      </div>

      <!-- Product Grid -->
      <div v-else class="product-grid">
        <ProductCard 
          v-for="item in filteredProducts" 
          :key="item.id" 
          :product="item"
          @view-detail="selectedProduct = $event"
        />
      </div>
    </main>

    <!-- หน้าต่างแสดงรายละเอียดสินค้า (แยกออกมาอยู่นอก Grid) -->
    <ProductDetailModal 
      :product="selectedProduct" 
      @close="selectedProduct = null" 
    />
  </div>
</template>

<script>
import { fetchProducts } from '@/api/mockApi'
import ProductCard from '@/components/ProductCard.vue'
import ProductDetailModal from '@/components/ProductDetailModal.vue'

export default {
  name: 'HomeView',
  components: {
    ProductCard,
    ProductDetailModal
  },
  data() {
    return {
      products: [],
      loading: true,
      selectedCategory: 'All',
      categories: ['All', 'INTERNET', 'SETTING', 'ROAD', 'RESHADE'],
      selectedProduct: null // เก็บข้อมูลสินค้าที่กำลังกดดูรายละเอียด
    }
  },
  computed: {
    filteredProducts() {
      if (this.selectedCategory === 'All') {
        return this.products
      }
      return this.products.filter(p => p.category === this.selectedCategory)
    }
  },
  async created() {
    try {
      const response = await fetchProducts()
      if (response.status === 200) {
        this.products = response.data
      }
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      this.loading = false
    }
  }
}
</script>

<style scoped>
.hero {
  /* ไล่เฉดสีโทน Midnight Dark -> Deep Blue -> Royal Blue -> Cyan */
  background: linear-gradient(
    -45deg, 
    #060913, 
    #0f172a, 
    #1e3a8a, 
    #2563eb, 
    #0284c7, 
    #1e3a8a, 
    #090d16
  );
  background-size: 400% 400%; /* ขยายพื้นที่สีให้กว้างขึ้นเพื่อใช้เลื่อนไปมา */
  animation: keyboardWave 8s ease infinite; /* สั่งให้สีวิ่งไหลต่อเนื่อง */
  padding: 4rem 2rem 3.5rem;
  text-align: center;
  border-bottom: 1px solid #1e3a8a;
  position: relative;
  overflow: hidden;
}

/* อนิเมชันแสงสีวิ่งไล่เหมือนไฟคีย์บอร์ด */
@keyframes keyboardWave {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.hero-badge {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 6px 28px;
  background-color: rgba(15, 23, 42, 0.85);
  color: #60a5fa;
  border: 1px solid #2563eb;
  border-radius: 30px;
  font-size: 0.75rem;
  letter-spacing: 1.5px;
  font-weight: 700;
  overflow: visible; /* ปล่อยให้ตัวการ์ตูนวิ่งบนขอบด้านบนได้ไม่โดนตัด */
  height: 36px;
  margin-bottom: 1rem;
  box-shadow: 0 0 15px rgba(37, 99, 235, 0.25);
}

.badge-text {
  position: relative;
  z-index: 3;
}

.badge-track {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.critter-runner {
  position: absolute;
  top: -18px; /* วิ่งบนเส้นขอบด้านบนของปุ่ม ไม่ทับตัวอักษร */
  display: flex;
  animation: chaseAcross 4.5s linear infinite, bodyBounce 0.25s ease-in-out infinite alternate;
}

.critter-brown { animation-delay: 0.55s; }
.critter-grey { animation-delay: 0s; }

.foot-left { animation: stepLeft 0.2s infinite alternate; }
.foot-right { animation: stepRight 0.2s infinite alternate; }

@keyframes chaseAcross {
  0% { left: 5%; opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { left: 85%; opacity: 0; }
}

@keyframes bodyBounce {
  0% { transform: translateY(0px) scaleX(-1); }
  100% { transform: translateY(-2px) scaleX(-1); }
}

@keyframes stepLeft {
  0% { transform: translate(0, 0); }
  100% { transform: translate(-2px, -2px); }
}

@keyframes stepRight {
  0% { transform: translate(-2px, -2px); }
  100% { transform: translate(0, 0); }
}

.hero h2 {
  font-size: 2.4rem;
  color: #ffffff;
  margin: 1rem 0;
  font-weight: 700;
}

.hero h2 span {
  color: #3b82f6;
}

.hero p {
  color: #94a3b8;
  font-size: 1.05rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2.5rem 2rem;
}

.filter-bar {
  display: flex;
  gap: 12px;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.filter-btn {
  background-color: #111827;
  color: #94a3b8;
  border: 1px solid #1e293b;
  padding: 0.5rem 1.25rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;
}

.filter-btn:hover {
  border-color: #3b82f6;
  color: #ffffff;
}

.filter-btn.active {
  background-color: #1e3a8a;
  border-color: #3b82f6;
  color: #ffffff;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.75rem;
}

.loading-state {
  text-align: center;
  padding: 4rem 0;
  color: #94a3b8;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #1e293b;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>