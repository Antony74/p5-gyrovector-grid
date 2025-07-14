import 'p5';
import { GyrovectorSpaceFactory } from 'gyrovector';

const p = window;

const lineMap = (value, start1, end1, start2, end2) => {
    return start2.add(end2.mult(p.map(value, start1, end1, 0, 1)));
};

const drawLine = (start, line) => {
    const segments = 100;
    p.beginShape();
    for (let n = 0; n <= segments; ++n) {
        const v = lineMap(n, 0, segments, start, line);
        p.vertex(v.x, v.y);
    }
    p.endShape();
};

p.setup = () => {
    p.createCanvas(500, 500);
    p.textAlign(p.CENTER);
    p.noFill();

    p.translate(0.5 * p.width, 0.5 * p.height);

    //const curvature = -1 / (p.width * p.height);
    // const curvature = 0;
    const curvature = 1 / (p.width * p.height);

    const space = GyrovectorSpaceFactory.create(2, curvature);

    const origin = space.createVector(0, 0);
    const u = space.createVector(40, 0);
    const v = u.rotate(p.HALF_PI);

    const count = 5;

    for (let x = -count; x <= count; x++) {
        drawLine(u.mult(x), v.mult(-count));
        drawLine(u.mult(x), v.mult(count));
        drawLine(v.mult(x), u.mult(-count));
        drawLine(v.mult(x), u.mult(count));
    }

    p.textSize(50);
    p.noStroke();
    p.fill(0);

    p.text(
        curvature > 0
            ? 'Spherical'
            : curvature < 0
              ? 'Hyperbolic'
              : 'Euclidean',
        0,
        (p.height / 2) - 10,
    );
};
