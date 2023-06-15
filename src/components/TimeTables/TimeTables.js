import React from 'react'

const TimeTables = ({openingTimes}) => {
    const days = ["lun", "mar", "mer", "jeu", "ven", "sam", "dim"]

    const timeTable = [
        {
            amStart: "08:30",
            amEnd: "12:00",
            pmStart: "08:30",
            pmEnd: "12:00",
            close:false
        },
        {
            amStart: "08:30",
            amEnd: "12:00",
            pmStart: "08:30",
            pmEnd: "12:00",
            close:false
        },
        {
            amStart: "08:30",
            amEnd: "12:00",
            pmStart: "08:30",
            pmEnd: "12:00",
            close:false
        },
        {
            amStart: "08:30",
            amEnd: "12:00",
            amStart: "08:30",
            amEnd: "12:00",
            close:true
        },
        {
            amStart: "08:30",
            amEnd: "12:00",
            pmStart: "08:30",
            pmEnd: "12:00",
            close:false
        },
        {
            amStart: "08:30",
            amEnd: "12:00",
            pmStart: "08:30",
            pmEnd: "12:00",
            close:false
        },
        {
            amStart: "08:30",
            amEnd: "12:00",
            pmStart: "08:30",
            pmEnd: "12:00",
            close:false
            },
    ]
    

  return (
      <div>
          <h3 className={'section_title section_title_time_tables'}>Nos horaires</h3> 
          <div className='time_table_container'>
              <table>
                  <tbody>
                    <tr>
                    {openingTimes.map((time, index) => <td key={"time_table" + index}> <TimeComponent  {...time}  day={days[index]} />   </td>)}
                    </tr>
                    </tbody>
              </table>
            
            </div>
    </div>
  )
}

export default TimeTables


const TimeComponent = (props) => {
    return (
        <>
          
            {props.close === 0
            ?
                <p className={"time_table_single time_table_single--close"}> <span>{props.day}:</span> <span style={{ marginLeft: "25%" }} className='text-center'>Fermé</span></p>
            :
            <p className={"time_table_single"}><span>{props.day}: </span> <time>{props.day_start_am}</time>-<time>{props.day_end_am}</time>, <time>{props.day_start_pm}</time>-<time>{props.day_end_pm}</time></p>
            }
        </>
    )
}