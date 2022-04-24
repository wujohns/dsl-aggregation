# 华炎魔方

[元数据设计](https://www.steedos.com/docs/developer/meta-types)
[开发人员向导](https://www.steedos.com/docs/developer/getting-started)

// TODO 绘制对应的结构图
一些问题：
1. UI部分没有和model部分解耦（会陷入 “业务复杂度转移低效” 的陷阱）  
1. 采用类似 eval/vm 的方式做低代码治理支持会导致无法复用主要工程基建（陷阱选项）
