
import React, { useEffect, useState } from 'react'
import StarsBlock from '../../Stars/StarsBlock'
import ButtonCta from '../../Buttons/ButtonCta'

//Section "Vos Avis" in home page
const AvisSection = () => {
    const [avis, setAvis] = useState([]);

    useEffect(() => {
        setAvis([...avisClient])
    },[avis])
    const avisClient = [
        {
            name: "clement",
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum pariatur nihil animi voluptates repellat qui dicta, repudiandae vel saepe labore suscipit dolor voluptate possimus reprehenderit ducimus odit deserunt delectus distinctio?",
            note: Math.floor(Math.random()*6)
        },
        {
            name: "clement",
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum pariatur nihil animi voluptates repellat qui dicta, repudiandae vel saepe labore suscipit dolor voluptate possimus reprehenderit ducimus odit deserunt delectus distinctio?",
            note:Math.floor(Math.random()*6)
        },
        {
            name: "clement",
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum pariatur nihil animi voluptates repellat qui dicta, repudiandae vel saepe labore suscipit dolor voluptate possimus reprehenderit ducimus odit deserunt delectus distinctio?",
            note: Math.floor(Math.random()*6)
        },
        {
            name: "clement",
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum pariatur nihil animi voluptates repellat qui dicta, repudiandae vel saepe labore suscipit dolor voluptate possimus reprehenderit ducimus odit deserunt delectus distinctio?",
            note: Math.floor(Math.random()*6)
        },
        {
            name: "clement",
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum pariatur nihil animi voluptates repellat qui dicta, repudiandae vel saepe labore suscipit dolor voluptate possimus reprehenderit ducimus odit deserunt delectus distinctio?",
            note: Math.floor(Math.random()*6)
        }

    ]
   
  return (
    <div className={'section_avis'}>
      <h3 className={'section_title section_title_avis'}>Vos avis</h3> 
        <div className={"section_page section_page--grey"}>
            <div className={'avis_score'}>
                  <div className={"avis_score_stars"}>
                      {/** stars block set "clickable" for avis page */}
                      <StarsBlock numberOfActiveStars={5} clickable={false}/>
                      <span className={'score'}>4,7/5</span>
                  </div>
                  <ScoreBarsBlock />
              </div>
          </div>
            <div className={"avis_cards_container"}>
                <div className={"avis_cards_container_inner"}>
                  {avis.map((avis, index) => <AvisCard key={"avis_" + index +"_card" } name={avis.name}  text={avis.text} note={avis.note} />)}
              </div>
              <p className='title_cta'>Votre avis nous interesse</p>
              <ButtonCta type={"link"} to={"/avis"} inner={"Je donne mon avis"} className={"btn_avis"} />
            </div>
    </div>
  )
}

export default AvisSection


const ScoreBarsBlock = () => {
    const bars = [1, 2, 3, 4, 5];


    return (
    <div>
            {bars.map((bar, index) => <ScoreBar key={"scorebar_" + Math.floor(Math.random()*100 ) + "_bar" + bar} scoreNum={bar}/>)}
    </div>
    )
}


const ScoreBar = ({scoreNum}) => {
    return (
        <div>
            <div className={'score_bar'}>
                <span className={'score_num_bar'}>{scoreNum + " Stars"}</span>
                <div className={'bar_outer'}>
                    <div className={'bar_inner'}>
                        {/** dynamic bar that change the width fething dataScore from database */}
                    </div>
                </div>
            </div>
        </div>
    )
}

const AvisCard = ({name,text,note}) => {
    
    return (
        <div>
            <div className={'avis_card'}>
                <span className={'avis_card_name'}>{name}</span>
                <q className={'avis_card_text'}>{text}</q>
                <div className={'avis_card_note'}>
                   <StarsBlock numberOfActiveStars={note} clickable={false}/> 
                </div>
            </div>
        </div>
        
    )
}



