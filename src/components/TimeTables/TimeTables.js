import React, { useEffect, useState } from 'react'
import axios from '../../api/axios'
const TimeTables = ({ openingTimes }) => {
    const [openingTime,setOpeningTime] = useState([])
    const days = ["lun", "mar", "mer", "jeu", "ven", "sam", "dim"]


    useEffect(() => {
        const homepagePath = process.env.REACT_APP_HTTP + "pages/homePage.php?openingTimes=true";
        axios.get(homepagePath)
            .then(response => {
                setOpeningTime(response.data.openingTimes)
            })
        .catch()
    },[])

    

  return (
      openingTimes && <div>
          <h3 className={'section_title section_title_time_tables'}>Nos horaires</h3> 
          <div className='time_table_container'>
              <table>
                  <tbody>
                    <tr>
                    {openingTime.map((time, index) => <td key={"time_table" + index}> <TimeComponent  {...time}  day={days[index]} />   </td>)}
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