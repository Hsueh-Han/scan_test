<template>
  <table class="table table-striped table-hover text-table">
    <thead>
      <tr>
        <th class="border-0 text-th" scope="col"> {{$t('__vendor')}} </th>
        <th class="border-0 text-th" scope="col"> {{$t('__total')}} </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in listData" :key="item.title">
        <td>{{ item.title }}</td>
        <td>{{ `${item.data} (${item.percent})` }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: ['listData'],
};
</script>

<style lang="scss">
  .text-th{
    color: #f96332;
    font-size: 1.45em;
    font-weight: 300;
  }
  .text-table tr{
    color: #606266;
  }
</style>
