const MessageBox = ({children}) => {
  const style = {
    "maxWidth": '80%',
    "minWidth": '40%',
    'margin': 'auto'
  }
  return (
    <div style={style}>
      {children}
    </div>
  )
}

export default MessageBox
