<template>
  <div>
    <div class="track-svg position-relative overflow-x-auto my-3" :style="innerSize">
      <img :src="imgUrl" alt="" class="track-img position-center">
    </div>
    <div class="row justify-content-center">
      <div class="col-11 col-lg-8">
        <div class="control-group text-center mb-3">
          <button class="btn mr-3 mb-3"
            @click="pickTarget(item)"
            @mouseover="tooltipShow(item)"
            @mouseout="tooltipHide()"
            :class="{
              'btn-warning': startPoint.id === item.id,
              'btn-outline-warning': startPoint.id !== item.id,
            }"
            v-for="item in data" :key="item.id">
            {{item.id}}
          </button>
        </div>
        <h4 v-if="startPoint.id"> {{`${startPoint.id} 天線人流狀態 - 偵測人員數：${flowTotal}`}} </h4>
        <table v-if="startPoint.id" class="table table-hover text-center">
          <thead>
            <tr>
              <th scope="col">序列</th>
              <th scope="col">移動終點天線</th>
              <th scope="col">人流數量</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in targetPointArr" :key="item.id">
              <td> {{ index + 1 }} </td>
              <td> {{ item.id }} </td>
              <td> {{ item.flow }}  </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3';
import img from '@/assets/songshan.png';

export default {
  props: ['dataArr'],
  data() {
    return {
      innerSize: {
        height: '',
      },
      data: this.dataArr,
      imgUrl: img,
      transitionId: '',
      startPoint: {
        id: '',
        point: '',
      },
      targetPointArr: [],
      flowTotal: '',
      yScale: '',
      xScale: '',
    };
  },
  mounted() {
    this.setPainter();
    // this.setFilterEffect(); 模糊效果待使用
  },
  methods: {
    setPainter() {
      // 假設傳入的img url 為固定尺寸，故此處先預設一個圖片尺寸
      d3.select('.track-svg').select('img')
        .attr('width', '850px')
        .attr('height', '600px');
      // 直接取得傳入圖片的寬高，並同時將 svg 畫布設置為相等寬高
      const svgH = document.querySelector('.track-img').offsetHeight;
      const svgW = document.querySelector('.track-img').offsetWidth;
      // 重要！動態傳入外層div高度，並使overflow-x-auto生效
      this.innerSize.height = `${svgH}px`;
      d3.select('.track-svg')
        .append('svg')
        .attr('width', svgW)
        .attr('height', svgH)
        .classed('position-center', true);
      // 設置比例尺
      this.yScale = d3.scaleLinear().domain([0, svgH]).range([svgH, 0]);
      this.xScale = d3.scaleLinear().domain([0, svgW]).range([0, svgW]);
      // 畫出天線點位
      this.drawCircle();
      this.setTooltip();
    },
    // 模糊效果
    // setFilterEffect() {
    //   d3.select('svg').append('filter').attr('id', 'filter-blur');
    //   d3.select('#filter-blur').append('feGaussianBlur')
    //     .attr('in', 'SourceGraphic')
    //     .attr('stdDeviation', '4');
    // },
    // 設置 tooltip 提示
    setTooltip() {
      d3.select('.track-svg')
        .append('div')
        .style('display', 'none')
        .attr('class', 'tooltip-message');
    },
    tooltipShow(value) {
      const w = document.querySelector('.track-img').offsetWidth;
      const h = document.querySelector('.track-img').offsetHeight;
      let flowStr = '';
      this.targetPointArr.forEach((item) => {
        if (item.id === value.id) {
          flowStr = `流動人數：${item.flow}`;
        }
      });
      d3.select('.tooltip-message')
        .style('display', 'block')
        .html(`<small class="mb-0 font-weight-bold">天線名稱：${value.id}</small><br><small>${flowStr}</small>`)
        .style('left', () => {
          const tooltipW = document.querySelector('.tooltip-message').offsetWidth;
          if (this.xScale(value.x) + tooltipW > w) {
            return `calc(((100% - ${w}px) / 2) + ${this.xScale(value.x) - tooltipW}px`;
          }
          return `calc(((100% - ${w}px) / 2) + ${this.xScale(value.x)}px`;
        })
        .style('top', () => {
          const tooltipH = document.querySelector('.tooltip-message').offsetHeight;
          if (this.yScale(value.y) + tooltipH > h) {
            return `${this.yScale(value.y) - tooltipH}px`;
          }
          return `${this.yScale(value.y)}px`;
        });
    },
    tooltipHide() {
      d3.select('.tooltip-message')
        .style('display', 'none');
    },
    drawCircle() {
      // 設置點位circle
      d3.select('svg').selectAll('circle').data(this.data)
        .enter()
        .append('circle')
        .classed('antenna-circle', true)
        .attr('cx', (value) => this.xScale(value.x))
        .attr('cy', (value) => this.yScale(value.y))
        .attr('r', '8')
        .attr('id', (value) => value.id) // 添加每個 circle 對應id，提供給後方設置css
        .on('click', (value) => {
          this.clkFn(value);
        })
        // tooltip
        .on('mouseover', (d) => {
          this.tooltipShow(d);
        })
        .on('mouseout', () => {
          this.tooltipHide();
        });
    },
    clkFn(value) {
      this.startPoint.id = value.id;
      this.transitionId = value.to.map((item) => item.id); // 存取受點擊及關聯的點位id
      // 初步先統一將所有 animation 相關 class 取消false
      d3.selectAll('circle').classed('circle-animation', false);
      d3.selectAll('circle').classed('start-circle-animation', false);
      // 起點所使用的class
      d3.select(`#${this.startPoint.id}`).classed('start-circle-animation', true);
      this.transitionId.forEach((item) => {
        d3.select(`#${item}`).classed('circle-animation', true); // 後續將相關點位改為 true
      });
      this.setTrackLine(); // 設置軌跡path
      this.setText(); // 設置flow text
    },
    setTrackLine() {
      // 軌跡path
      this.data.forEach((item) => {
        if (item.id === this.startPoint.id) {
          // 設置點擊目標為 path 路徑起點(start)
          this.startPoint.point = {
            x: item.x,
            y: item.y,
          };
          // path 路徑目標則為 item 物件中的to子集
          this.targetPointArr = [...item.to];
        }
      });
      // 繪製線條函式
      const drawLine = d3.line()
        .x((item) => this.xScale(item.x))
        .y((item) => this.yScale(item.y));
      // 重繪情境的初始化處理(remove)
      d3.selectAll('path').remove();
      d3.selectAll('.circle-move').remove();
      // 繪製多重線條，根據target目標數量以for迴圈執行繪製次數
      for (let i = 0; i < this.targetPointArr.length; i += 1) {
        // path 人流路徑
        d3.select('svg').data([this.startPoint.point, this.targetPointArr[i]])
          .append('path')
          .attr('d', drawLine([this.startPoint.point, this.targetPointArr[i]]))
          .classed('track-path', true);
        // circle 人流圓點動畫
        d3.select('svg').append('circle')
          .attr('class', 'circle-move')
          .attr('r', '5')
          .attr('cx', this.xScale(this.startPoint.point.x))
          .attr('cy', this.yScale(this.startPoint.point.y))
          .attr('opacity', '1')
          .transition()
          .duration(5500)
          .attr('r', '10')
          .attr('cx', this.xScale(this.targetPointArr[i].x))
          .attr('cy', this.yScale(this.targetPointArr[i].y))
          .attr('opacity', '0.2')
          .transition()
          .duration(0)
          .attr('r', '0');
      }
    },
    setText() {
      const flowArr = this.targetPointArr.map((item) => item.flow);
      this.flowTotal = flowArr.reduce((acc, cur) => acc + cur, 0);
      d3.selectAll('text').remove();
      // 人潮流向的各終點字串訊息
      d3.select('svg').selectAll('text').data(this.targetPointArr)
        .enter()
        .append('text')
        .attr('class', 'svg-text-theme')
        .attr('x', (d) => this.xScale(d.x))
        .attr('y', (d) => this.yScale(d.y))
        .text((d) => `${((d.flow / this.flowTotal) * 100).toFixed(0)}%`);
      // 起點字串訊息
      d3.select('svg')
        .append('text')
        .attr('class', 'svg-text-start-theme')
        .attr('x', () => this.xScale(this.startPoint.point.x))
        .attr('y', () => this.yScale(this.startPoint.point.y))
        .text(() => `偵測人數：${this.flowTotal}`);
    },
    pickTarget(value) {
      this.tooltipHide();// 使用者click時也會同時有mouseover的狀態，此處做一細微優化處理
      this.clkFn(value);
    },
  },
};
</script>

<style lang="scss">
.tooltip-message{
  position: absolute;
  box-shadow: 1px 2px 5px #5c5858;
  max-width: 200px;
  padding: 5px;
  border-radius: 5px;
  border: 2px solid rgb(224, 159, 62);
  background: rgba(255, 255, 255, 0.75);
}
.position-center{
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
// .rect-bg{
//   width: 30px;
//   height: 18px;
//   fill: white;
//   opacity: 0.75;
//   transform: translate(-6px, -16px);
// }
.svg-text-start-theme{
  stroke: rgb(70, 20, 20);
  fill: red;
  font-size: 14px;
  transform: translate(-64px, 20px);
  text-shadow: 0px 0px 10px #ffffff;
}
.svg-text-theme{
  stroke: rgb(70, 20, 20);
  fill: red;
  font-size: 16px;
  transform: translate(-16px, 7px);
  text-shadow: 0px 0px 10px #ffffff;
}
.overflow-x-auto{
  overflow-x: auto;
}
.circle-move{
  stroke: rgb(5, 5, 5);
  stroke-width: 2px;
  fill: rgb(240, 240, 15);
}
.antenna-circle{
  stroke: rgb(53, 90, 211);
  cursor: pointer;
  stroke-width: 5px;
  fill: transparent;
}
.track-path{
  fill: none;
  stroke: rgb(218, 106, 94);
  stroke-width: 2px;
  stroke-dasharray: 5;
  // animation-name: pathloop;
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}
@keyframes pathloop {
  0% {
    stroke: rgb(56, 79, 48);
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
  }
  50% {
    stroke: rgb(255, 162, 0);
  }
  100%{
    stroke: rgb(255, 0, 25);
    stroke-dasharray: 1000;
    stroke-dashoffset: 0;
  }
}
.circle-animation{
  stroke-width: 10px;
  animation-name: circleloop;
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}
@keyframes circleloop {
  0% {
    r: 8px;
    stroke: rgb(236, 52, 52);
    opacity: 1;
  }
  75%{
    r: 18px;
  }
  100% {
    r: 18px;
    stroke: rgb(236, 162, 52);
    opacity: 0;
  }
}
.start-circle-animation{
  animation-name: start-circleloop;
  animation-duration: 0.5s;
  stroke-width: 10px;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}
@keyframes start-circleloop {
  0% {
    r: 1px;
    stroke: rgb(29, 124, 3);
    opacity: 1;
  }
  100% {
    r: 10px;
    stroke: rgb(52, 236, 233);
    opacity: 0.3;
  }
}
</style>
