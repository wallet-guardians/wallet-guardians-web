📌 WalletGuardians - 거지나기

🏆 가계부 관리 & 절약 챌린지 플랫폼

🌟 프로젝트 소개

💰 거지나기는 사용자의 소득과 지출을 체계적으로 관리하고, 예산을 설정하여 효과적으로 절약 습관을 기를 수 있도록 돕는 웹 애플리케이션입니다.

이 프로젝트는 단순한 가계부를 넘어서, 재미있는 절약 시스템과 사용자 간의 경쟁 요소를 결합하여 즐겁게 소비를 관리할 수 있도록 설계되었습니다.

또한 대부분의 자취를 하는 학생 및 직장인들은 예상치 못한 지출로 인해 과소비하는 경향이 있습니다.
이를 해결하기 위해, 이 앱은 사용자에게 소득과 지출을 기록하고 월별 예산을 설정할 수 있는 기능을 제공합니다.
또한, 영수증이나 계좌 내역 등의 공식적인 소비 인증 자료를 첨부할 수 있어 재정 기록의 신뢰성을 높입니다.

🚀 주요 기능

🎯 1) 목표 금액 설정

매달 사용할 예산 목표 금액을 설정하여 지출 관리 효율성 증대.

목표 금액 대비 실제 사용 금액을 한눈에 확인 가능.

📅 2) 개인 달력 기능

일별 지출 기록을 추가할 수 있는 캘린더 제공.

날짜별로 지출 내역, 목표 금액 대비 진행 상황을 표시.

📸 3) 영수증 사진 저장 기능

사용자가 직접 영수증 사진을 업로드하여 기록 가능.

사진을 기반으로 한 소비 데이터를 쉽게 관리할 수 있음.

✍️ 4) 영수증 없는 구매 관리

사용자가 영수증이 없는 구매도 빠르게 기록할 수 있도록 UI 제공.

필수 입력 필드:

구매 항목명

지출 금액

구매 날짜

🔐 5) 회원가입 및 로그인 기능

JWT 인증 방식을 적용한 회원가입 및 로그인 구현.

회원 정보 수정 및 닉네임 설정 가능.

🏆 6) 소비 패턴 분석 및 칭호 부여

사용자의 지난 달 소비 관리 패턴을 분석하여 칭호 부여.

데이터 기반의 절약 동기 부여.

🏅 7) 친구 추가 및 소비 경쟁 기능

사용자 간 친구 추가 기능 제공.

친구의 소비 패턴을 비교하고 서로의 목표 달성을 응원 가능.

⚠️ 8) 예산 초과 시 알림 시스템

설정한 목표 예산을 초과할 경우 경고 메시지 표시.

"⚠️ 예산 초과! 다음 소비를 조심하세요!"

"🚨 예산 관리 모드가 활성화되었습니다!"

📊 9) 통계 그래프 기능

사용자가 입력한 목표금액과 현재 지출로 인한 잔액을 대조하는 그래프.

이로써 사용자는 한 눈에 더욱 직관적으로 소비 성향을 파악가능.

📌 페이지별 UI & 기능 설명

페이지

기능 설명

스크린샷

목표 금액 설정 페이지

매달 사용할 목표 예산을 설정

📷 (추가 예정)

달력 페이지

날짜별 소비 내역을 기록하고 확인

📷 (추가 예정)

소비 분석 페이지

목표 금액 대비 소비 분석 및 시각화

📷 (추가 예정)

영수증 관리 페이지

영수증을 업로드하고 저장

📷 (추가 예정)

회원가입 & 로그인 페이지

회원가입, 로그인, 프로필 설정

📷 (추가 예정)

라우팅 개요

주요 페이지 간 이동 흐름

📷 (추가 예정)

🛠️ 기술 스택

🎨 Frontend

React.js + React Router: UI 렌더링 및 페이지 라우팅

Recharts: 데이터 시각화 (소비 분석 차트)

Emotion.js (CSS-in-JS): UI 스타일링

Axios: API 요청 및 데이터 관리

Context API: 상태 관리 (예산, 소비 내역 등)

🖥️ Backend

Spring Boot: REST API 개발

Spring Security + JWT: 인증 및 보안

Spring Data JPA: DB 연동 및 관리

AWS S3: 영수증 이미지 저장

MySQL: 사용자 및 소비 데이터 저장

🛠 DevOps & 기타

Docker & Docker Compose: 배포 및 환경 설정 자동화

GitHub Actions: CI/CD 구축

Postman: API 테스트 및 문서화

AWS EC2 & RDS: 배포 및 데이터 관리

📌 프로젝트 구조

📦 BudgetJourney
├── 📂 frontend
│ ├── 📂 src
│ │ ├── 📂 components # UI 컴포넌트 모음
│ │ ├── 📂 pages # 주요 페이지 (Main, Profile, GoalSetting 등)
│ │ ├── 📂 api # API 요청 관련 함수 모음
│ │ ├── 📂 IMG # src 내부 접근해야하는 IMG 모음
│ │ ├── 📂 auth # 보안핸들링 컴포넌트
│ │ ├── 📂 context # 전역 상태 관리 (Goal, Sidebar, Friend 등)
│ │ ├── 📂 style # Emotion 스타일 정의
│ ├── package.json # 프론트엔드 의존성 관리
│ ├── index.js # React 애플리케이션 진입점
├── 📂 backend
│ ├── 📂 src
│ │ ├── 📂 main
│ │ │ ├── 📂 controller # API 컨트롤러
│ │ │ ├── 📂 service # 비즈니스 로직 처리
│ │ │ ├── 📂 repository # DB 연동
│ │ │ ├── 📂 config # 인증 및 보안 설정
│ ├── pom.xml # 백엔드 의존성 관리
└── README.md # 프로젝트 설명

👥 팀 소개

역할

이름

GitHub

프로필 사진

🏗 백엔드 개발

서아영, 김시온, 정석우

[GitHub 링크]

📷 (추가 예정)

🎨 프론트엔드 개발

최원빈, 이성진

[GitHub 링크]

📷 (추가 예정)

🖌 UI/UX 디자이너

최원빈, 이성진

[GitHub 링크]

📷 (추가 예정)

🔥 설치 및 실행 방법

✅ 프론트엔드 실행

cd frontend
npm install # 패키지 설치
npm start # 개발 서버 실행

✅ 백엔드 실행

cd backend
mvn spring-boot:run # 백엔드 서버 실행

🎉 기여하는 방법

이 저장소를 포크합니다.

새로운 기능을 개발 후 PR을 생성합니다.

리뷰 후 머지되면 프로젝트에 반영됩니다!

📌 문의 및 피드백

Issues: 버그 리포트 및 기능 요청

Discussions: 프로젝트 개선 의견 나누기

✅ GitHub Issues에서 피드백을 남겨주세요!

💡 BudgetJourney 프로젝트에 기여해 주셔서 감사합니다! 🚀
