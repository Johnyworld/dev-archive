> AWS에서 서비스하다보니 과금이 생겨서 유지비를 아끼려, 현재는 서비스 중지중입니다.

## 소개

오랜시간 써 온 가계부를 더 편리하게 쓰기 위해 공부도 할 겸 만들어 본 프로젝트입니다. 최소 기능으로 먼저 배포하여 9개월 넘게 직접 사용하며 테스트 했습니다. 달력, 보드 등에서 드래그 앤 드롭으로 쉽게 관리할 수 있습니다.

[스토리북 주도 개발(SDD)](https://johnykim.me/post/%EB%AC%B8%EC%84%9C%20%EC%A3%BC%EB%8F%84%20%EA%B0%9C%EB%B0%9C#%F0%9F%93%98%20%EC%8A%A4%ED%86%A0%EB%A6%AC%EB%B6%81%20%EC%A3%BC%EB%8F%84%20%EA%B0%9C%EB%B0%9C)과 TDD를 철저하게 지키며 작업했습니다. 스토리북 주도 개발이란 UI를 개발할 때 스토리북 서버만 켜두고 하는 것입니다. 강제적인 관심사 분리로 비즈니스 로직을 신경쓰지 않을 수 있어서 좋았습니다. 컴포넌트 하나당 `index.ts, X.tsx, X.test.tsx, X.stories.tsx, X.scss` 이렇게 다섯개의 파일이 필요했습니다.

## 스펙

- React, Django(Python), Redux toolkit, SCSS
- Storybook, React testing library, Jest
- Email authentication (JWT token)
- OAuth2 : Kakao, Google
- AWS : EC2, RDS(MySQL)
- [관계형 데이터](https://drawsql.app/teams/johnyworld/diagrams/tumssum) 설계
- 반응형 웹 디자인

## 화면

### 가계부 화면

![](https://johnyworld2019.s3.ap-northeast-2.amazonaws.com/images/resume/tumssum-1.jpg)

### 로그인 화면

![](https://johnyworld2019.s3.ap-northeast-2.amazonaws.com/images/resume/tumssum-2.png)

### 스토리북 UI 문서

![](https://johnyworld2019.s3.ap-northeast-2.amazonaws.com/images/resume/tumssum-3.png)