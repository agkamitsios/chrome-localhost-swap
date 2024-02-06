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

chrome.commands.onCommand.addListener(function (command) {
  switch (command) {
    case 'change-host-name':
      openLinkInLocalhost()
      break;
    default:
      console.log(`Command ${command} not found`);
  }
});

async function openLinkInLocalhost(info) {
  const query = { active: true, currentWindow: true };
  chrome.tabs.query(query, async (tabs) => {
    let linkUrl = new URL(tabs[0].url);

    const { port = 3000 } = await chrome.storage.sync.get();
    let { pathname, search, hash } = linkUrl;

    const newLocation = `http://localhost:${port}${pathname}${search}${hash}`;

    if (info && info.menuItemId === 'link_new_tab') {
      chrome.tabs.create({ url: newLocation });
    } else {
      chrome.tabs.update(tabs[0].id, { url: newLocation });
    }
  });
}
