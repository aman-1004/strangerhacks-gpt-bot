import { useState } from 'react'
import ApiPage from './ApiPage'
import MainContent from './MainContent'
function App() {
  const [apiKey, setApiKey] = useState(localStorage.getItem('apiKey'))
  if(apiKey) return (
    <>
      <MainContent apiKey={apiKey}/>
    </>
  )

  else return (<ApiPage setApiKey={setApiKey} /> )
}

export default App
