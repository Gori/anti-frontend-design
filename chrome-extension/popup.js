const toggle = document.getElementById('toggle');
const status = document.getElementById('status');

chrome.storage.local.get('slopEnabled', (data) => {
  toggle.checked = !!data.slopEnabled;
  updateStatus(toggle.checked);
});

toggle.addEventListener('change', () => {
  const enabled = toggle.checked;
  chrome.storage.local.set({ slopEnabled: enabled });
  updateStatus(enabled);

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]) {
      chrome.tabs.sendMessage(tabs[0].id, { action: enabled ? 'enable' : 'disable' });
    }
  });
});

function updateStatus(enabled) {
  status.textContent = enabled ? '✨ Elevating the web ✨' : 'Inactive';
  status.className = 'status' + (enabled ? ' active' : '');
}
