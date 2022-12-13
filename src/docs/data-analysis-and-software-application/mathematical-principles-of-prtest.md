# 二分变量比例检验的数学原理

任一二分变量的单个取值可以看作是单次伯努利试验的结果。为方便计算与表示，我们规定二分变量的取值为0和1，其中取到1的概率为$p$。那么，二分变量单个取值对应的单次伯努利试验可表为$B(1,p)$，即总体$X\sim B(1,p)$。

![](https://media.hedaozi.com/docs/data-analysis-and-software-application/mathematical-principles-of-prtest-1.png)

二分变量比例的检验统计量可以借助中心极限定律构造。总体独立同分布的中心极限定理：

已知一列随机变量$X_1,X_2,…,X_n$相互独立且同服从于某一期望为$EX$，方差为$DX$的分布，那么有：

$$
\lim_{n\to\infty}\frac{\sum_{i=1}^nX_i-nEX}{\sqrt{nDX}}=\lim_{n\to\infty}\frac{\sqrt n(\overline X-EX)}{\sqrt{DX}}\sim N(0,1)
$$

我们已经知道，总体$X~B(1,p)$，代入上式有：

$$
\lim_{n\to\infty}\frac{\sqrt n(\hat p-p)}{\sqrt{p(1-p)}}\sim N(0,1)
$$

或：

$$
\lim_{n\to\infty}\hat p\sim N\left(p,\frac{p(1-p)}{n}\right)
$$

因此，我们构造检验统计量

$$
P_0=\frac{\sqrt n(\hat p-p)}{\sqrt{p(1-p)}}
$$

![](https://media.hedaozi.com/docs/data-analysis-and-software-application/mathematical-principles-of-prtest-2.png)

![](https://media.hedaozi.com/docs/data-analysis-and-software-application/mathematical-principles-of-prtest-3.png)

从纯粹数学的角度，$P_0$依分布收敛于$N(0,1)$。从统计实践的角度，只要样本量$n$被认为足够大，即统计量实际的分布与其收敛于的理想分布之间的误差被允许接受时，我们就可以认为$P_0\sim N(0,1)$。据说，当$n≥50$时，$n$就已经足够大了。
