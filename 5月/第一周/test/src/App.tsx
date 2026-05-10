import { useState } from 'react';
import { BACKGROUND_CONFIG, TodoList } from 'iccy-todolist';
import type { TodoItem } from 'iccy-todolist';
import 'iccy-todolist/style.css';

function Demo() {
  const [todos, setTodos] = useState<TodoItem[]>([
    { id: '1', text: '学习 React', completed: false },
    { id: '2', text: '整理笔记', completed: true },
  ]);
  const background: 'sky' | 'rice' | 'green' = 'green';
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
    <div className={`min-h-screen p-8 ${pageBg}`}>
      
      {/* TodoList 组件演示 */}
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">TodoList</h1>
        <TodoList
          items={todos}
          background={background}
          theme='modern'
          shape='pill'
          bordered={true}
          onToggle={handleToggle}
          onDelete={handleDelete}
          onAdd={handleAdd}
          placeholder="输入新的待办事项..."
        />
      </div>
    </div>
  );
}
function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
    <Demo></Demo>
     
    </>
  )
}

export default App
