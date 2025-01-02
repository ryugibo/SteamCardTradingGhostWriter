chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(
    sender.tab
      ? "from a content script:" + sender.tab.url
      : "from the extension"
  );
  if (request.greeting === "hello") {
    const elements = document.getElementsByClassName("badge_card_set_card");

    const have = [];
    const want = [];
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      if (element.classList.contains("owned")) {
        const cardCountText = element
          .getElementsByClassName("badge_card_set_title")[0]
          .childNodes[1].innerText.trim();
        const cardName = element
          .getElementsByClassName("badge_card_set_title")[0]
          .childNodes[2].nodeValue.trim();
        const qtyRegex = /\d+/;
        const card_count = qtyRegex.exec(cardCountText)[0];
        if (card_count > 1) {
          have.push({
            name: cardName,
            index: i + 1,
          });
        }
      } else if (element.classList.contains("unowned")) {
        const cardName = element
          .getElementsByClassName("badge_card_set_title")[0]
          .childNodes[0].nodeValue.trim();
        want.push({
          name: cardName,
          index: i + 1,
        });
      }
    }

    sendResponse({ have, want });
  }
});
