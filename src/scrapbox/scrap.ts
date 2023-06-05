javascript: (() => {
  const PROJECT = 'ryoh827'; // Webページを保存するproject

  const title = document.title;
  const lines = [];
  const quote = window.getSelection()?.toString().trim(); // 選択範囲の文字列を取得
  if (quote) {
    lines.push(
      ...quote
        .split(/[\f\n\r]/g) // 改行区切りで配列化
        .filter((line) => line !== '') // 空行は削除
        .map((line) => `>${line}`), // 引用記号
      '' // 空行
    );
  }
  lines.push(
    title, // 保存するページのタイトル
    decodeURIComponent(window.location.href), // 保存するページのリンク
    '',
    '',
    ''
  );
  const body = encodeURIComponent(lines.join('\n'));
  window.open(`https://scrapbox.io/${PROJECT}/${title}?body=${body}`, '_self');
})();
