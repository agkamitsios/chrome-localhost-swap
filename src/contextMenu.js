chrome.runtime.onInstalled.addListener(function() {

  chrome.contextMenus.create({
    title: 'Open link in localhost',
    contexts: ['link'],
    id: 'link'
  });

});
chrome.contextMenus.onClicked.addListener(openLinkInLocalhost);

async function openLinkInLocalhost(info) {
  let linkUrl;
  try {
    linkUrl = new URL(info.linkUrl);
  } catch (e) {
    console.error(e);
  }
  const { port = 3000 } = await chrome.storage.sync.get();
  let { pathname, search, hash } = linkUrl;
  const newLocation = `http://localhost:${port}${pathname}${search}${hash}`;

  chrome.tabs.create({ url: newLocation });
}
