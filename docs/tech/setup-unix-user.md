# Unix User Setup

Hey there! In this post I will quickly describe how one can create a new user on a unix system e.g. Ubuntu / server. You
will create the user itself, assign its home folder and setup root privileges if needed.

> This how-to has been tested on [Ubuntu Server 18.04.2 LTS](https://www.ubuntu.com/download/server).

## New User

As a root user, the following steps need to be completed to create a new User with the name `newuser`.

1. Create home directory

     ```bash
     mkdir /home/newuser
     ```

2. Create user and add to group `users`.

     ```bash
     useradd -g users -d /home/newuser -s /bin/bash newuser
     ```

3. Set the password for the user `newuser`.

    ```bash
    passwd newuser 
    ```

4. Set `newuser` as the owner of his home directory.

    ```bash
    chown newuser:root /home/newuser 
    ```

5. Set the permissions for the home directory. Only allow `newuser` to write in `/home/newuser`. Others can read.

    ```bash
    chmod 754 /home/newuser
    ```

## Root / Sudo privileges

If the user `newuser` should be able to use sudo and execute commands as root, the sudo file needs to be updated. The
sudo file can be updated by executing the following command.

```bash
visudo
```

The default sudo file includes at least the following line(s):

```bash
root ALL=(ALL:ALL)
```

![visudo](/images/tech/visudo.png)

Copy this line and replace `root` by the name of the new user. Here `newuser`.

```bash
newuser ALL=(ALL:ALL) ALL
```

---

If everything has been done correctly, the new user should now be able to login and also execute commands as sudo.

Thanks for reading!

luca
