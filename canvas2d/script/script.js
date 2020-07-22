
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
     * 色を指定
     */
    let red = 'rgba(255, 0, 0, 0.3)';
    let green = 'rgba(0, 255, 0, 0.3)';
    let blue = 'rgba(0, 0, 255, 0.3)';

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
                    drawRect(0, 0, 100, 100, red);
                    break;
                case 'btn002':
                    drawLine(100, 100, 500, 250, red);
                    break;
                case 'btn003':
                    // 多角形の各頂点を定義
                    let points = [
                        100, 100, // 左上
                        300, 100, // 右上
                        100, 300, // 左下
                        300, 300  // 右下
                    ];
                    drawPolygon(points, green);
                    break;
                case 'btn004':
                    // 多角形の頂点の数
                    const POINT_COUNT = 5;
                    // 多角形の各頂点を格納するための配列
                    let randomPoints = [];
                    // ループで一気に頂点を追加する
                    for (let i = 0; i < POINT_COUNT; ++i) {
                        // 配列に要素を追加する
                        randomPoints.push(generateRandomInt(300), generateRandomInt(300))
                    }
                    // 多角形の描画処理を行う
                    drawPolygon(randomPoints, green);
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

    /**
     * 多角形を描画する
     * @param {Array<number>} points - 多角形の各頂点の座標
     * @param {string} [color] - 多角形を描画する際の色
     */
    function drawPolygon(points, color){
        // points が配列であるかどうか確認し、多角形を描くために
        // 十分な個数のデータが存在するか調べる
        if(Array.isArray(points) !== true || points.length < 6){
            return;
        }
        // 色が指定されている場合はスタイルを設定する
        if(color != null){
            ctx.fillStyle = color;
        }
        // パスの設定を開始することを明示する
        ctx.beginPath();
        // パスの始点を設定する
        ctx.moveTo(points[0], points[1]);
        // 各頂点を結ぶパスを設定する
        for(let i = 2; i < points.length; i += 2){
            ctx.lineTo(points[i], points[i + 1]);
        }
        // パスを閉じることを明示する
        ctx.closePath();
        // 設定したパスで多角形の描画を行う
        ctx.fill();
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

