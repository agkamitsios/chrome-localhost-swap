const button = document.getElementById('change-host')

async function changeHostName() {
    const { port = 3000 } = await chrome.storage.sync.get()
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function (array_of_Tabs) {
        const tab = array_of_Tabs[0];
        if (!tab) {
            return;
        }
        try {
            const url = new URL(tab.url);
            let {pathname, search, hash} = url
            const newLocation = `http://localhost:${port}${pathname}${search}${hash}`
            chrome.tabs.update(tab.id, {url: newLocation})
        } catch (e) {
            console.error(e)
        }
    });
}

button.addEventListener("click", () => changeHostName())
