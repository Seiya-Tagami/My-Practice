"use strict";

{
  const cards = [];
  const cardBox = document.getElementById("js-card-box");
  let flipCount = 0,
    correctCount = 0,
    firstCard = null,
    secondCard = null;

  function init() {
    const cardpairNum = 8; //カード生成
    for (let i = 1; i <= cardpairNum; i++) {
      const cardA = createCard(i);
      const cardB = createCard(i);
      cards.push(cardA);
      cards.push(cardB); //memo:こうすると上手くいった
    }

    while (cards.length) {
      const pos = Math.floor(Math.random() * cards.length);
      cardBox.appendChild(cards.splice(pos, 1)[0]); //memo:spliceの返値は配列
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
    }
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
  const startDual = document.querySelector(".p-start-dual");
  const tripleMenu = document.querySelector(".p-triple-menu");
  document.getElementById("js-dualPlay").addEventListener("click", () => {
    start.classList.add("u-display__hidden");
    startDual.classList.add("u-display__visible");
  });

  const determine = document.querySelector(".p-start-dual__determine");

  function reflect() {
    const player1 = document.getElementById("js-yourname1").value;
    const player2 = document.getElementById("js-yourname2").value;
    const reflectedyourName1 = document.getElementById("js-reflectedName1");
    const reflectedyourName2 = document.getElementById("js-reflectedName2");
    reflectedyourName1.textContent = player1;
    reflectedyourName2.textContent = player2;
  }

  determine.addEventListener("click", () => {
    if (
      document.getElementById("js-yourname1").value !== "" &&
      document.getElementById("js-yourname2").value !== ""
    ) {
      startDual.classList.add("u-display__hidden");
      tripleMenu.classList.add("u-display__flex");
      reflect();
      init();
    }
  });
}
