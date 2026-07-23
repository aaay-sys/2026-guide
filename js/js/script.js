document.addEventListener('DOMContentLoaded', function() {

  // ===================================================
  // 1. なぞなぞボタン（答え重複バグ修正版）
  // ===================================================
  // ID指定(#answerBtn)でも、CLASS指定(.answer-btn)でも動くように取得
  const btn = document.getElementById('answerBtn') || document.querySelector('.answer-btn');
  
  if (btn) {
    btn.addEventListener('click', function() {
      // 💡 PC版かスマホ版かの判定フラグ（CSSのレスポンシブ基準と連動）
      const isPc = window.matchMedia('(min-width: 551px)').matches;

      if (this.classList.contains('is-open')) {
        // ---【閉じる処理】---
        this.classList.remove('is-open');
        this.innerHTML = '答え'; // 文字を元に戻す
      } else {
        // ---【開く処理（ページ ＆ 画面幅で分岐）】---
        this.classList.add('is-open');

        const path = window.location.pathname;
        const isTipsPage = path.includes('tips.html');
        const isQaPage = path.includes('qa.html');

        if (isPc) {
          // ==============================
          // 💻 PC版（551px以上）の答え
          // ==============================
          if (isTipsPage) {
            this.innerHTML = '卵<br>（おったまげ～！）';
          } else if (isQaPage) {
            this.innerHTML = 'バスケットボール（買い物かご）';
          } else {
            this.innerHTML = 'のり弁<br>（ノリノリ～♪）';
          }
        } else {
          // ==============================
          // 📱 スマホ版（550px以下）の答え
          // ==============================
          // スマホ版用の答え（※お好きな文章に変更OK！）
          if (isTipsPage) {
            this.innerHTML = '卵<br>（おったまげ～！）'; 
          } else if (isQaPage) {
            this.innerHTML = 'バスケットボール（買い物かご）'; 
          } else {
            this.innerHTML = 'のり弁<br>（ノリノリ～！）';
          }
        }
      }
    }); // 💡 once: falseはデフォルトなので削除（記述方法によってはバグの原因になるため）
  }


  // ===================================================
  // 2. お仕事詳細モーダル（オーバーレイ）
  // ===================================================
  const jobNames = document.querySelectorAll('.job-name');
  const overlay = document.getElementById('jobOverlay'); // HTMLのIDが一致しているか確認
  const closeBtn = document.getElementById('closeBtn');

  // モーダル内の要素を取得
  const modalImg = document.getElementById('modalImg');
  const modalItem1 = document.getElementById('modalItem1');
  const modalItem2 = document.getElementById('modalItem2');
  const modalItem3 = document.getElementById('modalItem3');
  const modalItem4 = document.getElementById('modalItem4');

  // オーバーレイ（ jobOverlay ）が存在する場合のみ処理を実行
  if (overlay) {
    // 💡 1. 各お仕事ボタン（.job-name）をクリックした時
    jobNames.forEach(jobBtn => {
      jobBtn.addEventListener('click', function() {

        // クリックされたボタンのdatasetから情報を取得してモーダルにセット
        if (modalImg) modalImg.src = this.dataset.img || '';
        if (modalItem1) modalItem1.textContent = this.dataset.item1 || '';
        if (modalItem2) modalItem2.textContent = this.dataset.item2 || '';
        if (modalItem3) modalItem3.textContent = this.dataset.item3 || '';
        if (modalItem4) modalItem4.textContent = this.dataset.item4 || '';

        // モーダルを表示（.is-show クラスを付与）
        overlay.classList.add('is-show');
      });
    });

    // 💡 2. ×ボタン（ #closeBtn ）を押した時
    if (closeBtn) {
      closeBtn.addEventListener('click', function() {
        overlay.classList.remove('is-show'); // 閉じる
      });
    }

    // 💡 3. オーバーレイの背景部分をクリックした時
    overlay.addEventListener('click', function(e) {
      // クリックされたのが背景自体（ overlay ）だった場合のみ閉じる
      if (e.target === overlay) {
        overlay.classList.remove('is-show');
      }
    });
  }


  // ===================================================
  // 3. 楽しむコツ：スライダー（画像＆テキスト連動切替）
  // ===================================================
  const prevBtn = document.getElementById('prevSlide');
  const nextBtn = document.getElementById('nextSlide');
  const cards = document.querySelectorAll('.tips-card');
  const images = document.querySelectorAll('.slide-img');

  // 必要な要素がすべて揃っている場合のみスライダー処理を実行
  if (prevBtn && nextBtn && cards.length > 0 && images.length > 0) {
    let currentIndex = 0; // 現在表示しているスライドの番号
    const totalSlides = cards.length; // スライドの総数

    // スライドを表示更新する関数
    function updateSlide(index) {
      // すべての要素から active クラスを外す（一旦リセット）
      cards.forEach(card => card.classList.remove('active'));
      images.forEach(img => img.classList.remove('active'));

      // 指定されたインデックスの要素に active クラスをつけて表示
      cards[index].classList.add('active');
      images[index].classList.add('active');
    }

    // 「次へ」ボタンを押した時
    nextBtn.addEventListener('click', function() {
      currentIndex = (currentIndex + 1) % totalSlides; // 最後の次は最初（0）に戻る
      updateSlide(currentIndex);
    });

    // 「前へ」ボタンを押した時
    prevBtn.addEventListener('click', function() {
      currentIndex = (currentIndex - 1 + totalSlides) % totalSlides; // 最初の前は最後（総数-1）に行く
      updateSlide(currentIndex);
    });
  }


  // ===================================================
  // 4. Q&A 吹き出しのアコーディオン開閉
  // ===================================================
  const cloudBubbles = document.querySelectorAll('.cloud-bubble');

  cloudBubbles.forEach(bubble => {
    bubble.addEventListener('click', function() {
      // クリックしたら is-open クラスを付け外し（トグル）
      this.classList.toggle('is-open');
    });
  });

});