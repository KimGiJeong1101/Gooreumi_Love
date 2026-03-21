# ☁️ 구름이 기록

구름이의 사진과 영상을 모아둔 개인 일기 사이트입니다.

---

## 프로젝트 소개

배경음악과 함께 구름이의 사진을 슬라이드쇼로 감상하고, 사진일기와 영상일기 페이지에서 추억을 모아볼 수 있는 프론트엔드 웹 애플리케이션입니다.

---

## 기술 스택

| 분류 | 기술 |
|------|------|
| 프레임워크 | React 19 |
| 빌드 도구 | Vite 7 |
| 스타일링 | Tailwind CSS 3 |
| 아이콘 | lucide-react |

---

## 주요 기능

### 홈 화면
- 구름이 사진을 **랜덤 순서**로 슬라이드쇼 재생
- 하단 슬라이더로 사진 전환 속도 조절 (1초 ~ 10초)
- 블러 배경 + 메인 이미지 레이아웃

### 사진일기 페이지
- 구름이 사진 갤러리
- 모바일/웹 화면에 맞춘 레이아웃 자동 전환
- 페이지네이션 지원

### 영상일기 페이지
- 구름이 영상 갤러리
- 썸네일 클릭 시 영상 재생
- 모바일/웹 화면에 맞춘 레이아웃 자동 전환

### 배경음악 (BGM)
- 사이트 진입 시 인트로 화면 → 버튼 클릭으로 음악 시작
- 재생 / 일시정지 / 정지 컨트롤
- 볼륨 슬라이더 (데스크탑/태블릿 전용)
- 모바일에서는 볼륨 슬라이더 숨김 처리

---

## 프로젝트 구조

```
src/
├── assets/
│   ├── images/          # 구름이 사진 (JPEG/JPG)
│   ├── videos/          # 구름이 영상 (MP4)
│   └── video-thumbs/    # 영상 썸네일 (PNG)
├── components/
│   └── BackGroundMusic.jsx   # BGM 플레이어
├── hooks/
│   ├── useMediaQuery.jsx     # 반응형 감지 훅
│   ├── usePhotoPagination.jsx
│   └── useVideoPagination.jsx
├── pages/
│   ├── Contents.jsx          # 페이지 라우터
│   ├── Header.jsx            # 네비게이션 헤더
│   ├── Footer.jsx            # 슬라이드 속도 조절 푸터
│   ├── HomePage.jsx          # 홈 슬라이드쇼
│   ├── PhotoPage.jsx         # 사진일기 (반응형 분기)
│   ├── VideoPage.jsx         # 영상일기 (반응형 분기)
│   ├── mobilecomponents/
│   │   ├── PhotoMobilePage.jsx
│   │   └── VideoMobilePage.jsx
│   └── webcomponents/
│       ├── PhotoWebPage.jsx
│       └── VideoWebPage.jsx
├── App.jsx
└── main.jsx
public/
└── Gooreumi_Love.mp3    # 배경음악 파일
```

---

## 실행 방법

### 사전 준비

> Node.js가 설치되어 있어야 합니다.
> [Node.js 공식 사이트](https://nodejs.org)에서 **LTS 버전**을 다운로드해 설치하세요.
> 설치 후 터미널(명령 프롬프트)에서 `node -v` 를 입력하면 버전이 출력되면 완료입니다.

### 설치 및 실행

```bash
# 1. 저장소 클론 (코드 내려받기)
git clone https://github.com/KimGiJeong1101/Gooreumi_Love.git

# 2. 프로젝트 폴더로 이동
cd Gooreumi_Love

# 3. 패키지 설치 (처음 한 번만)
npm install

# 4. 개발 서버 실행
npm run dev
```

브라우저에서 `http://localhost:5173` 으로 접속하면 사이트를 확인할 수 있습니다.

### 추가 명령어

```bash
# 프로덕션 빌드 (배포용 파일 생성)
npm run build

# 빌드 결과 미리보기
npm run preview
```

---

## 반응형 지원

- **모바일** (768px 이하): 세로 스크롤 최적화 레이아웃
- **데스크탑** (768px 초과): 그리드 레이아웃

`useMediaQuery` 훅으로 화면 크기를 감지하여 각 페이지에서 모바일/웹 컴포넌트를 자동으로 전환합니다.
