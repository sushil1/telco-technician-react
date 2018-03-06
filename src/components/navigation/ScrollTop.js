/*global window */
import React from 'react'
import { Button} from 'semantic-ui-react'


const ScrollTop = () => (<Button
  circular
  link="true"
  icon="chevron up"
  compact
  size='large'
  as="icon"
  onClick={() => {document.body.scrollTop = 0}}
  style={{
    position: 'fixed',
    backgroundColor:'#f6f6f6',
    borderShadow:'1px 2px 6px rgba(0, 0, 0, 0.2)',
    bottom: '2%',
    padding:'15px',
    color:'black',
    right: '2%',
    zIndex: '1',
    opacity: '0.8',
    marginTop:'200px'
  }} />
)

export default ScrollTop
