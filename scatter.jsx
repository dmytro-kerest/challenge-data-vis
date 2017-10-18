var React = require('React')
var linmap = require('linmap')
var jsonist = require('jsonist')
var createReactClass = require('create-react-class')

module.exports = createReactClass({
  typeColors: {
    'virginica': '#1f77b4',
    'versicolor': '#2ca02c',
    'setosa': '#ff7f0e'
  },
  pointStyle: {
    width: '10px',
    height: '10px',
    position: 'absolute',
    cursor: 'pointer',
    borderRadius: '5px',
    background: 'white'
  },
  legendStyle: {
    color: 'white',
    position: 'absolute',
    top: 0,
    left: 0,
    width: 'auto'
  },
  radiusCompensator: 5,
  getInitialState() {
    return { 
      style: {
        width: this.props.width,
        height: this.props.height,
        position: 'relative',
        color: 'rgba(255, 255, 255, 0.7)',
        background: '#222',
        border: '1px solid black',
        boxShadow: '0px 3px 8px rgba(0, 0, 0, 0.5)'      
      },
      currentPoint: {
        species: '',
        petalLength: '',
        petalWidth: '',
        sepalLength: '',
        sepalWidth: ''
      },
      data: []
    }
  },
  componentWillMount () {
    jsonist.get(this.props.dataset, (err, data) => {
      if (err) {
        console.warn(err)
      } else {
        this.setState({ data: data })
      }
    })
  },
  toggleLegend (data = null, index = null) {
    if(data) {
      data = Object.assign({ index: index }, data)
      this.setState({currentPoint: data})
    } else {
      this.setState({currentPoint: {
        species: '',
        petalLength: '',
        petalWidth: '',
        sepalLength: '',
        sepalWidth: ''
      }})
    }
  },
  mouseEnterHandler (event) {
    event.target.style.border = '1px solid white'
    let index = event.target.getAttribute('data-index')
    this.toggleLegend(this.state.data[index], index)
  },
  mouseLeaveHandler (event) {
    event.target.style.border = 'none'
    this.toggleLegend()
  },
  renderLegend () {
    const props = Object.keys(this.state.currentPoint)
    return (
      <div>
        {props.map(prop => {
          return  this.state.currentPoint[prop] 
          ? (<div key={prop}><span style={{minWidth: '7em', display: 'inline-block'}}>{prop}: </span>{this.state.currentPoint[prop]}</div>)
          : null
        })}
      </div>
    )
  },
  renderPlot () {
    let minX = this.state.data.reduce((minX, p) => Math.min(minX, p.petalWidth), this.state.data[0].petalWidth)
    let maxX = this.state.data.reduce((maxX, p) => Math.max(maxX, p.petalWidth), this.state.data[0].petalWidth)
    let minY = this.state.data.reduce((minY, p) => Math.min(minY, p.petalLength), this.state.data[0].petalLength)
    let maxY = this.state.data.reduce((maxY, p) => Math.max(maxY, p.petalLength), this.state.data[0].petalLength)    
    return (
      <div>
        {this.state.data.map((item, i) => {
          let x = linmap(minX, maxX, this.radiusCompensator, this.props.width - this.radiusCompensator, item.petalWidth)
          let y = this.props.height - linmap(minY, maxY, this.radiusCompensator, this.props.height - this.radiusCompensator, item.petalLength)
          let style = Object.assign(
            {}, 
            this.pointStyle, 
            { left: `${x}px`, top: `${y}px` },
            { background: this.typeColors[item.species] }
          )
          return (<div 
            onMouseEnter={this.mouseEnterHandler} 
            onMouseLeave={this.mouseLeaveHandler}
            data-index={i}
            key={i} 
            style={style} />)
        })}
      </div>
    )
  },
  render () {
    return (
      <div style={this.state.style}>
        <div style={this.legendStyle}>
          {this.renderLegend()}
        </div>
        <div style={{ position: 'absolute' }}>
          {this.state.data.length && this.renderPlot()}
        </div>
      </div>
    )
  }
})
