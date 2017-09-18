import React from 'react'
import WeatherListItem from './WeatherListItem'

class WeatherList extends React.Component {
    render() {
        const{ days, onDayClicked } = this.props;

        return <div className="weather-list flex-parent">
            {/**
              * from the array 'days' create an array of WeatherListItem components by using the function map
              * Pass variables as 'props' to any WeatherListItem component
              */}
            {days.map((day, index) =>
                <WeatherListItem
                    key = {day.dt}
                    day = {day}
                    onDayClicked = {onDayClicked}
                    index = {index}
                />
            )}
        </div>
    }
}

// This might become a so-called "Functional component"
/*
const WeatherList = ({ days, onDayClicked }) =>
<div className="weather-list flex-parent">
  {days.map((day, index) =>
    <WeatherListItem
      key={day.dt}
      day={day}
      index={index}
      onDayClicked={onDayClicked}
    />
  )}
</div>
*/

export default WeatherList;
