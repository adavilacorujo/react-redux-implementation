export default {
  name: "/updateshoulders",
  description: "Update all shouder workouts to a single instruction",
  exec: function () {
    // knowing the command registry has a few commands...
    // change view to shoulders
    this.execute("view:shoulders", {
      muscleSelected: [],
      secondaryMuscles: ["chest"],
    });
    // update shoulder exercise
    this.execute("updateinstruction", {
      value: "Press really hard",
      exercise: "seated dumbbelll overhead press",
    });
    // update barbel bench press exercise
    this.execute("updateinstruction", {
      value: "Press really hard",
      exercise: "barbel bench press",
    });
  },
};
