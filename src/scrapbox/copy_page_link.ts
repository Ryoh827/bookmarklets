javascript: (function () {
  window.prompt(
    "ScrapLink",
    "[" +
      document.title.replace(/\s*[\[\]]\s*/g, " ") +
      " " +
      location.href +
      "]"
  );
})();
