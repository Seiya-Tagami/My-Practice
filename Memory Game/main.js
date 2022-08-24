"use strict";
{
  const cards = [];
  const cardBox = document.getElementById("p-card-box");
  let flipCount = 0,
    correctCount = 0,
    countUp = 0,
    firstCard = null,
    secondCard = null,
    countDown = 3;

  function init() {
    const cardpairNum = 8;
    for (let i = 1; i <= cardpairNum; i++) {
      cards[cards.length] = createCard(i);
      cards[cards.length] = createCard(i);
    }

    while (cards.length) {
      const pos = Math.floor(Math.random() * cards.length);
      cardBox.appendChild(cards.splice(pos, 1)[0]); //memo:spliceの返値は配列
    }
  }

  function createCard(num) {
    const inner =
      '<div class="card-back">？</div><div class="card-front">*</div>';
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = inner.replace("*", num);
    card.addEventListener("click", function () {
      flipCard(this);
    });
    const container = document.createElement("div");
    container.className = "card-container";
    container.appendChild(card);
    return container;
    //memo:もしreturnがないと関数内で処理を行うのみで終了になってしまう。戻り値があることで処理結果を別の処理で使いまわすことができる。こうして、cardsの配列ができる。
  }

  function flipCard(card) {
    if (firstCard != null && secondCard != null) {
      return;
    }

    if (card.className.indexOf("open") === -1) {
      card.className = "card open";
    } else {
      return;
    }
    flipCount++;
    if (flipCount % 2 === 1) {
      firstCard = card;
    } else {
      secondCard = card;
      setTimeout(function () {
        judge();
      }, 900); //memo:カードをめくり終わった時に実行
    }
  }

  function judge() {
    if (
      firstCard.children[1].textContent === secondCard.children[1].textContent
    ) {
      correctCount++;
    } else {
      firstCard.className = "card";
      secondCard.className = "card";
    }
    firstCard = null;
    secondCard = null;
  }

  const start = document.querySelector(".p-start");
  const replay = document.querySelector(".p-menu__item__replay");
  const clickReplay = document.getElementById("js-replay");
  document.getElementById("js-soloPlay").addEventListener("click", function () {
    start.classList.add("u-display__hidden");
    gameStart();
    clickReplay.addEventListener("click", function () {
      rePlay();
    });
  });

  const timer1 = document.querySelector(".p-menu__item__count-down");

  function gameStart() {
    if (clickReplay.classList.contains("stop")) {
      return;
    }

    timer1.classList.add("u-border__bottom");
    timer1.innerHTML = countDown;
    countDown--;
    const cleartimeoutId = setTimeout(gameStart, 1000);

    if (countDown === -1) {
      clearTimeout(cleartimeoutId);
      timer1.innerHTML = "始め！";
      replay.classList.add("u-display__flex");
      init();
      clickReplay.classList.remove("stop2");
      countTime();
    }
  }

  function countTime() {
    if (clickReplay.classList.contains("stop2")) {
      return;
    }
    const timer2 = document.querySelector(".p-menu__item__count-up");
    timer2.classList.add("u-border__bottom");
    timer2.innerHTML = `${countUp}<span>秒経過</span>`;
    countUp++;
    const cleartimeoutId = setTimeout(countTime, 1000);

    if (correctCount === 8) {
      clearTimeout(cleartimeoutId);
      timer1.innerHTML = "終了！";
      showResult();
    }
  }

  const result = document.querySelector(".p-menu__item__result");

  function showResult() {
    result.innerHTML =
      '<span id="p-menu__item__result-title">【評価】</span><span id="p-menu__item__result-rank"></span>';
    result.classList.add("u-border__bottom");
    const rank = document.getElementById("p-menu__item__result-rank");
    const colorGold = "#efBb24";
    const colorPurple = "#533d5b";
    const colorRed = "#6d2e5b";
    const colorBlue = "#2b5f75";
    const colorGreen = "#00896c";

    if (countUp <= 35) {
      rank.innerHTML = "S+";
      rank.style.color = colorGold;
    } else if (countUp <= 40) {
      rank.innerHTML = "S";
      rank.style.color = colorPurple;
    } else if (countUp <= 45) {
      rank.innerHTML = colorRed;
      rank.style.color = "";
    } else if (countUp <= 50) {
      rank.innerHTML = "B";
      rank.style.color = colorBlue;
    } else {
      rank.innerHTML = "C";
      rank.style.color = colorGreen;
    }
  }

  function rePlay() {
    // while (cardBox.firstChild) {
    //   cardBox.removeChild(cardBox.firstChild);
    // }
    cardBox.innerHTML = "";
    const resultTitle = document.getElementById("p-menu__item__result-title");
    if (resultTitle !== null) {
      resultTitle.textContent = "【前回の評価】";
    }
    countDown = 3;
    countUp = 0;
    correctCount = 0;
    clickReplay.classList.add("stop", "stop2");
    setTimeout(gameStart, 500);
    setTimeout(clickReplay.classList.remove("stop"), 500); //memo:ここらへんもっと良い方法ある気がする
  }
}

//2人プレイモードは対戦形式でポイント制 もう一つ変数を用意してあげて、剰余で条件分岐かな？
