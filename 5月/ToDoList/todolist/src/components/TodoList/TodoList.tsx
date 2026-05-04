import { THEME_CONFIG } from './constants'
import React, { useState } from 'react';
import type{ TodoListProps } from './types';
import { TodoItem } from './TodoItem';

// 函数组件：TodoList，接受TodoListProps类型的props
export const TodoList: React.FC<TodoListProps> = ({
  items = [],
  background = 'sky',
  theme = 'classic',
  size = 'lg',
  shape = 'rounded',
  bordered = true,
  onToggle,
  onDelete,
  onAdd,
  placeholder = '添加新的待办事项...',
  className = ''
}) => {
    // 存储输入框中的文本，改变的时候要重新渲染，所以使用useState来管理这个状态
  const [newItemText, setNewItemText] = useState('');

  // 根据传入的theme获取对应的样式
  // 包括container\item\checkbox的样式
  const themeConfig = THEME_CONFIG[theme];
  const backgroundClasses = {
    sky: 'bg-sky-100',
    rice: 'bg-[rgb(255,251,233)]',
    green: 'bg-[rgb(233,249,233)]'
  }[background];
  
  const containerClasses = [
    'min-h-screen',
    themeConfig.container,
    backgroundClasses,
    className
    // 这里允许用户传递自定义的类名
  ].filter(Boolean).join(' ');
// Boolean()过滤掉空字符串，最后用空格连接成一个完整的类名字符串,可以移除掉无效的类名

  const handleAdd = () => {
    // 移除前后空格，避免添加空的待办事项，也可以使内容更加干净
    // 如果不检查onAdd,可能会导致后面的调用出现错误
    if (newItemText.trim() && onAdd) {
      onAdd(newItemText.trim());
      setNewItemText('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    // 这里是enter键代表添加按钮，加上shift键代表换行
    if (e.key === 'Enter' && !e.shiftKey) {
        // enter的默认行为就是在表单类型里面会直接提交
      e.preventDefault();
      handleAdd();
    }
  };

  // 该组件包括输入框和待办事项列表
  // 输入框仅仅在传入了onAdd回调函数时才会显示
  return (
    <div className={containerClasses}>
    
    {onAdd && (
        <div className="mt-4 flex gap-2 mb-4">
          <input
            type="text"
            value={newItemText}
            onChange={(e) => setNewItemText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAdd}
            disabled={!newItemText.trim()}
            className={`
              px-4 py-2 text-white rounded transition-colors
              ${theme === 'minimal' 
                ? 'bg-blue-500 hover:bg-blue-600' 
                : 'bg-blue-600 hover:bg-blue-700'
              }
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
          >
            添加
          </button>
        </div>
      )}


      {/* 待办事项列表 */}
      {/* 把每一项映射成一个列表，包括复选框、删除键等   */}
      <div className="space-y-2">
        {items.length === 0 ? (
          <div className="text-center py-4 text-gray-500">
            暂无待办事项
          </div>
        ) : (
          items.map((item) => (
            <TodoItem
              key={item.id}
              item={item}
              theme={theme}
              size={size}
              shape={shape}
              bordered={bordered}
              onToggle={onToggle}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
      
    </div>
  );
};