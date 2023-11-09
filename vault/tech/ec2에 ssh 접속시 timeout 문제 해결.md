---
Created: 2021-06-11
tags:
  - 문제해결
---
## 서론

서버 환경설정을 진행하면서 도메인을 구입하고 HTTPS를 적용하고 나서 며칠 뒤, PWA를 이것저것 삽질하며 테스트 해본 뒤 서비스에 적용해보기 위해 ssh에 접속을 시도 했다.

하지만 나에게 돌아오는 것은 `ssh: connect to host ... port 22: Operation timed out` 이라는 에러 메시지... 별것 아니겠지라 생각하고 마구마구 검색하기 시작했다.

EC2의 `보안 그룹`을 확인하라는 글이 제일 많았지만, **내 보안그룹은 22번 포트를 잘 인바운드 하고있었다.**

그다음 많았던 글이 **VPC 라우팅 테이블에서 0.0.0.0/0 을 열어주라**는 내용이었다. 하지만 그것도 난 잘 열려 있었다. 약 5-6시간정도 (그 이상?) stackoverflow를 검색해가며 AWS EC2와 VPC를 배회하며 이것저것 만져보았지만 여전히 ssh에 접속할 수 없었다.

그 와중에 갑자기 생각이 스쳐갔다. `HTTPS 를 설정하면 22번 포트에 따로 allow 설정을 해줘야 하나?` 그리고 구글형님에게 이렇게 물어봤다. `ec2 ssh timeout https`. 그러다가 아래의 글을 발견했다.

-   [https://stackoverflow.com/questions/64069312/ssh-connection-timed-out-on-ec2-ubuntu](https://stackoverflow.com/questions/64069312/ssh-connection-timed-out-on-ec2-ubuntu)

저 글 안에 있는 `ufw` 단어를 보고 머리가 띵 했다. `ufw` 설정을 할 때 NginX HTTPS 를 allow 해줬던 기억이 났다. 일단 위 링크의 답변에서도 `sudo ufw allow 22` 로 ssh 접속 경로를 열어줘야 한다고 한다.

## 본론

ufw로 22번 포트를 열어주고 싶지만 난 ssh로 접속을 할 수 없는데 어떻게 22번 포트를 열어줄 수 있을까?

방법은 이러했다. 급하게 쓰는 글이라 자세한 방법은 추후에 보강 할 예정이고, 이 링크를 참고하자.

-   [https://yvvyoon.github.io/ubuntu/ufw-enable-ssh-timeout/](https://yvvyoon.github.io/ubuntu/ufw-enable-ssh-timeout/)

**아래 글 따라하다가 vim 으로 파일 편집할때 readonly 라서 저장 및 종료가 안될 수 있는데 `sudo vi ufw.conf` 로 파일을 수정해야 한다. `sudo` 꼭 붙이자.**

1.  새로 인스턴스를 생성한다.
2.  기존 인스턴스를 중지한다. (종료 말고 중지다)
3.  `볼륨` 메뉴로 가서 기존 인스턴스의 볼륨을 끊고 새 인스턴스에 연결한다.
4.  새 인스턴스에 ssh로 접속해서, 볼륨을 마운트 한 뒤 ufw 설정을 바꿔준다.
5.  볼륨을 다시 언마운트 하고 새 인스턴스에서 연결 해제한다.
6.  볼륨을 기존 인스턴스에 다시 연결한다.
7.  기존 인스턴스에 다시 ssh로 접속해본다.

드디어 약 5-6시간동안의 삽질을 끝마치게 되었다. 덕분에 AWS와 조금 더 가까워졌다(?) 삽질은 괴롭지만 언제나 성장을 가져다 주는 것 같다.

#### 참고글

-   [https://yvvyoon.github.io/ubuntu/ufw-enable-ssh-timeout/](https://yvvyoon.github.io/ubuntu/ufw-enable-ssh-timeout/)
-   [https://stackoverflow.com/questions/64069312/ssh-connection-timed-out-on-ec2-ubuntu](https://stackoverflow.com/questions/64069312/ssh-connection-timed-out-on-ec2-ubuntu)