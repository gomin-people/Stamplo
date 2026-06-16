## 1

목적:
- 마지막으로 본 행사 페이지로 보내기 위한 `selectedEventId` 저장/복원 흐름을 제거한다.
- `/admin` 진입 시 이미 정해진 우선순위 규칙으로만 이동하게 만든다.

작업 순서:
1. `stores/admin.ts`에서 `selectedEventId`가 어디에 쓰이는지 먼저 확인한다.
   - 현재는 `persist`로 `admin-store`에 저장되고 있다.
   - `partialize`도 `selectedEventId`만 저장하고 있으므로 이 흐름이 제거 대상이다.
2. `stores/admin.ts`에서 `persist`를 제거할지, 아니면 최소한 `selectedEventId` 저장만 제거할지 결정한다.
   - 현재 저장 목적이 마지막 조회 행사 복원뿐이라면 `persist` 자체를 제거하는 쪽이 단순하다.
   - `isEditMode`, `pendingHref`는 영속 저장 대상이 아니므로 유지 이유가 약하다.
3. `useSelectedEventId`, `useSetSelectedEventId`, `useClearSelectedEventId` 사용처를 정리한다.
   - 현재 확인된 핵심 사용처는 `AuthRedirect`, `Sidebar`, `EventSelector`다.
4. `/admin` 진입 시 저장된 `selectedEventId`를 읽어 이동시키는 로직을 제거한다.
   - 현재는 `components/admin/auth/AuthRedirect.tsx`가 `selectedEventId`가 있으면 해당 대시보드로, 없으면 등록 페이지로 보낸다.
   - 이 컴포넌트는 이후 행사 목록 기준 리다이렉트로 교체 대상이다.
5. `selectedEventId`를 저장하기 위해 호출하던 코드를 제거한다.
   - `EventSelector`의 `useEffect`에서 현재 행사 id를 store에 넣는 로직
   - `EventSelector`의 행사 전환 시 `setSelectedEventId(nextEventId)` 호출
   - `Sidebar`의 생성 취소 이동 시 `setSelectedEventId(cancelTargetEventId)` 호출
6. 위 저장값을 전제로 작성된 분기와 fallback을 정리한다.
   - `Sidebar`의 `selectedEvent` 탐색
   - 생성 취소 시 `selectedEventId` 우선 사용 로직
   - 저장값이 있으리라 가정하는 조건문이 남아 있지 않은지 확인한다.

검증:
- 브라우저 저장소에서 `admin-store`가 더 이상 마지막 행사 복원 용도로 쓰이지 않는지 확인
- 새로고침 후 `/admin` 진입 시 저장값 영향 없이 동작하는지 확인

## 2

목적:
- `/admin` 진입과 행사 생성 취소 이동을 모두 "이미 정의된 우선순위 규칙" 기준으로 맞춘다.
- 관리자 기본 화면의 이벤트 컨텍스트는 가능한 한 서버 처리 우선으로 정리한다.

작업 순서:
1. `/admin` 진입 리다이렉트는 서버에서 처리하는 방향을 유지한다.
   - 현재 `AuthRedirect`는 서버 컴포넌트에서 `get_priority_admin_event_id` RPC를 호출해 우선순위 행사로 이동한다.
   - 이 방향은 로컬 저장값 제거 이후의 기준과 맞으므로 유지한다.
2. `AuthRedirect`의 리다이렉트 기준이 최신 코드와 맞는지 확인한다.
   - 우선순위 행사 id가 있으면 `/admin/events/{id}/dashboard`
   - 없으면 `ADMIN_EVENT_REGISTER_PATH`
3. 생성 취소 이동도 같은 규칙을 쓰도록 유지한다.
   - 현재 `Sidebar`는 `firstEvent`만 사용하고 있다.
   - 이 값이 우선순위 규칙과 일치하는지 확인한다.
4. 이 단계에서는 클라이언트에 저장된 상태나 Query 캐시가 아니라, 서버/RPC 또는 서버가 보장한 규칙을 진실값으로 삼는다.
5. 저장된 과거 행사 id가 있다는 가정 하에 존재하던 fallback이 다시 생기지 않도록 점검한다.

검증:
- 세션이 있는 상태로 `/admin` 진입 시 우선순위 행사로 이동하는지 확인
- 행사 없을 때 등록 페이지로 이동하는지 확인
- 행사 생성 화면에서 생성 취소 시 우선순위 행사로 이동하는지 확인

## 3

목적:
- 관리자 기본 화면의 이벤트 컨텍스트를 클라이언트 query 중심이 아니라 서버 처리 우선 구조로 옮긴다.

작업 순서:
1. `events`를 어디서 읽고 있는지 현재 구조를 다시 확인한다.
   - `Sidebar`
   - `EventSelector`
   - `Header`
2. 상위 서버 컴포넌트에서 기본 이벤트 컨텍스트를 읽어 props로 내릴 수 있는 구조를 검토한다.
   - 현재 `app/(admin)/admin/events/layout.tsx`는 클라이언트 레이아웃이다.
   - 필요하면 이 레벨 또는 더 상위에서 서버 데이터를 주입할 수 있는 구조로 바꿀지 판단한다.
3. 관리자 기본 화면에서는 `useAdminEventsQuery`를 기본값으로 늘리지 않는다.
   - 단순 읽기와 초기 컨텍스트는 서버 처리 우선이다.
   - React Query는 꼭 필요한 지점에만 남긴다.
4. 이 단계의 목표는 `events`를 누가 들고 있느냐보다, "기본 화면에서 클라이언트 캐시에 의존하지 않도록" 구조를 바꾸는 것이다.

검증:
- 기본 이벤트 컨텍스트가 서버 기준으로 결정되는지 확인
- 클라이언트 query가 없어도 초기 진입과 기본 화면 렌더가 성립하는지 확인

## 4

목적:
- 서버에서 받은 기본 이벤트 컨텍스트를 `Sidebar`와 `EventSelector`에 props로 전달하는 구조를 만든다.

작업 순서:
1. `EventSelector` props에 `events`를 추가한다.
   - 현재는 `eventId`만 받는다.
2. `Sidebar`가 상위에서 받은 `events`를 그대로 `EventSelector`에 전달하도록 바꾼다.
3. `EventSelector` 내부의 `useAdminEventsQuery()`를 제거한다.
4. `EventSelector` 내부 계산을 props 기준으로 바꾼다.
   - `sortedEvents`
   - `selectedEvent`
   - `selectedEventLabel`
5. 로딩/에러 표현도 가능하면 상위에서 결정한 값을 내려주는 방향을 우선 검토한다.
6. 이 단계에서는 "query 중복 제거"보다 "기본 이벤트 데이터의 전달 경로 명확화"를 우선한다.

검증:
- 현재 행사 라벨 표시
- 드롭다운 목록 표시
- 행사 전환
- 행사 목록 조회 실패 시 문구 표시

## 5

목적:
- `Header`를 포함한 관리자 기본 화면의 남은 클라이언트 query 의존을 줄인다.

작업 순서:
1. `Header`의 `useAdminEventsQuery({ enabled: shouldFetchEvents })`가 서버 props로 대체 가능한지 확인한다.
2. 가능하면 `Header`도 같은 트리에서 받은 `events` 또는 현재 이벤트 메타를 사용하게 바꾼다.
3. 관리자 기본 화면에서 남아 있는 `useAdminEventsQuery` 사용처를 다시 점검한다.
4. React Query가 꼭 필요한 곳과 아닌 곳을 구분한다.
   - 기본 화면 이벤트 컨텍스트: 서버 처리 우선
   - 대시보드/실시간/refetch/invalidation 필요 구간: React Query 유지 가능
5. 이번 단계에서 손대지 않을 영역이 있으면 문서나 PR 설명에 남긴다.

검증:
- 헤더 행사명 표시가 깨지지 않는지 확인
- 관리자 기본 화면에서 `events` 관련 클라이언트 query 호출이 줄었는지 확인

## 6

목적:
- 전체 흐름이 저장값 없이도 정상 동작하는지 최종 확인한다.

작업 순서:
1. 로그인 직후 `/admin` 진입 확인
2. 세션 유지 상태에서 `/admin` 재진입 확인
3. 행사 상세, 미션 관리, 대시보드 이동 확인
4. 행사 생성 화면에서 생성 취소 이동 확인
5. 새로고침 후 현재 행사 선택 UI와 리다이렉트 확인
6. 브라우저 네트워크에서 `events` 중복 요청 감소 여부 확인

추가 메모:
- 관리자 기본 화면의 이벤트 컨텍스트는 서버 처리 우선으로 정리한다.
- React Query는 관리자 대시보드, mutation 후 invalidate, 실시간 refetch 등 실제 필요가 있는 곳에만 남긴다.
- `zustand`는 `isEditMode`, `pendingHref` 같은 UI 상태에 집중시킨다.
- 이번 작업의 핵심은 "마지막 본 행사 기억"을 없애고 "정해진 규칙에 따른 진입"으로 바꾸는 것이다.
