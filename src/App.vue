<template>
    <div id="app">
        <div class="site-wrap">
            <div class="points-wrap">
                <div class="points points__left">
                    {{ pointsLeft.toString().padStart(2, "0") }}
                </div>
                <div class="points-divider" />
                <div class="points points__right">
                    {{ pointsRight.toString().padStart(2, "0") }}
                </div>
            </div>
            <div id="round-timer">
                {{ timerInstance.toFormat("mm:ss") }}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import airhornAudioClipFile from "@/assets/airhorn.wav";
import { Duration } from "luxon";

document.title = "Scoreboard";

enum Team {
    LEFT = 1,
    RIGHT = 2,
}

const keyToTimerDictionary: any = {
    "1": 5,
    "2": 10,
    "3": 15,
    "4": 20,
    "5": 30,
    "6": 40,
    "7": 50,
    "8": 60,
};

export default defineComponent({
    data: () => ({
        pointsLeft: 0 as number,
        pointsRight: 0 as number,
        timerInstance: Duration.fromObject({ minutes: 15 }),
        timerInterval: null as any,
        isTimerRunning: false as boolean,
        keyToTimerDictionary,
        airhornAudioClip: new Audio(airhornAudioClipFile),
        keyAlreadyHeldDown: false,
        canPointsBeChanged: true,
    }),
    mounted() {
        document.addEventListener("keydown", (event) => {
            if (
                !this.canPointsBeChanged &&
                (event.key == "q" || event.key == "e")
            ) {
                return;
            }
            if (this.keyAlreadyHeldDown) {
                return;
            }
            this.keyAlreadyHeldDown = true;

            // Delay for double clicking buttons
            this.canPointsBeChanged = false;
            setTimeout(() => {
                this.canPointsBeChanged = true;
            }, 1000);

            // transform the above to switch case
            switch (event.key) {
                // Stop clock
                case " ":
                    this.toggleTimer();
                    break;
                // LEFT TEAM
                case "q":
                    this.changePoints(1, Team.LEFT);
                    break;
                case "a":
                    this.changePoints(-1, Team.LEFT);
                    break;
                // RIGHT TEAM
                case "e":
                    this.changePoints(1, Team.RIGHT);
                    break;
                case "d":
                    this.changePoints(-1, Team.RIGHT);
                    break;
            }

            if (Object.keys(this.keyToTimerDictionary).includes(event.key)) {
                this.timerInstance = Duration.fromObject({
                    minutes: this.keyToTimerDictionary[event.key],
                });
            }
        });
        document.addEventListener("keyup", () => {
            this.keyAlreadyHeldDown = false;
        });
    },
    methods: {
        changePoints(pointsAmount: number, team: Team): void {
            switch (team) {
                case Team.LEFT:
                    this.pointsLeft += pointsAmount;
                    if (this.pointsLeft < 0) {
                        this.pointsLeft = 0;
                    }
                    break;
                case Team.RIGHT:
                    this.pointsRight += pointsAmount;
                    if (this.pointsRight < 0) {
                        this.pointsRight = 0;
                    }
                    break;
                default:
                    Error("Invalid team string. Must be left or right");
                    break;
            }
        },
        startTimer(): void {
            this.timerInterval = setInterval(() => {
                this.timerInstance.minus(
                    Duration.fromObject({ milliseconds: 100 })
                );
                if (this.timerInstance.as("milliseconds") <= 0) {
                    this.pauseTimer();

                    this.airhornAudioClip.play();
                }
            }, 100);
        },
        pauseTimer(): void {
            clearInterval(this.timerInterval);
        },
        toggleTimer(): void {
            console.debug("Toggling timer");
            if (this.isTimerRunning) {
                this.pauseTimer();
            } else if (this.timerInstance.as("milliseconds") > 0) {
                this.startTimer();
            }
            this.isTimerRunning = !this.isTimerRunning;
        },
    },
});
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100%;
    padding: 0;
    margin: 0;
}

/* Fonts */
@font-face {
    font-family: SevenSegment;
    src: url(assets/fonts/Segment7Standard.otf);
}

body,
html {
    height: 100%;
    margin: 0;
    padding: 0;
}

.site-wrap {
    width: 100%;
    height: 100%;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
}

.points-wrap {
    display: flex;
    justify-content: space-around;
    width: 100%;
}

.points-divider {
    border-left: 10px solid black;
}

/* Points */
.points {
    font-size: 50vh;
    font-family: SevenSegment;
    width: 50%;
    text-align: center;
}

.points__left {
    color: red;
}

.points__right {
    color: black;
}

/* Timer */
#round-timer {
    font-size: 23vh;
    font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
        "Lucida Sans", Arial, sans-serif;
    text-align: center;
}
</style>
