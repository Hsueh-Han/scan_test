<template>
  <div class="row">
    <Searchbar>
      <!-- search-bar slot -->
      <validation-observer v-slot="{ valid }">
        <validation-provider rules="required">
          <el-select v-model="value" :placeholder="$t(`__field`)"
          clearable class="cus-input-style mr-3">
            <el-option
              v-for="item in dataArr"
              :key="item.id"
              :label="item[`${dataArrLang}`]"
              :value="item[`${dataArrLang}`]">
            </el-option>
          </el-select>
        </validation-provider>
        <validation-provider rules="required">
          <el-date-picker class="w-15 mr-3" :clearable="false"
            v-model="dateValue"
            type="date"
            :picker-options="pickerOptions"
            :placeholder="$t(`__datepick`)">
          </el-date-picker>
        </validation-provider>
        <validation-provider rules="required">
          <el-date-picker class="w-15 mr-3" :clearable="false"
            v-model="dateValue2"
            type="date"
            :picker-options="pickerOptions"
            :placeholder="$t(`__datepick`)">
          </el-date-picker>
        </validation-provider>
        <el-button class="btn-tdsc w-15" @click="submit()" plain
          :disabled="!valid"> {{$t(`__search`)}}
        </el-button>
      </validation-observer>
      <!-- search-bar slot end -->
    </Searchbar>
    <div class="col-12 pb-5"
      style="background-color: #F6F6F6F6; min-height: calc(100vh - 123px);">
      <SearchBanner v-if="isRenderChart"
        :searchValue="value"
        :pickDate1="dateValue"
        :pickDate2="dateValue2">
      </SearchBanner>
      <div class="shadow-sm bg-white py-4 px-3 mt-n5 mb-3 rounded" v-if="isRenderChart">
        <div class="row text-center">
          <div class="col-12 col-md-3 border-md-right">
            <div class="h2 text-danger"><i class="el-icon-trophy-1"></i></div>
            <div class="h4">scan-tk</div>
            <span class="text-secondary"> {{$t('__mostWifiToday')}} </span>
          </div>
          <div class="col-12 col-md-3 border-md-right">
            <div class="h2 text-danger"><i class="el-icon-trophy-1"></i></div>
            <div class="h4">52798779</div>
            <span class="text-secondary"> {{$t('__mostBluetoothToday')}} </span>
          </div>
          <div class="col-12 col-md-3 border-md-right">
            <div class="h2 text-primary"><i class="el-icon-mobile-phone"></i></div>
            <div class="h4">268</div>
            <span class="text-secondary"> {{$t('__diffrentWifi')}} </span>
          </div>
          <div class="col-12 col-md-3">
            <div class="h2 text-primary"><i class="el-icon-watch"></i></div>
            <div class="h4">2,179</div>
            <span class="text-secondary"> {{$t('__diffrentBluetooth')}} </span>
          </div>
        </div>
      </div>
      <div class="shadow-sm bg-white pt-5 px-3 mb-3 rounded" v-if="isRenderChart">
        <h4 class="text-secondary"> {{$t('__detectedTodayWifi')}} </h4>
        <line-chart :chart-data="lineChartData" :options="chartOptions" :height="200"></line-chart>
      </div>
      <div class="shadow-sm bg-white pt-5 px-3 mb-3 rounded" v-if="isRenderChart">
        <h4 class="text-secondary"> {{$t('__detectedTodayBluetooth')}} </h4>
        <line-chart :chart-data="lineChartData2" :options="chartOptions" :height="200"></line-chart>
      </div>
      <div class="shadow-sm bg-white py-5 px-3 mb-3 rounded" v-if="isRenderChart">
        <div class="row">
          <h4 class="col-12 text-secondary mb-4"> {{$t('__topWifi')}} </h4>
          <div class="col-12 col-md-6 mb-md-0 mb-3">
            <pie-chart :chart-data="pieChartData"></pie-chart>
          </div>
          <div class="col-12 col-md-6">
            <PieList :listData="pieChartListArr"></PieList>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Searchbar from '@/components/SearchBar/SearchBar.vue';
import SearchBanner from '@/components/SearchBar/SearchBanner.vue';
import LineChart from '@/components/Charts/LineChart.vue';
import chartOptions from '@/components/Charts/config';
import PieChart from '@/components/Charts/PieChart.vue';
import PieList from '@/components/Charts/PieChartList.vue';

export default {
  components: {
    Searchbar,
    SearchBanner,
    LineChart,
    PieChart,
    PieList,
  },
  data() {
    return {
      isRenderChart: false,
      lineChartData: {
        datasets: [],
        labels: [],
      },
      lineChartData2: {
        datasets: [],
        labels: [],
      },
      pieChartData: {
        datasets: [],
        labels: [],
      },
      pieChartListArr: [],
      chartOptions,
      dataArr: [],
      value: '',
      dateValue: new Date(new Date().setHours(0, 0, 0, 0)),
      dateValue2: new Date(new Date().setHours(0, 0, 0, 0)),
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
    };
  },
  methods: {
    submit() {
      this.isRenderChart = false;
      const d1 = this.dateValue.getTime();
      const d2 = this.dateValue2.getTime();
      if (d1 > d2) {
        [this.dateValue, this.dateValue2] = [this.dateValue2, this.dateValue];
      }
      const dateDiffer = Math.abs(d2 - d1) / (1000 * 60 * 60 * 24);
      if (dateDiffer >= 7) {
        console.log('選取日期相差7天，將不顯示曲線圖');
      } else {
        console.log('great submit!');
        setTimeout(() => {
          this.renderChart(dateDiffer, 'wifi');
          this.renderChart(dateDiffer, 'bluetooth');
          this.renderBarChart();
        }, 300);
      }
    },
    renderChart(keyNum, type) {
      const obj = {
        labels: ['00', '01', '02', '03', '04', '05', '06', '07', '08',
          '09', '10', '11', '12', '13', '14', '15', '16', '17', '18',
          '19', '20', '21', '22', '23'],
        datasets: [],
      };
      const colorArr = [];
      for (let i = 0; i < keyNum + 1; i += 1) {
        const arr = [];
        const num = Math.floor((Math.random() * 23) + 1);
        for (let j = 0; j < 24; j += 1) {
          const dataNum = Math.floor((Math.random() * 150) + 1);
          if (j + 1 >= num) {
            arr.push(0);
          } else {
            arr.push(dataNum);
          }
        }
        colorArr.push(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
        const arr2 = {
          data: arr,
          label: '2021',
          borderColor: colorArr[i],
          backgroundColor: 'transparent',
          pointBackgroundColor: colorArr[i],
        };
        obj.datasets.push(arr2);
      }
      if (type === 'wifi') {
        this.lineChartData = { ...obj };
      } else {
        this.lineChartData2 = { ...obj };
      }
      this.isRenderChart = true;
    },
    renderBarChart() {
      this.pieChartListArr = [];
      const randomNum = Math.floor(Math.random() * 15 + 1);
      const dataArr = [];
      const colorArr = [];
      for (let i = 0; i < randomNum; i += 1) {
        dataArr.push(Math.floor(Math.random() * 50 + 1));
        colorArr.push(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
        const obj = {
          title: colorArr[i],
          data: dataArr[i],
        };
        this.pieChartListArr.push(obj);
      }
      const arr = this.pieChartListArr.map((item) => item.data);
      const sum = arr.reduce((acc, cur) => acc + cur, 0);
      this.pieChartListArr.forEach((item, index) => {
        this.pieChartListArr[index].percent = `${((item.data / sum) * 100).toFixed(2)}%`;
      });

      this.pieChartListArr.sort((a, b) => b.data - a.data);
      dataArr.sort((a, b) => a - b);
      this.pieChartData = {
        labels: dataArr,
        datasets: [{
          data: dataArr.reverse(),
          label: 'demo',
          backgroundColor: colorArr,
        }],
      };
    },
  },
  computed: {
    dataArrLang() {
      const lang = localStorage.getItem('local');
      if (lang === 'zhTW') {
        return 'Name';
      }
      return 'Name_En';
    },
  },
  mounted() {
    this.dataArr = [
      {
        id: 1,
        Name: '5G Living Lab',
        Name_En: '5G Living Lab',
      },
      {
        id: 2,
        Name: '全家便利商店中正大學店',
        Name_En: 'Family Mart, CCU branch',
      },
      {
        id: 3,
        Name: '創新技術博覽會',
        Name_En: 'Inventaipei',
      },
      {
        id: 4,
        Name: '北港朝聖文旅',
        Name_En: 'Yunlin County, Beigang St. Art Hotel',
      },
      {
        id: 5,
        Name: '台北市跨年晚會',
        Name_En: 'Taipei City, 2020 New Year Eve at City Hall',
      },
      {
        id: 6,
        Name: '台北車站地下街',
        Name_En: 'Taipei station mall',
      },
      {
        id: 7,
        Name: '台資科大安辦公室',
        Name_En: 'Taipei City, Taiwan Data Science Company Office (Daan District)',
      },
      {
        id: 8,
        Name: '台資科大安辦公室-2',
        Name_En: 'Taipei City, Taiwan Data Science Company Office (Daan District) No.2',
      },
      {
        id: 9,
        Name: '國道蘇澳服務區',
        Name_En: 'Yilan County, Suao Service Area',
      },
      {
        id: 10,
        Name: '尼斯灣海洋景觀餐廳',
        Name_En: 'Keelung City, National Museum of Marine Science and Technology, NiceBay Restaurant',
      },
      {
        id: 11,
        Name: '虎尾商圈及觀光工廠',
        Name_En: 'Huwei commercial center & tourist factory',
      },
      {
        id: 12,
        Name: '行啟悠居與行啟記念館',
        Name_En: 'Yunlin County, House of Citizen-Memorial Hall of Attendance',
      },
      {
        id: 13,
        Name: '行啟記念館',
        Name_En: 'House of Citizen-Memorial Hall of Attendance',
      },
      {
        id: 14,
        Name: '金山老街',
        Name_En: 'Jinshan Old Street',
      },
      {
        id: 15,
        Name: '雲林良品',
        Name_En: 'YUNLIN GOODS',
      },
    ];
  },
};
</script>

<style lang="scss" scope>
.cus-input-style{
  width: 40%;
  .el-input__inner{
    color: #fff;
    border-radius: 30px;
    border-color: transparent;
    background-color: #8dc220;
    &::placeholder{
      color: #fff;
    }
    &:focus{
      border-color: transparent;
    }
  }
}
.el-select .el-input .el-select__caret{
  color: #fff;
}
.el-select .el-input.is-focus .el-input__inner{
  border-color: transparent;
}
.el-select-dropdown__item.selected{
  color: #8dc220;
}
.btn-tdsc{
  padding-left: 0;
  padding-right: 0;
  color: #8dc220 !important;
  border-color: #8dc220 !important;
  &:hover{
    color: #709b1b !important;
    border-color: #709b1b !important;
  }
  &:disabled{
    color: #a8b198 !important;
    border-color: #c4ccb3 !important;
  }
}
@media (min-width: 768px) {
  .border-md-right{
    border-right: 1px solid #dee2e6;
  }
};
@media (max-width: 767px) {
  .el-select-dropdown{
    max-width: 370px;
  }
}
</style>
