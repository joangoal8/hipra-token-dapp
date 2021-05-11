import React, {Component} from "react";
import '../components/App.css';

class Tokens extends Component {

    render() {
        console.log(this.props.controlTokens);
        console.log(this.props.resultTokens);

        let controlTokenItems = "";
        if (this.props.controlTokens) {
            controlTokenItems =  this.props.controlTokens.map((tokens) =>
                <>
                    <hr className="separator-style">
                    </hr>
                    <div className="mb-3">
                        {
                            tokens.map((field) =>
                                <p>{field}</p>
                            )
                        }
                    </div>
                </>
            );
        }

        let resultToken = "";
        if (this.props.resultTokens) {
            resultToken = this.props.resultTokens.map((field) =>
                <>
                    <hr className="separator-style">
                    </hr>
                    <div className="mb-3">
                        <p>{field}</p>
                    </div>
                </>
            );
        }

        return (
            <div className="container-fluid mt-5">
                <div className="row">
                    <main role="main" className="col-lg-12 ml-auto mr-auto hipra-main-box" style={{ maxWidth: '600px' }}>
                        <div className="content mr-auto ml-auto">
                            <div id="content" className="mt-3">
                                <div className="card mb-4" >
                                    <div className="card-body">

                                        <h2> Control Tokens
                                        </h2>
                                        {controlTokenItems}

                                        <h2> Result Token
                                        </h2>
                                        {resultToken}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        );
    }
}

export default Tokens;