export interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
}

export type Theme = 'classic' | 'modern' | 'minimal';
export type Size = 'sm' | 'md' | 'lg';
export type Shape = 'square' | 'rounded' | 'pill';
export type Background = 'sky' | 'rice' | 'green';

export interface TodoListProps {
  // 数据
  items: TodoItem[];
  
  // 样式配置
  background?: Background;
  theme?: Theme;
  size?: Size;
  shape?: Shape;
  bordered?: boolean;
  
  // 事件回调
  onToggle?: (id: string) => void;
  onDelete?: (id: string) => void;
  onAdd?: (text: string) => void;
  
  // 其他配置
  placeholder?: string;
  className?: string;
}