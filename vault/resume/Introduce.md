# 사용자 중심,<br><sub>웹 프론트엔드 엔지니어<br>김재환</sub>

## Introduce

**4년 차 프론트엔드 개발자**로서 주로 웹 서비스의 개발, 운영을 담당하고 있습니다.
초기 멤버로 스타트업에 합류하여 서비스가 MAU 30,000을 달성하고 TIPS 프로그램에 선정되는 성장을 하는 동안 서비스의 프론트엔드 개발을 주도 하였던 경험이 있습니다.

5년의 디자이너 경력이 있으며 여전히 좋은 UX/UI 에 대한 관심이 있습니다. 좋은 UX란, 거슬리는 게 없는 것. 이라고 생각합니다.

## Experience

### 🏢 플렉스 (flex)

**2022. 04. - 2023. 10.** - Frontend Engineer

https://flex.team

flex는 기업이 겪는 사람과 조직에 관한 다양한 문제를 해결하는 **B2B HR SaaS** 입니다. flex 에서 근무하는 동안 저는 가장 많은 유저들이 사용하는 타임트래킹 제품을 개발, 운영하였습니다. 타임트래킹 제품은 구성원 평가의 근거가 되는 근무, 휴가와 같은 근태관리에 대한 문제를 해결합니다.

#### 사용 기술, 특이사항

- React, Next, Typescript
- Tanstack Query, Stitches, Radix UI, Antd, Lodash, date-fns, i18next, react-window
- Micro Frontent, Monorepo, compound component pattern

#### 타임트래킹 제품 개발/운영

- 온 콜 - VOC 대응
- IA 개편
- 설정 화면 개편
- 서로 의존하는 필드가 많은 복잡한 폼 개발
- 합성 컴포넌트를 응용하여 컴포넌트의 재활용성을 높임

#### 사용자 이벤트 로깅 사내 패키지 2.0 버전 개발

- 페이지 구조가 대대적으로 개편되면서 페이지에 의존하는 수 많은 이벤트 로깅을 직접 수정해야 했고, 페이지 구조가 바뀔 때 마다 수 십 시간을 들여야 하는 이슈를 개선
- 페이지가 아닌 기능 단위에 의존하도록 변경하여, 페이지 구조가 바뀌어도 로깅을 수정하지 않도록 개선함
- 개발 가이드 문서 제공

#### 날짜, 시간 포맷터 패키지 개발

- 서비스 전반적으로 날짜와 시간 포맷을 제품마다 서로 다르게 사용하는 문제를 해결
- 날짜 시간 포맷에 대한 공통 문서 정의
- FE 개발자들을 위한 날짜, 시간 포맷터 패키지 개발
- 개발 가이드 문서 제공
- Jest 를 사용하여 Test Driven Development

### 🏢 언디파인드 (Undefined)

**2021. 02 - 2023. 01** - Frontend Developer

iScrim 제품은 전 세계 아마추어 E-Sports 생태계를 만들기 위해 시작 된 **B2B SaaS 대회 운영 플랫폼** 입니다. 초기 멤버로서 프론트엔드 전반적인 부분을 주도 했으며 제품 기획에도 참여하였습니다. 게임 BJ, 대형 스크럼 팀, 게임 개발사와의 협업, 국내 지역 이스포츠 행사 등을 통해 서비스는 천천히 성장했고 여러 국가에 걸쳐 **MAU 30,000** 을 달성하였습니다.

#### 사용 기술

- React, Typescript
- Socket, Styled Components, MobX, Storybook, Canvas, SVG, i18next

#### iScrim 제품 개발/운영

- SVG, Canvas 를 이용한 데이터 시각화
	- 토너먼트, 라운드로빈 등 여러 대회 형태별 대진표 화면 구현
	- 통계 데이터 그래프화
- Socket 기술을 이용한 실시간 대회 진행
- 대회 운영자, 참여자들간의 채팅 기능 구현
- 다크/라이트 모드와 다국어 구현
- DX 개선을 위한 리팩토링
	- depth 가 깊어 로직을 찾기 힘들던 구조를 개선
	- SRP를 반영하기 위해 뷰와 기능을 완전히 분리
- 반응형 웹 디자인

#### 사내 UI 라이브러리(React) 개발

- 검색 가능한 드롭다운 메뉴 등 20여개의 컴포넌트 개발
- NPM 패키지로 배포
- Storybook 문서화

### 🧑🏻‍💻 가계부 서비스: 틈씀이

개인 프로젝트

https://johnykim.me/work/tumssum

오랜시간 써 온 가계부를 더 편리하게 쓰기 위해 공부도 할 겸 만들어 본 프로젝트입니다. 최소 기능으로 먼저 배포하여 9개월 넘게 직접 사용하며 테스트 했습니다. 달력, 보드 등에서 드래그 앤 드롭으로 쉽게 관리할 수 있습니다.

[스토리북 주도 개발(SDD)](https://johnykim.me/post/%EB%AC%B8%EC%84%9C%20%EC%A3%BC%EB%8F%84%20%EA%B0%9C%EB%B0%9C#%F0%9F%93%98%20%EC%8A%A4%ED%86%A0%EB%A6%AC%EB%B6%81%20%EC%A3%BC%EB%8F%84%20%EA%B0%9C%EB%B0%9C)과 TDD를 철저하게 지키며 작업했습니다. 스토리북 주도 개발이란 UI를 개발할 때 스토리북 서버만 켜두고 하는 것입니다. 강제적인 관심사 분리로 비즈니스 로직을 신경쓰지 않을 수 있어서 좋았습니다. 컴포넌트 하나당 `index.ts, X.tsx, X.test.tsx, X.stories.tsx, X.scss` 이렇게 다섯개의 파일이 필요했습니다.

#### 사용 기술

- React, Django(Python), Redux toolkit, SCSS
- Storybook, React testing library, Jest
- Email authentication (JWT token)
- OAuth2 : Kakao, Google
- AWS : EC2, RDS(MySQL)
- [관계형 데이터](https://drawsql.app/teams/johnyworld/diagrams/tumssum) 설계
- 반응형 웹 디자인

## Skills

| Part                   | Skills                                                                                                                                     |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Frontend               | - **React(Next), Typescript<br>**- Tanstack Query, Zustand, Redux Toolkit, MobX<br>- Jest, React testing library<br>- Storybook, i18next, Radix<br> |
| Backend                | - Node(Express)                                                                                                                            |
| AWS                    | - EC2, Route53, RDS(MySQL), S3                                                                                                             |
| UX/UI                  | - 5년간의 웹/UI 디자이너 경력                                                                                                              |
| Collaborative | - Git, Notion, Slack, Figma, Linear, Jira, Miro                                                                                            | 

## Non Technical

#### 이렇게 일합니다.

- 좋은 UX/UI를 만들기 위해 함께 고민합니다.
- 동료들과 본인의 성장을 위한 코드리뷰 문화를 좋아합니다.
- 현재의 나보다 일을 더 잘 하기 위해 고민하고 노력합니다.
- 빠른 의사소통을 위해 내 업무 보다는 동료들의 질문이나 도움 요청, 코드 리뷰 등을 항상 높은 우선 순위에 두려고 노력합니다.

#### 이런 회사/동료들과 함께 일하고 싶습니다.

- 다른 구성원의 의견에 귀를 기울이는 동료들
- 다른 구성원이 일을 잘 해낼 수 있게 적극 도와주는 동료들
- 누구의 탓을 찾는 대신, 해결 방법을 찾는 동료들
- 모르는 것을 부끄러워하지 않는 동료들
- 일을 잘 하기 위해, 내가 가진 지식을 아끼지 않고 서로 공유하는 동료들

#### 이런 것들을 고민하고 있습니다.

- 동료 개발자들이 사용하기 쉬운 디자인시스템은 어떤 모습일까?
- 어떻게 하면 적은 커뮤니케이션 비용으로 내 의견이나 정보를 쉽게 전달할 수 있을까?

## Other experience

- GUI, 웹 디자이너로 약 5년 근무
- 인덕대학교 시각디자인과 4.1 학점으로 졸업
- 인덕대학교 시각디자인과 학회장
- 대상, 금상을 포함한 디자인 전국대회 21개상 수상

## Contact

- Mobile : 010-4806-3340
- Email : johnyworld@naver.com
- LinkedIn: https://www.linkedin.com/in/fe-johnykim/
- Github : https://github.com/Johnyworld
- Velog : https://velog.io/@johnyworld

<div class='cv_profile_L9T3v'>
![](https://johnyworld2019.s3.ap-northeast-2.amazonaws.com/images/resume/me-1.png)
</div>

<style>
div.cv_profile_L9T3v {
  position: absolute;
  top: 106px;
  right: 16px;
  width: 120px;
  height: 120px;
  border-radius: 60px;
  overflow: hidden;
  margin: 0;
  filter: grayscale(1);
}

div.cv_profile_L9T3v img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media screen and (max-width: 566px) {
  div.cv_profile_L9T3v  {
    width: 70px;
    height: 70px;
    z-index: -1;
	opacity: 0.8;
  }
}
</style>