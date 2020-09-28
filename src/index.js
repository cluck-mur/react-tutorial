import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// class Square extends React.Component {
//   //***
//   //* コンストラクター
//   //***
//   // constructor(props) {
//   //   super(props);
//   //   this.state = {
//   //     value: null,
//   //   }
//   // }
//  
//   render() {
//     return (
//       <button
//         className="square"
//         onClick={() => this.props.onClick()}
//       >
//         {this.props.value}
//       </button>
//     );
//   }
// }
function Square(props) {
    return (
        <button
          className="square"
          // onClick={() => props.onClick()}
          onClick={props.onClick} // 上のコードを短く書いた。処理は等価。
          >
          {props.value}
        </button>
    );
  }
  
  class Board extends React.Component {
    //* history対応 削除 ここから
    //***
    //* コンストラクター
    //***
    // constructor(props) {
    //   super(props);
    //   this.state = {
    //     squares: Array(9).fill(null),
    //     xIsNext: true,
    //   }
    // }
    //* history対応 削除 ここまで
    
    //* history対応 削除 ここから
  //   handleClick(i) {
  //     const squares = this.state.squares.slice();
  //     // 勝敗が決まったら処理なしでリターン。
  //     if (calculateWinner(squares)) {
  //       return;
  //     }
      
  //     // squares[i] = 'X';
  //     squares[i] = this.state.xIsNext ? 'X' : 'O';
  //     this.setState({
  //       squares: squares,
  //       xIsNext: !this.state.xIsNext,
  //     });
  //   }
    //* history対応 削除 ここまで
    
    renderSquare(i) {
      return (
        <Square
          // history対応のための修正 ここから
          //value={this.state.squares[i]}
          //onClick={() => { this.handleClick(i); } } />;
          value={this.props.squares[i]}
          onClick={
            () => {
              this.props.onClick(i);
            }
          }
          // history対応のための修正 ここまで
        />
      );
    }
  
    render() {
      //* history対応 削除 ここから
      // // const status = 'Next player: X';
      // // const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      // const winner = calculateWinner(this.state.squares);
      // let status;
      // if (winner) {
      //   status = 'Winner: ' + winner;
      // } else {
      //   status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      // }
      //* history対応 削除 ここまで
      return (
        <div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    //***
    //* コンストラクター
    //***
    constructor(props) {
      super(props);
      this.state = {
        history: [{
          squares: Array(9).fill(null)
        }],
        stepNumber: 0,
        xIsNext: true,
      };
    }
    
    handleClick(i) {
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      // 勝敗が決まったら処理なしでリターン。
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      
      // squares[i] = 'X';
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
        history: history.concat([{
          squares: squares,
        }]),
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext,
      });
    }
  
    //***
    //*
    //***
    jumpTo(step) {
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0,
      });
    }
    
    render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.squares);
      
      const moves = history.map((step, move) => {
        const desc = move ?
              'Go to move #' + move :
              'Go to game start';
        return (
          <li　key={move}>
            <button onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
        );
      });
      
      let status;
      if (winner) {
        status = 'Winner: ' + winner;
      } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }
      
      return (
        <div className="game">
          <div className="game-board">
            <Board
              squares={current.squares}
              onClick={(i) => { this.handleClick(i); } }
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  
  //***
  //* 勝敗を判断する
  //***
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
  