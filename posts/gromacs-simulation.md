---
title: "GROMACS 2025 分子动力学模拟初探"
date: "2026-06-20 10:00:00"
description: "记录一下基础的模拟设置过程，以及如何提取 RMSD 和 RMSF 数据"
cover: "https://bu.dusays.com/2026/03/24/69c1e38b346cb.jpg"
tags: ["分子动力学", "GROMACS", "科研"]
---

## 环境准备

在开始模拟之前，需要先准备好 PDB 文件和拓扑文件。使用 `pdb2gmx` 命令生成拓扑：

```bash
gmx pdb2gmx -f protein.pdb -o processed.gro -water spce
```

## 溶剂化与离子添加

定义好盒子大小后，加入水分子和离子来中和体系电荷。这一步非常关键，直接影响后续模拟的稳定性。

## 能量最小化

使用最陡下降法进行能量最小化，消除原子间的冲突。
