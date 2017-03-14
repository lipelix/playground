import React, { Component } from 'react';
import './Leg.css';

class Leg extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { start, end, departureTime, arrivalTime, duration, distance } = this.props; 

        return (
            <div className='leg'>      
                <div className='total'>          
                    <div className='duration'>{ duration.text }</div>
                    <div className='distance'>{ distance.text }</div>   
                </div>              
                <div className='departureTime'>{ departureTime.text }</div>                
                <div>{ start } </div>
                <div>&darr;</div>
                <div className='arrivalTime'>{ arrivalTime.text }</div>
                <div> { end }</div>
            </div>            
        );
    }

}

export default Leg;