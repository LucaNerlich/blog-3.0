# Overview

Over the years I have updated my .bash_profile and my .gitconfig with useful command aliases. I will share the most
interesting ones and roughly explain these in this post.

## ~/.bash_profile

> Note, I am using oh-my-zsh as a command shell / bash alternative. The following aliases and functions work well on whatever shell you are using.

Neatly display all files and directories in the current directory.

```bash
alias ll='ls -FGlAhp'
```

Create intermediate directories as needed and log each during creation.

```bash
alias mkdir='mkdir -pv'
```

Prompt for each file which would be overwritten and log each file moved.

```bash
alias mv='mv -iv'
```

The following aliases really speed up your `change directory` usage.

```bash
alias cd..='cd ../'   # Go back 1 directory level.
alias ..='cd ../'     # Go back 1 directory level.
alias cd2='cd ../../' # Go back 2 directory levels.
alias cd3='cd ../../../' # Go back 3 directory levels.
```

Open the current directory in finder.

```bash
alias f='open .'
```

Quick and easy `docker-compose` aliases.

```bash
alias dcu='docker-compose up -d'
alias dcd='docker-compose down'
alias dcl='docker-compose logs -f'
alias dcb='docker-compose build'
```

Sometimes one just needs a quick and dirty dns flush.

```bash
alias flushdns='sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder; say DNS cache flushed'
```

Extract most know archives with one command

```bash
extract () {
        if [ -f $1 ] ; then
          case $1 in
            *.tar.bz2)   tar xjf $1     ;;
            *.tar.gz)    tar xzf $1     ;;
            *.bz2)       bunzip2 $1     ;;
            *.rar)       unrar e $1     ;;
            *.gz)        gunzip $1      ;;
            *.tar)       tar xf $1      ;;
            *.tbz2)      tar xjf $1     ;;
            *.tgz)       tar xzf $1     ;;
            *.zip)       unzip $1       ;;
            *.Z)         uncompress $1  ;;
            *.7z)        7z x $1        ;;
            *)     echo "'$1' cannot be extracted via extract()" ;;
             esac
         else
             echo "'$1' is not a valid file"
         fi
    }
```

Display your local ipv4

```bash
alias myip="ifconfig | grep -Eo 'inet (addr:)?([0-9]*\.){3}[0-9]*' | grep -Eo '([0-9]*\.){3}[0-9]*' | grep -v '127.0.0.1'"
```

Display useful host related information.

```bash
    ii() {
        echo -e "\nYou are logged on ${RED}$HOST"
        echo -e "\nAdditionnal information:$NC " ; uname -a
        echo -e "\n${RED}Users logged on:$NC " ; w -h
        echo -e "\n${RED}Current date :$NC " ; date
        echo -e "\n${RED}Machine stats :$NC " ; uptime
        echo -e "\n${RED}Public facing IP Address :$NC " ;myip
    }
```

## ~/.gitconfig

The following git aliases are my favourite implementation and formatting for the `git log` command.

```bash
[alias]
    # with date
    ls = log --pretty=format:"%C(yellow)%h\\ %C(green)%cd%C(red)%d\\ %Creset%s%C(green)\\ [%cn]%C(yellow)\\ [%an]" --decorate
    
    # with age of last commit
    ld = log --pretty=format:"%C(yellow)%h\\ %C(green)%cd\\ %C(yellow)%ad%C(red)%d\\ %Creset%s%C(green)\\ [%cn]%C(yellow)\\ [%an]" --decorate --date=relative
    
    # verbose, with file changes
    ll = log --pretty=format:"%C(yellow)%h\\ %C(green)%cd%C(red)%d\\ %Creset%s%C(green)\\ [%cn]%C(yellow)\\ [%an]" --decorate --numstat
```

Example `git ls`:
![git_ls](/images/tech/git_ls.png)
Example `git ld`:
![git_ld](/images/tech/git_ld.png)
Example `git ll`:
![git_ll](/images/tech/git_ll.png)

## ~/.ssh/config

The following blocks are two examples of my `~/.ssh/config`.

This 'forces" ssh to send/use your defined public key on every connection.

```bash
Host *
 AddKeysToAgent yes
 UseKeychain yes
 IdentityFile ~/.ssh/user
```

This is an example on how to save ssh connections. Specifing these, you are able to connect to the host via `ssh name`.

```bash
Host name
 Hostname 111.111.111.111
 User user
 IdentityFile ~/.ssh/user
```

Thanks for reading!

luca
