<template>
  <nav class="navbar">
    <div class="nav-container">
      <div class="brand">
        <!-- หนูจิ๋วเกาะมุมซ้ายบนของคำว่า PRIMO -->
        <div class="perched-mouse" title="จี๊ดๆ!">
          <svg viewBox="0 0 64 40" width="32" height="20">
            <!-- หางกระดิก -->
            <path class="mouse-tail" d="M 12 28 Q 2 22 6 12" fill="none" stroke="#60a5fa" stroke-width="2.5" stroke-linecap="round"/>
            <!-- ลำตัว -->
            <ellipse cx="28" cy="26" rx="14" ry="9" fill="#93c5fd" />
            <!-- หัว -->
            <circle cx="42" cy="24" r="8" fill="#bfdbfe" />
            <!-- หู -->
            <circle cx="37" cy="15" r="5" fill="#3b82f6" />
            <circle cx="37" cy="15" r="2.5" fill="#eff6ff" />
            <!-- ตาและจมูก -->
            <circle cx="45" cy="22" r="1.5" fill="#0a0e17" />
            <circle cx="50" cy="25" r="2" fill="#2563eb" />
            <!-- อุ้งเท้าเกาะขอบ -->
            <circle cx="34" cy="34" r="2.5" fill="#60a5fa" />
            <circle cx="42" cy="34" r="2.5" fill="#60a5fa" />
          </svg>
        </div>

        <span class="logo-dot"></span>
        <h1>PRIMO <span>STORE</span></h1>
      </div>

      
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  props: {
    cartCount: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style scoped>
.navbar {
  background-color: rgba(10, 14, 23, 0.9);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid #1e3a8a;
  position: sticky;
  top: 0;
  z-index: 100;
  padding: 1rem 2rem;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.brand {
  position: relative; /* สำคัญ: เพื่อให้หนูอ้างอิงตำแหน่งจากโลโก้ */
  display: flex;
  align-items: center;
  gap: 10px;
}

/* ตำแหน่งหนูเกาะซ้ายบนคำว่า PRIMO */
.perched-mouse {
  position: absolute;
  top: -16px;
  left: 14px;
  pointer-events: none;
  filter: drop-shadow(0 0 6px rgba(59, 130, 246, 0.8));
  animation: bodyBreathe 2s ease-in-out infinite;
}

.mouse-tail {
  transform-origin: 12px 28px;
  animation: wagTail 1.2s ease-in-out infinite alternate;
}

@keyframes wagTail {
  0% { transform: rotate(-12deg); }
  100% { transform: rotate(18deg); }
}

@keyframes bodyBreathe {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-1.5px); }
}

.logo-dot {
  width: 12px;
  height: 12px;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  border-radius: 50%;
  box-shadow: 0 0 10px #3b82f6;
}

.brand h1 {
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: 2px;
  color: #ffffff;
  margin: 0;
}

.brand span {
  color: #3b82f6;
  font-weight: 400;
}

.cart-btn {
  background-color: #111827;
  color: #e2e8f0;
  border: 1px solid #1e3a8a;
  padding: 0.5rem 1.2rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
}

.cart-btn:hover {
  background-color: #1e3a8a;
  border-color: #3b82f6;
}

.badge {
  background-color: #2563eb;
  color: white;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  margin-left: 6px;
}
</style>