import PropTypes from 'prop-types'
import React from 'react'

function Header(props) {
  return (
    <header>
        <div className='container'>
            <h1>{props.text}</h1>
            
        </div>
    </header>
  )
}
Header.defaultProps = {
  text:'Feedback ui',
}
Header.propTypes = {
  text: PropTypes.string,
}
export default Header