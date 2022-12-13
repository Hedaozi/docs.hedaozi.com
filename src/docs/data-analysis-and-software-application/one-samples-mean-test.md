﻿# 单变量均值检验

这里介绍：(1)定量变量的均值检验，及其变种(2)类别变量的比例检验。

## 均值检验

### 基本概念

均值检验的原假设为

$$
H_0: \mu=\mu_0
$$

备择假设可以是

$$
H_1: \mu < \mu_0 | H_1: \mu > \mu_0 | H_1: \mu\mu_0
$$

其中，$\mu_0$为给定的常数（被视为总体均值）。

均值检验适用于大样本及正态总体小样本。对于大样本，检验统计量为

$$
Z_0=\frac{\overline X-\mu_0}{σ_{\overline X}}=\frac{\overline X-\mu_0}{σ/\sqrt n}≈\frac{\overline X-\mu_0}{S/\sqrt n}\sim N(0,1)|H_0
$$

对于正态总体小样本，由于方差往往未知，检验统计量为

$$
T_0=\frac{\overline X-\mu_0}{S\sqrt{n-1}}\sim t(n-1)|H_0
$$

根据备择假设，可以计算相应的拒绝域或$p$值，当观测值落入拒绝域或$p$值过小，则可以拒绝原假设。一般而言，选择$p$值可以确定更精确的概率。

### 流程

均值检验的流程为：

1.  选择变量；
2.  建立原假设与备择假设；
3.  检查样本是否是大样本，或为正态总体小样本，若两个条件都不符合，则不适用；
4.  代入数据，计算检验统计量$Z_0$或$T_0$，并比较$p$值与给定的显著性水平$\alpha$，如果$p<\alpha$，那么可以认为检验结果在统计上显著；
5.  若检验结果显著，进行解释。

### Stata操作及结果解释

见第九章第一节。

## 比例检验

比例检验是均值检验的变种。比例检验适用的对象是01变量。若变量为二分变量，则将之转化为01变量；若变量为多分类变量，则将关心的值设置为1，其他值设置为0。比例检验使用`prtest`命令。