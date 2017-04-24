import React from 'react';

const BALL_RADIUS = 5;

class Ball extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
             x: props.coordinates.x,
             y: props.coordinates.y,
             vector: {
                    x: 1,
                    y: 1,
                    rad: this.changeDirection({x: 3, y: 0}, Math.random()*Math.PI*2)
             },
            speedRate : 1
        }

    }

    componentWillReceiveProps(nextProps){
        this.setState({
            x: nextProps.coordinates.x,
            y: nextProps.coordinates.y
        })
    }

    componentDidMount(){
         this.stopTimer = setInterval(() => {
             console.log(this.props);
             if(this.props.faced){
                 this.calculateVector();
             }
             this.props.onBallMoving(
                 this.state.x + this.state.vector.x,
                 this.state.y + this.state.vector.y
             )
         }, 1000/60);
    }

    componentWillUnmount(){
        clearInterval(this.stopTimer);
    }

    changeDirection({ x, y }, rad) {
        let cos = Math.cos(rad);
        let sin = Math.sin(rad);
        return {x: x * cos - y * sin, y: y * cos + x * sin}
    }

    calculateVector() {
        if (this.props.gameStatus === "IN_PROCESS") {
            if (this.props.faced) {
                //collision with right border
                if((this.props.coordinates.x + BALL_RADIUS) > this.props.board.width ) {
                    console.log('right');
                    this.setState({
                        ...this.state,
                        vector: {
                            x: - this.state.vector.x
                        }
                    });
                    this.props.onBallMoving(this.props.board.width - BALL_RADIUS, this.state.y)
                }

                //collision with left border
                else if((this.state.x - BALL_RADIUS) < 0) {
                    this.setState({
                        ...this.state,
                        x: BALL_RADIUS,
                        vector: {
                            x: - this.state.vector.x
                        }
                    });
                    this.props.onBallMoving(BALL_RADIUS, this.state.y)
                }
                //collision with top border
                else if((this.state.y + BALL_RADIUS) > this.props.board.height ) {
                    this.setState({
                        ...this.state,
                        vector: {
                            y: - this.state.vector.y
                        }
                    });
                    this.props.onBallMoving(this.state.x, this.props.board.height - BALL_RADIUS)
                }

                //collision with bottom border
                else if((this.state.y - BALL_RADIUS) < 0) {
                    this.setState({
                        ...this.state,
                        vector: {
                            y: - this.state.vector.y
                        }
                    });
                    this.props.onBallMoving(this.state.x, BALL_RADIUS)
                }
                this.props.onBallMoving({x: this.state.x, y: this.state.y})
            } else {
               this.props.onBallMoving({x: this.state.x + this.state.vector.x, y: this.state.y + this.state.vector.y})
            }
        } else {
            this.setState({
                ...this.state,
                ball: {
                    x: -10,
                    y: -10
                }
            })
        }
    }

    // physics(){
    //     if(this.props.status.IN_PROCESS){
    //         this.setState({
    //             ball: {
    //                 ...this.state.ball,
    //                 x: this.state.ball.x + this.state.ball.v.x * this.speedRate,
    //                 y: this.state.ball.y + this.state.ball.v.y * this.speedRate,
    //                 v: {
    //                     x: this.state.ball.v.x * 1.001,
    //                     y: this.state.ball.v.y * 1.001
    //                 }
    //             },
    //             paddle: {
    //                 ...this.state.paddle,
    //                 x: Math.max(Math.min(this.mousePos.x-this.state.paddle.w/2, 800 - this.state.paddle.w),0)
    //             }
    //         });
    //
    //         if(
    //             // ball is going down
    //         this.state.ball.v.y > 0
    //         // collides with paddle
    //         && intersectRect(this.state.ball, this.state.paddle)
    //         ){
    //             this.setState({
    //                 ball: {
    //                     ...this.state.ball,
    //                     y: this.state.paddle.y - this.state.ball.h,
    //                     v: {
    //                         x: this.state.ball.v.x,
    //                         y: -this.state.ball.v.y
    //                     }
    //                 },
    //             })
    //         }
    //
    //         let block;
    //         if(block = this.state.blocks.find(block => intersectRect(this.state.ball, block))){
    //             this.setState({
    //                 blocks: this.state.blocks.filter(b => b !== block),
    //                 ball: {
    //                     ...this.state.ball,
    //                     v: Vector2rotate(this.state.ball.v, Math.random()*Math.PI*2)
    //                 },
    //             });
    //
    //             if(this.state.blocks.length == 0){
    //                 this.setState({
    //                     // you win, try again
    //                     sandsOfTime: true
    //                 })
    //             }
    //         }
    //
    //         if(this.state.ball.y + this.state.ball.h > 500){
    //             this.speedRate = 0;
    //
    //             this.setState({
    //                 // you lost, try again
    //                 sandsOfTime: true,
    //                 ball: {
    //                     ...this.state.ball,
    //                     y: 500 - this.state.ball.h,
    //                 }
    //             })
    //         }
    //
    //         if(
    //             // ball is going up
    //         this.state.ball.v.y < 0
    //         // collides with upper border
    //         && this.state.ball.y < 0
    //         ){
    //             this.setState({
    //                 ball: {
    //                     ...this.state.ball,
    //                     y: ( this.state.ball.y < 0 ? 0 : 500 - this.state.ball.h),
    //                     v: {
    //                         ...this.state.ball.v,
    //                         y: -this.state.ball.v.y
    //                     }
    //                 },
    //             })
    //         }
    //
    //         if(
    //             (
    //                 // ball is going left
    //                 this.state.ball.v.x < 0
    //                 // collides with left border
    //                 && this.state.ball.x < 0
    //             )
    //             || (
    //                 // ball is going right
    //                 this.state.ball.v.x > 0
    //                 // collides with right border
    //                 && this.state.ball.x + this.state.ball.w > 800
    //             )
    //         ){
    //             this.setState({
    //                 ball: {
    //                     ...this.state.ball,
    //                     x: (this.state.ball.x < 0 ? 0 : 800 - this.state.ball.w),
    //                     v: {
    //                         ...this.state.ball.v,
    //                         x: -this.state.ball.v.x
    //                     }
    //                 },
    //             })
    //         }
    //     }
    // }


    render() {
        let style = {
            top: `${this.props.coordinates.x}px`,
            left: `${this.props.coordinates.y}px`,
            position: 'absolute'
        };


        return (
            <div id="ball" style={style} />
        );
    }

}

export default Ball;
