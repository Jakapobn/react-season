import React from 'react';
import ReactDom from 'react-dom';
import SeasonDisplay from './SeasonDisplay.js'
import Spinner from './Spinner.js';

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = { lat: null, errorMessage: '' };


    }

    componentDidMount() {
        console.log('My Component was redered to the screen.')
        window.navigator.geolocation.getCurrentPosition(
            position => {
                this.setState({ lat: position.coords.latitude })
                console.log(position)
            },
            err => this.setState({ errorMessage: err.message })
        );
    }

    renderContent() {
        if (this.state.lat && !this.state.errorMessage) {
            return <SeasonDisplay lat={this.state.lat} />
        }
        if (!this.state.lat && this.state.errorMessage) {
            return <div>Error: {this.state.errorMessage}</div>
        }
        return <Spinner message={'Please accept location request'} />
    }

    render() {
        return (
            <div className="border red">
                {this.renderContent()}
            </div>
        );
    };
}

ReactDom.render(<App />, document.querySelector('#root'));