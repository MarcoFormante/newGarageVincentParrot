import React from 'react'
import TimeTables from '../../TimeTables/TimeTables'
import Map from '../../Map/Map'

const TimeOpeningBlock = () => {
  return (
    <div className='container--flex container_time_map'>
      <TimeTables/>
      <Map/>
    </div>
  )
}

export default TimeOpeningBlock
