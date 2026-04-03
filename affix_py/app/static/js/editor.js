(function () {
  function bootEditorWorkspace() {
    var stage = document.querySelector("[data-editor-stage]");

    if (!stage) {
      return;
    }

    var buttons = Array.prototype.slice.call(
      document.querySelectorAll("[data-editor-view]")
    );
    var refreshButton = document.querySelector("[data-preview-refresh]");

    function setView(nextView, shouldRefresh) {
      var view = nextView;

      if (window.matchMedia("(max-width: 980px)").matches && nextView === "split") {
        view = "preview";
      }

      stage.dataset.view = view;

      buttons.forEach(function (button) {
        var isActive = button.dataset.editorView === nextView;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-pressed", isActive ? "true" : "false");
      });

      if (shouldRefresh && refreshButton) {
        refreshButton.click();
      }
    }

    buttons.forEach(function (button) {
      button.addEventListener("click", function () {
        var targetView = button.dataset.editorView;
        setView(targetView, targetView !== "write");
      });
    });

    setView("write", false);
  }

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
    document.addEventListener("DOMContentLoaded", function () {
      bootEditor();
      bootEditorWorkspace();
    });
  } else {
    bootEditor();
    bootEditorWorkspace();
  }
})();
