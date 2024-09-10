document.getElementById('zoom-in').addEventListener('click', () => {
    chrome.windows.getCurrent({populate: false}, (window) => {
      let windowId = window.id;
      chrome.storage.sync.get([windowId.toString()], (data) => {
        let zoomLevel = data[windowId] || 1.0;
        zoomLevel += 0.1;
        chrome.storage.sync.set({ [windowId]: zoomLevel }, () => {
          applyZoomToCurrentWindow(windowId, zoomLevel);
        });
      });
    });
  });
  
  document.getElementById('zoom-out').addEventListener('click', () => {
    chrome.windows.getCurrent({populate: false}, (window) => {
      let windowId = window.id;
      chrome.storage.sync.get([windowId.toString()], (data) => {
        let zoomLevel = data[windowId] || 1.0;
        zoomLevel = Math.max(0.1, zoomLevel - 0.1);  // Prevent zooming out too much
        chrome.storage.sync.set({ [windowId]: zoomLevel }, () => {
          applyZoomToCurrentWindow(windowId, zoomLevel);
        });
      });
    });
  });
  
  function applyZoomToCurrentWindow(windowId, zoomLevel) {
    chrome.tabs.query({ windowId: windowId }, (tabs) => {
      tabs.forEach((tab) => {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: (zoomLevel) => {
            document.body.style.transform = `scale(${zoomLevel})`;
            document.body.style.transformOrigin = '0 0';
          },
          args: [zoomLevel]
        });
      });
    });
  }
  