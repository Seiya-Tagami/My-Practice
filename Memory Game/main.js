'use strict'
{
  const cards = [];
  const stage = document.getElementById('p-stage')
  let flipCount = 0,
  correctCount = 0,
  countUp = 0,
  firstCard = null,
  secondCard = null,
  countDown = 3;
  
  function init(){

    for(let i = 1; i <= 8; i++){
      cards[cards.length] = createCard(i);
      cards[cards.length] = createCard(i);
    };

    while(cards.length){
      const pos = Math.floor(Math.random()*cards.length);
      stage.appendChild(cards.splice(pos, 1)[0]); //memo:spliceの返値は配列
    };
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



  const start = document.querySelector('.p-start');
  const replay = document.querySelector('.p-sub__item__replay');
  const clickReplay =  document.getElementById('js-replay');
  const clickBack = document.getElementById('js-back');
  
  document.getElementById('soloPlay').addEventListener('click', function(){
    start.style.display = 'none';
    gameStart();
    clickReplay.addEventListener('click', function(){
      rePlay();
    })
    clickBack.addEventListener('click', function(){
      back();
    })
  })



  const timer1 = document.querySelector('.p-sub__item__count-down');

  function gameStart(){
    if(clickReplay.classList.contains('stop')){
      return;
    }

    while(stage.firstChild){ //p-startまで消してしまうから改善
      stage.removeChild(stage.firstChild); 
    };

    timer1.style.borderBottom = "double 5px #BDC0BA";
    timer1.innerHTML = countDown;
    countDown--;
    const cleartimeoutId = setTimeout(gameStart, 1000);

    if(countDown === -1){
      clearTimeout(cleartimeoutId);
      timer1.innerHTML = '始め！'
      replay.style.display ='flex';
      init();
      clickReplay.classList.remove('stop2');
      countTime();
    }
  }

  function countTime(){
    if(clickReplay.classList.contains('stop2')){
      return;
    }
    const timer2 = document.querySelector('.p-sub__item__count-up');
    timer2.style.borderBottom = "double 5px #BDC0BA";
    timer2.innerHTML = `${countUp}<span>秒経過</span>`;
    countUp++;
    const cleartimeoutId = setTimeout(countTime, 1000)

    if(correctCount === 8) {
      clearTimeout(cleartimeoutId);
      timer1.innerHTML = '終了！'
      showResult();
    }
  }

  const result = document.querySelector('.p-sub__item__result');

  function showResult() {
    result.innerHTML = '<span>【評価】</span><span id="p-sub__item__result-rank"></span>';
    result.style.borderBottom = 'double 5px #BDC0BA';
    const rank = document.getElementById('p-sub__item__result-rank');
    if(countUp <= 35){
      rank.innerHTML = 'S+';
      rank.style.color = '#efBb24';}
      else if(countUp <= 40){
        rank.innerHTML = 'S';
      rank.style.color = '#533d5b';
    } else if(countUp <= 50){
      rank.innerHTML = 'A';
      rank.style.color = '#6d2e5b';
    } else if (countUp <= 60){
      rank.innerHTML = 'B';
      rank.style.color = '#2b5f75';
    } else {
      rank.innerHTML = 'C';
      rank.style.color = '#00896c';
    }
  }

  function rePlay(){
    countDown = 3;
    countUp = 0;
    correctCount = 0;
    // result.firstChild.innerHTML.replace('【評価】','【前回の評価】');
    clickReplay.classList.add("stop","stop2");
    setTimeout(gameStart,500);
    setTimeout(clickReplay.classList.remove('stop'),500); //memo:ここらへんもっと良い方法ある気がする
  }

  function back(){
    while(stage.firstChild){
      stage.removeChild(stage.firstChild);
    };
    start.style.display = 'block'; 
  }  
}


//1人プレイモードはタイムアタック → ランクS/A/B/Cで評価
//2人プレイモードは対戦形式でポイント制 → もう一つ変数を用意してあげて、剰余で条件分岐かな？


