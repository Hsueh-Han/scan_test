<template>
  <div>
    <button class="btn btn-secondary" @click="creatHeatMap">switch</button>
    <div class="heatmap">
      <img :src="imgUrl" class="track-img position-center">
    </div>
  </div>
</template>

<script>
import heatmap from 'heatmap.js';
import img from '@/assets/songshan.png';
import * as d3 from 'd3';

export default {
  data() {
    return {
      imgUrl: img,
      heatMapSize: {
        h: '',
        w: '',
      },
    };
  },
  mounted() {
    // 假設傳入的img url 為固定尺寸，故此處先預設一個圖片尺寸
    d3.select('.heatmap').select('img')
      .attr('width', '850px')
      .attr('height', '600px');
    this.heatMapSize.h = document.querySelector('.track-img').offsetHeight;
    this.heatMapSize.w = document.querySelector('.track-img').offsetWidth;
    d3.select('.heatmap')
      .style('height', `${this.heatMapSize.h}px`)
      .style('width', `${this.heatMapSize.w}px`)
      .classed('mx-auto', true);
    this.creatHeatMap();
  },
  methods: {
    creatHeatMap() {
      // 由於 heatmap.js 並無內置 remove()方法來做到初始化的效果
      // 故每次執行函式時，直接透過d3.js - remove()來移除heatmap套件所生成的canvas
      d3.select('canvas').remove();
      // 設置容器（必須）
      const heatmapInstance = heatmap.create({
        container: document.querySelector('.heatmap'),
      });

      const arr = [];
      function random(min, max) {
        return Math.random() * (max - min) + min;
      }
      const vm = this;
      function CreatePoint(count) {
        for (let i = 0; i < count; i += 1) {
          const x = Math.floor(random(0, vm.heatMapSize.w));
          const y = Math.floor(random(0, vm.heatMapSize.h));
          const value = Math.floor(random(0, 100));

          arr.push({ x, y, value });
        }
      }
      CreatePoint(100);

      const data = { // 熱區繪製的資料格式
        max: 100, // 上限：表示value必須達到該標準才可繪製出極值色區（紅色）
        min: 75,
        data: arr,
      };
      heatmapInstance.setData(data); // 執行實體並倒入資料

      console.log(data);
    },
  },
};
</script>
