import React, { Component } from "react";

class Cities extends Component {
  render() {
    return (
      <div>
        <ul class="surveys grid">
          <li class="survey-item">
            <span class="survey-country list-only">UK</span>

            <span class="survey-name">UK Beer May 2014</span>

            <span class="survey-country grid-only">UK</span>

            <div class="pull-right">
              <span class="survey-progress">
                <span class="survey-progress-bg">
                  <span class="survey-progress-fg" style="width: 88%;" />
                </span>

                <span class="survey-progress-labels">
                  <span class="survey-progress-label">88%</span>

                  <span class="survey-completes">490 / 500</span>
                </span>
              </span>

              <span class="survey-end-date ended">2014 - May 10</span>
              <span class="survey-stage">
                <span class="stage draft">Draft</span>
                <span class="stage awarded">Awarded</span>
                <span class="stage live">Live</span>
                <span class="stage ended active">Ended</span>
              </span>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

export default Cities;
