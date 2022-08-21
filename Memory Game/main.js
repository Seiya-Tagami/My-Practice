'use strict'
{
  const cards = [];
  const stage = document.getElementById('p-stage')
  let flipCount = 0,
  correctCount = 0,
  firstCard = null,
  secondCard = null,
  countDown = 3;
  
  function init(){
    for(let i = 1; i <= 8; i++){
      cards[cards.length] = createCard(i);
      cards[cards.length] = createCard(i);
    }
    while(cards.length){
      const pos = Math.floor(Math.random()*cards.length);
      stage.appendChild(cards.splice(pos, 1)[0]); //memo:spliceの返値は配列
    }
  }

  function createCard(num) {
    const inner ='<div class="card-back">?</div><div class="card-front">*</div>';
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = inner.replace('*',num);
    card.addEventListener('click', function(){ //memo:アロー関数で書けたりしないのかな？
      flipCard(this);
    });
    const container = document.createElement('div');
    container.className ='card-container';
    container.appendChild(card);
    return container; 
    //memo:もしreturnがないと関数内で処理を行うのみで終了になってしまう。戻り値があること処理結果を別の処理で使いまわすことができる。
  }

  function flipCard(card) {
    if(firstCard != null && secondCard != null){
      return;
    }

    if(card.className.indexOf("open") === -1){
      card.className = "card open";
    } else {
      return;
    }
    flipCount++;
    if(flipCount % 2 === 1 ) {
      firstCard = card;
    } else {
      secondCard = card;
      setTimeout(function() {
        judge();
      }, 900); //memo:カードをめくり終わった時に実行
    }
  }

  function judge() {
    if(firstCard.children[1].textContent === secondCard.children[1].textContent){
      correctCount++;
    } else {
      firstCard.className = 'card';
      secondCard.className = 'card';
    }
    firstCard = null;
    secondCard = null; 
  }

  const soloPlay = document.getElementById('soloPlay');
  const start = document.querySelector('.p-start');
  soloPlay.addEventListener('click', function(){
    start.style.display = 'none';
    gameStart();
  })


  function gameStart(){
    const timer = document.querySelector('.p-sub-container__item');
    timer.innerHTML = countDown;
    countDown--;
    const cleartimeoutId = setTimeout(gameStart, 1000)

    if(countDown === -1){
      clearTimeout(cleartimeoutId);
      timer.innerHTML = '始め！'
      init();
    }
  }

}

//1人プレイモードはタイムアタック → ランクS/A/B/Cで評価
//2人プレイモードは対戦形式でポイント制 → もう一つ変数を用意してあげて、剰余で条件分岐かな


