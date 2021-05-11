import React, { Component } from 'react'

import hipraInputLogo from '../hypra_input_logo_sm.png'

class Controller extends Component {

  render() {

    return (
        <div className="container-fluid mt-5">
            <div className="row">
                <main role="main" className="col-lg-12 ml-auto mr-auto hipra-main-box" style={{ maxWidth: '600px' }}>
                    <div className="content mr-auto ml-auto">
                        <div id="content" className="mt-3">

        <div className="card mb-4" >

          <div className="card-body">

            <form className="mb-3" onSubmit={(event) => {
                event.preventDefault();
                let sender;
                sender = this.input.value.toString();
                if(sender) {
                    this.props.addNewController(sender);
                } else {
                    window.alert('You need to fill the text field and select the step')
                }
              }}>
              <div>
                <label className="float-left"><b>Add controller public address</b></label>
              </div>
              <div className="input-group mb-4">
                <input
                  type="text"
                  ref={(input) => { this.input = input }}
                  className="form-control form-control-lg"
                  placeholder="0x0"
                  required />
                  <div className="input-group-append">
                      <div className="input-group-text">
                          <img src={hipraInputLogo} height='32' alt=""/>
                          &nbsp;&nbsp;&nbsp; Hipra Tracker
                      </div>
                  </div>
              </div>
              <button type="submit" className="btn hipra-btn-primary btn-block btn-lg">Add Controller</button>
            </form>
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

export default Controller;
