"use strict";

{
  const cards = [];
  const cardBox = document.getElementById("js-card-box");
  let flipCount = 0,
    totalcorrectCount = 0,
    player1correctCount = 0,
    player2correctCount = 0,
    turnCount = 0,
    firstCard = null,
    secondCard = null;

  const cardpairNum = 8; //カード生成
  function init() {
    for (let i = 0; i < cardpairNum; i++) {
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
      const cardInner = [
        "POSSE",
        "HTML",
        "CSS",
        "JS",
        "PHP",
        "SQL",
        "Python",
        "Laravel",
      ];

      const inner =
        '<div class="p-card-back">？</div><div class="p-card-front">*</div>';
      const card = document.createElement("div");
      card.className = "p-card";
      card.innerHTML = inner.replace("*", cardInner[num]);
      card.addEventListener("click", function () {
        flipCard(this);
      });
      const container = document.createElement("div");
      container.className = "p-card-container";
      container.appendChild(card);
      return container;
    }
  }

  function showYourturn(){
    const player1Yourturn = document.getElementById('js-player1-your-turn');
    const player2Yourturn = document.getElementById('js-player2-your-turn');
    if(turnCount % 2 === 1){
      player2Yourturn.classList.remove('p-triple-menu__item__content__your-turn');
      player2Yourturn.textContent = "";
      player1Yourturn.classList.add('p-triple-menu__item__content__your-turn');
      player1Yourturn.textContent = "あなたの番です";
    }
    if(turnCount % 2 === 0){
      player1Yourturn.classList.remove('p-triple-menu__item__content__your-turn');
      player1Yourturn.textContent = "";
      player2Yourturn.classList.add('p-triple-menu__item__content__your-turn');
      player2Yourturn.textContent = "あなたの番です";
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
      turnCount++;
      console.log(turnCount);
      setTimeout(function () {
        judge();
      }, 900); //memo:カードをめくり終わった時に実行
    }
  }

  function judge() {
    if (
      firstCard.children[1].textContent === secondCard.children[1].textContent
    ) {
      if (turnCount % 2 === 1) {
        player1correctCount++;
        document.getElementById(
          "js-player1-score"
        ).textContent = `得点 ${player1correctCount}点`;
        // turnCount++;
      }
      if (turnCount % 2 === 0) {
        player2correctCount++;
        document.getElementById(
          "js-player2-score"
        ).textContent = `得点 ${player2correctCount}点`;
        // turnCount++;
      }
      totalcorrectCount++;
    } else {
      firstCard.classList.remove("is-open");
      secondCard.classList.remove("is-open");
      // turnCount++;
    }
    firstCard = null;
    secondCard = null;

    if (totalcorrectCount === cardpairNum) {
      showResult();
    }
  }

  const resultPlayer1 = document.getElementById("js-player1-result");
  const resultPlayer2 = document.getElementById("js-player2-result");
  function showResult() {
    if (player1correctCount > player2correctCount) {
      resultPlayer1.innerHTML = "あなたの<br>勝利です";
      resultPlayer1.classList.add("p-triple-menu__item__content__win");
      resultPlayer2.innerHTML = "あなたの<br>負けです";
      resultPlayer2.classList.add("p-triple-menu__item__content__lose");
    }
    if (player1correctCount === player2correctCount) {
      resultPlayer1.textContent = "引き分け";
      resultPlayer1.classList.add("p-triple-menu__item__content__draw");
      resultPlayer2.textContent = "引き分け";
      resultPlayer2.classList.add("p-triple-menu__item__content__draw");
    }
    if (player1correctCount < player2correctCount) {
      resultPlayer1.innerHTML = "あなたの<br>負けです";
      resultPlayer1.classList.add("p-triple-menu__item__content__lose");
      resultPlayer2.innerHTML = "あなたの<br>勝利です";
      resultPlayer2.classList.add("p-triple-menu__item__content__win");
    }
  }

  const start = document.querySelector(".p-start");
  const startDual = document.querySelector(".p-start-dual");
  const tripleMenu = document.querySelector(".p-triple-menu");
  document.getElementById("js-dualPlay").addEventListener("click", () => {
    start.classList.add("u-display__hidden");
    startDual.classList.add("u-display__visible");
  });

  const determine = document.querySelector(".p-start-dual__buttons-determine");

  determine.addEventListener("click", () => {
    if (
      document.getElementById("js-yourname1").value !== "" &&
      document.getElementById("js-yourname2").value !== ""
    ) {
      startDual.classList.add("u-display__hidden");
      tripleMenu.classList.add("u-display__flex");
      reflect();
      init();
    } else {
      alert("名前を入力してください");
    }
  });

  function reflect() {
    const player1 = document.getElementById("js-yourname1").value;
    const player2 = document.getElementById("js-yourname2").value;
    const reflectedyourName1 = document.getElementById("js-reflectedName1");
    const reflectedyourName2 = document.getElementById("js-reflectedName2");
    reflectedyourName1.textContent = player1;
    reflectedyourName2.textContent = player2;
  }

  const clickReplay = document.getElementById("js-replay2");
  clickReplay.addEventListener("click", () => {
    rePlay();
  });

  function rePlay() {
    cardBox.innerHTML = "";
    startDual.classList.remove("u-display__hidden");
    startDual.classList.add("u-display__visible");
    tripleMenu.classList.remove("u-display__flex");
    tripleMenu.classList.add("u-display__hidden");
    flipCount = 0;
    firstCard = null;
    secondCard = null;
    player1correctCount = 0;
    document.getElementById("js-player1-score").textContent = "得点 0点";
    document.getElementById("js-player2-score").textContent = "得点 0点";
    player2correctCount = 0;
    totalcorrectCount = 0;
    turnCount = 0;
    document.getElementById("js-yourname1").value = "";
    document.getElementById("js-yourname2").value = "";
    resultPlayer1.classList.remove(...resultPlayer1.classList);
    resultPlayer1.textContent = "";
    resultPlayer2.classList.remove(...resultPlayer2.classList);
    resultPlayer2.textContent = "";
  }
}
