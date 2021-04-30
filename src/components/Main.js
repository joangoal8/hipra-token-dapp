import React, { Component } from 'react'
import dai from '../dai.png'

class Main extends Component {

  render() {
    return (
      <div id="content" className="mt-3">

        <table className="table table-borderless text-muted text-center">
          <thead>
            <tr>
              <th scope="col">Sample Extracted</th>
              <th scope="col">Sample in transport</th>
              <th scope="col">Sample Delivered</th>
              <th scope="col">Sample Analysed</th>
              <th scope="col">Sample Finished</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{(this.props.sampleExtTokenBalance > 0) ? 'true' : 'false'}</td>
              <td>{(this.props.sampleTransportTokenBalance > 0) ? 'true' : 'false'}</td>
              <td>{(this.props.sampleUnboxingTokenBalance > 0) ? 'true' : 'false'}</td>
              <td>{(this.props.sampleAnalysisTokenBalance > 0) ? 'true' : 'false'}</td>
              <td>{(this.props.sampleReadyTokenBalance > 0) ? 'true' : 'false'}</td>
            </tr>
          </tbody>
        </table>

        <div className="card mb-4" >

          <div className="card-body">

            <form className="mb-3" onSubmit={(event) => {
                event.preventDefault();
                let step;
                step = this.input.value.toString();
                this.props.stakeTokens(step)
              }}>
              <div>
                <label className="float-left"><b>Add Step</b></label>
              </div>
              <div className="input-group mb-4">
                <input
                  type="text"
                  ref={(input) => { this.input = input }}
                  className="form-control form-control-lg"
                  placeholder="0"
                  required />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <img src={dai} height='32' alt=""/>
                    &nbsp;&nbsp;&nbsp; mDAI
                  </div>
                </div>
              </div>
              <button type="submit" className="btn btn-primary btn-block btn-lg">Save Step</button>
            </form>
          </div>
        </div>
        <div className="btn-group" role="group" aria-label="Basic mixed styles example">
            <button type="button" className="btn btn-danger">Left</button>
            <button type="button" className="btn btn-warning">Middle</button>
            <button type="button" className="btn btn-success">Right</button>
        </div>
      </div>
    );
  }
}

export default Main;
