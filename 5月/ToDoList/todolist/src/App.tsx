
import { useState } from 'react';
import { TodoList } from './components/TodoList';
import type { TodoItem } from './components/TodoList/types';
import { BACKGROUND_CONFIG } from './components/TodoList/constants';

function App() {
  // 初始数据，todos是一个TodoItem类型的数组，包含了三个待办事项，每个事项时一个对象
  const [todos, setTodos] = useState<TodoItem[]>([
    { id: '1', text: '学习 React', completed: false },
    { id: '2', text: '成为国际象棋大师', completed: false },
    { id: '3', text: '使用tailwindCSS', completed: true }
  ]);

  const theme: 'classic' | 'modern' | 'minimal' = 'classic';
  const shape: 'square' | 'rounded' | 'pill' = 'rounded';
  const background: 'sky' | 'rice' | 'green' = 'sky';

  // 接受一个id作为参数，切换对应待办事项的完成状态
  const handleToggle = (id: string) => {
    setTodos(todos.map((todo) =>
      todo.id === id && !todo.completed ? { ...todo, completed: true } : todo
    ));
  };

  const handleDelete = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleAdd = (text: string) => {
    const newTodo: TodoItem = {
      id: Date.now().toString(),
      text,
      completed: false
    };
    setTodos([...todos, newTodo]);
    console.log('添加了新的待办事项:', newTodo.id, newTodo.text);
  };

  const pageBg = BACKGROUND_CONFIG[background] ?? '';

  return (
    <div className={`min-h-screen p-8 ${pageBg}`}>
      
      {/* TodoList 组件演示 */}
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">TodoList</h1>
        <TodoList
          items={todos}
          background={background}
          theme={theme}
          shape={shape}
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

export default App;