// import { useState } from 'react'; 
import UseStateDemo from './components/UseStateDemo';
import UseReducer from './components/UseReducer';

import UseContextDemo from './components/UseContextDemo'

function App() {
  // const [count, setCount] = useState(0)
 
  return (
    <>
    <UseStateDemo></UseStateDemo>
    <UseReducer></UseReducer>
    <UseContextDemo></UseContextDemo>
    </>
  )
}

export default App;
