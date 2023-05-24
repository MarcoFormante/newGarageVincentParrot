import React from 'react'
import TimeTables from '../../TimeTables/TimeTables'
import Map from '../../Map/Map'

const TimeOpeningBlock = () => {
  return (
    <div className='container--flex'>
      <TimeTables />
      <Map/>
    </div>
  )
}

export default TimeOpeningBlock
