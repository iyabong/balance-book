# 📒 Balance Book

개인 자산 및 이력 관리를 위한 통합 프로젝트입니다.  
React 기반 프론트엔드, .NET 백엔드, Blazor Resume 모듈, Nexacro + Spring 실습 프로젝트까지 포함되어 있습니다.  

---

## 🚀 주요 기능

### 1. 카드 관리
- 여러 장의 선불카드(충전식 카드) 관리
- 카드별 잔액 확인
- [사용] 버튼을 통한 결제 처리
- 충전/사용 이력 관리

### 2. 대출(Loan) 관리
- 대여 및 상환 내역 기록
- 차용인별 거래 이력 조회
- 요약 및 상세 내역 화면

### 3. 거래 이력 (History)
- 카드별 충전/사용 내역
- 차용인별 대출/상환 내역
- 월별 보고서 기능 (개발 예정)

### 4. 루틴 점검 (Routine Check)
- 매일/매주 점검할 항목 관리
- 달력 기반 UI로 진행 현황 표시
- 체크 전 / 일부 체크 / 체크 완료 상태 구분
- Oracle DB + .NET 백엔드 기반

### 5. 이력 관리 (Resume)
- Blazor WebAssembly 기반 이력 관리 UI
- 기본정보, 프로젝트 이력 입력/수정
- Excel 다운로드 기능 (개발 예정)
- Vercel에 `/resume` 경로로 배포

### 6. Nexacro + Spring 실습
- Nexacro17 Studio와 Spring MVC 연동
- 파일 업/다운로드 및 컴포넌트 실습

---

## 🛠 기술 스택

- **Frontend**: React (CRA) → Vercel 배포
- **Backend**: ASP.NET Core (C#) → Oracle DB, EF Core, Fly.io/Render/Azure 배포
- **Database**: Supabase(PostgreSQL) → Oracle DB로 마이그레이션 진행 중
- **Resume Module**: Blazor WebAssembly (.NET 9) → Vercel 정적 배포
- **Experimental**: Nexacro17 + Spring (JDK 1.7) → Eclipse Dynamic Web Project

---

## 📂 프로젝트 구조

```
balance-book/
├── frontend/             # React (Vercel)
├── backend/              # ASP.NET Core (C#)
├── blazor/
│   └── resume/           # Blazor WASM 이력 관리
├── ns/                   # Nexacro + Spring 통합 실습
│   ├── nexacro/          
│   └── spring/           
├── .gitignore
├── README.md
```

---

## ⚙️ 개발 환경

- **IDE**
  - VS Code (React, Backend)
  - Visual Studio 2022 (Blazor)
  - Eclipse (Spring, Nexacro)
- **Cloud / Infra**
  - Vercel (프론트 배포)
  - Railway / Render / Azure (백엔드 배포)
  - Oracle Cloud VM (LLM 실습, OCR 서버)

---

## 📌 브랜치 전략

- **main**: Production 배포용
- **dev**: Pre-Production (Vercel Preview, Railway/Azure Dev DB 연결)
- **feature/***: 개별 기능 개발 브랜치 (예: `feature-blazor-resume`)

---

## 🔮 앞으로의 계획

- 카드/대출/루틴 통합 리포트 대시보드
- OCR 기반 상품명 자동 추출 기능 (Python + FastAPI, Railway 배포)
- Resume Excel 다운로드 및 PDF 생성
- GitHub.io 블로그와 연계한 개발기 문서화

---

## 📖 관련 링크

- 📂 GitHub Repo: [balance-book](https://github.com/iyabong/balance-book)
- 🌐 배포: [https://balance-book.vercel.app](https://balance-book.vercel.app)
- 📝 Blog: [iyabong.github.io](https://iyabong.github.io)
