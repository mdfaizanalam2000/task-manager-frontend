import { useState } from 'react';
import './App.css';
import AddTask from './components/AddTask';
import Alert from './components/Alert';

function App() {
  const [tasks, setTasks] = useState([]);
  const [triggerAlert, setTriggerAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  return (
    <>
      {triggerAlert && <Alert message={alertMessage} />}
      <AddTask tasks={tasks} setTasks={setTasks} setTriggerAlert={setTriggerAlert} setAlertMessage={setAlertMessage} />
    </>
  );
}

export default App;
