const red = [
    {
        name : "岡村美波",
        memberUrl : './img/beyooooonds/okamura.jpg',
        color : '#ff80ad',
        colorName : "ピンク",
    }, {
        name : "稲場愛香",
        memberUrl : './img/JuiceJuice/inaba.jpg',
        color : '#E5007F',
        colorName : "ホットピンク",
    }, {
        name : "金澤朋子",
        memberUrl : './img/JuiceJuice/kanazawa.jpg',
        color : '#FF0000',
        colorName : "リンゴ",
    }, {
        name : "工藤由愛",
        memberUrl : './img/JuiceJuice/kudo.jpg',
        color : '#fec1be',
        colorName : "ライトピンク",
    }, {
        name : "山崎夢羽",
        memberUrl : './img/beyooooonds/yamazaki.jpg',
        color : '#ee282a',
        colorName : "イタリアンレッド",
    }, 
];

const green = [
{
        name : "上村あかり",
        memberUrl : './img/JuiceJuice/uemura.jpg',
        color : '#7FFF00',
        colorName : "メロン",
    }, {
        name : "生田衣梨奈",
        memberUrl : './img/morning/ikuta.jpg',
        color : '#adff2f',
        colorName : "黄緑",
    }, {
        name : "山崎愛生",
        memberUrl : './img/morning/yamazaki.jpg',
        color : '#02A23E',
        colorName : "ブライトグリーン",
    }, {
        name : "山岸理子",
        memberUrl : './img/tsubaki/yamagishi.jpg',
        color : '#bdf53a',
        colorName : "ライトグリーン",
    }, {
        name : "佐藤優樹",
        memberUrl : './img/morning/sato.jpg',
        color : '#00A59E',
        colorName : "エメラルドグリーン",
    }, 
];

const blue = [
    {
        name : "里吉うたの",
        memberUrl : './img/beyooooonds/satoyoshi.jpg',
        color : '#0069b5',
        colorName : "ミディアムブルー",
    }, {
        name : "一岡玲奈",
        memberUrl : './img/beyooooonds/ichioka.jpg',
        color : '#9bdcfa',
        colorName : "ライトブルー",
    }, {
        name : "松永里愛",
        memberUrl : './img/JuiceJuice/matsunaga.jpg',
        color : '#0402fd',
        colorName : "ロイヤルブルー",
    }, {
        name : "北川莉央",
        memberUrl : './img/morning/kitagawa.jpg',
        color : '#56bed9',
        colorName : "シーブルー",
    }, {
        name : "上国料萌衣",
        memberUrl : './img/angerme/kamiko.jpg',
        color : '#7fffd4',
        colorName : "アクアブルー",
    }, 
];

const others = [
    {
        name : "段原瑠々",
        memberUrl : './img/JuiceJuice/dambara.jpg',
        color : '#ffa500',
        colorName : "オレンジ",
    }, {
        name : "野中美希",
        memberUrl : './img/morning/nonaka.jpg',
        color : '#572A7B',
        colorName : "パープル",
    }, 
];

const member = red.concat(green).concat(blue).concat(others);

const $window = window;
const $doc = document;
const $member = $doc.getElementById('member');
const $button = $doc.getElementById('js-items').getElementsByTagName('button');
const $nextButton = $doc.getElementById('js-next').getElementsByTagName('button')[0];
const $retryButton = $doc.getElementById('js-retry').getElementsByTagName('button')[0];
const $items = $doc.getElementById('js-question');
let butttonLength = $button.length;
const windowWidth = $window.innerWidth

const quizLength = 5;
let quizIndex = 0;
let score = 0;

let isAnswerTime = true;

question = arrayRandom(member, quizLength - 3).concat(arrayRandom(red, 1)).concat(arrayRandom(green, 1)).concat(arrayRandom(blue, 1));
// question = member;


// init
const init = () => {
    setupQuiz();
    preloadImages();

    // 各選択肢が選ばれた時の処理
    let handlerIndex = 0;

    while(handlerIndex < butttonLength){
        $button[handlerIndex].addEventListener('click', (e) => {
            if (isAnswerTime){
                judge(e);
            }
        });
        handlerIndex++;
    }

    // 次へのボタンが押された時
    $nextButton.addEventListener('click', (e) => {
        goNext(e);
    });


    // リトライボタンが押された時
    $retryButton.addEventListener('click', (e) => {
        retry(e);
    });
}

// 画像のプリロード
function preloadImages() {
    for(let i = 0; i < member.length; i++){
        var img = document.createElement('img');
        img.src = member[i]["memberUrl"];
    }
}

// 重複なしランダム整数生成
function arrayRandom(array, num) {
    var a = array;
    var t = [];
    var r = [];
    var l = a.length;
    var n = num < l ? num : l;
    while (n-- > 0) {
      var i = Math.random() * l | 0;
      r[n] = t[i] || a[i];
      --l;
      t[i] = t[l] || a[l];
    }
    return r;
}

// 配列のシャッフル
const shuffle = ([...array]) => {
    for (let i = array.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// ボタンのカラーを決定
function selectButtonColor(curQuestion){
    var flg = false;

    // 3問目以降は色ごとの問題にする
    var cands = []
    if(quizIndex < 2) cands = member;
    else if(quizIndex === 2)  cands = red;
    else if(quizIndex === 3)  cands = green;
    else if(quizIndex === 4)  cands = blue;
    // cands = member
    
    // ボタンに重複がないようにする
    while(!flg){
        var candButtonColors = arrayRandom(cands, 3);
        flg = true;
        for(let i = 0; i < candButtonColors.length; i++){
            if(curQuestion.name === candButtonColors[i].name){
                flg = false
            }
        }
    }

    candButtonColors.push(curQuestion);
    return shuffle(candButtonColors)
}
  

// 問題の選択肢を定義
const setupQuiz = () => {
    $nextButton.style.display = "none";  // 次の問題へボタンを消す
    $items.style.display = "none";  // 正解不正解表示を消す
    buttonColors = selectButtonColor(question[quizIndex]) // ボタンの色決定
    $member.src = question[quizIndex].memberUrl // メンバーの写真

    let buttonIndex = 0;
    while(buttonIndex < butttonLength){
        $button[buttonIndex].alt = buttonColors[buttonIndex].name;
        $button[buttonIndex].textContent = '';
        // $button[buttonIndex].textContent = buttonColors[buttonIndex].colorName;
        // $button[buttonIndex].style.padding = "4rem"
        $button[buttonIndex].style.backgroundColor = buttonColors[buttonIndex].color;
        $button[buttonIndex].style.borderColor = buttonColors[buttonIndex].color;
        buttonIndex++;
    }
}

// 正誤判定
const judge = (e) => {
    if(question[quizIndex].name ===  e.target.alt){
        score++;
        const $items = $doc.getElementById('js-question');
        $items.style.display = "block"
        $items.classList = "alert alert-primary center-block"
        $items.textContent = "正解！！"
    }
    else{
        $items.style.display = "block"
        $items.classList = "alert alert-warning center-block"
        $items.textContent = "不正解..."
    }

    let buttonIndex = 0;
    while(buttonIndex < butttonLength){
        $button[buttonIndex].innerText = buttonColors[buttonIndex].name + "\n(" + buttonColors[buttonIndex].colorName + ")";
        // スマホの時だけフォントサイズを変更
        if(windowWidth < 480){
            $button[buttonIndex].style.fontSize = "1.0rem";
            $button[buttonIndex].style.padding = ".2rem";
        }
        buttonIndex++;
    }

    quizIndex++;
    if(quizIndex < quizLength){
        $nextButton.textContent = "次の問題へ";
    }
    else{
        $nextButton.textContent = "結果発表へ";
    }
    $nextButton.style.display = "block";

    isAnswerTime = false // 回答できないようにする
}

// 次の問題へ
const goNext = (e) => {
    if(quizIndex < quizLength){
        isAnswerTime = true // 回答できるようにする
        setupQuiz();
    }
    else{
        // 問題文がなければ結果を表示
        showResults();
    }
}

// 最後の結果
const showResults = () => {
    $items.style.display = "block";
    $items.classList = "alert alert-info center-block";
    $items.textContent = '終了！あなたは' + quizLength + '問中' +  score + '問正解' + 'です';
    
    $nextButton.style.display = "none";  // 次の問題へボタンを消す
    $member.style.visibility = 'hidden';
    let buttonIndex = 0;
    while(buttonIndex < butttonLength){
        $button[buttonIndex].style.visibility = 'hidden';
        buttonIndex++;
    }

    // リトライボタンを表示
    $retryButton.style.display = "block";
    $retryButton.style.margin = "20px";

    showTweetButton(quizLength, score);
};

// tweetボタンを表示
const showTweetButton = (quizLength, score) => {
    // scripタグを追加
    var script = document.createElement('script');
    script.src = 'https://platform.twitter.com/widgets.js';
    document.body.appendChild(script);

    const $tweetButton = $doc.getElementById('js-tweet').getElementsByTagName('a')[0];
    $tweetButton.setAttribute('style', 'display:block;');
    $tweetButton.setAttribute('data-text', '【ハロプロ メンバーカラーQuiz】\n挑戦結果：' + quizLength + '問中' +  score + '問正解🎉');
}


// リトライ
const retry = (e) => {
    window.location.href = './index.html'; // 最初のページへ
}

init();
