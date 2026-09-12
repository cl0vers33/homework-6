// app.js
const state = { data: null };

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

loadData();
