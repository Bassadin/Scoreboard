<template>
    <div class="countdown-timer">
        {{ timerInstance.toFormat("mm:ss") }}
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

import airhornAudioClipFile from "@/assets/airhorn.wav";
import { Duration } from "luxon";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
const airhornAudioClip = new Audio(airhornAudioClipFile);

const timerInstance = ref(Duration.fromObject({ minutes: 15 }));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let timerTickInterval: any = null;

const isTimerRunning = ref(false);

onMounted(() => {
    document.addEventListener("keydown", (event) => {
        // Stop clock
        if (event.key == " ") {
            toggleTimer();
        }

        // Set timer to a specific duration value according to key pressed (1-8)
        if (Object.keys(keyToTimerDictionary).includes(event.key)) {
            timerInstance.value = Duration.fromObject({
                minutes: keyToTimerDictionary[event.key],
            });
        }
    });
});

function startTimer(): void {
    timerTickInterval = setInterval(() => {
        console.debug("Timer tick");
        timerInstance.value = timerInstance.value.minus(
            Duration.fromObject({ milliseconds: 100 }),
        );
        if (timerInstance.value.as("milliseconds") <= 0) {
            pauseTimer();

            airhornAudioClip.play();
        }
    }, 100);
}
function pauseTimer(): void {
    clearInterval(timerTickInterval);
}
function toggleTimer(): void {
    console.debug("Toggling timer");
    if (isTimerRunning.value) {
        pauseTimer();
    } else if (timerInstance.value.as("milliseconds") > 0) {
        startTimer();
    }
    isTimerRunning.value = !isTimerRunning.value;
}
</script>

<style>
/* Timer */
.countdown-timer {
    font-size: 23vh;
    font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
        "Lucida Sans", Arial, sans-serif;
    text-align: center;
}
</style>
