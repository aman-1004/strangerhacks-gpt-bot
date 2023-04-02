import { useImmer } from "use-immer"
import { useEffect } from "react"
import Message from "./Message"
import MessageBox from './MessageBox'

const Main = ({apiKey}) => {
  const [messages, setMessages] = useImmer(getObject('msg1'))
  useEffect(()=> {
    setObject('msg1', messages)
  }, [messages])
  
  const addMessage = (message, role) => {
    setMessages(draft => {
      draft.push({
        content: message,
        role: role
      })
    })
  }

  const sendMessage = async (message) => {
    addMessage(message, "user") 
    {/* await (new Promise((resolve) => setTimeout(resolve, 5*1000))) */}
    {/*   .then(() => addMessage("message from bot", "assistant")) */}
    const updatedMessages = [...messages, {
      content: message,
      role: "user"
    }]

    const data = {
      array: updatedMessages,
      key: apiKey,
    }

    const res = await fetch('/api/', {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
    const result = await res.text()
    addMessage(result, 'assistant')
    console.log(result)
  }
  
  const submitHandler = async (e) => {
    e.preventDefault()
    const txtInput = e.target.elements['msg']
    const submitInput = e.target.elements['submit']
    submitInput.disabled = true
    const txtValue = txtInput.value
    txtInput.value = ''
    await sendMessage(txtValue)
    submitInput.disabled = false 
  }

  return (
    <div>
    <MessageBox>
    { messages.map(message => <Message key={Math.floor(Math.random()*10000)} value={message}/> )} 
      <form onSubmit={submitHandler} style={{'margin': 'auto'}}>
        <input type="text" name="msg" />
        <input type="submit" name="submit"/>
      </form>
    </MessageBox>
    </div>
  )
}

/*
messages: 
  [{
    "role": user            ** can be user/assistant
    "content": ""
  }]
-> sent to sever

server has prompt
initialPrompt: ```
Marv is a sarcastic bot. 
User: fsdf
Bot: little comment or something
```

prompt: initialPrompt + convertToString(message: array of objects)

*/


function setObject(key, value){
  localStorage.setItem(key, JSON.stringify(value))
}


function getObject(key){
  let value = localStorage.getItem(key)
  if(!value) return [{
    "role": "assistant", "content": "How can I help you dumbass?"
  }]
  return value && JSON.parse(value)
}


export default Main
