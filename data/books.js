// 本地双击打开（file:// 协议）时，浏览器禁止 fetch 读取本地 JSON，
// 因此用 <script> 标签引入同一份数据；HTTP 方式仍走 fetch('data/books.json')。
window.BOOKS_DATA = {
  "title": "图书馆借阅月报",
  "months": ["一月", "二月", "三月", "四月"],
  "series": [
    { "category": "文学", "counts": [320, 301, 334, 390] },
    { "category": "科技", "counts": [120, 132, 101, 134] },
    { "category": "历史", "counts": [80, 92, 110, 98] }
  ]
};
