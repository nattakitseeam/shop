<template>
  <Teleport to="body">
    <div v-if="product" class="modal-overlay" @click.self="$emit('close')">
      <div class="modal-box">
        <!-- ส่วนหัว -->
        <div class="modal-header">
          <div class="header-title">
            <span class="badge-cat">{{ product.category }}</span>
            <h3>{{ product.name }}</h3>
          </div>
          <button class="close-btn" @click="$emit('close')" title="ปิดหน้าต่าง">✕</button>
        </div>

        <!-- ส่วนเนื้อหา -->
        <div class="modal-body">
          <!-- พื้นที่แสดงสื่อหลัก (รูป / คลิป MP4 / YouTube / Facebook) -->
          <div class="main-media-container">
            <template v-if="currentMedia">
              <!-- กรณีที่ 1: ลิงก์ YouTube หรือ Facebook -->
              <iframe
                v-if="mediaType === 'youtube' || mediaType === 'facebook'"
                :src="getEmbedUrl(currentMedia, mediaType)"
                class="media-iframe"
                frameborder="0"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                allowfullscreen
              ></iframe>

              <!-- กรณีที่ 2: ไฟล์วิดีโอ (.mp4, .webm, .ogg) -->
              <video
                v-else-if="mediaType === 'video'"
                :key="currentMedia"
                :src="currentMedia"
                class="media-video"
                controls
                autoplay
                muted
                playsinline
              ></video>

              <!-- กรณีที่ 3: รูปภาพทั่วไป -->
              <img
                v-else
                :src="currentMedia"
                :alt="product.name"
                class="media-image"
              />
            </template>

            <div v-else class="no-media">ไม่มีรูปภาพหรือวิดีโอตัวอย่าง</div>

            <!-- ปุ่มเลื่อนซ้าย-ขวา (แสดงเมื่อมีมากกว่า 1 รายการ) -->
            <template v-if="allMedia.length > 1">
              <button class="nav-arrow prev" @click="prevMedia">❮</button>
              <button class="nav-arrow next" @click="nextMedia">❯</button>
            </template>
          </div>

          <!-- แถบรายการย่อด้านล่าง (Thumbnails) -->
          <div v-if="allMedia.length > 1" class="thumbnail-list">
            <button
              v-for="(item, idx) in allMedia"
              :key="idx"
              :class="['thumb-btn', { active: currentIndex === idx }]"
              @click="currentIndex = idx"
            >
              <div v-if="checkType(item) !== 'image'" class="video-thumb">
                <span>▶ คลิป {{ idx + 1 }}</span>
              </div>
              <img v-else :src="item" alt="Thumbnail" />
            </button>
          </div>

          <!-- ข้อมูลรายละเอียดและราคา -->
          <div class="info-section">
            <div class="price-row">
              <span class="label">ราคาสินค้า</span>
              <span class="price-value">฿{{ product.price.toLocaleString() }}</span>
            </div>
            <div class="desc-box">
              <h4>รายละเอียดสินค้า</h4>
              <p>{{ product.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script>
export default {
  name: 'ProductDetailModal',
  props: {
    product: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  computed: {
    allMedia() {
      if (!this.product) return []
      const list = this.product.detailMedia || this.product.detailImages
      if (list && list.length > 0) {
        return list
      }
      return this.product.image ? [this.product.image] : []
    },
    currentMedia() {
      return this.allMedia[this.currentIndex] || ''
    },
    mediaType() {
      return this.checkType(this.currentMedia)
    }
  },
  watch: {
    product() {
      this.currentIndex = 0
    }
  },
  methods: {
    checkType(url) {
      if (!url) return 'image'
      const lower = url.toLowerCase()
      if (lower.includes('youtube.com') || lower.includes('youtu.be')) {
        return 'youtube'
      }
      if (lower.includes('facebook.com') || lower.includes('fb.watch')) {
        return 'facebook'
      }
      if (lower.endsWith('.mp4') || lower.endsWith('.webm') || lower.endsWith('.ogg')) {
        return 'video'
      }
      return 'image'
    },
    getEmbedUrl(url, type) {
      if (type === 'youtube') {
        let videoId = ''
        if (url.includes('youtu.be/')) {
          videoId = url.split('youtu.be/')[1].split('?')[0]
        } else if (url.includes('v=')) {
          videoId = url.split('v=')[1].split('&')[0]
        } else if (url.includes('/embed/')) {
          return url
        }
        return `https://www.youtube.com/embed/${videoId}?autoplay=1`
      }

      if (type === 'facebook') {
        // แปลงลิงก์คลิป Facebook ให้เล่นผ่าน Video Plugin
        const encodedUrl = encodeURIComponent(url)
        return `https://www.facebook.com/plugins/video.php?href=${encodedUrl}&show_text=false&autoplay=true`
      }

      return url
    },
    nextMedia() {
      this.currentIndex = (this.currentIndex + 1) % this.allMedia.length
    },
    prevMedia() {
      this.currentIndex = (this.currentIndex - 1 + this.allMedia.length) % this.allMedia.length
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(4, 7, 14, 0.88);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  padding: 1rem;
}

.modal-box {
  background: #0d1322;
  border: 1px solid #1e3a8a;
  border-radius: 16px;
  width: 100%;
  max-width: 760px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.8);
  overflow: hidden;
  animation: popIn 0.25s ease-out;
}

@keyframes popIn {
  from { opacity: 0; transform: scale(0.96); }
  to { opacity: 1; transform: scale(1); }
}

.modal-header {
  padding: 1.25rem 1.5rem;
  background-color: #090d16;
  border-bottom: 1px solid #1e293b;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-title {
  display: flex;
  align-items: center;
  gap: 10px;
}

.badge-cat {
  background-color: #1e3a8a;
  color: #93c5fd;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 6px;
  letter-spacing: 0.5px;
}

.header-title h3 {
  color: #ffffff;
  font-size: 1.15rem;
  margin: 0;
}

.close-btn {
  background: #1e293b;
  color: #94a3b8;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s;
}

.close-btn:hover {
  background: #ef4444;
  color: #ffffff;
}

.modal-body {
  padding: 1.5rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.main-media-container {
  position: relative;
  width: 100%;
  height: 380px;
  background-color: #060911;
  border-radius: 12px;
  border: 1px solid #1e293b;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.media-image,
.media-video,
.media-iframe {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border: none;
}

.no-media {
  color: #64748b;
}

.nav-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(15, 23, 42, 0.85);
  color: #ffffff;
  border: 1px solid #3b82f6;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1rem;
  z-index: 10;
  transition: background 0.2s;
}

.nav-arrow:hover {
  background: #2563eb;
}

.prev { left: 12px; }
.next { right: 12px; }

.thumbnail-list {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding-bottom: 4px;
}

.thumb-btn {
  width: 84px;
  height: 54px;
  padding: 0;
  border-radius: 8px;
  overflow: hidden;
  border: 2px solid #1e293b;
  background: #090d16;
  cursor: pointer;
  flex-shrink: 0;
  opacity: 0.65;
  transition: all 0.2s;
}

.thumb-btn:hover {
  opacity: 0.95;
}

.thumb-btn.active {
  border-color: #3b82f6;
  opacity: 1;
}

.thumb-btn img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.video-thumb {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #1e3a8a, #0f172a);
  color: #93c5fd;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.75rem;
  font-weight: 700;
}

.info-section {
  background-color: #111827;
  border: 1px solid #1e293b;
  border-radius: 12px;
  padding: 1.25rem;
}

.price-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid #1e293b;
}

.price-row .label {
  color: #94a3b8;
  font-size: 0.95rem;
}

.price-row .price-value {
  color: #38bdf8;
  font-size: 1.5rem;
  font-weight: 700;
}

.desc-box h4 {
  color: #e2e8f0;
  font-size: 0.95rem;
  margin-bottom: 0.5rem;
}

.desc-box p {
  color: #94a3b8;
  font-size: 0.9rem;
  line-height: 1.6;
}
</style>