import { useEffect } from "react"
import Colors from "../Colors"
import { createPopper } from '@popperjs/core';

export interface LanguageObject {
    language: string;
    fluency: string;
}

export function isLanguageObject(object: any): object is LanguageObject {
    return Object.prototype.hasOwnProperty.call(object, "language");
}

export interface SkillObject {
    name: string;
    level: string;
    keywords: never[];
}

export function isSkillObject(object: any): object is SkillObject {
    return Object.prototype.hasOwnProperty.call(object, "name");
}

function Network(prop: { skills: (SkillObject | LanguageObject)[] }) {
    let colors = new Colors().colors
    useEffect(() => {
        let WIDTH = document.getElementById("Skills/Languages")!.offsetWidth;
        let HEIGHT = 500;
        let LINK_COLOR = colors['--light'];
        let SQUARE_COLOR = colors['--red'];
        let TEXT_COLOR = colors['--light'];
        const SPEED = 1;
        const SQUARE_AMOUNT = prop.skills.length;
        const LINK_RADIUS = document.getElementById("Skills/Languages")!.offsetWidth / 5;
        let mouse: { x: number, y: number } = { x: 0, y: 0 };

        let canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, squares: Array<Circle> = [], loopId, id;

        const init = () => {
            canvas = document.querySelector('canvas')!;
            ctx = canvas.getContext('2d')!;

            resizeReset();
            initElements();
            animationLoop();
        }

        window.addEventListener('mousemove', (e) => {
            const rect = document.querySelector('canvas')!.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        });

        const resizeReset = () => {
            canvas.width = WIDTH;
            canvas.height = HEIGHT;
        }

        const initElements = () => {
            squares = []
            let x = 150;
            let y = 40;
            let size_x = 0;
            let object;
            let name: string = "";
            for (let i = 0; i < SQUARE_AMOUNT; i++) {
                ctx.font = "25px system-ui"
                object = prop.skills[i]
                if (isSkillObject(object)) {
                    size_x = ctx.measureText(object.name).width + 20;
                    name = object.name
                } else {
                    size_x = ctx.measureText(object.language).width + 20;
                    name = object.language
                }
                if (i !== 0) {
                    x = squares[i - 1].x + squares[i - 1].size_x / 2 + size_x / 2 + 40;
                    if (x + size_x / 2 >= canvas.width) {
                        x = size_x / 2 + 40;
                        if (canvas.width < 800)
                            y += canvas.height / 8;
                        if (canvas.width > 800)
                            y += canvas.height / 7;
                        if (canvas.width > 1200)
                            y += canvas.height / 5;
                        if (canvas.width > 1600)
                            y += canvas.height / 3;
                    }
                }
                squares.push(new Circle(object, x, y, size_x, name))
            }
        }

        const animationLoop = () => {
            requestAnimationFrame(animationLoop);
            ctx.clearRect(0, 0, WIDTH, HEIGHT);
            drawLine();
            for (let i = 0; i < squares.length; i++)
                squares[i].update();
        }

        const drawLine = () => {
            for (let i = 0; i < squares.length; i++) {
                linkPoints(squares[i], squares);
            }
        }

        function checkDistance(x1: number, y1: number, x2: number, y2: number) {
            return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        }

        function linkPoints(point: Circle, hubs: Array<Circle>) {
            for (let i = 0; i < hubs.length; i++) {
                let distance = checkDistance(point.x, point.y, hubs[i].x, hubs[i].y)
                const opacity = 1 - distance / LINK_RADIUS;
                if (opacity > 0) {
                    ctx.lineWidth = 0.5;
                    ctx.strokeStyle = LINK_COLOR;
                    ctx.beginPath();
                    ctx.moveTo(point.x, point.y);
                    ctx.lineTo(hubs[i].x, hubs[i].y)
                    ctx.closePath();
                    ctx.stroke();
                }
            }
        }

        class Circle {
            name = "";
            size_x = 0;
            size_y = 0;
            x = 0;
            y = 0;
            color = SQUARE_COLOR;
            speed = SPEED * Math.random() * SPEED;
            directionAngle = Math.floor(Math.random() * 360);
            vector = {
                y: Math.sin(this.directionAngle) * this.speed,
                x: Math.cos(this.directionAngle) * this.speed,
            };
            d: { t: number, b: number, l: number, r: number } = { t: 0, b: 0, l: 0, r: 0 };
            de: { t: number, b: number, l: number, r: number } = { t: 0, b: 0, l: 0, r: 0 };
            hover = false
            level = ""
            fluency = ""
            inrect_x = false;
            inrect_y = false;

            constructor(object: SkillObject | LanguageObject, x: number, y: number, size_x: number, name: string) {
                this.x = x
                this.y = y
                this.size_x = size_x
                this.size_y = 40
                this.name = name
                if (isSkillObject(object) && object.level != "")
                    this.level = "Level: " + object.level
                if (isLanguageObject(object) && object.fluency != "")
                    this.fluency += "Fluency: " + object.fluency
            }

            update = () => {
                this.draw();
                this.d = {
                    t: this.y - this.size_y / 2, b: this.y + this.size_y / 2,
                    l: this.d.l = this.x - this.size_x / 2, r: this.d.r = this.x + this.size_x / 2
                };
                if (this.d.r >= WIDTH || this.d.l <= 0)
                    this.vector.x *= -1;
                if (this.d.b >= HEIGHT || this.d.t <= 0)
                    this.vector.y *= -1;
                if (this.d.r >= WIDTH) this.x = WIDTH - this.size_x / 2;
                if (this.d.b >= HEIGHT) this.y = HEIGHT - this.size_y / 2;
                if (this.d.l <= 0) this.x = this.size_x / 2;
                if (this.d.t <= 0) this.y = this.size_y / 2;
                for (let i = 0; i < squares.length; i++) {
                    this.de = {
                        t: squares[i].y - squares[i].size_y / 2, b: squares[i].y - squares[i].size_y / 2,
                        l: squares[i].x - squares[i].size_x / 2, r: squares[i].x + squares[i].size_x / 2
                    }
                    if (this.name != squares[i].name && this.d.r > this.de.l && this.d.l < this.de.r && this.d.b > this.de.t && this.d.t < this.de.b) {
                        if (this.inrect_x == false && this.d.r >= this.de.l || this.d.l <= this.de.r) {
                            this.inrect_x = true;
                            this.vector.x *= -1
                            squares[i].vector.x *= -1;
                        }
                        if (this.inrect_y == false && this.d.b >= this.de.t || this.d.t <= this.de.b) {
                            this.inrect_y = true;
                            this.vector.y *= -1;
                            squares[i].vector.y *= -1;
                        }
                    } else {
                        this.inrect_x = false
                        this.inrect_y = false
                    }
                }
                if (mouse.x >= this.d.l - 15 && mouse.x <= this.d.r - 15 && mouse.y >= this.d.t && mouse.y <= this.d.b) {
                    this.x += 0;
                    this.y += 0;
                    this.hover = true
                    popperInstance.update();
                    document.querySelector('#tooltip')!.classList.remove("hidden")
                    if (this.level != "")
                        document.querySelector('#tooltip')!.innerHTML = this.level
                    if (this.fluency != "")
                        document.querySelector('#tooltip')!.innerHTML = this.fluency
                } else {
                    this.x += this.vector.x;
                    this.y += this.vector.y;
                    this.hover = false
                    if (!squares.find(elem => elem.hover == true)?.hover) {
                        document.querySelector('#tooltip')!.classList.add("hidden")
                        document.querySelector('#tooltip')!.innerHTML = ""
                    }
                }
            }

            draw = () => {
                ctx.beginPath();
                ctx.font = "25px system-ui"
                ctx.fillStyle = SQUARE_COLOR;
                ctx.fillRect(this.x - this.size_x / 2, this.y - this.size_y / 2, this.size_x, this.size_y);
                ctx.fillStyle = TEXT_COLOR;
                ctx.fillText(this.name, this.x - this.size_x / 2 + 10, this.y + 10);
                ctx.closePath();
                ctx.fill();
            }
        }

        let popperInstance : any;
        (() => {
            const test = document.querySelector('canvas');
            const tooltip = document.querySelector('#tooltip');
            popperInstance = createPopper(test as HTMLElement, tooltip as HTMLElement, {
            placement: 'top',
            modifiers: [
                {
                    name: 'offset',
                    options: {
                        offset: [0, 8],
                    },
                },
            ],
        });
            window.addEventListener('resize', function () {
                canvas.width = document.getElementById("Skills/Languages")!.offsetWidth;
                canvas.height = 500;
                resizeReset()
            });
            init()
        })()

        window.addEventListener('scroll', () => {
            if (parseInt(document.getElementById("scroll-progress")!.style.height) < parseFloat('100')) {
                LINK_COLOR = colors['--light']
            }
            if (parseInt(document.getElementById("scroll-progress")!.style.height) >= parseInt('100')) {
                LINK_COLOR = colors['--orange']
            }
        });
    })

    return <div className="border-light border-8 border-solid transition-colors" style={{ "borderRadius": "15px" }} id="Skills/Languages">
        <canvas className="max-w-full w-full transition-all"></canvas>
        <div className="hidden bg-light px-2" id="tooltip" role="tooltip" style={{borderRadius: 5}}>
            <div id="arrow" data-popper-arrow></div>
        </div>
    </div>
}

export default Network