/**
 * Created by elias on 24.03.15.
 */
exports.query = function () {
    return "" +
        "INSERT INTO Element(Name,Description,Image) VALUES ('Water','','water.png');" +
        "INSERT INTO Element(Name,Description,Image) VALUES ('Fire','','fire.png');" +
        "INSERT INTO Element(Name,Description,Image) VALUES ('Steam','','steam.png');" +
        "" +
        "INSERT INTO Recipe(Element1Id,Element2Id,ResultId,EnergyUsage) VALUES (1,2,3,20);" +
        "" +
        "INSERT INTO Player(Id,CurrentEnergy) VALUES (1,300);" +
        "" +
        "" +
        "" +
        "" +
        ""
};