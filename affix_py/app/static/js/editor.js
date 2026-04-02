(function () {
  function bootEditor() {
    var source = document.getElementById("content");
    var mount = document.getElementById("wysiwyg-editor");

    if (!source || !mount) {
      return;
    }

    if (!window.toastui || !window.toastui.Editor) {
      source.classList.remove("fallback-editor");
      return;
    }

    var initialMarkdown = source.value || mount.dataset.initialMarkdown || "";
    var editor = new window.toastui.Editor({
      el: mount,
      initialEditType: "wysiwyg",
      previewStyle: "vertical",
      height: "680px",
      initialValue: initialMarkdown,
      usageStatistics: false,
      hideModeSwitch: false,
    });

    function sync() {
      source.value = editor.getMarkdown();
    }

    editor.on("change", sync);
    window.affixEditorSync = sync;
    sync();
    source.classList.add("u-hidden");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootEditor);
  } else {
    bootEditor();
  }
})();
