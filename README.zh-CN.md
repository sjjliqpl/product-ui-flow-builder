# Product UI Flow Builder

[English README](./README.md)

Product UI Flow Builder 是一个 Codex skill，用来把产品 UI 流程需求生成可维护的 React 设计文档项目。它会把产品页面组织成左侧树形导航，中间展示当前页面草图，旁边保留紧凑的产品说明、页面逻辑、状态和备注。

这个项目用于产品设计探索和评审，不是用于直接实现生产应用。生成结果默认放在用户工作区的 `ui-flow-design/` 目录里；本仓库维护 skill 说明、架构参考、创建脚本和一个中性的 React 模板。

## 它会生成什么

- 按章节和页面组织的左侧树形导航。
- 默认只展示一个当前激活页面，便于聚焦评审。
- 用于描述意图、逻辑、状态和备注的说明面板。
- 用于展示当前产品页面设计的主画布。
- 移动端抽屉导航。
- 每个页面草图独立成组件，方便后续迭代。

## 仓库结构

```text
.
├── SKILL.md
├── agents/openai.yaml
├── assets/react-tailwind-flow-template/
├── references/
│   ├── component-architecture.md
│   └── visual-design-rules.md
└── scripts/create_flow_project.py
```

`assets/react-tailwind-flow-template/` 是中性的可运行模板，也是 GitHub Pages 演示页面的构建来源。模板只保留一个示例页面，避免生成项目时继承具体业务 demo。

## 快速开始

从本仓库 clone 后运行：

```bash
git clone https://github.com/sjjliqpl/product-ui-flow-builder.git
cd product-ui-flow-builder
```

从模板创建新的 UI flow 设计项目：

```bash
python3 scripts/create_flow_project.py
```

脚本会在当前目录创建 `ui-flow-design/`。如果该目录已经存在且看起来是 React 项目，脚本会保留它。如果目录存在但不是可识别的 React 项目，脚本会拒绝覆盖。

如果本仓库作为 Codex skill 安装使用，脚本路径应从已安装的 skill 根目录解析，不要写死某台电脑上的绝对路径。

本地运行模板：

```bash
cd assets/react-tailwind-flow-template
npm install
npm run dev
```

构建模板：

```bash
cd assets/react-tailwind-flow-template
npm install
npm run build
```

## GitHub Pages 演示

仓库包含 GitHub Actions workflow，会构建 `assets/react-tailwind-flow-template/`，并把生成的 `dist/` 发布到 GitHub Pages。

推送到 GitHub 后：

1. 打开仓库设置。
2. 进入 **Pages**。
3. 如果还没有设置，把 Source 切换成 **GitHub Actions**。
4. 推送 `main` 分支，或手动运行 `Deploy template demo to Pages` workflow。

workflow 会把 `VITE_BASE_PATH` 设置为 `/${{ github.event.repository.name }}/`，确保构建后的静态资源能在 GitHub Pages 的仓库子路径下正常加载。

## 生成项目架构

生成的 UI flow 项目应遵循这个结构：

```text
src/
  App.tsx
  data/designStructure.ts
  components/
    frame/
      FlowShell.tsx
      FlowNavigation.tsx
      MobileNavigationDrawer.tsx
      DescriptionPanel.tsx
      SketchCanvas.tsx
    flow/
      PageDesignBlock.tsx
  design-pages/
    每个产品页面草图一个 React 组件
```

关键规则：

- `App.tsx` 保持轻量，只把 `chapters` 传给 `FlowShell`。
- `designStructure.ts` 管理章节顺序、页面顺序、说明文案和组件映射。
- `FlowShell` 管理当前激活页面，默认选中第一个章节的第一个页面。
- `FlowNavigation` 和 `MobileNavigationDrawer` 渲染同一套章节/页面树。
- `PageDesignBlock` 只渲染当前激活页面，桌面端说明和草图并排展示。
- 具体产品页面草图放在 `src/design-pages/`。

## 编辑指南

- 修改单个产品页面草图：编辑 `src/design-pages/<PageName>.tsx`。
- 修改页面说明：编辑 `src/data/designStructure.ts`。
- 新增页面：新增一个页面组件，并在 `designStructure.ts` 增加一条页面记录。
- 修改导航行为：编辑 `components/frame/FlowShell.tsx`、`FlowNavigation.tsx` 或 `MobileNavigationDrawer.tsx`。
- 不要因为一个页面需要调整就重写整个 flow 或无关页面。

完整规则见 [组件架构](./references/component-architecture.md) 和 [视觉设计规则](./references/visual-design-rules.md)。

## 环境要求

- Python 3.9+
- 推荐 Node.js 20+ 运行 React 模板
- npm 或兼容的包管理器

## License

基于 MIT License 开源。
