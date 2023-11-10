<template>
  <div class="wheel">
    <div class="wheel-wrapper" :style="{ transform: 'rotate(' + wheelRotation + 'deg)' }">
      <PrizeItem v-for="(prize, index) in prizes" :key="index" :name="prize.name" :image="prize.image"
        :rotation="360 / prizes.length * index" />
    </div>
    <div class="wheel-pointer" @click="spinWheel">Quay bánh xe</div>
  </div>
</template>

<script>
import PrizeItem from "./PrizeItem";

export default {
  components: {
    PrizeItem,
  },
  data() {
    return {
      prizes: [
        { name: "Phần thưởng 1", image: "path/to/image-1.jpg" },
        { name: "Phần thưởng 2", image: "path/to/image-2.jpg" },
        // Thêm các phần thưởng khác nếu cần
      ],
      wheelRotation: 0,
      spinning: false,
    };
  },
  methods: {
    spinWheel() {
      if (!this.spinning) {
        this.spinning = true;
        const randomSpin = 360 * 5 + Math.floor(Math.random() * 360);
        this.wheelRotation += randomSpin;

        setTimeout(() => {
          this.spinning = false;
          // Xử lý logic phần thưởng sau khi quay
          // ...
        }, 5000); // Thời gian quay (5 giây)
      }
    },
  },
};
</script>

<style>
/* File Wheel.vue */

/* Thiết kế cho bánh xe quay */
.wheel {
  position: relative;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background-color: #7eef97;
  overflow: hidden;
  border: 8px solid #fff; /* Thêm viền cho bánh xe */
}

/* Thiết kế cho hình ảnh chứa bánh xe */
.wheel-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform-origin: center;
  transition: transform 4s ease-in-out;
}

/* Thiết kế cho nút quay bánh xe */
.wheel-pointer {
  width: 60px;
  height: 60px;
  border-radius: 1000px;
  background: yellow;
  position: absolute;
  left: 50%;
  bottom: 10px;
  transform: translateX(-50%);
  text-align: center;
  line-height: 60px;
  z-index: 10;
  cursor: pointer;
}

</style>
