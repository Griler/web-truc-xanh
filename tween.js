export class Tween {
    flip(oj, color, dr) {
        const duration = dr;
        gsap.to(oj, {
            scaleX: 0, duration,
            onComplete: () =>
                oj.style.background = `${color}`,
        });
        gsap.to(oj, {
            scaleX: 1, delay: duration, onComplete: () =>
                oj.style.background = `${color}`,
        });
    }

    dealerCard(positionTop, positionLeft, cardArr) {
        let top = [...positionTop]
        console.log(top)
        //let value;
        let left = [...positionLeft]
        TweenMax.staggerTo('.tile',1, {
            rotation: 360,
            x: function (idx) {
                for (idx; idx < top.length; idx++)
                   //let value = top[idx] - 100
                    return top[idx]- 200
            },
            y: function (idy) {
                for (idy; idy < left.length; idy++)
                    return left[idy]-300;
            }
        },0.1);
    }
}
