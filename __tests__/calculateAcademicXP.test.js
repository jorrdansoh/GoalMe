const updateExperience = (goal) => {
  let addXP = 0;
  if (goal.difficulty == "Hard") {
    addXP = 200;
  } else if (goal.difficulty == "Medium") {
    addXP = 100;
  } else if (goal.difficulty == "Easy") {
    addXP = 50;
  }
  return addXP;
};

const updateLevel = (
  current_xp,
  current_level,
  wisdom_xp,
  wisdom_lvl,
  goal
) => {
  const addXP = updateExperience(goal);
  const new_xp = current_xp + addXP;
  const new_wisdom_xp = wisdom_xp + addXP;
  const xp_threshold = Math.round(Math.pow(current_level / 0.05, 1.6));
  const wisdom_xp_threshold = Math.round(Math.pow(wisdom_lvl / 0.05, 1.6));
  const result = {
    xp: new_xp >= xp_threshold ? new_xp % xp_threshold : new_xp,
    lvl: new_xp >= xp_threshold ? current_level + 1 : current_level,
    wisdom_xp:
      new_wisdom_xp >= wisdom_xp_threshold
        ? new_wisdom_xp % wisdom_xp_threshold
        : new_wisdom_xp,
    wisdom_lvl:
      new_wisdom_xp >= wisdom_xp_threshold ? wisdom_lvl + 1 : wisdom_lvl,
  };
  return result;
};

const test_goals = [
  {
    id: 0,
    type: "Academic",
    difficulty: "",
  },
  {
    id: 1,
    type: "Academic",
    difficulty: "Easy",
  },
  {
    id: 2,
    type: "Academic",
    difficulty: "Medium",
  },
  {
    id: 3,
    type: "Academic",
    difficulty: "Hard",
  },
];

// Test 1
test("completing an academic goal with no difficulty specified grants zero XP", () => {
  expect(updateExperience(test_goals[0])).toBe(0);
});

// Test 2
test("completing an academic goal with Easy difficulty specified grants 50 XP", () => {
  expect(updateExperience(test_goals[1])).toBe(50);
});

// Test 3
test("completing an academic goal with Medium difficulty specified grants 100 XP", () => {
  expect(updateExperience(test_goals[2])).toBe(100);
});

// Test 4
test("completing an academic goal with Hard difficulty specified grants 200 XP", () => {
  expect(updateExperience(test_goals[3])).toBe(200);
});

// Test 5
test("For a user at 50 xp and level 1 with 50 wisdom xp at level 1 wisdom, \ncompleting an academic goal with Easy difficulty will update user to be \n100 xp at level 1 with 100 wisdom xp at level 1 wisdom", () => {
  expect(updateLevel(50, 1, 50, 1, test_goals[1]).xp).toBe(100);
  expect(updateLevel(50, 1, 50, 1, test_goals[1]).lvl).toBe(1);
  expect(updateLevel(50, 1, 50, 1, test_goals[1]).wisdom_xp).toBe(100);
  expect(updateLevel(50, 1, 50, 1, test_goals[1]).wisdom_lvl).toBe(1);
});

// Test 6
test("For a user at 120 xp and level 1 with 120 wisdom xp at level 1 wisdom, \ncompleting an academic goal with Easy difficulty will update user to be \n49 xp at level 2 with 49 wisdom xp at level 2 wisdom", () => {
  expect(updateLevel(120, 1, 120, 1, test_goals[1]).xp).toBe(49);
  expect(updateLevel(120, 1, 120, 1, test_goals[1]).lvl).toBe(2);
  expect(updateLevel(120, 1, 120, 1, test_goals[1]).wisdom_xp).toBe(49);
  expect(updateLevel(120, 1, 120, 1, test_goals[1]).wisdom_lvl).toBe(2);
});

// Test 7
test("For a user at 10 xp and level 1 with 10 wisdom xp at level 1 wisdom, \ncompleting an academic goal with Medium difficulty will update user to be \n110 xp at level 1 with 110 wisdom xp at level 1 wisdom", () => {
  expect(updateLevel(10, 1, 10, 1, test_goals[2]).xp).toBe(110);
  expect(updateLevel(10, 1, 10, 1, test_goals[2]).lvl).toBe(1);
  expect(updateLevel(10, 1, 10, 1, test_goals[2]).wisdom_xp).toBe(110);
  expect(updateLevel(10, 1, 10, 1, test_goals[2]).wisdom_lvl).toBe(1);
});

// Test 8
test("For a user at 120 xp and level 1 with 10 wisdom xp at level 1 wisdom, \ncompleting an academic goal with Medium difficulty will update user to be \n99 xp at level 2 with 99 wisdom xp at level 2 wisdom", () => {
  expect(updateLevel(120, 1, 120, 1, test_goals[2]).xp).toBe(99);
  expect(updateLevel(120, 1, 120, 1, test_goals[2]).lvl).toBe(2);
  expect(updateLevel(120, 1, 120, 1, test_goals[2]).wisdom_xp).toBe(99);
  expect(updateLevel(120, 1, 120, 1, test_goals[2]).wisdom_lvl).toBe(2);
});

// Test 9
test("For a user at 50 xp and level 2 with 50 wisdom xp at level 2 wisdom, \ncompleting an academic goal with Hard difficulty will update user to be \n250 xp at level 2 with 250 wisdom xp at level 2 wisdom", () => {
  expect(updateLevel(50, 2, 50, 2, test_goals[3]).xp).toBe(250);
  expect(updateLevel(50, 2, 50, 2, test_goals[3]).lvl).toBe(2);
  expect(updateLevel(50, 2, 50, 2, test_goals[3]).wisdom_xp).toBe(250);
  expect(updateLevel(50, 2, 50, 2, test_goals[3]).wisdom_lvl).toBe(2);
});

// Test 10
test("For a user at 200 xp and level 2 with 200 wisdom xp at level 2 wisdom, \ncompleting an academic goal with Hard difficulty will update user to be \n34 xp at level 3 with 34 wisdom xp at level 3 wisdom", () => {
  expect(updateLevel(200, 2, 200, 2, test_goals[3]).xp).toBe(34);
  expect(updateLevel(200, 2, 200, 2, test_goals[3]).lvl).toBe(3);
  expect(updateLevel(200, 2, 200, 2, test_goals[3]).wisdom_xp).toBe(34);
  expect(updateLevel(200, 2, 200, 2, test_goals[3]).wisdom_lvl).toBe(3);
});
