

수현님 안녕하세요. Amplitute 로그의 page 의존성을 (거의) 완전히 없애고 싶다는 생각이 들어서, 조금 더 아이디어를 생각해보았는데요, 한번 검토 부탁드립니당

- page 와의 의존성을 끊기 위해 지금 사용하는 체계의 page 프로퍼티를 없앱니다.
- page 대신 url 프로퍼티를 추가합니다. (사실 이름은 중요하지 않습니다.)
- page와 url의 다른 점은, 
	- page는 page내의 이벤트들이 page에 귀속되어있는 상위 정보의 느낌을 갖습니다.
	- url은 유저가 어디서 action 했는지에 대한 단순한 참고성 정보의 느낌을 갖습니다.
	- 그래서 eventProperties.url 로 저장해도 괜찮습니다.

이렇게 하면,

- 현재 보고있는 기능이 현재 url과 의미가 같기 때문에, page를 따로 저장할 필요가 없습니다.
- 코드 상 위계가 존재할 필요가 없기 때문에 IA 개선에도 따로 코드를 신경 쓸 필요가 없게 됩니다.
- 그대신 action 이름에 조금 더 의미를 부여하면 좋을 것 같습니다.
	- openEditor → openTimelineEditor

위 아이디어의 예시를 들어보겠습니다.
내 근무 대시보드 페이지에 진입 했을 경우

```
actionType: "view"
url: "/time-tracking/my-work-record"

event_name: viewq
```

여기서 근무 에디터를 열었을 경우

```
actionType: "click"
action: "openTimelineEditor"
url: "/time-tracking/my-work-record"

event_name: click_openTimelineEditor
```

이런 식으로 로그가 저장 될 것 같습니다.
