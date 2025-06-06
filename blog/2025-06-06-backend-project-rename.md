# 2025-06-06 프로젝트 업데이트

오늘은 백엔드 프로젝트명을 `BalanceBook.CardApi`에서 `BalanceBook`으로 변경했습니다. 이에 따라 네임스페이스, Docker 설정 및 배포 설정 파일도 모두 수정했습니다. 주요 변경 사항은 아래와 같습니다.

## 백엔드

- 프로젝트 폴더명을 `BalanceBook`으로 변경하고 솔루션에서 참조 경로 수정
- 컨트롤러, 서비스, DTO 등 네임스페이스 `BalanceBook.CardApi.*` → `BalanceBook.*`
- `SystemController`를 추가하여 `/api/system/health` 헬스체크 엔드포인트 제공
- Dockerfile 및 Render 설정의 작업 디렉터리와 엔트리포인트를 새 프로젝트명에 맞게 수정

## 프론트엔드

- `CardService`에 기본 API와 폴백 API를 선택하는 `pickApiBase()` 함수 추가
- 결제 폼 입력 범위 제한 및 확인 안내문 추가
- 초기 로딩 시 헬스체크와 사용자 세션을 병렬로 처리하여 앱 준비 상태 확인

이번 업데이트로 서비스 배포 환경 설정이 간단해지고, 프론트엔드에서도 장애 상황에 대비한 폴백 API가 동작하도록 개선되었습니다.
