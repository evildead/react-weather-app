import React from 'react'

// For React 15.5 on, add the prop-types external package prop-types (to be added with npm)
//import PropTypes from 'prop-types'

//The component representing the form to submit zipcodes
class ZipForm extends React.Component {
    // The class constructor (ES6 or ECMAScript 6)
    constructor(props) {
        super(props);

        /* State in React is simply any piece of data that is specific to the component it is inside of.
           Make sure you initialize state with all the properties you plan on there being to manage */
        this.state = {
            zipcode: ''
        };

        /* JavaScript does not bind the instance value of 'this' to our methods. If we want to use a callback
           after the render method has run and need to use 'this' in it, we need to manually bind this to the method */
        this.inputUpdated = this.inputUpdated.bind(this);

        this.submitZipCode = this.submitZipCode.bind(this);
    }

    // Method triggered by button click
    submitZipCode(e) {
        // We need to prevent the default action of the form so that we stay on the page. 
        e.preventDefault();
        
        // we pull the zipcode out of state
        const { zipcode } = this.state;

        // we pull onSubmit method out of props
        // in App.js we invoke this component in this way: <ZipForm onSubmit={this.onFormSubmit} />
        const { onSubmit } = this.props;

        // we call onSubmit and pass it the zipcode. This is how the parent knows about the form submission.
        onSubmit(zipcode);

        // we need to set the zipcode piece of state to an empty string after passing it to the father component
        this.setState({ zipcode: '' });
    }

    // Method triggered by zipcode input changes (onInput)
    inputUpdated(e) {
        // value contains the modified input value
        const { value } = e.target;
        
        // update the state by assigning value to zipcode
        this.setState({ zipcode: value });
    }
    
    render() {
        return (
            <div className="zip-form">
                <form onSubmit={this.submitZipCode}>
                    <label htmlFor="zipcode">Zip Code</label>
                    <input
                        className="form-control"
                        type="input"
                        name="zipcode"
                        
                        /* Set the value of the input to the value of the zipcode, because we need
                           to make sure that when this attribute is updated, then the value of the input also changes */
                        value={this.state.zipcode}
                        
                        /* React's JSX callback onInput: Here we have a callback called inputUpdated that will be called
                           whenever the input event fires on the input. From our knowledge of basic JavaScript,
                           we know that this is called whenever someone types something into the input */
                        onInput={this.inputUpdated} />
                    <button type="submit" className='btn btn-success'>Get the forecast!!</button>
                </form>
            </div>
        );
    }
}

// enforce the props and their types that a component expects to receive
ZipForm.propTypes = {
    onSubmit: React.PropTypes.func
    
    // React 15.5
    //onSubmit: PropTypes.func
};

// Here we are setting an empty function to be the onSubmit prop. This way when it is called, nothing happens but the code doesn't explode
ZipForm.defaultProps = {
    onSubmit: () => {}
};

export default ZipForm;
