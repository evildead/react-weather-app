import './styles.scss';
import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'

const root = document.getElementById('app-container');

//Now we will use ReactDOM to render a paragraph inside this container by passing JSX
//ReactDOM.render(<p>Hellooooo :D</p>, root);

//Instead of using JSX create the paragraph element by invoking React.createElement
//ReactDOM.render(React.createElement('p', null, 'Hellooo MITICOOO'), root);

//Let's render the App component 
ReactDOM.render(<App />, root);
