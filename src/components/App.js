import React from 'react'
import { get } from 'axios'
import ZipForm from './ZipForm'
import WeatherList from './WeatherList'
import CurrentDay from './CurrentDay'

//We have created our component using the JavaScript class syntax.
//We extend React's Component base class, which gives up much of the functionality React is famous for
class App extends React.Component {
    // The class constructor (ES6 or ECMAScript 6)
    constructor(props) {
        super(props);

        /* State in React is simply any piece of data that is specific to the component it is inside of.
           Make sure you initialize state with all the properties you plan on there being to manage */
        this.state = {
            zipcode: '',
            city: {},
            dates: [],
            selectedDate: null
        };

        // Bind 'this' to onFormSubmit method which will have to use it
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onDayClicked = this.onDayClicked.bind(this);
        this.getCurrentDayComponent = this.getCurrentDayComponent.bind(this);
    }

    // this method will automatically get called by React once the component is mounted
    componentDidMount() {
        console.log("Hello Danilo! App.js component just did mount");
    }

    // This method receives a zipcode and saves it in its own state
    onFormSubmit(zipcode) {
        //this.setState({ zipcode });

        get(`http://localhost:3000/weather/${zipcode}`)
        .then(({ data }) => {
            const { city, list: dates } = data;

            this.setState({ zipcode, city, dates, selectedDate: null });
        });
    }

    // This method will be passed an index and will save that index as selectedDate on our component
    onDayClicked(dayIndex) {
        this.setState({ selectedDate: dayIndex });
    }

    // Conditionally returns the selected date component, or null is selectedDate is null
    getCurrentDayComponent() {
        const{ dates, city, selectedDate } = this.state;

        if(selectedDate === null) {
            return null;
        }

        return <CurrentDay day={dates[selectedDate]} city={city} />
    }

    // Render method: Whatever is returned from this method is what gets put onto the page in our browser
    render() {
        const{ dates, city, selectedDate } = this.state;

        return (
            // JSX Syntax
            <div className='app'>
                {/* <p>Scotch School rocks!</p> */}

                {/**
                 * Let's pass onFormSubmit through props to our ZipForm (onSubmit={this.onFormSubmit}).
                 * Props are properties (even methods or functions) passed down to components to change their functionality
                 */}
                <ZipForm onSubmit={this.onFormSubmit} />

                {/**
                 * The WeatherList
                 */}
                <WeatherList days={dates} onDayClicked={this.onDayClicked} />

                {/**
                 * Invoke the method to display the CurrentDay component conditionally
                 */}
                {this.getCurrentDayComponent()}

                {/**
                 * The other way to do that is
                 */}
                {selectedDate !== null && <CurrentDay day={dates[selectedDate]} city={city} />}
            </div>
        );
    }
}

export default App;
