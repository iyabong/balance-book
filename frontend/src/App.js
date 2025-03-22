function App() {
// 버튼 클릭시 호출될 함수
const handleClick = () => {
  alert("출금!");
};

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Balance Book 💳</h1>
      <p>카드별 잔액과 출금 내역을 관리하는 앱</p>

      <button onClick={handleClick}>출금하기</button>
    </div>
  );
}

export default App;
