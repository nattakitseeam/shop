const products = [
  {
    id: 1,
    name: "PRIMO INTERNET",
    category: "INTERNET",
    price: 199,
    tag: "V1",
    image: "/uploads/rew.png",
    ticketUrl: "https://discord.gg/rdswSzeYb", // 👈 วางลิงก์ห้อง Ticket ของคุณตรงนี้
    detailMedia: [
      "/uploads/test.mp4", // 👈 ใส่ไฟล์คลิป MP4 ที่อยู่ใน public/uploads/ ได้เลย
      "/uploads/pay.png" // 👈 ใส่รูปภาพปนกันได้ตามปกติ
    ],
    description: "โอนแล้วแจ้งสลีปใน Ticket ได้เลยครับ"
  },


  {
    id: 2,
    name: "Setting Primo",
    category: "SETTING",
    price: 99,
    tag: "V1",
    image: "/uploads/rew.png",
    ticketUrl: "https://discord.gg/rdswSzeYb",
    detailMedia: [
      "/uploads/test.mp4",
      "/uploads/pay.png"
    ],
    description: "โอนแล้วแจ้งสลีปใน Ticket ได้เลยครับ"
  },

  
  {
    id: 3,
    name: "ROAD MOD",
    category: "ROAD",
    price: 99,
    tag: "LIMITED",
    image: "/uploads/rew.png",
    ticketUrl: "https://discord.gg/rdswSzeYb",
    detailImages: [
      "/uploads/pay.png"
    ],
    description: "โอนแล้วแจ้งสลีปใน Ticket ได้เลยครับ"
  },
  {
    id: 4,
    name: "V1",
    category: "RESHADE",
    price: 49,
    tag: "LIMITED",
    image: "/uploads/rew.png",
    ticketUrl: "https://discord.gg/rdswSzeYb",
    detailImages: [
      "/uploads/v1.1.png",
      "/uploads/v1.2.png",
      "/uploads/v1.3.png",
      "/uploads/v1.4.png",
      "/uploads/1.5.png",
      "/uploads/pay.png"
    ],
    description: "โอนแล้วแจ้งสลีปใน Ticket ได้เลยครับ"
  },
  {
    id: 5,
    name: "V2",
    category: "RESHADE",
    price: 49,
    tag: "LIMITED",
    image: "/uploads/rew.png",
    ticketUrl: "https://discord.gg/rdswSzeYb",
    detailImages: [
      "/uploads/v2.1.png",
      "/uploads/v2.2.png",
      "/uploads/pay.png"

    ],
    description: "โอนแล้วแจ้งสลีปใน Ticket ได้เลยครับ"
  },
  {
    id: 6,
    name: "V3",
    category: "RESHADE",
    price: 49,
    tag: "LIMITED",
    image: "/uploads/rew.png",
    ticketUrl: "https://discord.gg/rdswSzeYb",
    detailImages: [
      "/uploads/v3.1.png",
      "/uploads/3.2.png",
      "/uploads/pay.png"
    ],
    description: "โอนแล้วแจ้งสลีปใน Ticket ได้เลยครับ"
  },
  {
    id: 7,
    name: "V4",
    category: "RESHADE",
    price: 49,
    tag: "LIMITED",
    image: "/uploads/rew.png",
    ticketUrl: "https://discord.gg/rdswSzeYb",
    detailImages: [
      "/uploads/4.1.png",
      "/uploads/4.2.png",
      "/uploads/pay.png"
    ],
    description: "โอนแล้วแจ้งสลีปใน Ticket ได้เลยครับ"
  },
  {
    id: 8,
    category: "RESHADE",
    price: 49,
    tag: "LIMITED",
    image: "/uploads/commingsoon.png",
    ticketUrl: "https://discord.gg/rdswSzeYb",
    detailImages: [

    ],
    description: "V5"
  },
  {
    id: 9,
    category: "RESHADE",
    price: 49,
    tag: "LIMITED",
    image: "/uploads/commingsoon.png",
    ticketUrl: "https://discord.gg/rdswSzeYb",
    detailImages: [
      
    ],
    description: "V6"
  }
];

export const fetchProducts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 200,
        data: products
      });
    }, 400);
  });
};