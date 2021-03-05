import i18n from '@/i18n';

export default {
  responsive: true,
  maintainAspectRatio: false,
  layout: {
    padding: {
      top: 20,
      bottom: 20,
    },
  },
  legend: {
    display: false,
  },
  tooltips: {
    mode: 'index',
    intersect: false,
  },
  scales: {
    xAxes: [{
      gridLines: {
        display: false,
      },
      scaleLabel: {
        display: true,
        labelString: i18n.t('__time'),
        fontSize: 12,
      },
    }],
    yAxes: [{
      scaleLabel: {
        display: true,
        labelString: i18n.t('__detectedNumber'),
        fontSize: 12,
      },
      ticks: {
        min: 0,
        // stepSize: 10,
      },
    }],
  },
};
