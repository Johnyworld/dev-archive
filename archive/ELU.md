# Event Loop Utilization

https://nodesource.com/blog/event-loop-utilization-nodejs

> The simplest definition of event loop utilization (or ELU) is the ratio of time the event loop is not idling in the event provider to the total time the event loop is running.

이벤트 루프 사용률(또는 ELU)의 가장 간단한 정의는, **<이벤트 루프가 실행 중인 총 시간> 과 <이벤트 공급자에서 이벤트 루프가 idle 상태가 아닌 시간>의 비율입니다.**

## What is an event loop

![image](https://images.ctfassets.net/hspc7zpa5cvq/6aMy5r8ceC52hFHzLtP4DM/cc996d40dd864799cc1d5249fb6309c9/Screen_Shot_2020-12-04_at_10.43.03_AM.png?w=600)