<template>
    <div class="site-wrap">
        <div class="points-wrap">
            <div class="points points__left">
                {{ paddedPointsString(pointsLeft) }}
            </div>
            <div class="points-divider" />
            <div class="points points__right">
                {{ paddedPointsString(pointsRight) }}
            </div>
        </div>
        <CountdownTimer />
    </div>
</template>

<script setup lang="ts">
// Components
import CountdownTimer from "@/components/CountdownTimer.vue";
import { onMounted, ref } from "vue";

import { useTitle } from "@vueuse/core";

useTitle("Scoreboard");

enum Team {
    LEFT = 1,
    RIGHT = 2,
}

const pointsLeft = ref(0);
const pointsRight = ref(0);

let keyAlreadyHeldDown = false;
let canPointsBeChanged = true;

onMounted(() => {
    document.addEventListener("keydown", (event) => {
        if (!canPointsBeChanged && (event.key == "q" || event.key == "e")) {
            return;
        }
        if (keyAlreadyHeldDown) {
            return;
        }
        keyAlreadyHeldDown = true;
        // Delay for double clicking buttons
        canPointsBeChanged = false;

        setTimeout(() => {
            canPointsBeChanged = true;
        }, 1000);

        switch (event.key) {
            // LEFT TEAM
            case "q":
                changePoints(1, Team.LEFT);
                break;
            case "a":
                changePoints(-1, Team.LEFT);
                break;
            // RIGHT TEAM
            case "e":
                changePoints(1, Team.RIGHT);
                break;
            case "d":
                changePoints(-1, Team.RIGHT);
                break;
        }
    });
    document.addEventListener("keyup", () => {
        keyAlreadyHeldDown = false;
    });
});

function paddedPointsString(points: number): string {
    return points.toString().padStart(2, "0");
}

function changePoints(pointsAmount: number, team: Team): void {
    switch (team) {
        case Team.LEFT:
            pointsLeft.value += pointsAmount;
            if (pointsLeft.value < 0) {
                pointsLeft.value = 0;
            }
            break;
        case Team.RIGHT:
            pointsRight.value += pointsAmount;
            if (pointsRight.value < 0) {
                pointsRight.value = 0;
            }
            break;
    }
}
</script>

<style lang="less">
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
</style>
