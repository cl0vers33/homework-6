const state = { data: null };

let barChart = null;
let lineChart = null;

const loadData = async () => {
  $('#status').text('加载中...').show();
  try {
    let data;
    if (location.protocol === 'file:') {
      // 双击本地打开（file://）时浏览器禁止 fetch 本地文件，改用 <script> 引入的数据
      data = window.WEATHER_DATA;
    } else {
      const response = await fetch('data/weather.json');
      if (!response.ok) {
        throw new Error('HTTP ' + response.status);
      }
      data = await response.json();
    }
    if (data.series.length === 0) {
      $('#status').text('暂无数据').show();
      return;
    }
    state.data = data;
    $('#sub-title').text(data.title + ' · 数据来源：昆明近7日天气观测数据');
    $('#status').hide();
    renderCards(data);
    renderBarChart(data);
    renderLineChart(data);
  } catch (error) {
    $('#status').text('加载失败：' + error.message).show();
  }
};

const renderCards = (data) => {
  const days = data.days;
  data.series.forEach(s => {
    const raw = s.counts.reduce((sum, n) => sum + n, 0);
    const value = s.stat === 'avg'
      ? (raw / s.counts.length).toFixed(1)
      : raw.toFixed(1);
    const statText = s.stat === 'avg' ? '7日平均值' : '7日累计值';
    $('#cards').append(`
      <div class="col-md-4">
        <div class="card">
          <div class="card-body">
            <h3 class="card-title h6">${s.category}</h3>
            <p class="card-text fs-4">${value} ${s.unit}</p>
            <p class="card-text small text-muted">共${days.length}天观测 · ${statText}</p>
          </div>
        </div>
      </div>
    `);
  });
};

const renderBarChart = (data) => {
  if (barChart === null) {
    barChart = echarts.init(document.querySelector('#bar-chart'));
  }
  barChart.setOption({
    title: { text: '昆明近7日天气数据', left: 'center' },
    tooltip: { trigger: 'axis' },
    legend: { bottom: 0 },
    xAxis: { data: data.days },
    yAxis: { name: '数值' },
    series: data.series.map(s => ({
      name: s.category + '(' + s.unit + ')',
      type: 'bar',
      data: s.counts
    }))
  });
};

const renderLineChart = (data) => {
  if (lineChart !== null) {
    lineChart.destroy();               // 防重复初始化
  }
  const ctx = document.querySelector('#line-chart');
  lineChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.days,
      datasets: data.series.map(s => ({
        label: s.category + '(' + s.unit + ')',
        data: s.counts,
        borderWidth: 1
      }))
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: { display: true, text: '昆明天气趋势（7日）' }
      }
    }
  });
};

window.addEventListener('resize', () => {
  if (barChart) barChart.resize();
  // Chart.js响应式默认自动处理，无需手动
});

$('#cards').on('click', '.card', function () {    // 事件委托：jQuery内置写法
  $(this).toggleClass('border-primary shadow');
});

loadData();
