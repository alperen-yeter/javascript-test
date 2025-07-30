const sorular = [
  // 1–20 arası sorular (önceki gibi buraya kadar kopyalanmıştı zaten)
  // Sadece örnek: (ilk 3 tanesi)
  {
    soru: "1. JavaScript’te değişken tanımlamak için kullanılan anahtar kelime nedir?",
    secenekler: ["var", "int", "const", "define", "string"],
    cevap: 0
  },
  {
    soru: "2. Hangi operatör eşitlik ve tür karşılaştırması yapar?",
    secenekler: ["==", "===", "!=", "<=", "=>"],
    cevap: 1
  },
  {
    soru: "3. Aşağıdakilerden hangisi bir fonksiyon tanımıdır?",
    secenekler: ["let = function()", "function foo() {}", "new Function{}", "fn:() => {}", "define function()"],
    cevap: 1
  },
    {
    soru: "4. JavaScript’te dizi uzunluğu nasıl alınır?",
    secenekler: [".size()", ".length()", ".count()", ".len()", ".getLength()"],
    cevap: 1
  },
  {
    soru: "5. Hangi veri tipi boolean değildir?",
    secenekler: ["true", "false", "'true'", "!!1", "Boolean(0)"],
    cevap: 2
  },
  {
    soru: "6. DOM nedir?",
    secenekler: [
      "Dosya Okuma Metodu",
      "Veritabanı yönetim sistemi",
      "Web sayfasının belge modeli",
      "Sadece CSS özelliği",
      "JavaScript framework’ü"
    ],
    cevap: 2
  },
  {
    soru: "7. Hangi metod dizinin sonuna eleman ekler?",
    secenekler: ["push()", "pop()", "shift()", "unshift()", "concat()"],
    cevap: 0
  },
  {
    soru: "8. NaN nedir?",
    secenekler: ["Null and None", "New Array Node", "Number and Number", "Not a Number", "Next Available Number"],
    cevap: 3
  },
  {
    soru: "9. JSON.parse() fonksiyonu ne yapar?",
    secenekler: [
      "Diziyi yazar",
      "Nesneyi JSON’a çevirir",
      "JSON metnini JS nesnesine çevirir",
      "Bir fonksiyonu yürütür",
      "Veri siler"
    ],
    cevap: 2
  },
  {
    soru: "10. setTimeout ne işe yarar?",
    secenekler: [
      "Zamanlayıcı başlatır",
      "Hataları yakalar",
      "Veriyi saklar",
      "Zamanı gösterir",
      "Fonksiyonu hemen çalıştırır"
    ],
    cevap: 0
  },

  // 11-20 arası sorular (index 10-19)
  {
    soru: "11. JavaScript’te hangi döngü en az bir kez çalışır?",
    secenekler: ["for", "while", "do...while", "foreach", "loop"],
    cevap: 2
  },
  {
    soru: "12. Hangi fonksiyon dizinin elemanlarını tersine çevirir?",
    secenekler: ["reverse()", "sort()", "flip()", "invert()", "switch()"],
    cevap: 0
  },
  {
    soru: "13. Bir nesnenin özelliklerine nasıl erişilir?",
    secenekler: ["obj->prop", "obj.prop", "obj[prop]", "obj::prop", "obj.prop()"],
    cevap: 1
  },
  {
    soru: "14. Hangi operatör tip dönüşümü yapmaz?",
    secenekler: ["==", "===", "+", "parseInt()", "Number()"],
    cevap: 1
  },
  {
    soru: "15. JS'de 'undefined' değeri ne anlama gelir?",
    secenekler: [
      "Tanımlanmamış değişken",
      "Boş string",
      "Null değer",
      "Sıfır",
      "Hata"
    ],
    cevap: 0
  },
  {
    soru: "16. Hangi metod diziden ilk elemanı çıkarır?",
    secenekler: ["shift()", "pop()", "push()", "unshift()", "slice()"],
    cevap: 0
  },
  {
    soru: "17. Hangi yöntem yeni bir diziyi döndürür?",
    secenekler: ["map()", "forEach()", "filter()", "reduce()", "some()"],
    cevap: 0
  },
  {
    soru: "18. JS’de hangi keyword ile anonim fonksiyon tanımlanır?",
    secenekler: ["anonymous", "function", "anon", "lambda", "def"],
    cevap: 1
  },
  {
    soru: "19. '===' operatörü ne yapar?",
    secenekler: [
      "Değerleri karşılaştırır",
      "Tür ve değeri karşılaştırır",
      "Sadece türü karşılaştırır",
      "Atama yapar",
      "Null kontrolü yapar"
    ],
    cevap: 1
  },
  {
    soru: "20. JS'de event listener nasıl eklenir?",
    secenekler: [
      "addEventListener()",
      "attachListener()",
      "onEvent()",
      "listen()",
      "bindEvent()"
    ],
    cevap: 0
  }// Geri kalanı sende zaten vardı, tamamını ekle oraya
];

function renderQuestions(startIndex, endIndex) {
  const leftCol = document.getElementById("left-column");
  const rightCol = document.getElementById("right-column");
  const scoreEl = document.getElementById("score");
  let dogruSayisi = 0;
  let toplam = endIndex - startIndex + 1;

  leftCol.innerHTML = "";
  rightCol.innerHTML = "";

  for (let i = startIndex; i <= endIndex; i++) {
    const q = sorular[i];
    const container = document.createElement("div");
    container.className = "question";

    const title = document.createElement("p");
    title.innerText = q.soru;

    const options = document.createElement("div");
    options.className = "options";

    const saved = localStorage.getItem(`soru_${i}`);
    const dogruCevaplandi = saved !== null && parseInt(saved) === q.cevap;
    if (dogruCevaplandi) dogruSayisi++;

    q.secenekler.forEach((opt, idx) => {
      const btn = document.createElement("button");
      btn.innerText = `${String.fromCharCode(65 + idx)}. ${opt}`;
      btn.onclick = () => handleSelection(i, idx, btn, startIndex, endIndex);

      if (saved !== null) {
        if (parseInt(saved) === q.cevap && q.cevap === idx) {
          btn.classList.add("correct");
        } else if (parseInt(saved) === idx) {
          btn.classList.add("incorrect");
        }
        btn.disabled = true;
      }

      options.appendChild(btn);
    });

    container.appendChild(title);
    container.appendChild(options);
    // Eğer daha önce yanlış yapılmış ve doğru cevap gösterilmesi gerekiyorsa
if (localStorage.getItem(`dogru_cevap_${i}`)) {
  const correctAnswerText = document.createElement("div");
  correctAnswerText.className = "correct-answer";
  correctAnswerText.innerText = `Doğru cevap: ${String.fromCharCode(65 + q.cevap)}`;
  container.appendChild(correctAnswerText);
}

    if (i < startIndex + Math.ceil((endIndex - startIndex + 1) / 2)) {
      leftCol.appendChild(container);
    } else {
      rightCol.appendChild(container);
    }
  }

  if (scoreEl) {
    scoreEl.innerText = `${dogruSayisi}/${toplam}`;
  }
  updateScore();
}

function handleSelection(questionIndex, optionIndex, button, startIndex, endIndex) {
  const question = sorular[questionIndex];
  const buttons = button.parentElement.querySelectorAll("button");

  buttons.forEach(b => b.disabled = true);

  if (optionIndex === question.cevap) {
    button.classList.add("correct");
  } else {
    button.classList.add("incorrect");

    // Doğru cevabı göster
    const correctAnswerText = document.createElement("div");
    correctAnswerText.className = "correct-answer";
    correctAnswerText.innerText = `Doğru cevap: ${String.fromCharCode(65 + question.cevap)}`;
    button.parentElement.parentElement.appendChild(correctAnswerText);
  }

  localStorage.setItem(`soru_${questionIndex}`, optionIndex);

  // İlerleme barını güncelle
  updateProgressBar(questionIndex, sorular.length);
 // +1 çünkü progress 1 tabanlı

  // Skoru güncelle
  updateScore();
}



function updateScore() {
  let dogruSayisi = 0;
  let toplam = sorular.length;

  for (let i = 0; i < toplam; i++) {
    const saved = localStorage.getItem(`soru_${i}`);
    if (saved !== null && parseInt(saved) === sorular[i].cevap) {
      dogruSayisi++;
    }
  }

  const scoreEl = document.getElementById("score");
  if (scoreEl) {
    scoreEl.innerText = `${dogruSayisi}/${toplam}`;
  }
}

  

function clearAnswers() {
  for (let i = 0; i < sorular.length; i++) {
    localStorage.removeItem(`soru_${i}`);
    localStorage.removeItem(`dogru_cevap_${i}`);
  }
  location.reload();
}

function toggleTheme() {
  document.body.classList.toggle("dark-mode");
}
document.getElementById("theme-toggle").addEventListener("click", toggleTheme);
function toggleTheme() {
  document.body.classList.toggle("dark-mode");

  // Tema durumunu kaydet
  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("tema", "dark");
  } else {
    localStorage.setItem("tema", "light");
  }
}

// Sayfa yüklenince localStorage'dan temayı al
window.addEventListener("DOMContentLoaded", () => {
  // Tema ayarını uygula
  const tema = localStorage.getItem("tema");
  if (tema === "dark") {
    document.body.classList.add("dark-mode");
  }

  // İlerleme barını güncelle
  const cevaplananSoruSayisi = Array.from({ length: sorular.length })
    .filter((_, i) => localStorage.getItem(`soru_${i}`) !== null).length;
  updateProgressBar(cevaplananSoruSayisi, sorular.length);
});

function updateProgressBar(currentQuestionIndex, totalQuestions) {
  const progressBar = document.getElementById("progress-bar");
  if (!progressBar) return;

  const percentage = (currentQuestionIndex / totalQuestions) * 100;

  progressBar.style.width = percentage + "%";
}

