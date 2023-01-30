# 여러 github 계정을 사용하는 경우 ssh 접속시 Permission Denied 이슈를 해결 해보자.

한 노트북에서 회사계정과 개인계정 이렇게 2개의 깃헙 계정을 사용하고 있다.  
2개를 사용하면서 두 계정 모두 ssh 로 접속을 설정 해두었는데,

그 중 하나의 계정에서 Permission Denied 가 발생하는 이슈에 대해서 다뤄보고자 한다.

`~/.ssh/config` 파일을 보자.

```null
Host github.com-company
	HostName github.com
	User company-account
	IdentityFile ~/.ssh/company-account

Host github.com
	HostName github.com 
	User my-account
	IdentityFile ~/.ssh/my-account 
```

내 계정은 일반적인 설정이지만, 회사 계정은 특이한 점이 있다.

`Host github.com-company` 이렇게 뒤에 `-` 으로 다른 이름을 붙여놓은 것이다.  
두개의 이름이 같을 경우 먼저 등록 된 Host 로 접속하게 되므로 두 계정을 같이 사용할 수 없기 때문에 이름을 다르게 사용해야 한다.

**이 경우, `git remote` URL 설정을 반드시 위 `Host` 와 일치시켜줘야 한다.**

```null
// 클론하는 경우
git clone git@github.com-company:username/repository.git

// 이미 클론이 돼 있는 경우
git remote set-url origin git@github.com-company:username/repository.git
```

위와 같이 `git@` 뒤에 config 파일에서 설정한 `Host`를 입력해줘야 한다. (여기선 `github.com-company`)  
(원래는 `git@github.com` 만 써주지만, 지금은 `git@github.com-company` 를 써주고 있다.)

### 참고

-   [https://medium.com/hello-panic/multiple-ssh-keys-and-github-users-f35ae5a87fa7](https://medium.com/hello-panic/multiple-ssh-keys-and-github-users-f35ae5a87fa7)