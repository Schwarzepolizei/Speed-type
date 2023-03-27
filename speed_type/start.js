const texts = ['Лейтенант шел по желтому строительному песку, нагретому дневным палящим солнцем. Он был мокрым от кончиков пальцев до кончиков волос, все его тело было усеяно царапинами от острой колючей проволоки и ныло от сводящей с ума боли, но он был жив и направлялся к командному штабу, который виднелся на горизонте метрах в пятистах.', 'Варенька, такая милая, добродушная и отзывчивая девушка, глаза которой всегда лучились добротой и теплом, с невозмутимым видом сущего демона шла к бару «Гадкий Гарри» с автоматом Томпсона наперевес, готовая укатать в асфальт этих мерзких, грязных, вонючих и скользких типов, посмевших пялиться на ее прелести и пускать похотливые слюни.', 'Яша был всего лишь мелким пакостником, который, тем не менее, имел очень большой потенциал. Еще в розовом детстве он виртуозно тырил яблоки у тети Нюры, а не прошло и каких-то двадцати лет, как он с тем же лихим запалом переключился на банки в двадцати трех странах мира, причем умудрялся так мастерски их обчищать, что ни полиция, ни Интерпол никак не могли взять его с поличным.']

const rand = Math.floor(Math.random() * texts.length);

const randomText = document.querySelector('.random_text');
randomText.innerHTML = texts[rand];
// alert(texts[rand]);

// var timer;

// function startTimer() {
//   var resultElem = document.getElementById("result");
//   resultElem.innerHTML = "Таймер запущен...";
//   clearTimeout(timer); // сбросить предыдущий таймер
//   timer = setTimeout(function() {
//     resultElem.innerHTML = document.getElementById("myTextarea").value;
//   }, 60000); // 60000 миллисекунд = 1 минута
// }


var timerId, startTime, result;

function startTimer() {
  if (!timerId) { // запустить таймер только один раз при начале набора текста
    result = ""; // сбросить предыдущий результат
    startTime = Date.now(); // установить начальное время
    timerId = setInterval(updateTimer, 1000); // запустить таймер на 60 секунд
  }
}

function updateTimer() {
  var elapsedTime = Math.floor((Date.now() - startTime) / 1000); // вычислить прошедшее время в секундах
  var minutes = Math.floor(elapsedTime / 60); // вычислить количество минут
  var seconds = elapsedTime % 60; // вычислить количество секунд
  var timerElement = document.getElementById("timer"); // получить элемент таймера
  timerElement.innerHTML = minutes + ":" + (seconds < 10 ? "0" : "") + seconds; // обновить содержимое элемента
  if (elapsedTime >= 60) { // если прошло 60 секунд, остановить таймер
    onTimerFinished();
  }
}

function onTimerFinished() {
    result = document.getElementById("myTextarea").value; // сохранить текст в переменную
    clearInterval(timerId); // остановить таймер
    timerId = null; // сбросить таймер
    // setTimeout(() => {
    //   location.reload(); // перезагрузить страницу после сохранения текста
    // }, 1000); // ждать 1 секунду, чтобы пользователь мог увидеть текст на экране
    compareTexts()
  }

window.onbeforeunload = function() {
  if (timerId) { // если таймер все еще активен, сохранить текст перед выходом со страницы
    onTimerFinished();
  }
  localStorage.setItem("result", result); // сохранить результат в localStorage
}

function compareTexts() {
    const originalText = texts[rand]; // задаем предложенный текст
    const userText = document.getElementById("myTextarea").value.trim(); // получаем введенный текст
  
    const originalWords = originalText.split(" "); // разбиваем предложенный текст на массив слов
    const userWords = userText.split(" "); // разбиваем введенный текст на массив слов
  
    let correctWords = 0; // количество слов, написанных без ошибок
    let incorrectWords = 0; // количество слов, написанных с ошибками
    let totalWords = originalWords.length; // общее количество слов в предложенном тексте
  
    for (let i = 0; i < originalWords.length; i++) {
      if (userWords[i] === originalWords[i]) { // если слова совпадают
        correctWords++; // увеличиваем количество слов, написанных без ошибок
      } else {
        incorrectWords++; // увеличиваем количество слов, написанных с ошибками
      }
    }
  
    const result = `Вы написали ${correctWords} слов без ошибок и ${incorrectWords} слов с ошибками из ${totalWords} слов в предложенном тексте.`;
  
    document.getElementById("result").innerHTML = result; // выводим результат на экран
  }