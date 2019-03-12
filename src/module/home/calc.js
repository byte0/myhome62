import React from 'react';
import { Icon } from 'semantic-ui-react';

class Calc extends React.Component {
  render() {
    return (
      <div className='home-calc'>
        <div className = "home-calc-title">
          <Icon name = 'angle left' size = 'large'/>贷款利率计算 
        </div> 
        <div className = "map-calc-content">
          计算器
        </div>
      </div>
    );
  }
}

export default Calc;