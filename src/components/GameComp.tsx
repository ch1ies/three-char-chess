import React, { Component } from 'react'
import BoardComp from './BoardComp'
import GameStatusComp from './GameStatus'
import { ChessType, GameStatus } from '../types/enums'

interface IState {
    chesses:ChessType[]
    gameStatus:GameStatus
    nextChess:ChessType.red | ChessType.black
}
export default class GameComp extends Component<{},IState> {
  
    // 整个棋盘游戏， 提供数据，并控制游戏输赢
    // GameStatus = {
    //     gameing: '游戏中',
    //     redWin: '红方胜利',
    //     blackWin: '黑方胜利',
    //     equal: '平局'
    // }

    state:IState = {
        gameStatus: GameStatus.gameing,
        chesses: [],
        nextChess: ChessType.black
    }
    // 初始化数据
    init() {
        const arr:ChessType[] = []
        for (let i = 0; i < 9; i++) {
            arr.push(ChessType.none);
        }
        this.setState({
            chesses: arr,
            gameStatus: GameStatus.gameing,
            nextChess: ChessType.black
        })
    }
    // 初始化数据
    componentDidMount() {
        this.init()
    }
    // 鼠标点击时, 改变其他的棋子布局
    handleChessClick(i:number) {
        const chesses:ChessType[] = [...this.state.chesses]
        chesses[i] = this.state.nextChess // 改变被点击的棋盘中的棋子,
        this.setState(prevState => ({ // 重新给棋盘赋值
            chesses: chesses,
            nextChess: prevState.nextChess === ChessType.red ? ChessType.black : ChessType.red,
            gameStatus: this.getStatus(chesses, i)
        }))
        setTimeout(() => {
            console.log(this.state, 'state') // 异步调用拿到当前状态
        }) // this.setState 是异步设置状态的
    }

    // 书写游戏规则，判断游戏输赢
    /**
     * 
     * @param chesses 棋盘的状态
     * @param index  被点击棋子的索引，从零开始
     */
    getStatus(chesses:ChessType[], index:number):GameStatus {
        // 1. 判断是否有一方获得胜利
        const horMin = Math.floor(index / 3) * 3
        const verMin = index % 3
        if ((chesses[horMin] === chesses[horMin + 1] && chesses[horMin] === chesses[horMin + 2])
            || 
            (chesses[verMin] === chesses[verMin + 3] && chesses[verMin] === chesses[verMin + 6])
            ||
            (chesses[0] === chesses[4] && chesses[0] === chesses[8] && chesses[0] !== ChessType.none) // 注意边界判断
            ||
            (chesses[2] === chesses[4] && chesses[2] === chesses[6] && chesses[2] !== ChessType.none)) {
                // 游戏结束时，最后一个落子的赢， 应该阻止点击
                if (chesses[index] === ChessType.red) {
                    return GameStatus.redWin
                } else {
                    return GameStatus.blackWin
                }
            }
            // 判断是否平局
            if (!chesses.includes(ChessType.none)) {
                return GameStatus.equal
            }
            // 游戏正在运行中
            return GameStatus.gameing
    }
    render() {
        return (
            <div style={{textAlign:"center"}}>
                <GameStatusComp 
                    isGameOver={this.state.gameStatus}
                    next={this.state.nextChess}
                />
                <BoardComp 
                Chesses={this.state.chesses}
                isGameOver={this.state.gameStatus !== GameStatus.gameing}
                onClick={this.handleChessClick.bind(this)}
                />
                <button onClick={() => {
                    this.init()
                }}>重新开始</button>
            </div>
        )
    }
}
