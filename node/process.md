# process 相关几个属性

```bash
$node --inspect app.js --test a=1 b=2

# process.argv 前两项固定
['/user/local/bin/node', '/Users/newming/app.js', '--test', 'a=1', 'b=2']

# process.argv0 保存了 argv 第一个值的引用
node

# process.execArgv 例如 --harmony
['--inspect']

# process.execPath 调用脚本的命令所在位置
'/user/local/bin/node'

# process.env 执行环境，常用与环境区分

# process.pwd 同系统命令的 pwd
```