# JS-808

## Structure
The Controller orchestrates how the steps are walked through. It allows a user to change the tempo via the BPM input. It also has play, pause, and stop buttons. It instantiates the tracks and sequence selector components. The Track is a fairly simple component that renders step buttons which are used to pass along user events through the track, back to the controller.

The Track is in charge of whether or not it needs to play an effect based on the state of the sequence and where the step cursor is. (Currently this version does not play sound.) There is one Track instance per track type and each handle their own sequence separately.

As stated the Step Button is only handling user clicks and whether it is on or not. Click event data is passed back up to parent classes.

The Sequences class is just a React class for select input objects and only signals to the controller what sequence has been selected.

## How to use
```bash
npm i
npm test
npm start
```
