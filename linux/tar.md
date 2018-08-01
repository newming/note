# 文件压缩与解压缩

linux 中常见的几种压缩格式：.zip, .gz, .bz2, .tar.gz, .tar.bz2

## .zip 格式压缩

```bash
# 压缩文件
zip 压缩文件名 源文件

# 压缩目录
zip -r 压缩文件名 源目录

# 解压缩
unzip name.zip
```

## .gz 格式压缩

```bash
# 压缩为 .gz 格式的压缩文件，源文件会消失
gzip [源文件]

# 压缩为 .gz 格式，源文件保留 gzip -c cls > cls.gz
gzip -c [源文件] > [压缩文件] # -c 代表输出，不覆盖源文件

# 压缩目录下所有的子文件，但是不能压缩目录
gzip -r [目录]

# 解压缩文件
gzip -d [压缩文件]

# 解压缩文件
gunzip [压缩文件]
```

## .bz2 格式压缩

```bash
# 压缩为 .bz2 格式，不保留源文件
bzip2 [源文件]

# 压缩后保留源文件
bzip2 -k [源文件]

# bzip2 不能压缩目录

# 解压缩，-k保留压缩文件
bzip2 -d [压缩文件]

# 解压缩，-k保留压缩文件
bunzip2 [压缩文件]
```

## .tar.gz 格式压缩

由于 .gz .bz2 不支持打包文件夹，所以可以通过 tar 将文件夹或文件打包成一个 tar 文件，在进行 .gz .bz2 等压缩

```bash
# 打包成 tar 文件
tar -cvf [打包文件名] [源文件]
tar -xvf [打包文件名]
```

- c: 打包
- v: 显示过程
- f: 指定打包后的文件名
- x: 解压缩
- z: 压缩为 .tar.gz 格式
- j: 压缩为 .tar.bz2 格式

```bash
# 压缩文件为 .tar.gz 格式
tar -zcvf file.tar.gz file
# 解压缩
tar -zxvf file.tar.gz file

# 查看压缩文件内文件
tar -tf file.tar
tar -tvf file.tar

# 压缩为 .tar.bz2 格式
tar -jcvf file.tar.bz2 file
# 解压
tar -jxvf file.tar.bz2
```