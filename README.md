# 🎯 Stamplo

종이와 도장으로 진행하던 스탬프 투어를 웹과 QR코드로 바꾼 모바일 스탬프 투어 서비스.  
팝업스토어·전시 현장의 번거로운 종이 스탬프를 디지털로 대체해, 운영자와 참여자 모두의 경험을 개선하는 것을 목표로 만들었습니다.

## 📅 개발 기간

2025.05.08 ~ 2025.06.23 (약 7주)

## 🤦‍♂️ 고민하는 사람들

| 이름                                        | 역할                              |
| ------------------------------------------- | --------------------------------- |
| [권우진](https://github.com/sy3ra)          | Frontend, UI/UX Designer          |
| [김예림](https://github.com/skylarkim22)    | Frontend, 기획자                  |
| [김현미](https://github.com/DevONew)        | Frontend, Project Manager         |
| [이현성](https://github.com/hyeonseong2023) | Frontend, Backend, Infra          |

## 🧰 기술 스택

| 구분          | 사용 기술                                 |
| ------------- | ----------------------------------------- |
| Core          | Next.js 16 (App Router), TypeScript       |
| 데이터 & 상태 | TanStack Query v5, Zustand                |
| 스타일 & UI   | Tailwind CSS v4, shadcn/ui, Framer Motion |
| 폼 & 차트     | Zod, Recharts, dnd-kit                    |
| BaaS & 인증   | Supabase (DB, Storage, Auth), Kakao OAuth |

## ✨ 주요 기능

### 🌐 랜딩페이지

- 서비스 소개 및 어드민 시작 페이지
- SEO 최적화 (메타태그, OG 태그, 파비콘 적용)

### 👤 유저 (모바일웹)

- **📷 QR 입장** — 행사 입구 QR 스캔 시 임시 userId 발급, 쿠키 기반 상태 복원
- **📖 브로슈어** — 행사 포스터 이미지 슬라이드 / 행사 상세 정보 확인
- **🎯 스탬프 미션** — 스탬프 UI / 리스트 UI 전환, 부스별 QR 스캔으로 미션 완료
- **🎁 설문 + 완료** — 전체 미션 완료 후 설문 제출 → 리워드 수령용 인증 QR 발급

### 🛠️ 어드민 (PC웹)

- **🎪 행사 관리** — 행사 CRUD, 테마 컬러 지정, 브로슈어 이미지 업로드
- **🗂️ 미션 관리** — 미션 CRUD, 부스별 QR 생성 및 다운로드
- **📊 대시보드** — 참여자 수, 미션 완료율, 시간대별 입장 추이, 설문 응답 분포 차트

## 📝 프로젝트 회고

[프로젝트 회고 보러가기 →](https://github.com/gomin-people/Stamplo/issues/270)

## 🎪 실제 사용 사례

### Codeit × Stamplo — 코드잇 위워크 들러보기

> 코드잇 프론트엔드 단기심화 14기 수강생 전용 공간에서 진행한 스탬프 투어 행사

- **일시**: 2025.06.23 (화) 09:00 ~ 19:00
- **장소**: 위워크 역삼2호점 3층 코드잇

<!-- 행사 결과 -->
<!-- TODO: 행사 종료 후 참여자 수, 미션 완료율 등 결과 추가 -->

## 🚀 시작하기

```bash
pnpm install
```

`.env.example`을 참고해 `.env.development` 파일을 생성한다.

```bash
pnpm dev
```

## 🧪 테스트

```bash
pnpm test
```

## 📚 API Reference

로컬 서버 실행 후 아래 주소에서 OpenAPI 3.1 문서를 확인할 수 있다.

| 항목         | 주소                               |
| ------------ | ---------------------------------- |
| Scalar UI    | http://localhost:3000/reference    |
| OpenAPI JSON | http://localhost:3000/openapi.json |
