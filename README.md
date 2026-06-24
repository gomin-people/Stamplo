# 🎯 Stamplo

종이와 도장으로 진행하던 스탬프 투어를 웹과 QR코드로 바꾼 모바일 스탬프 투어 서비스.  
팝업스토어·전시 현장의 번거로운 종이 스탬프를 디지털로 대체해, 운영자와 참여자 모두의 경험을 개선하는 것을 목표로 만들었습니다.

## 📅 개발 기간

2025.05.08 ~ 2025.06.23 (약 7주)

## 🤦‍♂️ 고민하는 사람들

| 이름                                   | 역할                          |
| -------------------------------------- | ----------------------------- |
| [권우진](https://github.com/sy3ra)     | Frontend, UI/UX Designer      |
| [김예림](https://github.com/DevONew)     | Frontend, 기획자            |
| [김현미](https://github.com/skylarkim22) | Frontend, Project Manager     |
| [이현성](https://velog.io/@528528abcd) | Frontend, Backend, Infra      |

## 🧰 기술 스택

| 구분          | 사용 기술                                 |
| ------------- | ----------------------------------------- |
| Core          | Next.js 16 (App Router), TypeScript, pnpm |
| 데이터 & 상태 | TanStack Query v5, Zustand                |
| 스타일 & UI   | Tailwind CSS v4, shadcn/ui, Framer Motion |
| 폼 & 차트     | Zod, Recharts, dnd-kit                    |
| BaaS & 인증   | Supabase (DB, Storage, Auth), Kakao OAuth |

## 📄 기술 문서

ERD, 폴더 구조 및 설계 의도, 기술 스택 선택 이유 등 상세 문서는 아래에서 확인할 수 있습니다.

[기술 문서 보러가기 →](https://app.notion.com/p/Stamplo-0ecd989c6a144f009f837acda2392ef0?source=copy_link)

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

아래 주소에서 API 문서를 확인할 수 있습니다.

| 항목         | 주소                               |
| ------------ | ---------------------------------- |
| Scalar UI    | https://go-stamplo.vercel.app/reference    |
| OpenAPI JSON | https://go-stamplo.vercel.app/openapi.json |
