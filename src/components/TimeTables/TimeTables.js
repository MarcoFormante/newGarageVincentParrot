import React from 'react'

const TimeTables = () => {
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
                    {timeTable.map((time, index) => <td key={"time_table" + index}> <TimeComponent  {...time} day={days[index]} />  </td>)}
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
          
            {props.close === true
            ?
            <p className={"time_table_single"}> <span>{props.day}:</span> Fermé</p>
            :
            <p className={"time_table_single"}><span>{props.day}: </span> <time>{props.amStart}</time>-<time>{props.amEnd}</time>, <time>{props.pmStart}</time>-<time>{props.pmEnd}</time></p>
            }
        </>
    )
}