
(() => {
  /**
   * canvas の幅
   * @type {number}
   */
  const CANVAS_WIDTH = 960;
  /**
   * canvas の高さ
   * @type {number}
   */
  const CANVAS_HEIGHT = 540;

  /**
   * Canvas2D API をラップしたユーティリティクラス
   * @type {Canvas2DUtility}
   */
  let util = null;
  /**
   * 描画対象となる Canvas Element
   * @type {HTMLCanvasElement}
   */
  let canvas = null;
  /**
   * Canvas2D API のコンテキスト
   * @type {CanvasRenderingContext2D}
   */
  let ctx = null;
  /**
   * イメージのインスタンス
   * @type {Image}
   */
  let image = null;
  /**
   * 実行開始時のタイムスタンプ
   * @type {number}
   */
  let startTime = null;
  /**
   * 自機キャラクターのインスタンス
   * @type {Viper}
   */
  let viper = null;

  /**
   * ページのロードが完了したときに発火する load イベント
   */
  window.addEventListener('load', () => {
    // ユーティリティクラスを初期化
    util = new Canvas2DUtility(document.body.querySelector('#main_canvas'));
    // ユーティリティクラスから canvas を取得
    canvas = util.canvas;
    // ユーティリティクラスから 2d コンテキストを取得
    ctx = util.context;

    // まず最初に画像の読み込みを開始する
    util.imageLoader('./image/viper.png', (loadedImage) => {
      // 引数経由で画像を受け取り変数に代入しておく
      image = loadedImage;
      // 初期化処理を行う
      initialize();
      // イベントを設定する
      eventSetting();
      // 実行開始時のタイムスタンプを取得
      startTime = Date.now();
      // 描画処理を行う
      render();
    });
  }, false);

  /**
   * canvas やコンテキストを初期化する
   */
  function initialize(){
    // canvas の大きさを設定
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    // 自機キャラクターを初期化する
    viper = new Viper(ctx, 0, 0, image);
    // 登場シーンからスタートするための設定を行う
    viper.setComing(
        -70,                // 登場演出時の開始 X 座標
        CANVAS_HEIGHT / 2,  // 登場演出時の開始 Y 座標
        70,                 // 登場演出を終了とする X 座標
        CANVAS_HEIGHT / 2   // 登場演出を終了とする Y 座標
    );
  }

  /**
   * イベントを設定する
   */
  function eventSetting() {
    // キーの押下時に呼び出されるイベントリスナー
    window.addEventListener('keydown', (event) => {
      // 登場シーンはキー入力を受け付けない
      if (viper.isComing === true) { return; }
      // 入力されたキーに応じて処理内容を変化
      switch (event.key) {
        case 'ArrowLeft': // アローキーの左
          viper.position.x -= 10;
          break;
        case 'ArrowRight': // アローキーの右
          viper.position.x += 10;
          break;
        case 'ArrowUp':
          viper.position.y -= 10; // アローキーの上
          break;
        case 'ArrowDown':
          viper.position.y += 10; // アローキーの下
          break;
      }
    }, false);
  }

  /**
   * 描画処理を行う
   */
  function render() {
    // アルファ値 1.0 で描画処理を開始する
    ctx.globalAlpha = 1.0;
    // 描画前に画面全体を不透明な明るいグレーで塗りつぶす
    util.drawRect(0, 0, canvas.width, canvas.height, '#eeeeee');
    // 現在までの経過時間を取得する
    let nowTime = (Date.now() - startTime) / 1000;

    // 登場シーンの処理
    if (viper.isComing === true) {
      // 登場シーンが始まってからの経過時間
      let justTime = Date.now();
      let comingTime = (justTime - viper.comingStart) / 1000;
      // 登場中は時間が経つほど右に向かって進む
      let x = -70 + comingTime * 50;
      // 一定の位置まで移動したら登場シーンを終了する
      if (x >= viper.comingEndPosition.x) {
        viper.isComing = false;        // 登場シーンフラグを下ろす
        x = viper.comingEndPosition.x; // 行き過ぎの可能性もあるので位置を再設定
      }
      // 求めた X 座標を自機に設定する
      viper.position.set(x, viper.position.y);
      // justTime を 100 で割ったとき余りが 50 より小さくなる場合だけ半透明にする
      if (justTime % 100 < 50) {
        ctx.globalAlpha = 0.5;
      }
    }

    // 自機キャラクターを描画
    viper.draw();

    // 描画処理を再帰呼び出し
    requestAnimationFrame(render);
  }

  /**
   * 特定の範囲におけるランダムな整数の値を生成する
   * @param {number} range - 乱数を生成する範囲（0 以上 ～ range 未満）
   */
  function generateRandomInt(range){
    let random = Math.random();
    return Math.floor(random * range);
  }
})();
