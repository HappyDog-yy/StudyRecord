// import { useState } from 'react'; 
import { RefDemo } from './components/RefDemo';
import { ForwardRefDemo } from './components/ForwardRefDemo';
// import { SuspenseDemo } from './components/SuspenseDemo/index';
// import { SuspenseDemo2 } from './components/2.SuspenseDemo/index';
import {SuspenseDemo} from './components/suspenseDemo/index';
import {SuspenseDemo2} from './components/2suspenseDemo/index.tsx';

function App() {
  return (<div>
    <RefDemo />
    <ForwardRefDemo />
    <SuspenseDemo />
    <SuspenseDemo2 />
  </div>);
}

export default App;
