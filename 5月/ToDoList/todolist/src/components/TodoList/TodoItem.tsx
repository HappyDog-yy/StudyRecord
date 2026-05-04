import React from 'react';
import { THEME_CONFIG, SIZE_CONFIG, SHAPE_CONFIG } from './constants'
import type { TodoItem as TodoItemType } from './types';
// 引入类型定义而不是组件要在前面加上type

interface TodoItemProps {
  item: TodoItemType;
  theme: 'classic' | 'modern' | 'minimal';
  size: 'sm' | 'md' | 'lg';
  shape: 'square' | 'rounded' | 'pill';
  bordered?: boolean;
  onToggle?: (id: string) => void;
  onDelete?: (id: string) => void;
}

// 函数组件，接受的props类型是TodoItemProps
// 状态完全由父组件管理
export const TodoItem: React.FC<TodoItemProps> = ({
  item,
  theme = 'modern',
  size = 'lg',
  shape = 'pill',
  bordered = true,
  onToggle,
  onDelete
}) => {
  const themeConfig = THEME_CONFIG[theme];
  const sizeConfig = SIZE_CONFIG[size];
  const shapeConfig = SHAPE_CONFIG[shape];

  const containerClasses = [
    'bg-white',
    'flex items-center gap-3',
    themeConfig.item.base,
    bordered ? themeConfig.item.border : '',
    sizeConfig.item,
    shapeConfig.item,
  ].filter(Boolean).join(' ');
// 类名的组合方式，使用Boolean过滤掉空的、未定义的类名
// 用空格链接成一个完整的类名

// 状态切换：如果已经完成了，就不能变了
  const handleToggle = () => {
    if (item.completed) return;
    onToggle?.(item.id);
    // 如果存在，就调用这个函数，如果不存在也不会因此报错
    // 可选链操作符，可以安全地调用该函数，或者访问某个可能为null或者undefinted地属性
  };

  const handleDelete = () => {
    onDelete?.(item.id);
  };

  return (
    <div className={containerClasses}>
      {/* 复选框 */}
      <input
        type="checkbox"
        checked={item.completed}
        onChange={handleToggle}
        disabled={item.completed}
        // className="sr-only"
      />
      
      {/* 文本内容 */}
      <div
        className={`
          flex-1 select-none
          ${item.completed ? 'cursor-default' : 'cursor-pointer'}
          ${item.completed ? themeConfig.item.completed : ''}
        `}
        onClick={handleToggle}
      >
        {item.text}
      </div>
      
      {/* 删除按钮 */}
      {/* 仅仅在有删除功能时显示 */}
      {onDelete && (
        <button
          onClick={handleDelete}
          className={`
            px-2 py-1 text-sm transition-colors
            ${theme === 'minimal' 
              ? 'text-red-600 hover:bg-red-50' 
              : 'bg-red-100 text-red-800 hover:bg-red-200'
            }
            ${sizeConfig.button}
            ${shapeConfig.button}
          `}
        >
          删除
        </button>
      )}
    </div>
  );
};