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
        INSERT INTO Player\
        (Id, CurrentEnergy)\
        VALUES\
        (1, 300);\
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
    ";
};