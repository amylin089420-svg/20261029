// 宣告變數來儲存精靈圖資源與動畫狀態
let imgIdle;        // 靜止狀態精靈圖 (111.png)
let imgWalk;        // 移動狀態精靈圖 (222.png)

// 精靈圖 1 (靜止) 的設定參數
const idleFrames = 13;             // 圖片張數
const idleTotalW = 1646;           // 整張圖片總寬度
const idleTotalH = 133;            // 整張圖片總高度
const idleFrameW = idleTotalW / idleFrames; // 單一影格寬度 (約 126.61px)
const idleFrameH = idleTotalH;     // 單一影格高度 (133px)

// 精靈圖 2 (移動) 的設定參數
const walkFrames = 12;             // 圖片張數
const walkTotalW = 1327;           // 整張圖片總寬度
const walkTotalH = 101;            // 整張圖片總高度
const walkFrameW = walkTotalW / walkFrames; // 單一影格寬度 (約 110.58px)
const walkFrameH = walkTotalH;     // 單一影格高度 (101px)

// 角色位置與狀態變數
let posX;           // 角色的 X 座標
let posY;           // 角色的 Y 座標
let moveSpeed = 4;  // 角色的移動速度 (像素/影格)
let facingLeft = false; // 是否向左翻轉 (預設面向右邊)
let frameIndex = 0; // 目前播放到的動畫影格索引

// p5.js 預載函式：在此載入所有外部圖片，確保顯示時圖片已就緒
function preload() {
  // 載入靜止狀態的精靈圖檔
  imgIdle = loadImage('1/11/111.png');
  // 載入移動狀態的精靈圖檔
  imgWalk = loadImage('1/22/222.png');
}

// p5.js 初始化設定函式
function setup() {
  // 建立與螢幕解析度同寬同高的全螢幕畫布
  createCanvas(windowWidth, windowHeight);
  
  // 設定圖片繪製基準點為中心點 (方便進行鏡像翻轉與定位)
  imageMode(CENTER);
  
  // 設定動畫播放速率為每秒 12 畫格 (可依需求微調動畫順暢度)
  frameRate(12);
  
  // 將角色的初始位置設定在畫布正中央
  posX = width / 2;
  posY = height / 2;
}

// p5.js 主繪製循環函式 (預設每秒執行約 60 次，但受 frameRate 影響)
function draw() {
  // 清除背景並填滿指定顏色 #caf0f8
  background('#caf0f8');
  
  // 檢查目前鍵盤是否按下右鍵或左鍵
  let isRightDown = keyIsDown(RIGHT_ARROW);
  let isLeftDown = keyIsDown(LEFT_ARROW);
  
  // 判斷角色目前是否處於移動狀態
  let isMoving = isRightDown || isLeftDown;
  
  // 處理鍵盤按下的移動與方向邏輯
  if (isRightDown) {
    posX += moveSpeed;    // 按下右鍵：X 座標增加 (往右移動)
    facingLeft = false;   // 面向右邊 (不翻轉)
  } else if (isLeftDown) {
    posX -= moveSpeed;    // 按下左鍵：X 座標減少 (往左移動)
    facingLeft = true;    // 面向左邊 (需要翻轉)
  }
  
  // 根據角色狀態選擇對應的精靈圖與參數
  let currentImg = isMoving ? imgWalk : imgIdle;
  let totalFrames = isMoving ? walkFrames : idleFrames;
  let frameW = isMoving ? walkFrameW : idleFrameW;
  let frameH = isMoving ? walkFrameH : idleFrameH;
  
  // 計算目前應裁剪畫面的 X 座標位置 (目前影格索引 * 單一影格寬度)
  let sx = (frameIndex % totalFrames) * frameW;
  
  // 保存目前的畫布變換矩陣狀態
  push();
  
  // 將畫布的原點 (0,0) 移動到角色的實際位置
  translate(posX, posY);
  
  // 如果角色面向左邊，將 X 軸水平翻轉 (-1 倍)
  if (facingLeft) {
    scale(-1, 1);
  }
  
  // 繪製精靈圖的特定切片區域：
  // image(圖片, 畫布X, 畫布Y, 顯示寬, 顯示高, 裁切X, 裁切Y, 裁切寬, 裁切高)
  image(currentImg, 0, 0, frameW, frameH, sx, 0, frameW, frameH);
  
  // 恢復先前保存的畫布狀態，避免影響下一次繪製
  pop();
  
  // 切換到下一個動畫影格 (循環播放)
  frameIndex = (frameIndex + 1) % totalFrames;
}

// 當使用者調整瀏覽器視窗大小時自動觸發的函式
function windowResized() {
  // 將畫布大小重新調整為目前視窗的新寬高
  resizeCanvas(windowWidth, windowHeight);
}