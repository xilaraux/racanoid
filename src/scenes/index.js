import React, { Component } from "react";
import Ball from "./components/Ball/ball";
import Panel from "./components/Panel/panel";
import Controller from "./components/Controller/controler";

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            status: "IN_PROCESS",
            ball: {
                x: props.width / 2, // 2 for placed it at the middle
                y: props.height - 20, // 20 is Panel height
                faced: false
            },
            controller: {
                x: props.width / 2 - 35, // 35 is width's half of the controller
                y: props.height // place it at the bottom
            }
        };
    }

    isBallFacedSomething(x, y) {
        const { controller } = this.state;

        // 35 because of width of the controller
        if(x >= controller.x && x <= controller.x + 35 && y >= controller.y) {
            return true;
        }
    }

    onBallMoving = (x, y) => {
        this.setState({
            ball: {
                x,
                y,
                faced: this.isBallFacedSomething(x, y)
            }
        });
    };

    onControllUser = event => {
        let tempX;
        const { keyCode } = event;
        const { controller: { x } } = this.state;

        if(keyCode === 97) {
            tempX = x - 5;
        } else if( keyCode === 100) {
            tempX = x + 5;
        }

        if(tempX) {
            this.setState(prevState => ({
                controller: {
                    ...prevState.controller,
                    x: tempX
                }
            }));
        }
    };

    componentDidMount() {
        window.addEventListener("keypress", this.onControllUser);
    }

    componentWillUnmount() {
        window.removeEventListener("keypress", this.onControllUser);
    }

    render() {
        const {
            ball,
            status,
            controller
        } = this.state;

        const {
            width,
            height
        } = this.props;

        return (
            <div id="field">
                <Ball
                    faced={ball.faced}
                    gameStatus={status}
                    board={{ width, height }}
                    onBallMoving={this.onBallMoving}
                />
                <Panel>
                    <Controller shift={controller.x} />
                </Panel>
            </div>
        )
    }
}
