import React, { Component } from 'react'
import hipraInputLogo from '../hypra_input_logo_sm.png'
import bloodSampleImg from '../blood_sample.png'
import transportImg from '../transport.png'
import unboxingImg from '../unboxing.png'
import analysisImg from '../laboratory.png'
import doneImg from '../done.png'

class Home extends Component {

  optionSelected(e) {
    this.setState({option: e.target.value})
  }

  optionDescriptionAdded(e) {
    this.setState({description: e.target.value})
  }

  setTemperature(e) {
      this.setState({temperature: e.target.value})
  }

  setHumidity(e) {
      this.setState({humidity: e.target.value})
  }

  setBrightness(e) {
      this.setState({brightness: e.target.value})
  }

  setResult(e) {
      this.setState({result: e.target.value})
  }

  render() {
      let option = "";
      if (this.state != null && this.state.option) {
          option = this.state.option;
      }
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
                let sender, optionSelected, description;
                sender = this.input.value.toString();
                optionSelected = this.state.option;
                description = this.state.description;
                if(sender && optionSelected) {
                    if (optionSelected === 'analysis') {
                        this.props.addResult(sender, optionSelected, description);
                    } else {
                        let temperature, humidity, brightness;
                        temperature = this.state.temperature;
                        humidity = this.state.humidity;
                        brightness = this.state.brightness;
                        if (temperature && humidity && brightness) {
                            this.props.addControlCheck(sender, optionSelected, true, description, temperature, humidity, brightness);
                        } else {
                            this.props.addControlCheck(sender, optionSelected, true, description);
                        }
                    }
                } else {
                    window.alert('You need to fill the text field and select the step')
                }
              }}>
              <div>
                <label className="float-left"><b>Add Sender</b></label>
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
              <div className="input-group mb-4">
                  <input
                      type="text"
                      onChange={this.optionDescriptionAdded.bind(this)}
                      className="form-control form-control-lg"
                      placeholder="Description"
                      required />
              </div>
                  {
                      option === "transport" &&
                      <>
                          <div className="input-group mb-4">
                              <input
                                  type="text"
                                  onChange={this.setTemperature.bind(this)}
                                  className="form-control form-control-lg"
                                  placeholder="Temperature"/>
                          </div>
                          <div className="input-group mb-4">
                              <input
                              type="text"
                              onChange={this.setHumidity.bind(this)}
                              className="form-control form-control-lg"
                              placeholder="Humidity"/>
                          </div>
                          <div className="input-group mb-4">
                              <input
                              type="text"
                              onChange={this.setBrightness.bind(this)}
                              className="form-control form-control-lg"
                              placeholder="Brightness"
                              />
                          </div>
                      </>
                  }
                {
                    option === "analysis" &&
                    <>
                        <div className="input-group mb-4">
                            <input
                                type="text"
                                onChange={this.setResult.bind(this)}
                                className="form-control form-control-lg"
                                placeholder="Result"
                                required/>
                        </div>
                    </>
                }
              <div>
                  <label>
                      <input type="image"style={(option === "extraction") ? {outline: '2px solid #00008B'} : {outline :'none'}}
                             ref="step" value="extraction" alt="" src={bloodSampleImg} onClick={this.optionSelected.bind(this)}/>
                  </label>
                  <label>
                      <input type="image" style={(option === "transport") ? {outline: '2px solid #00008B'} : {outline :'none'}}
                             ref="step" value="transport" alt="" src={transportImg} onClick={this.optionSelected.bind(this)}/>
                  </label>
                  <label>
                      <input type="image" style={(option === "unboxing") ? {outline: '2px solid #00008B'} : {outline :'none'}}
                             ref="step" value="unboxing" alt="" src={unboxingImg} onClick={this.optionSelected.bind(this)}/>
                  </label>
                  <label>
                      <input type="image" style={(option === "analysis") ? {outline: '2px solid #00008B'} : {outline :'none'}}
                             ref="step" value="analysis" alt="" src={analysisImg} onClick={this.optionSelected.bind(this)}/>
                  </label>
                  <label>
                      <input type="image" style={(option === "done") ? {outline: '2px solid #00008B'} : {outline :'none'}}
                             ref="step" value="done" alt="" src={doneImg} onClick={this.optionSelected.bind(this)}/>
                  </label>
              </div>
              <button type="submit" className="btn hipra-btn-primary btn-block btn-lg">Save Step</button>
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

export default Home;
