import React from 'react'


const Loading = ({ isLoading }) => {

    if (isLoading ) {
        return (
            <div className='loading'>
                <div className='loading_container'>
                    <div className='loading_circle'></div>
                    <div className='loading_text'>Chargement</div>
                </div>
            </div>
          )
    }

}

export default Loading
