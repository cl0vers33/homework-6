// 本地双击打开（file:// 协议）时，浏览器禁止 fetch 读取本地 JSON，
// 因此用 <script> 标签引入同一份数据；HTTP 方式仍走 fetch('data/weather.json')。
window.WEATHER_DATA = {
  "title": "昆明天气周报（2026年9月6日—12日）",
  "days": ["9月6日", "9月7日", "9月8日", "9月9日", "9月10日", "9月11日", "9月12日"],
  "series": [
    { "category": "最高气温", "unit": "℃", "stat": "avg", "counts": [24, 22, 21, 25, 23, 22, 24] },
    { "category": "最低气温", "unit": "℃", "stat": "avg", "counts": [17, 16, 15, 17, 16, 15, 16] },
    { "category": "降水量", "unit": "mm", "stat": "sum", "counts": [0, 4.2, 7.8, 0, 1.5, 6.3, 0] }
  ]
};
