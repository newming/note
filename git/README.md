# git

VCS: version control system

- [Git 官网](https://git-scm.com)
- [GitHub](https://github.com)
- [GitLab](https://about.gitlab.com)
- [SVN](https://subversion.apache.org)

## 版本管理的演变

- VCS出现前： 用目录拷贝区别不同版本，公用文件容易被覆盖，成员沟通成本很高，代码集成效率低下
- 集中式VCS: (SVN)有集中的版本管理服务器，具备文件版本管理和分支管理能力，集成效率明显提高，客户端必须时刻和服务器相连
- 分布式VCS: (git)服务端和客户端都有完整的版本库，脱离服务端，客户端照样可以管理版本，查看历史和版本比较等多数操作，都不需要访问服务器，比集中式VCS更能提高版本管理效率

## Git 的特点

- 最优的存储能力
- 非凡的性能
- 开源的
- 很容易做备份
- 支持离线操作
- 很容易定制工作流程

## 设置用户

```bash
git config --local # 只对某个仓库有效，缺省等同于 local
git config --global # global对当前用户所有仓库有效
git config --system # system 对系统所有登陆的用户有效

# --list 查看配置
```