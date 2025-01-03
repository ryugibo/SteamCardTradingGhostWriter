window.onload = function () {
  var query = { active: true, currentWindow: true };
  async function callback(tabs) {
    var currentTab = tabs[0]; // there will be only one in this array
    const urlRegex =
      /https:\/\/steamcommunity.com\/profiles\/[0-9]+\/gamecards\/[0-9]+\//;
    if (!urlRegex.exec(currentTab.url)) {
      document.getElementById("divLog").innerText = "Please open a badge page";
      return;
    }
    document.getElementById("divLog").innerText = "Click for copy to clipboard";
    const response = await chrome.tabs.sendMessage(currentTab.id, {
      greeting: "hello",
    });

    const have_cards = response["have"];
    const want_cards = response["want"];

    const haveCardsString = have_cards.map(({ index }) => index).join(", ");
    const wantCardsString = want_cards.map(({ index }) => index).join(", ");
    document.getElementById("txtTitle").value =
      "1:1 [H] " + haveCardsString + " [W] " + wantCardsString;

    document.getElementById("txtContents").value = [
      "[h1][HAVE][/h1]",
      "[list]",
      have_cards.map(({ name }) => `[*] ${name}`).join("\n"),
      "[/list]",
      "[h1][WANT][/h1]",
      "[list]",
      want_cards.map(({ name }) => `[*] ${name}`).join("\n"),
      "[/list]",
    ].join("\n");
  }
  chrome.tabs.query(query, callback);
};

document.getElementById("txtTitle").addEventListener(
  "click",
  () => {
    document.getElementById("txtTitle").select();
    navigator.clipboard.writeText(document.getElementById("txtTitle").value);
    document.getElementById("divLog").innerText = "Title copied to clipboard";
  },
  false
);
document.getElementById("txtContents").addEventListener(
  "click",
  () => {
    document.getElementById("txtContents").select();
    navigator.clipboard.writeText(document.getElementById("txtContents").value);
    document.getElementById("divLog").innerText =
      "Contents copied to clipboard";
  },
  false
);
