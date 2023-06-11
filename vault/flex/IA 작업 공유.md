# IA 작업 공유


2023-02-10


new IA url 구조잡기

- my 휴가 맥락이 따로 떨어져 나옴
- reports 가 없어지고
	- work-record 맥락이 관리 맥락만 가지고 있게 될 거라서

제일 크게 바뀌는 것은 구성원 근무
- members 2단계 였는데 work-record 로 다 떨어짐

중간 단계 (members 등) 이 다 사라짐

- my-work-record/
- my-time-off/
- work-record/
- time-off/

기존 url 과 새 url 간의 conflict 가 날 것임.

404를 next가 해주고 있는데, 거기도 분기처리가 들어가야 함.

conflict 가 있다는 것은 분기를 그쪽에서 다 핸들링 해줘야 하는 것임.

페이지 헤더 탭으로 잡히지 않게 처리해줘야함.

일을 단계별로 쪼개든 페이지별로 쪼개든 해서 작업하자.

gnb > `flexMenuGroups` ← 요걸 수정하게 될 거임 ...

routeFns 는 path를 비교할 때 쓴다.
내 근무 페이지가 highlight 돼야 하거나...

UI 를 떨구는건 next 가 해주고 flexRouteMenus 는 관리하는 용도이다.

grantedMenuTypes → 메뉴중에 어떤걸 볼 수 있나 (권한 체크)

decideGrantedMenuTypes
SSR 에서 받은 쿠키에 있을 수 있다. 쿠키의 값을 먼저 보고 나서 getGrantedMenuTypes 를 한다.
Permission, BIlling, UpSelling, FeatureFlag, ← 을 확인해서 전체 메뉴를 결정
하나라도 들어있지 않으면 


flexMenuGroups 에서 기존 것을 deprecated 시키고 
한벌 새로 만들기

decideGrantedMenu → flag 로 보여주고 안보여주고 설정할 수 있음 (FobiddenListFrom) → UI 에서 보여지는 부분 처리

Next / MF 에서는 

**페이지 내에서 Link 되는 것들도 다 플래깅 처리가 돼있어야 한다.**

generated.ts 에서 용처를 파악하면 대충 어디어디서 쓰는지 알 수 있다.



## 작업 순서

1. 구조를 먼저 파악하자
2. 프리뷰 문서를 만들자
	1. 어떤 순서로 작업...?
	2. 단계를 쪼개자
		1. menuGroup 을 먼저 쭈욱 만든다
		2. flag로 가린다
			1. next 에서 테스트 할 때 Cookie 캐싱 expire 가 5분이다. 캐싱을 없애고 테스트 하는게 편하다,
		3. 페이지를 하나씩 넣기 시작한다. 쉬운 것 부터. → `permisson`, `flag 분기 처리`
			1. 페이지 별로
				1. 쉬움
					1. my-work-record
					2. my-time-off 
				2. 중간 어려움
					1. 근무 > 관리에 있던 맥락
					2. 구성원휴가 (관리)
				3. 어려움
					1. 구성원 근무, 구성원 휴가
			2. 
		5. (next, MF 를 동시에 진행)
3. routing 도 대응한다. ← 페이지마다 걸려있는 라우팅
4. redirection
	1. flag가 off 인 곳
	2. 원래 있던 페이지에 접근하려고 할 때 flag 가 켜져 있으면 새로운 페이지로 redirect


근무, 휴가 조회를 왜 켜냐? → 모른다

