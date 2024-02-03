function getOs() {
  const userAgent = window.navigator.userAgent;
  const regexTest = (string) => {
    const regex = new RegExp(string, 'i');
    return regex.test(userAgent);
  };

  if (regexTest('mac')) {
    return 'Mac OS';
  } else if (regexTest('linux')) {
    return 'Linux';
  } else {
    return 'Windows';
  }
}

function getCtrlKey(e) {
  if (getOs() === 'Mac OS') {
    return e.metaKey;
  } else {
    return e.ctrlKey;
  }
}

const button = document.getElementById('change-host');

async function changeHostName(e) {
  const { port = 3000 } = await chrome.storage.sync.get();
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
      try {
        const url = new URL(tab.url);
        let { pathname, search, hash } = url;
        const newLocation = `http://localhost:${port}${pathname}${search}${hash}`;

        if (e.button === 0) {
          if (getCtrlKey(e)) {
            chrome.tabs.create({ url: newLocation });
          } else {
            chrome.tabs.update(tab.id, { url: newLocation });
          }
        }
        if (e.button === 1) {
          chrome.tabs.create({ url: newLocation });
        }
      } catch (e) {
        console.error(e);
      }
    }
  );
}

button.addEventListener('mouseup', changeHostName);
