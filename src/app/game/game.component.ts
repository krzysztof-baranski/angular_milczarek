import { Component, OnInit } from '@angular/core';

interface Ship {
    x: number,
    y: number,
    width: number,
    height: number
}

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

    canvas;
    context;
    ship: Ship;
    ball;
    blocks;
    blocksGenerated = false;
    ballInterval;
    actualScore = 0;
    oponentBall;
    intervals = [];
    isGameOver: boolean;

    constructor() { }

    ngOnInit() {
        this.blocks = [];
        this.canvas = <HTMLCanvasElement>document.getElementById('canvas');
        this.context = this.canvas.getContext('2d');


        //clear background
        this.context.fillStyle = "grey";
        this.context.strokeRect(300, 250, 200, 100);
        // draw font in red
        this.context.fillStyle = "red";
        this.context.font = "20pt sans-serif";
        this.context.fillText("Play!", this.canvas.width / 2 - 30, this.canvas.height / 2);
        this.canvas.addEventListener('click', this.startGame);
        this.canvas.addEventListener('keydown', (e) => this.keyDown(e));

        this.ship = {
            x: 380,
            y: 500,
            width: 40,
            height: 30
        };

        this.ball = {
            x: this.ship.x + this.ship.width / 2,
            y: this.ship.y + this.ship.height / 2,
            r: 5
        };

    }

    generateBlocks() {
        let block = {
            x: 10,
            y: 20,
            width: 50,
            height: 30
        };
        let rows = 5;
        let cols = 10;

        const margin = 10;

        this.blocks = [];

        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                this.blocks.push({ ...block });
                block.y = block.y + margin + block.height;
            }
            block.y = 20;
            block.x = block.x + margin + block.width;

        }

        this.drawBlocks();
        this.blocksGenerated = true;
        console.log(this.blocks);
    }

    drawBlocks() {
        this.context.fillStyle = "red";

        for (let b of this.blocks) {
            this.context.fillRect(b.x, b.y, b.width, b.height);
        }
    }

    startGame = () => {
        this.draw();
        this.drawBlocks();
        this.drawScore(0);
        this.oponentFireStart();

        this.canvas.removeEventListener('click', this.startGame);
    }

    checkIfDead(/* e: MouseEvent */) {
        // console.log(e);
        let index = 0;
        for (let b of this.blocks) {
            if ((this.ball.x > b.x && this.ball.x < (b.x + b.width)) &&
                (this.ball.y < b.y + b.height && this.ball.y > b.y)) {
                this.blocks.splice(index, 1);
                this.actualScore++;
                console.log('Cl', index, this.blocks.length);
                if (!this.blocks.length) {
                    this.gameOver(true);
                }
                return index;
            }
            index++;
        }
        return -1;
    }

    oponentFireStart() {
        this.intervals.push(setInterval(() => {
            let blockIndex = Math.floor(Math.random() * this.blocks.length);
            let block = this.blocks[blockIndex];

            if (!block) {
                return;
            }

            this.oponentBall = {
                x: block.x + (block.width / 2),
                y: block.y + (block.height / 2)
            };

            this.drawBall(block);
            this.drawOponentBallMovement(block);

            // console.log(blockIndex, ' ', block);
        }, 1000));
    }

    drawOponentBallMovement(oponent) {
        let interval = setInterval(() => {
            this.clear();
            this.draw();
            this.drawBall(oponent);
            this.oponentBall.y += 5;

            if (this.oponentBall.y > 600) {
                clearInterval(interval);
            }
            if (this.oponentBall.y > this.ship.y && this.checkContact()) {
                this.gameOver(false);
                clearInterval(interval);
            }
            // console.log(this.oponentBall.y, this.ship.y);
        }, 10);
        this.intervals.push(interval);
    }

    checkContact() {
        if ((this.oponentBall.x < this.ship.x || this.oponentBall.x > this.ship.x + this.ship.width)
            && (this.oponentBall.y > this.ship.y)) {
            console.log('NOT DEAD!!!');
            return false;
        } else {
            console.log('DEAD!!!');
            return true;
        }
    }

    gameOver(isWinner: boolean) {
        this.clear();
        this.context.fillStyle = "red";
        this.context.font = "20pt sans-serif";
        if (isWinner) {
            this.context.fillText("Winner!", this.canvas.width / 2 - 40, this.canvas.height / 2);
        } else {
            this.context.fillText("Game Over!", this.canvas.width / 2 - 50, this.canvas.height / 2);
        }

        for (let i of this.intervals) {
            clearInterval(i);
        }
        this.isGameOver = true;
    }

    fire() {
        this.setBall(); // zeby nie zawieszało intevala
        this.drawBallMovement();
    }

    drawBallMovement() {
        this.ballInterval = setInterval(() => {
            this.clear();
            this.draw();
            // this.drawBall(null);
            this.ball.y -= 5;
            let dead = this.checkIfDead();
            if ((dead > -1 || this.checkBallOutsideBox()) && !this.isGameOver) {
                this.setBall();
            }
        }, 1);
        this.intervals.push(this.ballInterval);
    }

    checkBallOutsideBox() {
        return this.ball.y < 0;
    }

    setBall() {
        this.ball = {
            x: this.ship.x + this.ship.width / 2,
            y: this.ship.y + this.ship.height / 2,
            r: 5
        };
        clearInterval(this.ballInterval);
        this.clear();
        this.draw();
    }

    drawBall(oponent) {
        this.context.fillStyle = "orange";
        this.context.beginPath();
        if (oponent) {
            // console.log(this.oponentBall);
            this.context.arc(this.oponentBall.x, this.oponentBall.y, this.ball.r, 0, 2 * Math.PI);
        } else {
            this.context.arc(this.ball.x, this.ball.y, this.ball.r, 0, 2 * Math.PI);
        }
        this.context.fill();
        this.context.closePath();
    }

    drawScore(score) {
        this.context.fillStyle = "black";
        this.context.font = "40pt sans-serif";
        this.context.fillText(score, 700, 70);
    }

    keyDown = (e) => {
        if (this.isGameOver) {
            this.isGameOver = false;
            this.blocksGenerated = false;
            this.startGame();
            
            return;
        }
        console.log(e.keyCode);
        if (e.keyCode === 32) {
            this.fire();
        }
        // 37 left, 39 right
        if (e.keyCode === 37) {
            this.moveLeft()
        }
        if (e.keyCode === 39) {
            this.moveRight();
        }
    }

    moveLeft() {
        this.ship.x -= 5;
        this.draw();
        this.setBall();
    }

    moveRight() {
        this.ship.x += 5;
        this.draw();
        this.setBall();
    }

    draw() {
        this.clear();
        this.context.fillStyle = "grey";
        this.context.fillRect(this.ship.x, this.ship.y, this.ship.width, this.ship.height);

        if (!this.blocksGenerated) {
            this.generateBlocks();
        }
        this.drawBlocks();
        this.drawBall(null);
        this.drawScore(this.actualScore);
    }

    clear() {
        this.context.fillStyle = '#FFFFFF';
        this.context.fillRect(0, 0, 800, 600);
    }
}
