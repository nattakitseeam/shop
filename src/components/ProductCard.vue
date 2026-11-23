<template>
  <div class="product-card">
    <div class="image-wrapper">
      <span v-if="product.tag" class="tag">{{ product.tag }}</span>
      <img :src="product.image" :alt="product.name" />
    </div>
    
    <div class="card-body">
      <span class="category">{{ product.category }}</span>
      <h3 class="title">{{ product.name }}</h3>
      <p class="desc">{{ product.description }}</p>
      
      <div class="card-footer">
        <span class="price">฿{{ product.price.toLocaleString() }}</span>
        
        <!-- กลุ่มปุ่ม รายละเอียด + ปุ่มเปิด Ticket Discord -->
        <div class="btn-group">
          <button class="detail-btn" @click="$emit('view-detail', product)">
            🔍 รายละเอียด
          </button>
          
          <a 
            :href="product.ticketUrl || 'https://discord.com'" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="ticket-btn"
            title="เปิด Ticket สั่งซื้อใน Discord"
          >
            <!-- ไอคอน Discord SVG -->
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
            </svg>
            Ticket
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.product-card {
  background: linear-gradient(145deg, #111827, #0d1320);
  border: 1px solid #1e293b;
  border-radius: 14px;
  overflow: hidden;
  transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
  display: flex;
  flex-direction: column;
}

.product-card:hover {
  transform: translateY(-6px);
  border-color: #2563eb;
  box-shadow: 0 10px 25px -5px rgba(30, 58, 138, 0.5);
}

.image-wrapper {
  position: relative;
  height: 220px;
  overflow: hidden;
  background-color: #090d16;
}

.image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.tag {
  position: absolute;
  top: 12px;
  left: 12px;
  z-index: 2;
  background-color: #1e3a8a;
  color: #93c5fd;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 6px;
  letter-spacing: 1px;
  border: 1px solid #3b82f6;
}

.card-body {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.category {
  color: #60a5fa;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
}

.title {
  color: #f8fafc;
  font-size: 1.1rem;
  margin: 0.4rem 0;
  font-weight: 600;
}

.desc {
  color: #94a3b8;
  font-size: 0.85rem;
  line-height: 1.5;
  margin-bottom: 1.25rem;
  flex-grow: 1;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #1e293b;
  padding-top: 1rem;
  gap: 8px;
}

.price {
  color: #ffffff;
  font-size: 1.15rem;
  font-weight: 700;
}

.btn-group {
  display: flex;
  align-items: center;
  gap: 6px;
}

.detail-btn {
  background-color: #1e293b;
  color: #e2e8f0;
  border: 1px solid #334155;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.detail-btn:hover {
  background-color: #334155;
  color: #ffffff;
}

/* ปุ่มเปิด Ticket Discord */
.ticket-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background-color: #5865F2; /* สีเอกลักษณ์ของ Discord */
  color: #ffffff;
  text-decoration: none;
  padding: 0.5rem 0.85rem;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 600;
  transition: background-color 0.2s ease, transform 0.1s ease;
  white-space: nowrap;
}

.ticket-btn:hover {
  background-color: #4752C4;
}

.ticket-btn:active,
.detail-btn:active {
  transform: scale(0.96);
}
</style>