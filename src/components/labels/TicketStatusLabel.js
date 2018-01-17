import React from 'react'
import {Label} from 'semantic-ui-react'

const renderLabel = (data) => {
    switch(data){
      case 'assigned':
      return {
        colorName:'teal',
        iconName:'user'
      }
      case 'on the way':
      return {
        colorName:'green',
        iconName:'road'
      }
      case 'at the site':
      return {
        colorName:'olive',
        iconName:'home'
      }
      case 'completed':
      return {
        colorName:'blue',
        iconName:'checkmark'
      }
      case 'incomplete':
      return {
        colorName:'black',
        iconName:'close'
      }
      case 'cancelled':
      return {
        colorName:'red',
        iconName:'close'
      }
      case 'postponed':
      return {
        colorName:'grey',
        iconName:'wait'
      }


      default:
      return {
        colorName:'grey',
        iconName:'lab'
      }
    }
}


const TicketStatusLabel = ({type}) => {
  const {colorName, iconName} = renderLabel(type)

    return(<Label  color={colorName} corner='right' icon={iconName}/>)

}






export default TicketStatusLabel
