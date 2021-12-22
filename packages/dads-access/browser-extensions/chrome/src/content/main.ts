const port = chrome.runtime.connect({ name: "content" });

window.addEventListener("message", (event) => {
  // We only accept messages from ourselves
  if (event.source != window) {
    return;
  }

  if (event.data.target && event.data.target == "dads-access") {
    port.postMessage(event.data);
  }
});

port.onMessage.addListener(function (msg) {
  if (!msg.target) return;
  if (msg.target !== "dads-app") return;
  if (!msg.event) return;

  window.postMessage(msg);
});

export {};