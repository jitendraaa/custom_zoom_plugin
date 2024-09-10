chrome.windows.getCurrent({populate: false}, (window) => {
    let windowId = window.id;
    chrome.storage.sync.get([windowId.toString()], (data) => {
      const zoomLevel = data[windowId] || 1.0;
      document.body.style.transform = `scale(${zoomLevel})`;
      document.body.style.transformOrigin = '0 0';
    });
  });
  