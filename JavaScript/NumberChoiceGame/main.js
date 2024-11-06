//랜덤번호 지정
//유저가 번호를 입력한다 그리고 go라는 버튼을 누름
//만약에 유저가 랜덤번호를 맞추면, 맞췄습니다!
//랜덤 번호가 < 유저번호 DOWN
//랜덤 번호가 > 유저번호 UP
//Reset버튼을 누르면 게임이 리셋된다
//5번의 기회를 다 쓰면 게임이 끝난다 (더 이상 추측 불가, 버튼이 disable)
//유저가 1~100 범위 밖에 숫자를 입력하면 알려준다. 기회를 깍지 않는다
//유저가 이미 입력한 숫자를 또 입력하면, 알려준다, 기회를 깍지 않는다.
let computerNum = 0;
let playButton = document.getElementById("play__button");
let userInput = document.getElementById("user__input");
let resultArea = document.getElementById("result__area");
let resetButton = document.getElementById("reset__button");
let chanceArea = document.getElementById("chance__area");
let history = [];

let chance = 5;
let gameOver = false;
playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
userInput.addEventListener("focus", function () {
  userInput.value = "";
});

function pickRandomNum() {
  computerNum = Math.floor(Math.random() * 100) + 1;
  console.log("정답", computerNum);
}

function play() {
  let userValue = userInput.value;

  if (userValue < 1 || userValue > 100) {
    resultArea.textContent = "범위 밖 숫자입니다.";
    return;
  }

  if (history.includes(userValue)) {
    resultArea.textContent = "중복";

    return;
  }

  chance -= 1;
  chanceArea.textContent = `남은 기회:${chance}번`;
  if (userValue < computerNum) {
    resultArea.textContent = "Up";
  } else if (userValue > computerNum) {
    resultArea.textContent = "Down";
  } else {
    resultArea.textContent = "correct";
  }

  history.push(userValue);

  if (0 < chance) {
    gameOver = false;
  } else gameOver = true;

  if (gameOver == true) {
    playButton.disabled = true;
  }
}
function reset() {
  //유저 인풋창이 깨끗하게 정리
  userInput.value = "";
  //새로운 번호가 생성
  pickRandomNum();

  resultArea.textContent = "결과값이 나옵니다";
  playButton.disabled = false;
}

pickRandomNum();
