# Audio-Visual Reaction Time Experiment

This web-based experiment tests and compares the reaction times to visual and audio stimuli. The experiment is built with JavaScript and uses the Web Audio API for the audio stimuli.

## Overview

The experiment presents a series of tests, half of which are visual and half are audio. The visual tests change the background color of the webpage to green, while the audio tests play a sound at a frequency of 880 Hz (A5).

Each test begins after a random delay between 1 and 3 seconds. Participants must press the spacebar as soon as they perceive the stimulus, and the program records their reaction time. At the end of the experiment, participants can download their results as a CSV file.

## Setup

1. Clone this repository to your local machine.
2. Open the `index.html` file in your web browser to start the experiment.

## Usage

Press the spacebar to start the experiment. After each stimulus, press the spacebar again as quickly as possible. The experiment runs a predetermined number of tests, which can be adjusted in the JavaScript code.

## Results

Results are recorded in an array and can be downloaded as a CSV file at the end of the experiment. Each row in the CSV file corresponds to one test and includes the type of test (sound or visual), the frequency or color used, and the participant's reaction time in milliseconds.

## Modifying the Experiment

You can adjust the number of tests, the frequency of the sound, or the color used for the visual stimulus by modifying the variables at the beginning of the `script.js` file.

## License

Feel free to use and alter
