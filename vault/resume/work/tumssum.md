> AWS에서 서비스하다보니 과금이 생겨서 유지비를 아끼려, 현재는 서비스 중지중입니다.

가계부는 15년 넘게 여러 방법으로 써 왔습니다. 최근에는 구글 스프레드로 쓰고 있었는데, 더 편리하게 사용하기 위해 공부도 할 겸 만들어본 프로젝트입니다. 최소 기능으로 먼저 배포하여 9개월 넘게 직접 사용하며 테스트 했습니다. 달력, 보드 등에서 드래그 앤 드롭으로 쉽게 관리할 수 있습니다.

이 프로젝트를 하면서 [문서 주도 개발](문서%20주도%20개발.md)을 실천하기 위해 Storybook driven development 를 해보았습니다. 간단히 말하자면, UI를 개발할 때 스토리북 서버만 켜두고 개발하는 것입니다. 강제적인 관심사 분리로 비즈니스 로직을 신경쓰지 않을 수 있었습니다.

## 스펙

- React
- Python Django
- Email authentication with JWT token
- OAuth2 : Kakao, Google authentication
- AWS : EC2, RDS(MySQL)
- [관계형 데이터](https://drawsql.app/teams/johnyworld/diagrams/tumssum)
- 스토리북 문서화

## 화면

### 가계부 화면

![](https://johnyworld2019.s3.ap-northeast-2.amazonaws.com/images/resume/tumssum-1.jpg)

### 로그인 화면

![](https://johnyworld2019.s3.ap-northeast-2.amazonaws.com/images/resume/tumssum-2.png)

### 스토리북 UI 문서

![](https://johnyworld2019.s3.ap-northeast-2.amazonaws.com/images/resume/tumssum-3.png)