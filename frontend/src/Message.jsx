const Message = ({value}) => {
  let style = {
    "backgroundColor": "red",
    "paddingLeft": "1em",
    "paddingRight": "1em"
  }
  if(value.role !== "assistant") 
    style["backgroundColor"] = "blue", 
    style["textAlign"] = "right"
  
    
  return (
    <div style={style}>
      {value.content}
    </div>
  )
}

export default Message
