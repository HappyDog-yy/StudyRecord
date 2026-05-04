// 三种主题的样式配置
export const THEME_CONFIG = {

  // 每一个主题都包含container\item\checkbox的样式配置

  // 经典主题
  classic: {
    container: 'bg-transparent',
    // base:文本样式
    // completed:完成状态的样式
    // border:两项间的边框样式
    item: {
      base: 'bg-transparent hover:bg-gray-50',
      completed: 'line-through text-gray-500',
      border: 'border-b border-gray-100 last:border-b-0'
    },
    // 输入框的样式，以及后面的添加按钮样式
    checkbox: {
      base: 'rounded border-gray-300 text-blue-600',
      checked: 'bg-blue-600 border-blue-600'
    }
  },
  
  // 现代主题
  modern: {
    container: 'bg-transparent',
    item: {
      base: 'transition-all hover:shadow-md hover:-translate-y-0.5',
      completed: 'opacity-60',
      border: ''
    },
    checkbox: {
      base: 'rounded-full border-2 border-gray-300',
      checked: 'bg-green-500 border-green-500'
    }
  },
  
  // 极简主题
  minimal: {
    container: 'bg-transparent',
    item: {
      base: 'hover:bg-gray-50',
      completed: 'opacity-40',
      border: 'border-b border-gray-100 last:border-b-0'
    },
    checkbox: {
      base: 'border-0 bg-transparent',
      checked: 'text-green-500'
    }
  }
} as const;
// 类型断言，不加会自动类型推导为string，无法获取到具体的属性值

export const SIZE_CONFIG = {
  sm: {
    container: 'p-2',
    item: 'p-2 text-sm-bold',
    checkbox: 'h-3 w-3',
    button: 'px-2 py-1 text-xs-bold'
  },
  md: {
    container: 'p-4',
    item: 'p-3 text-base',
    checkbox: 'h-4 w-4',
    button: 'px-3 py-1.5 text-sm'
  },
  lg: {
    container: 'p-6',
    item: 'p-4 text-lg',
    checkbox: 'h-5 w-5',
    button: 'px-4 py-2 text-base'
  }
} as const;

export const BACKGROUND_CONFIG = {
  sky: 'bg-sky-100',
  rice: 'bg-[rgb(255,251,233)]',
  green: 'bg-[rgb(233,249,233)]'
} as const;

export const SHAPE_CONFIG = {
  square: {
    container: 'rounded-none',
    item: 'rounded-none',
    button: 'rounded-none'
  },
  rounded: {
    container: 'rounded-lg',
    item: 'rounded',
    button: 'rounded-md'
  },
  pill: {
    container: 'rounded-full',
    item: 'rounded-full',
    button: 'rounded-full'
  }
} as const;