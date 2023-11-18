## 소개

**마크다운으로 작성**할 수 있고, **로컬에서 편하게 작성**할 수 있고, **편하게 업데이트** 할 수 있는 블로그를 만들어보고자 하여 시작한 프로젝트입니다.

### 마크다운 드리븐 & 자동화

1. [옵시디언](https://obsidian.md/)으로 글을 작성 (.md)
2. 전체 글을 파싱하여 리스트.json 데이터 생성
3. 마크다운 글들과 리스트.json 을 [깃헙](https://github.com/Johnyworld/dev-archive/tree/master/vault)에 푸시한다.

이렇게 하면 자동으로 블로그의 내용이 업데이트 됩니다. 블로그 글 뿐만 아니라, Work, CV 페이지도 모두 마크다운으로 작성하여 관리하고 있습니다.

## 문제 해결

- Github API 요청을 최대한 낭비하지 않기 위해 DB 역할을 하는 글 저장소에서 전체 글을 파싱하여 글 리스트와 대략적인 정보를 json 파일로 만들어주는 스크립트를 작성했습니다.
- Next JS는 [**클라이언트 컴포넌트라도 초기 페이지 로드를 최적화 하기 위해 정적 HTML 미리보기를 렌더링 합니다.**](https://nextjs.org/docs/app/building-your-application/rendering/client-components#full-page-load) 그러다보니 서버에서 초기값을 모르는 경우, UI 깜빡거림이 필히 생깁니다. 로컬 스토리지를 사용하는 다크/라이트 모드가 그러했습니다. 이걸 해결하기 위해 진입점인 layout.ts 파일에 로컬 스토리지를 불러와서 모드를 세팅해주는 스크립트를 삽입해주었습니다.
- 위와 같은 이유로 다크/라이트 모드를 표현하는 🌜/🌞 컴포넌트에서도 에러를 만났습니다. - `Text content did not match. Server: "🌞" Client: "🌜"` - 이걸 해결하기 위해 해당 컴포넌트를 SSR 에서는 렌더링하지 않는 간단한 랩핑 컴포넌트 `<NoSSRRendering>` 을 만들었습니다.

## 스펙

- Next 13, Typescript
- Module CSS, SCSS, Github API