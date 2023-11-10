<template>
  <div>
    <span>Prize number: {{ prizeNumber }}</span>
    <button
      type="button"
      @click="!rolling && prizeNumber < 8 && prizeNumber++"
      :disabled="rolling || prizeNumber === 8"
    >
      Add
    </button>
    <button
      type="button"
      @click="!rolling && prizeNumber > 2 && prizeNumber--"
      :disabled="rolling || prizeNumber === 2"
    >
      Remove
    </button>
    <!-- <div class="wheel-wrapper">
      <div class="wheel-pointer" @click="onClickRotate">Start</div>
      <div
        class="wheel-bg"
        :class="{ freeze: freeze }"
        :style="`transform: rotate(${wheelDeg}deg)`"
      >
        <div class="prize-list">
          <div
            class="prize-item-wrapper"
            v-for="(item, index) in prizeList"
            :key="index"
          >
            <div
              class="prize-item"
              :style="`transform: rotate(${
                (360 / prizeList.length) * index
              }deg)`"
            >
              <div class="prize-name">
                {{ item.name }}
              </div>
              <div class="prize-icon">
                <img :src="item.icon" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> -->

    <div class="pizza">
      <div
        class="slice"
        v-for="(n, index) in colors"
        :key="index"
        :style="{
          backgroundColor: color,
          transform: `rotate(${(360 / prizeNumber) * index}deg)`,
        }"
      ></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
/** 0. start import*/
import { useAlertStore } from "@/piniaStore/alert";
import { computed, ref, watch } from "vue";
/* end import*/

/** 1. start define property */
/* end define property */

/** 2. start define validate */
/* end define validate */

/** 3. start defined state */
const freeze = ref(false);
const rolling = ref(false);
const wheelDeg = ref(0);
const prizeNumber = ref(8);
const colors = ref(["#fdcb6e", "#0984e3", "#00b894", "#fd79a8", "#e17055"]);
const prizeItem = ref([
  {
    icon: "https://picsum.photos/40?random=1",
    name: "$10000",
  },
  {
    icon: "https://picsum.photos/40?random=6",
    name: "Thank you!",
  },
  {
    icon: "https://picsum.photos/40?random=2",
    name: "$500",
  },
  {
    icon: "https://picsum.photos/40?random=3",
    name: "$100",
  },
  {
    icon: "https://picsum.photos/40?random=6",
    name: "Thank you!",
  },
  {
    icon: "https://picsum.photos/40?random=4",
    name: "$50",
  },
  {
    icon: "https://picsum.photos/40?random=5",
    name: "$10",
  },
  {
    icon: "https://picsum.photos/40?random=6",
    name: "Thank you!",
  },
]);
/* end defined state */

/** 4. start define watcher */
watch(
  () => prizeNumber.value,
  (newVal, oldVal) => {
    if (newVal > oldVal) {
      prizeItem.value.push({
        icon: `https://picsum.photos/40?random=${newVal}`,
        name: `$${newVal}`,
      });
    } else {
      prizeItem.value.pop();
    }
  }
);
/* end define life watcher */

/** 5. start defined methods */
const onClickRotate = () => {
  if (rolling.value) return;
  rolling.value = true;
  freeze.value = false;
  const random = Math.floor(Math.random() * 8 + 1);
  const deg = 360 / prizeList.value.length;
  const rotateDeg = deg * random + 360 * 5;
  wheelDeg.value = rotateDeg;
  setTimeout(() => {
    rolling.value = false;
    freeze.value = true;
  }, 4000);
};
/* end defined methods */

/** 6. start defined computed */
const prizeList = computed(() => {
  const list = [];
  for (let i = 0; i < prizeNumber.value; i++) {
    list.push(prizeItem.value[i]);
  }
  return list;
});
/* end defined computed */

/** 7. start define life cycle hook */
/* end define life cycle hook */
</script>

<style scoped>
html {
  background: #dd7c7d;
}

.wheel-wrapper {
  width: 300px;
  height: 300px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.wheel-pointer {
  width: 60px;
  height: 60px;
  border-radius: 1000px;
  background: yellow;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  line-height: 60px;
  z-index: 10;
  cursor: pointer;

  &::after {
    content: "";
    position: absolute;
    top: -32px;
    left: 50%;
    border-width: 0 8px 40px;
    border-style: solid;
    border-color: transparent transparent yellow;
    transform: translateX(-50%);
  }
}
.wheel-bg {
  width: 100%;
  height: 100%;
  border-radius: 1000px;
  overflow: hidden;
  transition: transform 4s ease-in-out;
  background: #7eef97;

  &.freeze {
    transition: none;
    background: red;
  }
}

.prize-list {
  width: 100%;
  height: 100%;
  position: relative;
  text-align: center;
}

.prize-item-wrapper {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 150px;
  height: 150px;
}

.prize-item {
  width: 100%;
  height: 100%;
  transform-origin: bottom;

  .prize-name {
    padding: 16px 0;
  }

  .prize-icon {
  }
}

.pizza {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  position: relative;
}

</style>
