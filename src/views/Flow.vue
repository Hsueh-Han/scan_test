<template>
  <div class="row">
    <searchbar>
      <!-- search-bar slot -->
      <validation-observer v-slot="{ valid }">
        <validation-provider rules="required">
          <el-select v-model="value" :placeholder="$t(`__field`)"
          clearable class="cus-input-style mr-3">
            <el-option
              v-for="item in dataArr"
              :key="item.id"
              :label="item[`${dataArrLang}`]"
              :value="item.id">
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
        <el-button class="btn-tdsc w-15" @click="submit()"
        plain :disabled="!valid"> {{$t(`__search`)}} </el-button>
      </validation-observer>
      <!-- search-bar slot end -->
    </searchbar>
    <div class="col-12 pt-3 pb-5"
    style="background-color: #F6F6F6F6; min-height: calc(100vh - 123px);">
      <Track v-if="isRenderChart" :dataArr="trackArr"/>
    </div>
  </div>
</template>

<script>
import Searchbar from '../components/SearchBar/SearchBar.vue';
import Track from '../components/Track/Track.vue';

export default {
  components: {
    Searchbar,
    Track,
  },
  data() {
    return {
      isRenderChart: false,
      trackArr: [],
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
  computed: {
    dataArrLang() {
      const lang = localStorage.getItem('local');
      if (lang === 'zhTW') {
        return 'Name';
      }
      return 'Name_En';
    },
  },
  methods: {
    submit() {
      this.isRenderChart = true;
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
    this.trackArr = [
      {
        id: 'a1',
        x: 100,
        y: 300,
        to: [
          // eslint-disable-next-line object-curly-newline
          { x: 647, y: 345, flow: 20, id: 'a2' },
          // eslint-disable-next-line object-curly-newline
          { x: 100, y: 550, flow: 12, id: 'a4' },
        ],
      },
      {
        id: 'a2',
        x: 647,
        y: 345,
        to: [
          // eslint-disable-next-line object-curly-newline
          { x: 320, y: 380, flow: 55, id: 'a3' },
          // eslint-disable-next-line object-curly-newline
          { x: 100, y: 550, flow: 20, id: 'a4' },
        ],
      },
      {
        id: 'a3',
        x: 320,
        y: 380,
        to: [
          // eslint-disable-next-line object-curly-newline
          { x: 100, y: 300, flow: 89, id: 'a1' },
          // eslint-disable-next-line object-curly-newline
          { x: 647, y: 345, flow: 17, id: 'a2' },
          // eslint-disable-next-line object-curly-newline
          { x: 100, y: 550, flow: 8, id: 'a4' },
        ],
      },
      {
        id: 'a4',
        x: 100,
        y: 550,
        to: [
          // eslint-disable-next-line object-curly-newline
          { x: 100, y: 300, flow: 29, id: 'a1' },
          // eslint-disable-next-line object-curly-newline
          { x: 647, y: 345, flow: 45, id: 'a2' },
        ],
      },
      {
        id: 'a5',
        x: 370,
        y: 150,
        to: [
          // eslint-disable-next-line object-curly-newline
          { x: 100, y: 300, flow: 23, id: 'a1' },
          // eslint-disable-next-line object-curly-newline
          { x: 647, y: 345, flow: 19, id: 'a2' },
          // eslint-disable-next-line object-curly-newline
          { x: 100, y: 550, flow: 67, id: 'a4' },
          // eslint-disable-next-line object-curly-newline
          { x: 490, y: 250, flow: 21, id: 'a6' },
        ],
      },
      {
        id: 'a6',
        x: 490,
        y: 250,
        to: [
          // eslint-disable-next-line object-curly-newline
          { x: 100, y: 300, flow: 76, id: 'a1' },
          // eslint-disable-next-line object-curly-newline
          { x: 647, y: 345, flow: 31, id: 'a2' },
          // eslint-disable-next-line object-curly-newline
          { x: 100, y: 550, flow: 19, id: 'a4' },
          // eslint-disable-next-line object-curly-newline
          { x: 370, y: 150, flow: 29, id: 'a5' },
        ],
      },
      {
        id: 'a7',
        x: 800,
        y: 30,
        // eslint-disable-next-line object-curly-newline
        to: [{ x: 647, y: 345, flow: 1, id: 'a2' }],
      },
      {
        id: 'a8',
        x: 325,
        y: 550,
        // eslint-disable-next-line object-curly-newline
        to: [
          // eslint-disable-next-line object-curly-newline
          { x: 100, y: 300, flow: 26, id: 'a1' },
          // eslint-disable-next-line object-curly-newline
          { x: 647, y: 345, flow: 51, id: 'a2' },
          // eslint-disable-next-line object-curly-newline
          { x: 100, y: 550, flow: 29, id: 'a4' },
          // eslint-disable-next-line object-curly-newline
          { x: 370, y: 150, flow: 99, id: 'a5' },
        ],
      },
      {
        id: 'a9',
        x: 100,
        y: 150,
        // eslint-disable-next-line object-curly-newline
        to: [
          // eslint-disable-next-line object-curly-newline
          { x: 100, y: 300, flow: 26, id: 'a1' },
          // eslint-disable-next-line object-curly-newline
          { x: 647, y: 345, flow: 51, id: 'a2' },
          // eslint-disable-next-line object-curly-newline
          { x: 320, y: 380, flow: 55, id: 'a3' },
          // eslint-disable-next-line object-curly-newline
          { x: 100, y: 550, flow: 29, id: 'a4' },
          // eslint-disable-next-line object-curly-newline
          { x: 370, y: 150, flow: 99, id: 'a5' },
          // eslint-disable-next-line object-curly-newline
          { x: 490, y: 250, flow: 21, id: 'a6' },
          // eslint-disable-next-line object-curly-newline
          { x: 800, y: 30, flow: 21, id: 'a7' },
          // eslint-disable-next-line object-curly-newline
          { x: 325, y: 550, flow: 21, id: 'a8' },
        ],
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
</style>
