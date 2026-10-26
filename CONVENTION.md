# CONVENTION

## 스택

- Next.js App Router, React, TypeScript, Tailwind CSS
- 경로 별칭: `@/*` → `src/*`
- 병합 대상: `main`
- 언어: 한국어 (`lang="ko"`)

## 디렉터리

```text
src/app           라우트
src/components    공용 UI
src/lib           Notion 조회, 공통 유틸
src/content       프로젝트, 그림, 게임 소개
src/types         공용 타입
public            이미지, 오디오
```

- 라우트 전용 파일: 해당 라우트의 `_components`, `_lib`

| 경로 | URL |
| --- | --- |
| `src/app/page.tsx` | `/` |
| `src/app/projects/page.tsx` | `/projects` |
| `src/app/projects/[slug]/page.tsx` | `/projects/프로젝트-슬러그` |
| `src/app/blog/page.tsx` | `/blog` |
| `src/app/blog/[slug]/page.tsx` | `/blog/글-슬러그` |
| `src/app/art/page.tsx` | `/art` |
| `src/app/games/page.tsx` | `/games` |

## 이름

- 컴포넌트: PascalCase (`ProjectCard.tsx`)
- 함수, 변수: camelCase
- 라우트 폴더: 소문자 (`projects`)
- 타입: PascalCase (`Project`, `Post`, `Artwork`)
- import: `@/`

## 컴포넌트

- 페이지: 데이터 조회, 배치
- 카드, 갤러리, 플레이어: 별도 컴포넌트
- 기본: 서버 컴포넌트
- `"use client"`: 클릭, 재생, 스크롤 애니메이션

## 스타일

- 레이아웃: Tailwind
- 연출: `globals.css` 또는 CSS Module
- 홈: 애니메이션, 음악
- 목록: 내용 우선
- 포맷: 큰따옴표, 세미콜론, 2칸 들여쓰기
- 검사: `npm run lint`

## 콘텐츠

- 블로그: 노션 발행 글, API 조회
- 비밀값: `.env.local` / 키 이름만 `.env.example`
- 프로젝트, 그림, 게임 소개: `src/content` (슬러그, 제목, 요약, 링크)
- 게임 실행: 별도 배포, 사이트에는 링크 또는 iframe
- 정적 파일: `public/`
- 그림 파일: `art/작품-슬러그.확장자`

## 오디오, 애니메이션

- 음악: 재생 버튼 이후 시작
- 재생 상태: 클라이언트 컴포넌트 한 곳
- 애니메이션: 홈, 화면 전환

## 브랜치

- 통합: `main`
- 작업: `태그/#이슈번호-작업내용` (`feat/#1-blog_list`)
- 흐름: 작업 브랜치 → `main`
- 병합 후 작업 브랜치 삭제

## 이슈

- 작업 전 생성
- 포맷: `태그: 제목`
- 태그: 대문자
- 제목: 한글 명령조, 50자 이내
- 예: `FEAT: 블로그 목록 연결`

## 커밋

- 포맷: `태그/#이슈번호: 제목`
- 태그: 소문자
- 제목: 한글 명령조, 50자 이내
- 스테이징: 해당 이슈 파일만
- 예: `feat/#1: 블로그 목록 연결`

| 태그 | 시점 |
| --- | --- |
| `feat` | 기능 추가 |
| `fix` | 버그 수정 |
| `docs` | 문서 수정 |
| `style` | 포맷 수정 |
| `refactor` | 구조 개선 |
| `test` | 테스트 추가, 수정 |
| `chore` | 빌드, 패키지, 에셋 |

## 작업 순서

```bash
git checkout main
git pull
git checkout -b feat/#1-blog_list
git add src/app/blog/page.tsx
git commit -m "feat/#1: 블로그 목록 연결"
git push -u origin feat/#1-blog_list
```

- PR 대상: `main`
- PR 제목: 커밋 제목과 동일
- PR 본문: 작업 내용, `Closes #1`
