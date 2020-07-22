
// グローバル汚染を避けるために即時関数を使って全体を囲う
(() => {
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
     * 背景色を指定
     */
    let color = 'rgba(255, 0, 0, 0.5)';

    /**
     * ページのロードが完了したときに発火する load イベント
     */
    $(document).ready( () => {
        // 初期化処理を行う
        initialize();

        $('.btn').on('click', function () {
            let id =  $(this).attr('id');
            switch (id) {
                case 'btn001':
                    drawRect(0, 0, 100, 100, color);
                    break;
                case 'btn002':
                    drawLine(100, 100, 250, 250, color);
                    break;
            }
        });
    }, false);

    /**
     * canvas やコンテキストを初期化する
     */
    function initialize(){
        // HTML 上の canvas には id 属性が振られているので
        // querySelector を利用して参照し、変数に格納する
        canvas = document.body.querySelector('#main_canvas');

        // canvas の大きさをウィンドウ全体を覆うように変更する
        canvas.width = window.innerWidth;   // 幅
        canvas.height = window.innerHeight; // 高さ
        // canvas からコンテキストを取得する
        ctx = canvas.getContext('2d');
    }

    /**
     * 矩形を描画する
     * @param {number} x - 塗りつぶす矩形の左上角の X 座標
     * @param {number} y - 塗りつぶす矩形の左上角の Y 座標
     * @param {number} width - 塗りつぶす矩形の横幅
     * @param {number} height - 塗りつぶす矩形の高さ
     * @param {string} [color] - 矩形を塗りつぶす際の色
     */
    function drawRect(x, y, width, height, color){
        // 色が指定されている場合はスタイルを設定する
        if(color != null){
            ctx.fillStyle = color;
        }
        ctx.fillRect(x, y, width, height);
    }

    /**
     * 線分を描画する
     * @param {number} x1 - 線分の始点の X 座標
     * @param {number} y1 - 線分の始点の Y 座標
     * @param {number} x2 - 線分の終点の X 座標
     * @param {number} y2 - 線分の終点の Y 座標
     * @param {string} [color] - 線を描画する際の色
     * @param {number} [width=1] - 線幅
     */
    function drawLine(x1, y1, x2, y2, color, width = 1){
        // 色が指定されている場合はスタイルを設定する
        if(color != null){
            ctx.strokeStyle = color;
        }
        // 線幅を設定する
        ctx.lineWidth = width;
        // パスの設定を開始することを明示する
        ctx.beginPath();
        // パスの始点を設定する(サブパスの開始)
        ctx.moveTo(x1, y1);
        // 直線のパスを終点座標に向けて設定する
        ctx.lineTo(x2, y2);
        // パスを閉じることを明示する
        ctx.closePath();
        // 設定したパスで線描画を行う
        ctx.stroke();
    }
})();

