class Wave
{
    constructor(sizeX, sizeZ) {

        this.canvas = document.querySelector('canvas');
        this.engine = this.canvas.getContext('2d');

        this.width  = window.innerWidth;
        this.height = window.innerHeight;

        this.midX = this.width / 2;
        this.midY = this.height / 2;

        this.canvas.setAttribute('width', this.width);
        this.canvas.setAttribute('height', this.height);

        this.count = 50;
        this.steps = 50;
        this.tick  = 0;

        this.initData();

    }

    initData() {

        this.data = [];

        let sRel, sMax, r;
        for (let s = 0; s < this.steps; s++) {

            sRel = s / this.steps;
            sMax = sRel * this.count;

            for (let i = 0; i < sMax; i++) {

                r = (Math.random() - 0.5) * i / sMax / 10;

                this.data.push({
                    x : Math.cos(r + i / sMax * Math.PI * 2) * sRel,
                    y : Math.sin(r + i / sMax * Math.PI * 2) * sRel,
                    d : sRel
                });

            }

        }

        console.log(this.data);

    }

    clear() {
        this.engine.clearRect(0, 0, this.width, this.height);
    }

    render() {

        this.clear();
        this.tick--;

        this.data.forEach((point) => {

            // const h  = Math.sin(this.tick * 0.1 + point.d * (Math.sin(this.tick * 0.05) + 1) * 2);
            const h  = Math.sin(this.tick * 0.1 + point.d * 7.5);
            const hl = Math.sin(this.tick * 0.12 + point.d * 7.5);
            const hs = h * this.height * 0.1;
            const s  = 0.5 + (point.y + 1) * 2;

            this.engine.fillStyle = `hsla(${180 + hl * 180 | 0}, 70%, ${25 + (h * -1) * 25 | 0}%, ${0.5 + (h *-1) * 0.5})`;

            // this.engine.fillRect(
            //     this.midX + point.x * this.width * 0.3,
            //     this.midY + point.y * this.width * 0.1 + hs,
            //     3 * s,
            //     3 * s
            // );

            this.engine.beginPath();
            this.engine.arc(
                this.midX + point.x * this.width * 0.3,
                this.midY + point.y * this.width * 0.1 + hs,
                1.5 * s,
                0,
                Math.PI * 2
            );
            this.engine.fill();
            this.engine.closePath();


        });

        window.requestAnimationFrame(this.render.bind(this));

    }

    run() {

        this.render();

    }
}

const a = new Wave();
a.run();