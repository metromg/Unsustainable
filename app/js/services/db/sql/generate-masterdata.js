exports.query = function () {
    return "\
        INSERT INTO Element\
        (Id, Name, Description, Image)\
        VALUES\
        (1, 'Water', 'Water is the chemical compound of hydrogen and oxygen.', 'water.png');\
        \
        INSERT INTO Element\
        (Id, Name, Description, Image)\
        VALUES\
        (2, 'Fire', 'Fire describes the formation of flames during burning.', 'fire.png');\
        \
        INSERT INTO Element\
        (Id, Name, Description, Image)\
        VALUES\
        (3, 'Steam', 'Steam consists of small watter drops in the air.', 'steam.png');\
        \
        INSERT INTO Element\
        (Id, Name, Description, Image)\
        VALUES\
        (4, 'Air', 'Air is the gas mix of earths atmosphere.', 'air.png');\
        \
        INSERT INTO Element\
        (Id, Name, Description, Image)\
        VALUES\
        (5, 'Dirt', 'Dirt is the death substance which is on the ground.', 'dirt.png');\
        \
        INSERT INTO Element\
        (Id, Name, Description, Image)\
        VALUES\
        (6, 'Mud', 'Mud contains 99% commercially available dirt.', 'mud.png');\
        \
        INSERT INTO Element\
        (Id, Name, Description, Image)\
        VALUES\
        (7, 'Energy', 'The energy on earth is unsustainable.', 'energy.png');\
        \
        INSERT INTO Element\
        (Id, Name, Description, Image)\
        VALUES\
        (8, 'Intelligence', 'Intelligence describes the comprehention and thinking of something.', 'intelligence.png');\
        \
        INSERT INTO Element\
        (Id, Name, Description, Image)\
        VALUES\
        (9, 'River', 'A river is a natural flowing water resource.', 'river.png');\
        \
        INSERT INTO Element\
        (Id, Name, Description, Image)\
        VALUES\
        (10, 'Wind', 'Wind is air in a hurry.', 'wind.png');\
        \
        INSERT INTO Element\
        (Id, Name, Description, Image)\
        VALUES\
        (11, 'Earthquake', 'Destructive eruption of earth.', 'earthquake.png');\
        \
        INSERT INTO Element\
        (Id, Name, Description, Image)\
        VALUES\
        (12, 'Life', 'Life is 42.', 'life.png');\
        \
        INSERT INTO Element\
        (Id, Name, Description, Image)\
        VALUES\
        (13, 'Storm', 'The storm is a invention of ancient meteorologists.', 'storm.png');\
        \
        INSERT INTO Element\
        (Id, Name, Description, Image)\
        VALUES\
        (14, 'Might', 'Might is the power to change the thinking of other people.', 'might.png');\
        \
        INSERT INTO Element\
        (Id, Name, Description, Image)\
        VALUES\
        (15, 'Pressure', 'Pressure is the force applied perpendicular to the surface of an object.', 'pressure.png');\
        \
        INSERT INTO Element\
        (Id, Name, Description, Image)\
        VALUES\
        (16, 'Sun', 'The sun is a star which is orbiting the earth.', 'sun.png');\
        \
        INSERT INTO Element\
        (Id, Name, Description, Image)\
        VALUES\
        (17, 'Fish', 'Fishs are animals which can be fished.', 'fish.png');\
        \
        INSERT INTO Element\
        (Id, Name, Description, Image)\
        VALUES\
        (18, 'Fish Stick', 'A baked or fried snack similar to french fries but made of fish.', 'fish-stick.png');\
        \
        INSERT INTO Element\
        (Id, Name, Description, Image)\
        VALUES\
        (19, 'Weapon', 'A weapon is a device which kills people.', 'weapon.png');\
        \
        INSERT INTO Element\
        (Id, Name, Description, Image)\
        VALUES\
        (20, 'Moscito', 'Small, flying, bloodsuckers.', 'moscito.png');\
        \
        INSERT INTO Element\
        (Id, Name, Description, Image)\
        VALUES\
        (21, 'Death', 'The death is coming in the future for anybody.', 'death.png');\
        \
        INSERT INTO Element\
        (Id, Name, Description, Image)\
        VALUES\
        (22, 'Stench', 'It smells... Take a deep breath.', 'stench.png');\
        \
        INSERT INTO Element\
        (Id, Name, Description, Image)\
        VALUES\
        (23, 'Human', 'You are a human, arent you?', 'sample.png');\
        \
        INSERT INTO Element\
        (Id, Name, Description, Image)\
        VALUES\
        (24, 'Plant', 'A plant is living in a flowerpot and has dignity and rights.', 'sample.png');\
        \
        INSERT INTO Element\
        (Id, Name, Description, Image)\
        VALUES\
        (25, 'King', 'The king is a normal human. But he has a crown on his head.', 'sample.png');\
        \
        INSERT INTO Element\
        (Id, Name, Description, Image)\
        VALUES\
        (26, 'War', 'The state similarlly to peace, in which humans are killing them mutually.', 'sample.png');\
        \
        INSERT INTO Element\
        (Id, Name, Description, Image)\
        VALUES\
        (27, 'Humans', 'Multiple humans.', 'sample.png');\
        \
        INSERT INTO Element\
        (Id, Name, Description, Image)\
        VALUES\
        (28, 'Wheat', 'Wheat is a plant which grows on the ground... Like literally any other plant.', 'sample.png');\
        \
        INSERT INTO Element\
        (Id, Name, Description, Image)\
        VALUES\
        (29, 'Tree', 'Tree are made of paper and are available in any paper-store.', 'sample.png');\
        \
        INSERT INTO Element\
        (Id, Name, Description, Image)\
        VALUES\
        (30, 'Zombie', 'Zombies are people who rose from death.', 'sample.png');\
        \
        INSERT INTO Recipe\
        (Id, Element1Id, Element2Id, ResultId, EnergyUsage)\
        VALUES\
        (1, 1, 2, 3, 50);\
        \
        INSERT INTO Recipe\
        (Id, Element1Id, Element2Id, ResultId, EnergyUsage)\
        VALUES\
        (2, 5, 1, 6, 30);\
        \
        INSERT INTO Recipe\
        (Id, Element1Id, Element2Id, ResultId, EnergyUsage)\
        VALUES\
        (3, 7, 1, 9, 40);\
        \
        INSERT INTO Recipe\
        (Id, Element1Id, Element2Id, ResultId, EnergyUsage)\
        VALUES\
        (4, 7, 4, 10, 30);\
        \
        INSERT INTO Recipe\
        (Id, Element1Id, Element2Id, ResultId, EnergyUsage)\
        VALUES\
        (5, 7, 5, 11, 80);\
        \
        INSERT INTO Recipe\
        (Id, Element1Id, Element2Id, ResultId, EnergyUsage)\
        VALUES\
        (6, 7, 6, 12, 60);\
        \
        INSERT INTO Recipe\
        (Id, Element1Id, Element2Id, ResultId, EnergyUsage)\
        VALUES\
        (7, 7, 10, 13, 80);\
        \
        INSERT INTO Recipe\
        (Id, Element1Id, Element2Id, ResultId, EnergyUsage)\
        VALUES\
        (8, 7, 8, 14, 20);\
        \
        INSERT INTO Recipe\
        (Id, Element1Id, Element2Id, ResultId, EnergyUsage)\
        VALUES\
        (9, 4, 5, 15, 40);\
        \
        INSERT INTO Recipe\
        (Id, Element1Id, Element2Id, ResultId, EnergyUsage)\
        VALUES\
        (10, 7, 2, 16, 120);\
        \
        INSERT INTO Recipe\
        (Id, Element1Id, Element2Id, ResultId, EnergyUsage)\
        VALUES\
        (11, 1, 12, 17, 30);\
        \
        INSERT INTO Recipe\
        (Id, Element1Id, Element2Id, ResultId, EnergyUsage)\
        VALUES\
        (12, 2, 17, 18, 50);\
        \
        INSERT INTO Recipe\
        (Id, Element1Id, Element2Id, ResultId, EnergyUsage)\
        VALUES\
        (13, 2, 8, 19, 40);\
        \
        INSERT INTO Recipe\
        (Id, Element1Id, Element2Id, ResultId, EnergyUsage)\
        VALUES\
        (14, 4, 12, 20, 20);\
        \
        INSERT INTO Recipe\
        (Id, Element1Id, Element2Id, ResultId, EnergyUsage)\
        VALUES\
        (15, 2, 12, 21, 200);\
        \
        INSERT INTO Recipe\
        (Id, Element1Id, Element2Id, ResultId, EnergyUsage)\
        VALUES\
        (16, 17, 21, 22, 40);\
        \
        INSERT INTO Recipe\
        (Id, Element1Id, Element2Id, ResultId, EnergyUsage)\
        VALUES\
        (17, 12, 8, 23, 100);\
        \
        INSERT INTO Recipe\
        (Id, Element1Id, Element2Id, ResultId, EnergyUsage)\
        VALUES\
        (18, 12, 5, 24, 50);\
        \
        INSERT INTO Recipe\
        (Id, Element1Id, Element2Id, ResultId, EnergyUsage)\
        VALUES\
        (19, 14, 23, 25, 80);\
        \
        INSERT INTO Recipe\
        (Id, Element1Id, Element2Id, ResultId, EnergyUsage)\
        VALUES\
        (20, 14, 19, 26, 100);\
        \
        INSERT INTO Recipe\
        (Id, Element1Id, Element2Id, ResultId, EnergyUsage)\
        VALUES\
        (21, 23, 23, 27, 30);\
        \
        INSERT INTO Recipe\
        (Id, Element1Id, Element2Id, ResultId, EnergyUsage)\
        VALUES\
        (22, 16, 24, 28, 50);\
        \
        INSERT INTO Recipe\
        (Id, Element1Id, Element2Id, ResultId, EnergyUsage)\
        VALUES\
        (23, 7, 24, 29, 80);\
        \
        INSERT INTO Recipe\
        (Id, Element1Id, Element2Id, ResultId, EnergyUsage)\
        VALUES\
        (24, 12, 21, 30, 130);\
        \
        INSERT INTO Player\
        (Id, CurrentEnergy)\
        VALUES\
        (1, 1000);\
        \
        INSERT INTO CurrentElement\
        (Id, PlayerId, ElementId, Location)\
        VALUES\
        (1, 1, 1, '{\"x\": 100, \"y\": 200}');\
        \
        INSERT INTO CurrentElement\
        (Id, PlayerId, ElementId, Location)\
        VALUES\
        (2, 1, 2, '{\"x\": 200, \"y\": 200}');\
        \
        INSERT INTO CurrentElement\
        (Id, PlayerId, ElementId, Location)\
        VALUES\
        (3, 1, 4, '{\"x\": 300, \"y\": 200}');\
        \
        INSERT INTO CurrentElement\
        (Id, PlayerId, ElementId, Location)\
        VALUES\
        (4, 1, 5, '{\"x\": 400, \"y\": 200}');\
        \
        INSERT INTO CurrentElement\
        (Id, PlayerId, ElementId, Location)\
        VALUES\
        (5, 1, 7, '{\"x\": 500, \"y\": 200}');\
        \
        INSERT INTO CurrentElement\
        (Id, PlayerId, ElementId, Location)\
        VALUES\
        (6, 1, 8, '{\"x\": 600, \"y\": 200}');\
    ";
};