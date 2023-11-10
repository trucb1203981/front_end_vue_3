<template>
    <div class="prize-item" :style="{ transform: 'rotate(' + rotation + 'deg)' }">
        <!-- Nội dung của các phần thưởng (ví dụ: hình ảnh, văn bản) -->
        <img :src="image" alt="Prize" />
        <div class="prize-name">{{ name }}</div>
    </div>
</template>
<script>
export default {
    props: {
        name: String,
        image: String,
        rotation: Number,
    },
};
</script>
  
<style>
/* File PrizeItem.vue */

/* Thiết kế cho phần tử chứa các phần thưởng trên bánh xe */
.prize-item {
  position: absolute;
  top: 0;
  left: 0;
  width: 300px;
  height: 300px;
  clip-path: polygon(50% 50%, 100% 0, 100% 100%);
}

/* Thiết kế cho hình nền phần thưởng */
.prize-item::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, #ff7f50, #20b2aa); /* Màu sắc phần thưởng */
  transform-origin: left;
  transform: rotate(45deg);
}

/* Thiết kế cho hình ảnh phần thưởng */
.prize-item img {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 80px;
  height: 80px;
  transform: translate(-50%, -50%);
  border-radius: 50%;
}

/* Thiết kế cho tên phần thưởng */
.prize-name {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 14px;
  font-weight: bold;
  color: #fff; /* Màu chữ */
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8); /* Đổ bóng chữ */
}

/* Định vị và góc quay cho các phần thưởng */
.prize-item:nth-child(1) {
  transform: rotate(0deg);
}

.prize-item:nth-child(2) {
  transform: rotate(45deg);
}

/* Tiếp tục điều chỉnh các góc quay cho các phần thưởng còn lại */
/* Để chia đều 360 độ thành số lượng phần thưởng mong muốn */
/* Ví dụ: */
.prize-item:nth-child(3) {
  transform: rotate(90deg);
}

/* ... */

/* Hoặc sử dụng Sass để sinh mã CSS một cách tự động */

</style>
  