javascript: (function () {
  var p = document.getElementById("productTitle"); //書籍のタイトルの処理
  if (!p) var p = document.getElementById("ebooksProductTitle");
  var title = window.prompt(
    'Scrap "Amazon" to your scrapbox.',
    p.innerText.trim()
  );
  if (!title) return;
  title = "『" + title + "』";
  var asin = document.getElementById("ASIN"); //ASIN番号の処理
  if (asin) {
    var a = "ISBN:" + asin.value;
  } else {
    var asin = document.getElementsByName("ASIN.0")[0],
      a = "ASIN:" + asin.value;
  }
  var detail = document.getElementById("detailBullets_feature_div"); //出版社と出版年月の処理
  if (!detail) {
    var subdoc = document.getElementById("product-description-iframe")
      .contentWindow.document;
    var detail = subdoc.getElementById("productDetailsTable");
  }
  var detailtext = detail.innerText;
  var pubdata = detailtext.match(/(出版社 : .+)(\(.+\))/); //[1]出版社:シーアンドアール研究所,[2](2018/7/27)
  if (pubdata) {
    pubdata[1] = pubdata[1].replace(/:/, ":["); //出版社名をリンクにしないならこの2行は削除する
    pubdata[1] = pubdata[1].match(/;/)
      ? pubdata[1].replace(/;/, "];")
      : pubdata[1] + "]";
    //pubdata[2] = pubdata[2] + ' ';//リンクなし
    //pubdata[2] = pubdata[2].replace(/\((\d+)\//, '([$1]/') + ' ';//年をリンクに
    pubdata[2] = pubdata[2].replace(/\((\d+\/\d+)\//, "([$1]/") + " "; //年月をリンクに
  } else {
    var pubdata = ["", "", ""];
  }
  var isbookDesc_iframe = document.getElementById("bookDesc_iframe") != null;
  if (isbookDesc_iframe) {
    var decsdoc =
      document.getElementById("bookDesc_iframe").contentWindow.document; //内容紹介の処理
    var d = decsdoc.getElementById("iframeContent");
    if (d) {
      //内容紹介が存在しているなら
      var d1 = d.innerText.replace(/\n/g, "\n>");
    } else {
      var d1 = ""; //内容紹介が空っぽの場合
    }
  } else {
    var d1 = ""; //内容紹介が空っぽの場合
  }

  var image = document.getElementById("imgBlkFront"); //書影の処理
  if (!image) var image = document.getElementById("ebooksImgBlkFront");
  var imageurl = image.getAttribute("src");
  var pub = []; //著者情報の処理
  var c = document.getElementsByClassName("author");
  for (g = 0; g < c.length; g++) {
    var at = c[g].innerText.replace(/\r?\n/g, "").replace(/,/, "");
    var pu = at.match(/\(.+\)/);
    var ct = at.replace(/\(.+\)/, "").replace(/ /g, "");
    pub.push(pu + " [" + ct + "]");
  }
  var lines =
    "[" +
    imageurl +
    " " +
    window.location.href +
    "]\n" +
    pub.join(" ") +
    "\n" +
    pubdata[1] +
    pubdata[2] +
    a +
    "\n>" +
    d1 +
    "\n#書籍名\n"; //ページへの書き込み内容。ここで順番を変えればページ内容も変わります。
  var body = encodeURIComponent(lines);
  window.open(
    "https://scrapbox.io/ryoh827/" +
      encodeURIComponent(title.trim()) +
      "?body=" +
      body
  );
})();
