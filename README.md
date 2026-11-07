# PillowNotes × NEXUS（手機優先）

隨身用的 Brain Dump + 睡眠節奏 app。**預設主介面是 Brain Dump**，UI 以手機 bottom tab 為主。

## 手機 User Flow

```
日間靈感/OT 訊息
    ↓
[Dump] 即時 Brain Dump（標籤 → 儲存 / 聽日 / 畫布）
    ↓
收工 · 今晚流程（可 skip）：Dump → 放鬆倒數 → 瞓覺 Checkpoint → Still Awake
    ↓
[放鬆] 10-3-2-1-0 或彈性 OT 倒數
    ↓
[睡眠] Checkpoint 開始瞓 →（如未瞓着）Still Awake
    ↓
朝早 [睡眠] 起身 Checkpoint + [更多] 晨間回顧
    ↓
需要整理時 → [畫布] 把 Dump 變成計劃
```

### 底部 5 Tab
| Tab | 用途 |
|-----|------|
| Dump | 即時卸荷（主路徑） |
| 睡眠 | Checkpoint + 日記 + 統計 |
| 放鬆 | 10-3-2-1-0 / 彈性倒數 |
| 畫布 | 進階整理（次要） |
| 更多 | 認知重構、同步、設定入口 |

## 手機 UI 原則（已套用）
- 底部導航 + safe-area（iPhone 橫條）
- 觸控目標 ≥ 44–48px
- 輸入框 16px（避免 iOS 自動放大）
- 單欄、少滾動分頁
- Dump 主按鈕 sticky 在拇指區
- 畫布工具改底部 dock
- PWA standalone（加到主畫面）

## 點樣用手機 Test

### 1）同一 Wi‑Fi（最快）
電腦進入專案資料夾：
```bash
python -m http.server 8899 --bind 0.0.0.0
```
查電腦區網 IP（Windows：`ipconfig`），手機瀏覽器開：
```
http://你的IP:8899
```

### 2）Chrome / Edge 模擬器（開發時）
1. 電腦開 app
2. F12 → Toggle device toolbar
3. 選 iPhone / Pixel
4. 測 tab 切換、鍵盤頂起、safe area

### 3）加到主畫面（最似 native）
- **Android Chrome**：網站符合安裝條件後，Brain Dump 頂部會出現「安裝 Nexus」。撳佢會叫起 Chrome 嘅安裝提示。主畫面名稱係 **Nexus**，冷開啟係 standalone（無網址列）。選單入面嘅「安裝應用程式 / 加到主畫面」仍然可以用。
- **iPhone Safari**：分享 → 加入主畫面  
會以全螢幕 standalone 開啟（無網址列）。離線再開仍然係同一個殼；Brain Dump 寫低嘅內容喺 localStorage `nexusOS`。

### 4）對外臨時連結（唔同網絡）
用 ngrok / Cloudflare Tunnel / localtunnel 把 8899 露出：
```bash
npx localtunnel --port 8899
```
把 URL 傳去手機。

### 5）真機 checklist
- [ ] 單手可完成 Dump 儲存
- [ ] 底部 tab 唔會被 Home indicator 遮住
- [ ] time input / select 可正常用
- [ ] 畫布拖動、縮放唔會同頁面 scroll 打架
- [ ] 離線再開（PWA cache）仍見上次 Dump
- [ ] 橫轉直畫面 layout 正常

## 打開（桌面）
```bash
python -m http.server 8899
```
或雙擊 `Yi-Jian-Da-Kai-_Windows.bat`

## 資料
LocalStorage key：`nexusOS`  
Mobile tab 記憶：`nexusMobileTab`
