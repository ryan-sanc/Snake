# Đồ án cuối kì môn kĩ năng nghề nghiệp
Nhóm : Vấn đề kĩ năng

Thành viên :
- Phạm Quang Anh
- Trần Văn Chót
- Hà Nguyễn Trường Giang
- Hoàng Văn Hoàng
- Nguyễn Duy Khang

Đây là một ứng dụng game Snake được viết bằng React và TypeScript. Game được hiển thị trong một thẻ <canvas> và sử dụng các hook như useState, useRef, và useEffect để quản lý trạng thái game.

### 1. Biến và hàm khởi tạo
- canvasX và canvasY: Kích thước của canvas (khu vực chơi) là 1000x1000.
- initialSnake: Mảng lưu vị trí ban đầu của con rắn.
- initialApple: Tọa độ của quả táo ban đầu.
- scale: Quy mô mỗi bước di chuyển của con rắn, ở đây là 50px.
- timeDelay: Thời gian trì hoãn giữa các lần di chuyển của rắn (100ms).
### 2. Sử dụng các hook chính

- useRef: Dùng để tham chiếu đến thẻ <canvas> để vẽ rắn và táo.
- useState:
  - snake: Trạng thái chứa vị trí hiện tại của con rắn (mảng các tọa độ).
  - apple: Vị trí của quả táo.  
  - direction: Hướng di chuyển của con rắn, ở đây là [0, -1] (tức đi lên).
  - delay: Trì hoãn thời gian giữa các lần di chuyển của rắn.
  - gameOver: Xác định trạng thái kết thúc game.
  - score: Điểm hiện tại của người chơi.
  - useInterval: Hook này giúp chạy trò chơi một cách lặp lại dựa trên giá trị delay.
### 3. Các hàm chính

- handleSetScore(): Chưa được triển khai, có thể dùng để cập nhật điểm số khi cần.

- play(): Hàm này sẽ khởi động trò chơi, cần triển khai thêm logic để bắt đầu game.

- checkCollision(head: number[]): Hàm để kiểm tra va chạm của rắn, ví dụ va vào tường hoặc tự thân.

- appleAte(newSnake: number[][]): Kiểm tra xem rắn đã ăn quả táo chưa, nếu có, sẽ kéo dài thân rắn và sinh ra quả táo mới.

- runGame(): Hàm xử lý chính của game, thực hiện mỗi bước di chuyển của rắn, kiểm tra va chạm và ăn táo.

- changeDirection(e: React.KeyboardEvent<HTMLDivElement>): Hàm này sẽ thay đổi hướng di chuyển của rắn dựa trên các phím mũi tên mà người chơi nhấn.

### 4. Phần giao diện (JSX)
Canvas: Là khu vực chơi chính, nơi rắn và táo sẽ được vẽ.
Các hình ảnh như quả táo (AppleLogo) và màn hình (Monitor) được hiển thị để tăng phần thẩm mỹ.
Khi trò chơi kết thúc, dòng chữ "Game Over" sẽ hiện ra và nút "Play" sẽ xuất hiện để bắt đầu lại trò chơi.
Hiển thị điểm số hiện tại và điểm cao nhất (được lưu trong localStorage).

### 5. Hàm changeDirection

• Hàm này lắng nghe sự kiện nhấn phím của người chơi (Arrow keys) để thay đổi hướng di chuyển của rắn.
• e.key: Xác định phím nào được nhấn (ArrowLeft, ArrowUp, ArrowRight, ArrowDown).
• Trong mỗi trường hợp, hàm kiểm tra điều kiện để ngăn rắn không thể quay ngược lại hướng đi (tránh đảo ngược 180 độ). Ví dụ, nếu rắn đang đi sang phải (direction[0] !== -1), nó không thể chuyển hướng sang trái.

### 6. Hàm play

• Hàm này khởi động lại trò chơi khi người chơi nhấn vào nút “Play”.
• setSnake(initialSnake): Đặt lại vị trí ban đầu của rắn.
• setApple(initialApple): Đặt lại vị trí ban đầu của quả táo.
• setDirection([1, 0]): Đặt hướng đi mặc định cho rắn (sang phải).
• setDelay(timeDelay): Đặt khoảng thời gian giữa các bước di chuyển.
• setScore(0): Đặt lại điểm số về 0.
• setGameOver(false): Đặt lại trạng thái trò chơi để bắt đầu lại.

### 7. Thiết lập canvas:
let fruit = document.getElementById("fruit") as HTMLCanvasElement;: Lấy tham chiếu đến phần tử HTML hiển thị hình ảnh của quả táo. Dùng cú pháp as để ép kiểu giúp TypeScript hiểu rằng fruit là một phần tử HTML canvas.
const canvas = canvasRef.current;: Lấy tham chiếu đến thẻ <canvas>.
const ctx = canvas.getContext("2d");: Lấy context 2D từ canvas để vẽ các phần tử như rắn, táo.

### 9. Vẽ rắn:

ctx.setTransform(scale, 0, 0, scale, 0, 0);: Thiết lập tỷ lệ (scale) cho canvas để tất cả các đối tượng được vẽ với kích thước tương đối theo đơn vị scale (ở đây là 50px).
ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);: Xóa canvas trước khi vẽ lại các phần tử để tránh các đối tượng chồng chéo lên nhau.
Vẽ từng phần của rắn:

Đầu rắn: Phần đầu của rắn được vẽ như một hình tròn với màu xanh đậm (#6B8E23). Sau đó, hai mắt trắng được vẽ lên đầu rắn.
Thân rắn: Các đoạn thân của rắn được vẽ dưới dạng hình vuông với màu xanh trung bình (#8FBC8F).
Đuôi rắn: Đoạn cuối cùng của rắn (đuôi) được vẽ dưới dạng một hình tròn nhỏ hơn với màu xanh nhạt hơn (#9ACD32).

### 10. Vẽ quả táo:

ctx.drawImage(fruit, apple[0], apple[1], 1, 1);: Vẽ hình ảnh quả táo (được lấy từ phần tử có id fruit) lên canvas tại vị trí của quả táo (tọa độ apple[0], apple[1]), với kích thước là 1x1 (sử dụng scale).

### 11. Hàm checkCollision(head: number[]):

• Mục đích: Kiểm tra xem đầu rắn có va chạm với tường hoặc chính thân của nó không.

Cách hoạt động:

•	Vòng lặp đầu tiên: Kiểm tra xem bất kỳ tọa độ nào của đầu rắn (head[i]) có nằm ngoài giới hạn của khu vực chơi (canvas) hay không.
•	head[i] < 0: Nếu bất kỳ tọa độ nào của đầu rắn nhỏ hơn 0, điều đó có nghĩa là rắn đã đâm vào tường.
•	head[i] * scale >= canvasX: Kiểm tra xem tọa độ đã nhân với scale có vượt quá kích thước của canvas không (tức là đã đâm vào tường).
•	Vòng lặp thứ hai: Kiểm tra xem đầu rắn có trùng với bất kỳ đoạn thân nào của chính nó hay không.
•	Nếu tọa độ của đầu rắn trùng với bất kỳ tọa độ nào của thân rắn (s[0] và s[1]), trả về true (rắn đã tự va chạm).
Kết quả:

•	Nếu có va chạm (với tường hoặc thân rắn), trả về true, ngược lại trả về false.

### 12. Hàm appleAte(newSnake: number[][]):

• Mục đích: Kiểm tra xem rắn có ăn quả táo hay không và sinh ra một quả táo mới.

Cách hoạt động:

•	let coord = apple.map(() => Math.floor((Math.random() * canvasX) / scale));: Sinh ra tọa độ mới ngẫu nhiên cho quả táo khi rắn ăn nó.
•	Math.random() * canvasX / scale: Sinh tọa độ trong giới hạn của khu vực chơi.
•	Kiểm tra rắn có ăn táo:
•	So sánh tọa độ đầu của rắn với tọa độ quả táo.
•	Nếu rắn ăn quả táo (tọa độ đầu rắn và táo trùng nhau), thì:
•	Tăng điểm số (setScore(score + 1)).
•	Đặt quả táo mới vào vị trí ngẫu nhiên (setApple(newApple)).
•	Trả về true (đã ăn táo).
•	Nếu không ăn táo, trả về false.

### 13. Hàm runGame():

• Mục đích: Điều khiển toàn bộ quá trình chơi của trò chơi.

Cách hoạt động:

•	Tạo ra vị trí đầu mới của rắn:
•	const newSnakeHead = [newSnake[0][0] + direction[0], newSnake[0][1] + direction[1]];
•	Di chuyển đầu rắn theo hướng hiện tại (lấy từ direction).
•	Thêm đầu mới vào rắn:
•	newSnake.unshift(newSnakeHead);: Thêm phần đầu mới của rắn vào đầu mảng newSnake, tạo hiệu ứng di chuyển.
•	Kiểm tra va chạm:
•	Gọi hàm checkCollision(newSnakeHead) để kiểm tra xem đầu mới có va chạm hay không.
•	Nếu có va chạm, dừng trò chơi:
•	setDelay(null);: Ngừng trò chơi bằng cách dừng interval.
•	setGameOver(true);: Đặt trạng thái game kết thúc.
•	handleSetScore();: Gọi hàm xử lý điểm số cao nhất (cần triển khai).
•	Kiểm tra nếu rắn ăn táo:
•	Gọi hàm appleAte(newSnake) để kiểm tra nếu rắn ăn quả táo.
•	Nếu không ăn táo, loại bỏ phần cuối cùng của rắn (newSnake.pop();) để giữ độ dài của rắn ổn định.
•	Cập nhật trạng thái rắn:
•	setSnake(newSnake);: Cập nhật trạng thái của rắn với mảng mới.

### 14. CSS file
    
  #### 14.1. Google Font Import (@import url(...))

  • Mục đích: Đoạn này sử dụng font “Press Start 2P” từ Google Fonts, một kiểu font pixel retro thường dùng trong các trò chơi điện tử cổ điển.
  • Cách sử dụng: Font này được áp dụng cho toàn bộ trang web qua font-family: "Press Start 2P", cursive;.

  #### 14.2. Body Styles
  
  • background: white: Đặt màu nền của trang là màu trắng.
  • font-family: "Press Start 2P", cursive;: Sử dụng font “Press Start 2P” cho toàn bộ nội dung trong body. Font cursive là font fallback nếu “Press Start 2P” không tải được.

  #### 14.3. Class .playArea (Canvas chơi)
  
  • Kích thước: width: 585px;, height: 440px; xác định kích thước của canvas.
  • Viền: border: 5px solid transparent; giúp tạo khoảng cách giữa canvas và các thành phần khác.
  • Vị trí cố định: position: fixed; giữ canvas ở giữa màn hình, kể cả khi trang được cuộn.
  • Căn chỉnh: top: 43.2%, left: 50%, transform: translate(-50%, -50%); căn giữa canvas trong trang.

  #### 14.4. ID #fruit (Hình ảnh quả táo)
  
  • display: none;: Ẩn hình ảnh quả táo trong HTML vì nó chỉ được sử dụng để vẽ lên canvas (không cần hiển thị trực tiếp).

  #### 14.5. Class .monitor (Màn hình cũ)
  
  • Kích thước: width: 800px;, height: 800px; điều chỉnh kích thước của ảnh màn hình.
  • Vị trí cố định: position: fixed; giữ hình ảnh màn hình ở giữa màn hình, và luôn hiển thị phía sau các phần tử khác.
  • Căn chỉnh: top: 50%, left: 50%, transform: translate(-50%, -50%); căn giữa hình ảnh màn hình với trang.

  #### 14.6. Class .gameOver (Thông báo kết thúc trò chơi)
  
  • Vị trí cố định: position: fixed; giữ thông báo ở giữa màn hình.
  • Căn chỉnh: top: 43.2%, left: 50%, transform: translate(-50%, -50%); căn giữa thông báo trên trang.
  • Màu sắc & kích thước: color: white;, font-size: 35px; làm chữ trắng với kích thước lớn để dễ nhận biết khi trò chơi kết thúc.

  #### 14.7. Class .playButton (Nút “Play”)
  
  • Vị trí cố định: position: fixed;, top: 80%;, left: 50%;, transform: translate(-50%, -50%); căn chỉnh nút play ở giữa phía dưới màn hình.
  • Màu sắc & kiểu dáng:
  • background: #502c7b;: Màu nền tím.
  • border: 2px solid white;, color: white;: Viền trắng và chữ màu trắng.
  • padding: 10px;: Tạo khoảng cách bên trong nút.
  • box-shadow: 4px 4px 0px 0px white;: Tạo hiệu ứng bóng đổ trắng.
  • Font chữ: Sử dụng font “Press Start 2P”, với một vài hiệu ứng:
  • font-weight: 700;: Chữ đậm.
  • letter-spacing: 5px;: Khoảng cách giữa các chữ cái rộng hơn để tạo phong cách retro.
  • text-transform: uppercase;: Chuyển tất cả chữ cái thành chữ in hoa.

  #### 14.8. Class .scoreBox (Hộp hiển thị điểm số)
  
  • Vị trí: float: right;, margin: 30px; đặt hộp hiển thị điểm ở góc phải màn hình.
  • Shadow: box-shadow: 0px 4px 13px 0px rgba(48, 26, 74, 0.63); thêm bóng đổ nhẹ cho hiệu ứng nổi bật.
  • Commented out border: /* border: 1px solid black; */ (đã bị tắt) có thể được dùng để vẽ viền nếu cần thiết.

  #### 14.9. Tiêu đề (H2)
  
  • Font size: font-size: 18px;: Kích thước chữ của các tiêu đề bên trong .scoreBox.
  • Padding: padding: 10px;: Thêm khoảng cách giữa chữ và viền của .scoreBox.


