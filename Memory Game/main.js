"use strict";
{
  const cards = [];
  const cardBox = document.getElementById("js-card-box");
  let flipCount = 0,
    correctCount = 0,
    countUp = 0,
    firstCard = null,
    secondCard = null,
    countDown = 3;

  function init() {
    const cardpairNum = 8;
    for (let i = 1; i <= cardpairNum; i++) {
      // cards[cards.length] = createCard(i);
      // cards[cards.length] = createCard(i);
      const cardA = createCard(i);
      const cardB = createCard(i);
      cards.push(cardA);
      cards.push(cardB); //memo:こうすると上手くいった
    }

    while (cards.length) {
      const pos = Math.floor(Math.random() * cards.length);
      cardBox.appendChild(cards.splice(pos, 1)[0]); //memo:spliceの返値は配列
    }
  }

  function createCard(num) {
    const inner =
      '<div class="p-card-back">？</div><div class="p-card-front">*</div>';
    const card = document.createElement("div");
    card.className = "p-card";
    card.innerHTML = inner.replace("*", num);
    card.addEventListener("click", function () {
      flipCard(this);
    });
    const container = document.createElement("div");
    container.className = "p-card-container";
    container.appendChild(card);
    return container;
    //memo:もしreturnがないと関数内で処理を行うのみで終了になってしまう。戻り値があることで処理結果を別の処理で使いまわすことができる。こうして、cardsの配列ができる。
  }

  function flipCard(card) {
    if (firstCard != null && secondCard != null) {
      return;
    }

    if (card.className.indexOf("is-open") === -1) {
      card.classList.add("is-open");
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
      firstCard.classList.remove("is-open");
      secondCard.classList.remove("is-open");
    }
    firstCard = null;
    secondCard = null;
  }

  const start = document.querySelector(".p-start");
  const menu = document.querySelector(".p-menu");
  const replay = document.querySelector(".p-menu__item__replay");
  const clickReplay = document.getElementById("js-replay");
  document.getElementById("js-soloPlay").addEventListener("click", function () {
    start.classList.add("u-display__hidden");
    menu.classList.add("u-display__visible");
    gameStart();
    clickReplay.addEventListener("click", function () {
      rePlay();
    });
  });

  const timerA = document.querySelector(".p-menu__item__count-down");

  function gameStart() {
    timerA.classList.add("u-border__bottom");
    timerA.innerHTML = countDown;
    countDown--;
    const cleartimeoutId = setTimeout(gameStart, 1000);

    if (countDown === -1) {
      clearTimeout(cleartimeoutId);
      timerA.innerHTML = "始め！";
      replay.classList.add("u-display__flex");
      init();
      countTime();
    }
  }

  function countTime() {
    if (countDown > -1) {
      return;
    }
    const timerB = document.querySelector(".p-menu__item__count-up");
    timerB.classList.add("u-border__bottom");
    timerB.innerHTML = `${countUp}<span>秒経過</span>`;
    countUp++;
    const cleartimeoutId = setTimeout(countTime, 1000);
    if (correctCount === 8) {
      clearTimeout(cleartimeoutId);
      timerA.innerHTML = "終了！";
      showResult();
    }
  }

  const result = document.querySelector(".p-menu__item__result");

  function showResult() {
    const createSpan01 = document.createElement("span");
    createSpan01.setAttribute("id", "p-menu__item__result-title");
    createSpan01.textContent = "【評価】";
    result.appendChild(createSpan01);
    const createSpan02 = document.createElement("span");
    createSpan02.setAttribute("id", "p-menu__item__result-rank");
    result.appendChild(createSpan02);

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
      rank.innerHTML = "A";
      rank.style.color = colorRed;
    } else if (countUp <= 50) {
      rank.innerHTML = "B";
      rank.style.color = colorBlue;
    } else {
      rank.innerHTML = "C";
      rank.style.color = colorGreen;
    }
  }

  function rePlay() {
    if (countDown > -1) {
      return;
    }
    cardBox.innerHTML = "";
    const resultTitle = document.getElementById("p-menu__item__result-title");
    if (resultTitle !== null) {
      resultTitle.textContent = "【前回の評価】";
    }
    countDown = 3;
    countUp = 0;
    correctCount = 0;
    setTimeout(gameStart, 500);
  }

  const startDual = document.querySelector(".p-start-dual");
  const tripleMenu = document.querySelector(".p-triple-menu");
  document.getElementById('js-dualPlay').addEventListener('click', ()=>{
    start.classList.add("u-display__hidden");
    startDual.classList.add("u-display__visible");
  })
  
  const determine = document.querySelector(".p-start-dual__determine");
  const player1 = document.getElementById("js-yourname1").value;
  const player2 = document.getElementById("js-yourname2").value;

  function reflect(){
    const reflectedyourName1 = document.getElementById('js-reflectedName1');
    const reflectedyourName2 = document.getElementById('js-reflectedName2');
    reflectedyourName1.textContent = player1;
    reflectedyourName2.textContent = player2;
  }

  determine.addEventListener('click', ()=>{
    reflect();
    startDual.classList.add("u-display__hidden")
    tripleMenu.classList.add("u-display__flex");
  })  
}

//2人プレイモードは対戦形式でポイント制 もう一つ変数を用意してあげて、剰余で条件分岐かな？
