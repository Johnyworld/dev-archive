# RDS > EC2 로 mySQL 데이터 옮기기 (feat mysqldump)

_2022년 3월 31일_

## AWS RDS의 mySQL 데이터 백업하기

> EC2 인스턴스에 mySQL이 설치 되어있다고 가정합니다.

### 데이터 백업하기

아래 명령어로 RDS의 데이터베이스를 .sql 파일로 백업합니다.

```null
$  mysqldump -h <MY_RDS_ENDPOINT> -u admin -p mydatabase > mydatabase.sql
```

여기서 `admin`은 RDS를 초기 생성할 때 만들었던 계정의 이름입니다. 초기값은 보통 `admin` 으로 돼 있습니다. 위 명령어를 입력하면, 암호를 입력한 다음 백업이 진행됩니다.

`ls` 명령어로 `mydatabase.sql` 파일이 생성되었는지 확인합니다.

---

## 백업한 파일을 로컬 Database에 복사하기

### 데이터베이스 추가하기

로컬 데이터베이스에 복사될 `mydatabase` 데이터베이스를 추가하지 않았다면 추가해야합니다.

```null
$  mysql -u root -p

mysql> create database mydatabase;
mysql> exit;
```

### 데이터베이스 복사하기

아래 명령어를 통해 데이터베이스를 복사합니다.

```null
$  mysql -u root -p mydatabase < mydatabase.sql
```

명령어에서 **꺾쇠 모양을 주목하세요.** 백업할때는 꺾쇠(화살표) 방향이 파일명 쪽으로 향했고, 백업 파일을 데이터베이스에 적용할 때는 꺾쇠 방향이 파일에서 데이터 방향으로 향합니다.

참고로 이 명령어는 `mysqldump` 가 아니라 `mysql`입니다. 헷갈리지 마세요! ~~(이거 헷갈려서 30분 날렸...)~~

### Database 연결 수정하기

앱 소스코드 내에서 AWS RDS에 연결돼있는 Database 설정을 로컬 DB로 변경합니다.

## 참고한 글

-   [https://docs.aws.amazon.com/ko_kr/AmazonRDS/latest/UserGuide/MySQL.Procedural.Exporting.NonRDSRepl.html](https://docs.aws.amazon.com/ko_kr/AmazonRDS/latest/UserGuide/MySQL.Procedural.Exporting.NonRDSRepl.html)
-   [https://velog.io/@prayme/AWS-RDS-dump%ED%95%98%EA%B8%B0](https://velog.io/@prayme/AWS-RDS-dump%ED%95%98%EA%B8%B0)
-   [https://velog.io/@prayme/AWS-RDS-dump%ED%95%98%EA%B8%B0](https://velog.io/@prayme/AWS-RDS-dump%ED%95%98%EA%B8%B0)