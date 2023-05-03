import React from 'react';
import '../scss/Loading.scss';


// Loading screen arrow
// Do not delete empty divs, these are accessed and changed via styling
function Loading() {
  return (
    <div id="loading-section">
      <div className="loadingio-spinner-reload-95c95vxnjuq">
        <div className="ldio-7c2ii3644jj">
          <div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loading;
