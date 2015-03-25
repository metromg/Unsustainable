exports.query = function () {
    return "\
        INSERT INTO Element\
        (Id, Name, Description, Image)\
        VALUES\
        (1, 'Water', '', 'water.png');\
        \
        INSERT INTO Element\
        (Id, Name, Description, Image)\
        VALUES\
        (2, 'Fire', '', 'fire.png');\
        \
        INSERT INTO Element\
        (Id, Name, Description, Image)\
        VALUES\
        (3, 'Steam', '', 'steam.png');\
        \
        INSERT INTO Recipe\
        (Id, Element1Id, Element2Id, ResultId, EnergyUsage)\
        VALUES\
        (1, 1, 2, 3, 50);\
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
    ";
};