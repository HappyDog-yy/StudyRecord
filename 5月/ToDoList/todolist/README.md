# TodoList 组件文档

这是一个基于 React + TypeScript + Vite + Tailwind CSS 的 TodoList 组件示例。组件的设计思路参考了 Ant Design：通过 props 配置外观，通过回调把用户操作抛给外层，由外层统一管理数据。

## 组件能力

- `items`：传入待办事项数据。
- `background`：控制组件区域的背景颜色。
- `theme`：控制主题风格。
- `shape`：控制待办事项的圆角形态。
- `onAdd` / `onToggle` / `onDelete`：接收新增、切换完成、删除等操作。
- `placeholder` / `className`：进一步定制展示。

## 安装与启动

项目本身是 Vite 工程，常用命令如下：

```bash
pnpm install
pnpm dev
```

如果你把它当成 npm 包发布，通常还需要在入口文件里同时引入样式：

```tsx
import 'todolist/style.css';
```

## 基础用法

外层维护 `items` 状态，把交互回调传给组件。

```tsx
import { useState } from 'react';
import { TodoList } from './components/TodoList';
import type { TodoItem } from './components/TodoList/types';

export default function Demo() {
  const [todos, setTodos] = useState<TodoItem[]>([
    { id: '1', text: '学习 React', completed: false },
    { id: '2', text: '整理笔记', completed: true },
  ]);
  const background: 'sky' | 'rice' | 'green' = 'sky';
  const pageBg = BACKGROUND_CONFIG[background];

  const handleToggle = (id: string) => {
    setTodos((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item,
      ),
    );
  };

  const handleDelete = (id: string) => {
    setTodos((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAdd = (text: string) => {
    setTodos((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        text,
        completed: false,
      },
    ]);
  };

  return (
    <div className={`min-h-screen ${pageBg}`}>
      <TodoList
        items={todos}
        background={background}
        theme="classic"
        shape="rounded"
        bordered
        onToggle={handleToggle}
        onDelete={handleDelete}
        onAdd={handleAdd}
        placeholder="输入新的待办事项..."
      />
    </div>
  );
}
```

## API

### TodoListProps

| 属性 | 说明 | 类型 | 默认值 | 必填 |
| --- | --- | --- | --- | --- |
| items | 待办事项数据 | TodoItem[] | [] | 是 |
| background | 背景颜色 | `sky` | `rice` | `green` | `sky` | 否 |
| theme | 主题风格 | `classic` | `modern` | `minimal` | `classic` | 否 |
| shape | 圆角形态 | `square` | `rounded` | `pill` | `rounded` | 否 |
| bordered | 是否显示分隔边框 | boolean | true | 否 |
| onToggle | 点击完成状态时触发 | `(id: string) => void` | - | 否 |
| onDelete | 点击删除时触发 | `(id: string) => void` | - | 否 |
| onAdd | 点击添加时触发 | `(text: string) => void` | - | 否 |
| placeholder | 输入框占位文本 | string | 添加新的待办事项... | 否 |
| className | 外层容器自定义类名 | string | '' | 否 |

### 主题与背景映射

- `background="sky"`：浅蓝色背景
- `background="rice"`：米色背景
- `background="green"`：浅绿色背景

- `theme="classic"`：传统列表风格
- `theme="modern"`：更强调动效和悬浮效果
- `theme="minimal"`：更轻量、更克制

## 使用说明

这个组件更接近 Ant Design 的“配置型组件”思路：

- 页面状态由外层维护。
- 组件只负责展示和抛出事件。
- 你通过 props 控制外观，而不是改内部实现。

你可以把它理解成下面这种接口风格：

```ts
interface TodoListProps {
  background?: 'sky' | 'rice' | 'green';
  theme?: 'classic' | 'modern' | 'minimal';
  shape?: 'square' | 'rounded' | 'pill';
}
```

## 本地开发

```bash
pnpm dev
```

```bash
pnpm build
```

```bash
pnpm lint
```
