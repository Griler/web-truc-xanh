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
    zoomOut(oj1, oj2) {
        const duration = 1;
        gsap.to(oj1, {
            scaleX: 1.2, scaleY: 1.2, duration,
            onComplete: () =>
                (oj1.remove())
        });
        gsap.to(oj2, {
            scaleX: 1.2, scaleY: 1.2, duration,
            onComplete: () =>
                (oj2.remove())
        });
    }

    dealerCard(positionTop, positionLeft, cardArr) {
        let top = [...positionTop]
        console.log(top)
        //let value;
        let left = [...positionLeft]
        TweenMax.staggerTo('.tile', 1, {
            rotation: 360,
            x: function (idx) {
                for (idx; idx < top.length; idx++)
                    //let value = top[idx] - 100
                    return 350- left[idx]
            },
            y: function (idy) {
                for (idy; idy < left.length; idy++)
                    return 250 - top[idy] ;
            }
        }, 0.1);
    }
}
