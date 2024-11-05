<template>
  <HelloWorld />
  <div class="box">
    <h1>{{ msg }}</h1>
    <button @click="changeMsg">change msg</button>
  </div>

  <hr />
  <component :is="LazyCpnAsync" />
  <button @click="loadLazyCpn">显示LazyCpn</button>
</template>

<script setup>
import { ref, defineAsyncComponent } from "vue";
import HelloWorld from "@/components/HelloWorld.vue";

const msg = ref("Webpack vue");
function changeMsg() {
  console.log("changeMsg");
  msg.value = "Webpack vue change";
}

const LazyCpnAsync = ref();

function loadLazyCpn() {
  if (LazyCpnAsync.value) return;
  // 这里会懒加载该组件
  LazyCpnAsync.value = defineAsyncComponent(() =>
    import("@/components/LazyCpn.vue")
  );
}
</script>

<style lang="less" scoped>
.box {
  h1 {
    color: blueviolet;
  }
}
</style>
