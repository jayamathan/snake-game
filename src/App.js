import React, {Component} from 'react';
import Snake from './Snake';
import Food from './Food';


const getFoodPoints = () => {
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random()*(max-min+1)+min)/2)*2;
  let y =  Math.floor((Math.random()*(max-min+1)+min)/2)*2;
  return [x,y]
}

const initialState = {
  food: getFoodPoints(),
  speed: 300,
  direction: 'RIGHT',
  snakePoints: [
    [0,0],
    [2,0]
  ]
}


class App extends Component{

  state = initialState;

  componentDidMount() {
    setInterval(this.moveSnake, this.state.speed);
    document.onkeydown = this.onKeyDown;
  }

  componentDidUpdate() {
    this.checkIfHitWalls();
    this.checkIfCollapsed();
    this.checkIfEat();
  }



  
  onKeyDown = (e) => {
    e = e || window.event;
    switch (e.keyCode) {
      case 38:
        this.setState({direction: 'UP'});
        break;
      case 40:
        this.setState({direction: 'DOWN'});
        break;
      case 37:
        this.setState({direction: 'LEFT'});
        break;
      case 39:
        this.setState({direction: 'RIGHT'});
        break;
    }
  }


  moveSnake = () => {
    let snake = [...this.state.snakePoints];
    let head = snake[snake.length - 1];

    switch (this.state.direction) {
      case 'RIGHT':
        head = [head[0] + 2, head[1]];
        break;
      case 'LEFT':
        head = [head[0] - 2, head[1]];
        break;
      case 'DOWN':
        head = [head[0], head[1] + 2];
        break;
      case 'UP':
        head = [head[0], head[1] - 2];
        break;
    }
    snake.push(head);
    snake.shift();
    this.setState({
      snakePoints: snake
    })
  }

  checkIfHitWalls() {
    let head = this.state.snakePoints[this.state.snakePoints.length - 1];
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      this.onGameOver();
    }
  }

  checkIfCollapsed() {
    let snake = [...this.state.snakePoints];
    let head = snake[snake.length - 1];
    snake.pop();
    snake.forEach(point => {
      if (head[0] == point[0] && head[1] == point[1]) {
        this.onGameOver();
      }
    })
  }

  checkIfEat() {
    let head = this.state.snakePoints[this.state.snakePoints.length - 1];
    let food = this.state.food;
    if (head[0] == food[0] && head[1] == food[1]) {
      this.setState({
        food: getFoodPoints()
      })
      this.growSnake();
      this.increaseSpeed();
    }
  }

  growSnake() {
    let newSnake = [...this.state.snakePoints];
    newSnake.unshift([])
    this.setState({
      snakePoints: newSnake
    })
  }

  increaseSpeed() {
    if (this.state.speed > 10) {
      this.setState({
        speed: this.state.speed - 10
      })
    }
  }

  onGameOver() {
    alert(`Whoops!!! Game Over. Score is ${this.state.snakePoints.length*5}`);
    this.setState(initialState)
  }




  render() {
    return (
      <div className="game-board">
        <Snake snakePoints={this.state.snakePoints}/>
        <Food point={this.state.food}/>
      </div>
    );
  }
}




export default App;
