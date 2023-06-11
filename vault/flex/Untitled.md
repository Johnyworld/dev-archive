IA 개선하면서 조직선택기 관련 요구사항을 해결하면서 코드를 개선하려고 합니다.  
관련하여 의견을 구하고 싶습니다!  
우려되는 점이나, 방향성에 대해서 의견 바랍니다  
어떻게 짜려고 하는지 쓰레드에 적어두겠습니당

요구사항

-   조직선택기 위치는 TabContent 외부인, Tab 리스트의 우측에 있어야 함. → **각 TabContent 내의 Provider 보다 상위에** **조직선택기****가 위치해야 함.**
-   Tab을 이동해도, 선택해두었던 조직들을 기억해야 함.

코드상 개선하려고 하는 점

-   조직선택기 관련 코드가 여기저기 흩어져 있는데, (각 탭마다.. 초기값을 설정하는 곳, 조직선택기가 위치하는 곳)
-   요것들을 모아서, 하나의 Context에서 필요한 값과 메서드들을 제공하려고 합니다.

위 요구사항을 만족시키기 위해, 페이지 내 조직선택기에 대한 Context 를 만들려고 합니다.

-   Provider는 tab들을 모두 감싸야 하므로 PageContent 에 존재합니다. (이미지상 파란색)
-   각 탭 마다 선택된 조직의 상태값이 서로 달라야 하므로, 휴가 관리 페이지에는 5개의 state가 필요합니다.
-   조직선택기Context에서 조직선택기에 필요한 값들과 메서드들을, 공통 조직선택기와 각 탭 내에서 사용하고 있는 Context에 제공합니다.
-   각 탭마다의 Context를 만들지(휴가관리는 5개), 페이지당 1개의 Provider 만 만들지 고민했는데, 페이지당 1개의 Provider를 만들어서 tabSlug에 따라서, 값들과 메서드들을 하위로 제공하는 방향으로 가려고 합니다.