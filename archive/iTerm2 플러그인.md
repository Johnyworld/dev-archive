
> 그냥 사용하는 플러그인들을 정리하는 글. 추가할 때 마다 업데이트 예정

## 플러그인

### zsh-autosuggestions

커맨드 히스토리 중에서 자동 완성을 추천해 줌

```null
git clone https://github.com/zsh-users/zsh-autosuggestions ~/.oh-my-zsh/custom/plugins/zsh-autosuggestions
```

### zsh-syntax-highlighting

커맨드에 색상을 넣어줌

```null
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ~/.oh-my-zsh/custom/plugins/zsh-syntax-highlighting
```

### autojump

`j` 커맨드로 가봤던 폴더 내에서 빠르게 이동

```null
brew install autojump
```

---

## zshell 에 플러그인 적용하기

```null
vi ~/.zshrc
```

```null
plugins = (
	zsh-syntax-highlighting
	zsh-autosuggestions
    autojump
)
```