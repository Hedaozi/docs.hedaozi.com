﻿# 数据清洗的操作

## 预备知识：查看数据与生成新变量

数据清洗通常需要先查看数据的值的分布与值标签（当然事先也要知道变量是做什么的，也就是查看变量标签）。并在此基础上清洗数据。有时候也需要生成新变量。

查看变量标签和值标签名使用命令`describe`。该命令还能显示数据的存储格式。值标签内容的查看详见第一章第二节。

查看数据的分布，可以使用`summarize`命令和`tab`命令。分组查看，根据适用性，可以选择前缀命令`by`或命令自带选项`by`（详见`help by`和各命令的帮助文件）。`summarize`命令的结果解释详见第二编第一章。

一般而言，我们不修改原始变量，而是生成新变量做清洗操作。生成新变量可以用`generate`命令、`egen`命令和`clonevar`命令，等等。修改变量的值可以用`replace`命令。生成和修改变量的过程中，通常需要加上`if`限制。`recode`命令可以同时完成上述三个工作。以上几个命令的用法如下：

```stata
generate NewVar = OldVar
generate NewVar = #
clonevar NewVar = OldVar
egen NewVar = Function(Para.)
replace Var1 = # if Var1 == #
recode VarName (#/#=#), gen(NewVar)
```

以上只是列举几种用法。更多用法可以查看帮助文件。

## 类别变量的清洗

类别变量有三种值，一种为缺失值，一种为非法值，一种为合法值。数据清洗需要处理缺失值与非法值。

这里的缺失值，指的是问卷的缺失值。因为系统缺失值无需处理。通常而言的策略，是将问卷缺失值转化为系统缺失值。

非法值，则指不在类别变量的编码内的值。例如，假定“性别”变量只有2个取值：“男”的编码为1，“女”的编码为2，而计算机中的变量却有一处取值为10。对于非法值，可以核查。如果无法核查，则以缺失值处理。

特别地，当变量是二分变量时，一般会将之转化为01变量。这样有助于后续的运算。

## 连续变量的清洗

连续变量有三种值，一种为缺失值，一种为异常值，一种为正常值。数据清洗需要处理缺失值与异常值。

这里的缺失值，指的是问卷的缺失值。因为系统缺失值无需处理。通常而言的策略，是将问卷缺失值转化为系统缺失值，或是均值插补与多重插补。

异常值，一般而言指偏离中心过远的值。可以以样本均值±3个样本标准差以外的值视作异常值。对异常值，通常而言的策略，是将问卷缺失值转化为系统缺失值，或是均值插补与多重插补。当然，异常值的判断是一件复杂的工作，需要结合具体情况。