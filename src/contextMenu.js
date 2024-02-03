chrome.runtime.onInstalled.addListener(function() {

  chrome.contextMenus.create({
    title: 'Open link in new Tab in localhost',
    contexts: ['link'],
    id: 'link_new_tab'
  });

  chrome.contextMenus.create({
    title: 'Open link in localhost',
    contexts: ['link'],
    id: 'link'
  });
});
chrome.contextMenus.onClicked.addListener(openLinkInLocalhost);

async function openLinkInLocalhost(info) {
  console.log(info);
  let linkUrl;
  try {
    linkUrl = new URL(info.linkUrl);
  } catch (e) {
    console.error(e);
  }
  const { port = 3000 } = await chrome.storage.sync.get();
  let { pathname, search, hash } = linkUrl;
  const newLocation = `http://localhost:${port}${pathname}${search}${hash}`;
  if (info.menuItemId === 'link_new_tab') {
  chrome.tabs.create({ url: newLocation });
  } else {
    chrome.tabs.query(
      {
        active: true,
        currentWindow: true
      },
      (array_of_Tabs) => {
        const tab = array_of_Tabs[0];
        if (!tab) {
          return;
        }
        chrome.tabs.update(tab.id, { url: newLocation });
      }
    );

  }
}
