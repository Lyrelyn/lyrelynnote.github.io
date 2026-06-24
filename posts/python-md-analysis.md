---
title: "Python 分子动力学数据分析工具开发"
date: "2026-06-05 16:00:00"
description: "用 MDAnalysis 和 Matplotlib 写了一套自动化分析脚本"
cover: "https://bu.dusays.com/2026/03/24/69c1e38b4c370.jpg"
tags: ["Python", "MDAnalysis", "分子动力学", "数据可视化"]
---

## 动机

每次跑完 GROMACS 模拟都要手动敲一堆命令来分析轨迹，太麻烦了。决定写一套自动化脚本。

## 功能

支持一键生成 RMSD 变化曲线、RMSF 氨基酸波动图、氢键数量统计和回转半径分析。

## 使用方式

只需修改配置文件中的路径，运行 `python analyze.py` 即可生成全套分析报告。
