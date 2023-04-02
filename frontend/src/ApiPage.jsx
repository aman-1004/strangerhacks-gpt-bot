const ApiPage = ({setApiKey}) => {
  const submitHandler = (e) => {
    e.preventDefault()
    let val = e.target.elements['api'].value 
    validate(val)
  } 

  const validate = (key) => {
    const body = {
      "API": key,
    }
    console.log(body)
    fetch('/api/validate', {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then(res => {
      if(res.status === 401){
        alert("Invalid key")
      }
      else {
        setApiKey(key) 
        localStorage.setItem('apiKey', key)
      }
    })
  }
  
  return (
    <div>
    <form onSubmit={submitHandler} >
      Enter the api key:  
      <input type="text" name="api"/>
    </form>
    </div>
  )
}

export default ApiPage
