export class Tween {
    flip(oj, color, dr) {
        const duration = dr;
        gsap.to(oj, {
            scaleX: 0, duration,
            onComplete: () => {
                oj.style.background = `url(${color})`;
                oj.style.backgroundSize = "cover";
            }
        });
        gsap.to(oj, {
            scaleX: 1, delay: duration,
            onComplete: () => {
                oj.style.background = `url(${color})`;
                oj.style.backgroundSize = "cover";
            }
        });
    }

    zoomOut(oj1, oj2, dr) {
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
    dealerCard(positionTop, positionLeft) {
        let top = [...positionTop]
        let left = [...positionLeft]
        console.log(top)
        gsap.to('.tile', {
            rotation: 360,duration: 0.5,
            x: function (idx) {
                for (idx; idx < top.length; idx++)
                    //let value = top[idx] - 100
                    return 350 - left[idx]
            },
            y: function (idy) {
                for (idy; idy < left.length; idy++)
                    return 250 - top[idy];
            },stagger: 0.1, onComplete: function () {
            }
        })
    }

    rotationCoin(){
        var images = new Array()

        setInterval("Animate()", 400);
        var x = 0;

        function Animate() {
            document.getElementById("img").src = images[x]
            x++;
            if (images.length == x) {
                x = 0;
            }
        }
    }
}
